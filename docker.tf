resource "null_resource" "build_push_frontend" {
  provisioner "local-exec" {
    command = <<EOT
      aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${aws_ecr_repository.frontend_repo.repository_url}
      docker build -t blog-app-frontend:latest ./blog-app-frontend
      docker tag blog-app-frontend:latest ${aws_ecr_repository.frontend_repo.repository_url}:latest
      docker push ${aws_ecr_repository.frontend_repo.repository_url}:latest
    EOT
  }
}

resource "null_resource" "build_push_backend" {
  provisioner "local-exec" {
    command = <<EOT
      aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${aws_ecr_repository.backend_repo.repository_url}
      docker build -t blog-app-backend:latest ./blog-app-backend
      docker tag blog-app-backend:latest ${aws_ecr_repository.backend_repo.repository_url}:latest
      docker push ${aws_ecr_repository.backend_repo.repository_url}:latest
    EOT
  }
}

depends_on = [module.eks]
