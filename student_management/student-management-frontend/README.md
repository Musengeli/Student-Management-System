# Introduction
This project is a frontend application for a student management system. It allows students to register, login, and view their profiles. It also supports 2-factor authentication for old students to set new user logins (set new passwords). The application is built using Angular and connects to a MySQL database.

# Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (>= 14.x)
Angular CLI (>= 12.x)
MySQL Database
A modern web browser

# Installation
1. clone the repo
cd student-management-frontend

2. Install dependencies: npm intall

# Running the application
run the command: npm start or ng serve

# Database Setup

1. Create a MySQL Database:

CREATE DATABASE student_management;

2. Create necessary tables:
Use the following SQL commands to create the necessary tables:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    two_factor_code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



# StudentManagementFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
