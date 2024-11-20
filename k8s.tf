provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.cluster.token
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "blog-app-frontend"
    namespace = "default"
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "blog-app-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "blog-app-frontend"
        }
      }

      spec {
        container {
          image = "${aws_ecr_repository.frontend_repo.repository_url}:latest"
          name  = "blog-app-frontend"
          ports {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "blog-app-frontend"
    namespace = "default"
  }

  spec {
    selector = {
      app = "blog-app-frontend"
    }
    port {
      protocol = "TCP"
      port     = 80
      target_port = 80
    }
    type = "LoadBalancer"
  }
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "blog-app-backend"
    namespace = "default"
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "blog-app-backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "blog-app-backend"
        }
      }

      spec {
        container {
          image = "${aws_ecr_repository.backend_repo.repository_url}:latest"
          name  = "blog-app-backend"
          ports {
            container_port = 8080
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend"
    namespace = "default"
  }

  spec {
    selector = {
      app = "backend"
    }
    port {
      protocol = "TCP"
      port     = 8080
      target_port = 8080
    }
    type = "LoadBalancer"
  }
}
