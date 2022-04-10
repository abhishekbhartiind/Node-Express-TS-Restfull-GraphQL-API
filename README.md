# Express Base Basic Api Structure

It is a design pattern for software projects. It is used majorly by Node developers.

In MVC pattern, application and its development are divided into three interconnected parts. The advantage of this is it helps in focusing on a specific part of the application name, the ways information is presented to and accepted from, the user. It helps in allowing for efficient code reuse and the parallel development of the application. Even if the project structure might look a little different than an ideal MVC structure, the basic program flow in and out the application remains the same.

# What you'll get in this architecture:

1. Node.js Using Express.js
2. Parsing Requests & Sending Responses
3. Rendering HTML Dynamically (on the Server)
4. Working with Files and generating PDFs on the Server (on-the-fly)
5. File Upload and Download
6. Using the Model-View-Controller (MVC) Pattern
7. Using Node.js with SQL (MySQL) using Sequelize
8. Using Node.js with NoSQL (MongoDB) using Mongoose
9. Working with Sessions & Cookies
10. User Authentication and Authorization
11. Sending E-Mails
12. Validating User Input
13. Data Pagination
14. Handling Payments with Stripe.js
15. Building REST APIs
16. Authentication in REST APIs
17. xFile Upload in REST APIs
18. Building GraphQL APIs
19. Building a Realtime Node.js App with Websockets
20. File Upload in GraphQL APIs
21. Using TypeScript with Node.js
22. Automated Testing (Unit Tests)
23. Deploying a Node.js Application
24. Highly scalable folder architecture


# Installation guide and basic setup

- Step 1: Download Node.js Installer -- (https://nodejs.org/en/download/)
- Step 2: Install Node.js and NPM from Browser
- Step 3: Verify Installation -- (node -v , npm -v)
- Step 4: Install yarn package manger -- (npm i -g yarn)
- Step 5: Verify Installation -- (yarn -v)
- Step 6: Navigate to project folder in terminal run cmd -- (yarn)
- Step 7: After finish installation rum cmd -- (yarn start)

# Deployment architecture

- Serverlesss deployment on firebase - or
- Serverlesss deployment on heroku - or
- AWS ready for go setup
- CI/CD pipeline support for Jenkins.

# Genrate self sign Open SSl Certificate

- openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365

# Environment variable need to require for run this application

1. PORT
2. NODE_ENV
3. appName
4. SENDGRID_API_KEY
5. STRIP_API_KEY
6. session_Id
7. MONGO_USER
8. MONGO_PASSWORD
9. MONGO_DEFAULT_DATABASE
10. JWT_SECREATE
11. CLIENT_URL
12. SQL_DB_Name
13. SQL_Username
14. SQL_password
15. SQL_dialect
16. SQL_Host
17. BUCKET_NAME
18. IAM_USER_KEY
19. IAM_USER_SECRET
20. FRONT_END_URL
21. FROM (your send from email id)

