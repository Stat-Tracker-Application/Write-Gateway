# Microservice: Gateway

## Overview

The Gateway microservice serves as the entry point for the GameStats Tracker application. It handles routing requests to various microservices, including User-API, Stat-API, and Authentication-API. This microservice facilitates communication between different components and ensures a seamless experience for users.

## Setup and Configuration

1. Clone the repository.
2. Run the commands in the root project readme.

Note the environment variables:

- `USERAPI_URL`: URL for User-API service.
- `STATAPI_URL`: URL for Stat-API service.
- `AUTHAPI_URL`: URL for Authentication-API service.

These URLs are set through Kubernetes. See the file `gateway-deployment.yaml` in the root/kubernetes folder of the project.

## Endpoints

### Hello World Endpoint:

- **Endpoint:** /
- **Description:** Returns a simple "Hello world from gateway" message.
- **Example:** http://localhost:4000/

### User-API Endpoint:

- **Endpoint:** /userapi
- **Description:** Forwards requests to the User-API microservice.
- **Example:** http://localhost:4000/userapi

### Stat-API Endpoint:

- **Endpoint:** /statapi
- **Description:** Forwards requests to the Stat-API microservice.
- **Example:** http://localhost:4000/statapi

### Authentication-API Endpoint:

- **Endpoint:** /authapi
- **Description:** Forwards requests to the Authentication-API microservice.
- **Example:** http://localhost:4000/authapi

### User Signup Endpoint:

- **Endpoint:** /authapi/user/signup
- **Description:** Signs up a user by sending requests to the Authentication-API and User-API microservices.
- **Method:** POST
- **Example:** http://localhost:4000/authapi/user/signup

### Delete Users by Username Endpoint:

- **Endpoint:** /deleteusersbyusername
- **Description:** Deletes users by sending requests to the User-API and Authentication-API microservices.
- **Method:** DELETE
- **Example:** http://localhost:4000/deleteusersbyusername

## Contact Information

For any inquiries or assistance related to the Gateway microservice, please contact:

Bart Hagoort: </br>
Email: barthagoort2000@outlook.com </br>
Phone: +31 6 57113787 </br>
