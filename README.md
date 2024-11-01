# REVEST SOLUTIONS PVT LTD

This project consists of three main components:

1. Product Management Microservice
2. Order Management Microservice
3. Signup Form Frontend

The entire application can be run seamlessly using Docker Compose. Below are detailed instructions on how to set up and use each component


![alt text](https://github.com/Mohammedalduraidi/revest-assignement/blob/master/product-managment-swagger.png?raw=true)
![alt text](https://github.com/Mohammedalduraidi/revest-assignement/blob/master/order-management-swagger.png?raw=true)
![alt text](https://github.com/Mohammedalduraidi/revest-assignement/blob/master/signup-form.png?raw=true)



## Prerequisites
 ### Make sure you have the following installed on your system:
 - Docker ( if you wanna use docker )
### For local usage
 - NodeJS 16+
 - postgres database
 - make sure to create a new databases, database user and roles for product and order services 
   * psql -U postgres
   * CREATE DATABASE revestproduct;
   * CREATE DATABASE revestorder;
   * CREATE USER revest WITH PASSWORD 'revest';
   * GRANT ALL PRIVILEGES ON DATABASE revestproduct TO revest;
   * GRANT ALL PRIVILEGES ON DATABASE revestorder TO revest;

## Usage
 1. Product management
  ```bash
   cd prdouct-managment
   cp sample.env .env # make sure to change the DB_HOST in env to localhost if you're running it locally
   npm ci -d 
   npm run build
   npm run start
   ```
Setup your application by visiting `http://localhost:4444/swagger`

### Please add this token on Swagger Authorize for Product Management to be able to test the APIs  ```taUOuW0VubdhoP4YGBacRsgBQ6/WsBc0TtD+9ajoBZI=```


2. Order management
  ```bash
   cd order-managment
   cp sample.env .env # make sure to change the DB_HOST in env to localhost if you're running it locally
   npm ci -d 
   npm run build
   npm run start
   ```
Setup your application by visiting `http://localhost:5555/swagger`

### Please add this token on Swagger Authorize for Order Management to be able to test the APIs ```Rpdbn/+n2Dsgix6rN+btMwC8eAsEaM59a508+sNvTFo=```

3. Dynamic Signup Form
  ```bash
   cd dynamic-form
   npm ci -d 
   npm start
   ```  
Setup your application by visiting `http://localhost:3000`


## Docker Usage
Make sure you're in the root directory where the docker-compose.yml file is located and run ```docker compose up --build -d``` to run all these 3 application in one time and start testing it