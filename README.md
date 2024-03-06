# BlogNest - A Blog Application

BlogNest is a robust blogging platform that leverages EJS and Bootstrap for its frontend, while the backend is powered by Node.js, Express, and MongoDB. With BlogNest, you have the capability to perform all CRUD (Create, Read, Update, Delete) operations securely, thanks to its comprehensive authentication system.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Guide](#installation-guide)

## Introduction

BlogNest is a robust blogging platform designed to simplify the process of creating, managing, and sharing blog content. Whether you're a seasoned blogger or just starting out, BlogNest provides the tools and features you need to bring your ideas to life and engage with your audience like never before.

## Features

BlogNest comes equipped with a wide range of features to enhance your blogging experience:

1. **Authentication System**: BlogNest offers a secure authentication system that allows users to register and log in using their email and password.
  
2. **Authorization**: BlogNest maintains authorization across all routes using JSON Web Tokens (JWT) and cookies, ensuring that only authenticated users can access specific features.

3. **Password Security**: User passwords are securely stored in the database. BlogNest employs salting and hashing techniques using the Crypto module to protect user data.
  
4. **Blog Creation**: To contribute by adding a new blog to BlogNest, users need to be authenticated, ensuring the quality and authenticity of content.

5. **Public Access**: Anyone can access and read blogs and comments without the need to authenticate, promoting an open and accessible environment.
  
6. **Commenting**: Authenticated users can engage with the community by leaving comments on blogs, facilitating discussions and interactions.

7. **Blog Management**: Authors have complete control over their blogs. They can edit or delete their blogs as needed, providing them with flexibility and ownership.

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript) for server-side rendering
- MongoDB for database
- JWT for authentication and authorization
- Multer for handling & uploading files
- Other necessary Node.js packages

## Installation Guide

To install and run BlogNest locally, follow these steps:


## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/KamleshChandel04/BlogNest.git
```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm:

```bash
cd BlogNest
npm install
```
3. **Set Up Environment Variables**: Rename example.env to .env and fill in the required variables like database connection URI, session secret, etc.

```bash
CONNECTION_URL = Your MongoDb Connection String
PORT = 3000
SECRET_KEY = Your Secret Key
```
4. **Start the Application**: Run the following command to start the BlogNest application:

```bash
npm start or npm run dev
```
5. **Access BlogNest**:Open your web browser and navigate to http://localhost:3000 to access BlogNest.