#!/bin/bash

# destroy-infra.sh

set -euo pipefail

# === Configuration ===
TERRAFORM_TAG="Name"
TERRAFORM_VALUE_PREFIX="Elegance-"

GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔐 Using AWS Profile: $(aws configure get profile || echo default)${NC}"

# === Terminate EC2 Instances ===
echo "🔍 Fetching EC2 instances..."
INSTANCE_IDS=$(aws ec2 describe-instances \
  --filters "Name=tag:${TERRAFORM_TAG},Values=${TERRAFORM_VALUE_PREFIX}*" \
  --query "Reservations[].Instances[].InstanceId" \
  --output text --no-pager)

if [ -n "$INSTANCE_IDS" ]; then
  echo "💥 Terminating instances: $INSTANCE_IDS"
  aws ec2 terminate-instances --instance-ids $INSTANCE_IDS
  echo "⏳ Waiting for termination..."
  aws ec2 wait instance-terminated --instance-ids $INSTANCE_IDS
  echo -e "${GREEN}✅ Instances terminated.${NC}"
else
  echo "ℹ️ No instances found."
fi

# === Clean Up VPC Resources ===
VPC_ID=$(aws ec2 describe-vpcs \
  --filters "Name=tag:${TERRAFORM_TAG},Values=${TERRAFORM_VALUE_PREFIX}*" \
  --query "Vpcs[0].VpcId" \
  --output text)

if [ -z "$VPC_ID" ] || [ "$VPC_ID" == "None" ]; then
  echo "ℹ️ No VPC found. Exiting."
  exit 0
fi

echo "🔧 Found VPC: $VPC_ID"

# Internet Gateway
IGW_ID=$(aws ec2 describe-internet-gateways \
  --filters "Name=attachment.vpc-id,Values=$VPC_ID" "Name=tag:${TERRAFORM_TAG},Values=${TERRAFORM_VALUE_PREFIX}*" \
  --query "InternetGateways[0].InternetGatewayId" \
  --output text)

if [ "$IGW_ID" != "None" ] && [ -n "$IGW_ID" ]; then
  echo "❎ Deleting IGW: $IGW_ID"
  aws ec2 detach-internet-gateway --internet-gateway-id $IGW_ID --vpc-id $VPC_ID || true
  aws ec2 delete-internet-gateway --internet-gateway-id $IGW_ID || true
else
  echo "ℹ️ No IGW found."
fi

# Subnets
SUBNET_IDS=$(aws ec2 describe-subnets \
  --filters "Name=vpc-id,Values=$VPC_ID" "Name=tag:${TERRAFORM_TAG},Values=${TERRAFORM_VALUE_PREFIX}*" \
  --query "Subnets[].SubnetId" \
  --output text)

if [ -n "$SUBNET_IDS" ]; then
  echo "❎ Deleting subnets: $SUBNET_IDS"
  for ID in $SUBNET_IDS; do
    aws ec2 delete-subnet --subnet-id $ID || true
  done
else
  echo "ℹ️ No subnets found."
fi

# Security Groups
SG_IDS=$(aws ec2 describe-security-groups \
  --filters "Name=vpc-id,Values=$VPC_ID" "Name=tag:${TERRAFORM_TAG},Values=${TERRAFORM_VALUE_PREFIX}*" \
  --query "SecurityGroups[?GroupName!='default'].GroupId" \
  --output text)

if [ -n "$SG_IDS" ]; then
  echo "❎ Deleting security groups: $SG_IDS"
  for ID in $SG_IDS; do
    aws ec2 delete-security-group --group-id $ID || true
  done
else
  echo "ℹ️ No non-default security groups found."
fi

# Route Tables
RTB_IDS=$(aws ec2 describe-route-tables \
  --filters "Name=tag:${TERRAFORM_TAG},Values=${TERRAFORM_VALUE_PREFIX}*" \
  --query "RouteTables[].RouteTableId" \
  --output text)

if [ -n "$RTB_IDS" ]; then
  echo "❎ Deleting route tables: $RTB_IDS"
  for ID in $RTB_IDS; do
    aws ec2 delete-route-table --route-table-id $ID || true
  done
else
  echo "ℹ️ No route tables found."
fi

# Delete VPC
echo "🚮 Deleting VPC: $VPC_ID"
aws ec2 delete-vpc --vpc-id $VPC_ID || true
echo -e "${GREEN}✅ VPC deletion initiated.${NC}"

# Final Check
REMAINING_VPCS=$(aws ec2 describe-vpcs \
  --filters "Name=tag:${TERRAFORM_TAG},Values=${TERRAFORM_VALUE_PREFIX}*" \
  --query "Vpcs[].VpcId" \
  --output text)

if [ -z "$REMAINING_VPCS" ]; then
  echo -e "${GREEN}✅ All tagged VPCs deleted.${NC}"
else
  echo -e "${YELLOW}⚠️ VPCs still exist: $REMAINING_VPCS${NC}"
fi
