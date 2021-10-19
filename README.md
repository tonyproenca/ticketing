Run Instructions

You'll need the following to run the project locally:

1- Install NPM and Node https://nodejs.org/en/download/

Docker https://docs.docker.com/engine/install/

Minikube https://minikube.sigs.k8s.io/docs/start/

Skaffold https://skaffold.dev/

Install everything in this order.
Start Docker and Minikube Note: Run minikube using VirtualBox driver

minikube start --driver=VirtualBox

After minikube is up and running, install nginx-ingress, using the following command
minikube addons enable ingress

Now, you'll need to edit your host files, adding the line ticketing.dev

On Linux, we have to discover our minikube IP, using the following command minikube ip

For mac and windows, it should work with 127.0.0.1

And That's it, the project is deployed and running!