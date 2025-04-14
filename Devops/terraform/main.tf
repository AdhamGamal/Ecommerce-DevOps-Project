provider "aws" {
  region = var.aws_region
}
 
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}
 
resource "aws_vpc" "elegance_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "Elegance-VPC"
  }
}
 
resource "aws_subnet" "elegance_public_subnet" {
  vpc_id                  = aws_vpc.elegance_vpc.id
  cidr_block              = var.public_subnet_cidr
  map_public_ip_on_launch = true
  tags = {
    Name = "Elegance-Public-Subnet"
  }
}
 
resource "aws_internet_gateway" "elegance_gw" {
  vpc_id = aws_vpc.elegance_vpc.id
  tags = {
    Name = "Elegance-IGW"
  }
}
 
resource "aws_route_table" "elegance_rt" {
  vpc_id = aws_vpc.elegance_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.elegance_gw.id
  }
  tags = {
    Name = "Elegance-Route-Table"
  }
}
 
resource "aws_route_table_association" "elegance_rta" {
  subnet_id      = aws_subnet.elegance_public_subnet.id
  route_table_id = aws_route_table.elegance_rt.id
}
 
resource "aws_security_group" "backend_sg" {
  name        = "backend-sg"
  description = "Security group for backend services"
  vpc_id      = aws_vpc.elegance_vpc.id
 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_access_cidr]
  }
 
  ingress {
    from_port   = var.backend_port
    to_port     = var.backend_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  ingress {
    from_port   = 9100
    to_port     = 9100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  tags = {
    Name = "Elegance-Backend-SG"
  }
}
 
resource "aws_security_group" "frontend_sg" {
  name        = "frontend-sg"
  description = "Security group for frontend services"
  vpc_id      = aws_vpc.elegance_vpc.id
 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_access_cidr]
  }
 
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  tags = {
    Name = "Elegance-Frontend-SG"
  }
}
 
resource "aws_instance" "elegance_backend" {
  count                  = var.backend_instance_count
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.elegance_public_subnet.id
  vpc_security_group_ids = [aws_security_group.backend_sg.id]
  key_name               = var.key_pair_name
  tags = {
    Name = "Elegance-Backend-${count.index + 1}"
  }
}
 
resource "aws_instance" "elegance_frontend" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.elegance_public_subnet.id
  vpc_security_group_ids = [aws_security_group.frontend_sg.id]
  key_name               = var.key_pair_name
  tags = {
    Name = "Elegance-Frontend"
  }
}