# SIT323- Cloud Native Application Development

## sit323-2025-prac6p - Creating a Kubernetes Cluster

## Steps for completing this task:

### 1. Enable Kubernetes in Docker Desktop

### 2. Build the docker image:
``` docker build -t sit323-2025-prac6p:v1 . ```

### 3. Create a deployment.yaml file:
```
apiVersion: apps/v1
kind: Deployment # Create the Kubernetes Deployment
metadata:
  name: sit323-2025-prac6p-deployment # Name of the Deployment
spec:
  replicas: 2 # Run 2 replicas of the application
  selector:
    matchLabels:
      app: sit323-2025-prac6p # Match the pods with this label
  template:
    metadata:
      labels:
        app: sit323-2025-prac6p # Label for the pods created
    spec:
      containers:
        - name: sit323-2025-prac6p # Name of the container
          image: sit323-2025-prac6p:v1 # Docker image to run
          ports:
            - containerPort: 3040 # The application runs on port 3040 
```

### 4. Create a service.yaml file:
```
apiVersion: v1
kind: Service # Create the Kubernetes Service
metadata:
  name: sit323-2025-prac6p-service # Name of the Service
spec:
  type: NodePort # Exposes service on each Node's IP at a static port 
  selector:
    app: sit323-2025-prac6p # Match this label with the pods 
  ports:
    - port: 80
      targetPort: 3040
      nodePort: 30000
```

### 5. Apply the deployment.yaml file:
``` kubectl apply -f deployment.yaml ```

### 6. Apply the service.yaml file:
``` kubectl apply -f service.yaml ```

### 7. Verify everything:
```
kubectl get deployments
kubectl get pods
kubectl get services
```
