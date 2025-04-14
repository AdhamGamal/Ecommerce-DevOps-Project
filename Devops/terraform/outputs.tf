output "backend_instances" {
  description = "Backend instance details"
  value = {
    ips       = aws_instance.elegance_backend[*].public_ip
    count     = length(aws_instance.elegance_backend)
    instance_ids = aws_instance.elegance_backend[*].id
  }
}

output "frontend_instance" {
  description = "Frontend instance details"
  value = {
    ip          = aws_instance.elegance_frontend.public_ip
    instance_id = aws_instance.elegance_frontend.id
  }
}
# To reference the backend security group
output "backend_security_group_id" {
  description = "The ID of the backend security group"
  value       = aws_security_group.backend_sg.id
}

# To reference the frontend security group
output "frontend_security_group_id" {
  description = "The ID of the frontend security group"
  value       = aws_security_group.frontend_sg.id
}