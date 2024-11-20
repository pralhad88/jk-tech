provider "aws" {
  region = "us-east-1"  # Change as needed
}

# ECR Repository for Frontend
resource "aws_ecr_repository" "frontend_repo" {
  name = "frontend"
}

# ECR Repository for Backend
resource "aws_ecr_repository" "backend_repo" {
  name = "backend"
}

# IAM Role for EKS Cluster
resource "aws_iam_role" "eks_cluster_role" {
  name = "eks-cluster-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
    }]
  })
}

# IAM Role for EKS Worker Nodes
resource "aws_iam_role" "eks_worker_role" {
  name = "eks-worker-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

# EKS Cluster
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "my-cluster"
  cluster_version = "1.25"
  subnets         = aws_subnet.my_subnets[*].id
  vpc_id          = aws_vpc.my_vpc.id

  node_groups = {
    eks_nodes = {
      desired_capacity = 2
      max_capacity     = 3
      min_capacity     = 1

      instance_type = "t3.medium"
    }
  }

  role_arn = aws_iam_role.eks_cluster_role.arn
}

# Output EKS Cluster Info
output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}
output "eks_cluster_name" {
  value = module.eks.cluster_id
}
