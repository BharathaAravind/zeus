Please visit the wiki link to understand the system architecture, technologies used for implementation.
https://github.com/airavata-courses/zeus/wiki/Final-Project-Description

Goal of the project is to build a website using microservices architecture and achieve service discovery, load balancing, fault tolerance, scalability. Used Kuberenetes to achieve the above concepts.

CI/CD technologies: Travis CI (CI - to verify builds), Jenkins, Dockerhub, Shell scripts (CD)
Demo: https://youtu.be/u1nUsIOf2pI

Project Demo: https://youtu.be/EKs7HZsVyzA

Technologies Used: Spring Boot, Python/Flask, NodeJs/Express, RabbitMQ, ElasticSearch, Docker, Jenkins, Kuberenetes, Apache zookeeper, Travis CI, MySQL.

DockerHub Repository for build images: https://hub.docker.com/u/aravindbharatha/

Branches Details: Each microservice is treated as their own project.

dev_aravind: SpringBoot Microservice handles the search component by querying an Elastic Serach cluster
devbranch_node_express_ms: Node/Express Microservices handles the login and sign up functionality
python_flask_ms: Python microservice ressponsible for home screen data and recommendations for user
dev_node_controller: Controller utilizing all the microservices written in Node JS

All the branches have their own Dockerfile and Jenkinsfile which is used by Jenkins to push docker images after building them.

They also have their kubernetes deployment and service yaml files.

