# Sheldon User Dashboard

This repository serves as the user dashboard for the [Sheldon Chrome
Extension](https://chrome.google.com/webstore/detail/jjpcchlkabbeeghocolljenmdeeckkoi).

![Yarn](https://img.shields.io/badge/-Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=fff)
![JavaScript](https://img.shields.io/badge/-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![ReactJS](https://img.shields.io/badge/-ReactJS-61DAFB?style=flat-square&logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![AWS](https://img.shields.io/badge/-AWS-232f3e?style=flat-square&logo=amazonaws&logoColor=white)

## Table of Contents

<!--
- [About Sheldon](#about-sheldon)
- [Features](#features)
- [Installation](#installation)
  - [Tools and Accounts Needed](#tools-and-accounts-needed)
  - [Setup](#setup)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
  - [Setup MongoDB Atlas](#setup-mongodb-atlas)
  - [Setup AWS and CI/CD](#setup-aws-and-cicd)
  - [Setup Nginx for SSL](#setup-nginx-for-ssl)
- [Code Guidelines](#code-guidelines)
- [Miscellaneous](#miscellaneous)
  - [Logging](#logging)
  - [Verifying Origin](#verifying-origin)
- [Contact](#contact)

## About Sheldon

Sheldon is the ultimate chrome extension for boosting your
productivity. With Sheldon, you can quickly and accurately
answer any question, craft compelling and engaging social media
posts in seconds, and even write emails and code snippets with
ease. But that's not all – Sheldon can also help you with
spreadsheets, presentations and much more making it the perfect
tool for anyone looking to streamline their workflows and save
time.

You can visit Sheldon at [https://heysheldon.com](https://heysheldon.com).
Learn more about Sheldon at [Sheldon's Github Page](https://github.com/HeySheldonAI).

![Twitter Follow](https://img.shields.io/twitter/follow/heysheldonai)

## Features

1. The server is built using Node.js, Express.js, and MongoDB and is deployed on AWS EC2 and uses Nginx as a reverse proxy.
2. The server uses JWT for authentication and authorization.
3. The server uses OpenAI's GPT-3 API to generate responses.
4. The server can rate-limit requests from the same IP address.
5. The server blocks requests from origins other than the extension or the dashboard. This is done by using a custom header and a secret key. Redis is used to perform this task.
6. The server can handle requests related to the user's account, such as login, signup and related to searching with a prompt.

## Installation

### Tools and Accounts Needed

To install the server, you will need to have [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/), and [PM2](https://pm2.keymetrics.io/) installed on your machine.

_AWS, MongoDB Atlas accounts not needed for local development._
_Github Account only necessary for CI/CD (GitHub Actions)_

- [OpenAI](https://openai.com/)
- [AWS](https://aws.amazon.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [GitHub](https://github.com/)

### Setup

Clone the repository and install the dependencies.

```bash
> git clone https://github.com/HeySheldonAI/extension-server.git
> cd extension-server
> npm install
```

Create a `.env` file in the root directory and add the environment variables as mentioned in the `.env.example` file or the table below.

| Variable Name         | Description                                        | Example                                                                                       |
| --------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `MONGODB_URI`         | The URI of the production MongoDB database.        | `mongodb+srv://<username>:<password>@example.mongodb.net/prod?retryWrites=true&w=majority`    |
| `STAGING_MONGODB_URI` | The URI of the staging MongoDB database.           | `mongodb+srv://<username>:<password>@example.mongodb.net/staging?retryWrites=true&w=majority` |
| `JWT_SECRET`          | The secret to encode and decode a JWT Token.       | `randomstringblabla`                                                                          |
| `ENCRYPTION_KEY`      | The key to decode the x-custom-header.             | `randomstringblabla`                                                                          |
| `MAIN_OPENAI_ORG_ID`  | The organization ID for Production OpenAI Account. | `org-xxxxxxxxxxxxxxxxxxx`                                                                     |
| `MAIN_OPENAI_API_KEY` | The secret key for Production OpenAI Account.      | `sk-xxxxxxxxxxxxxxxxxxx`                                                                      |
| `TEST_OPENAI_ORG_ID`  | The org ID for Dev/Staging OpenAI Account.         | `org-xxxxxxxxxxxxxxxxxxx`                                                                     |
| `TEST_OPENAI_API_KEY` | The secret key for Dev/Staging OpenAI Account.     | `sk-xxxxxxxxxxxxxxxxxxx`                                                                      |

**For default/development keys and values, refer to the [`config.js`](https://github.com/HeySheldonAI/extension-server/blob/master/src/config/config.js) file.**

### Running the Server

```bash
> npm run dev
```

If you get any errors, make sure the following conditions are met:

- NodeJs, MongoDB, Redis, and PM2 are installed on your machine.
- The MongoDB and Redis servers are running.
- The environment variables are set correctly.
- Make sure you don't use any special characters like `$` in the `JWT_SECRET` and `ENCRYPTION_KEY` variables.
- Port 8080, 6379, and 27017 are not being used by any other process.

For most of the errors, you can see the logs in the `logs` folder under the `src` directory. The log file for in-app errors would go by the following naming convention: `app_$ENVIRONMENT_$DD_MM_YYYY.logs.json`.

## Deployment

For deployment, you will need to have an AWS account, MongoDB Atlas account, and a Github account.

### Setup MongoDB Atlas

1. Create a new cluster on MongoDB Atlas.
2. Create a new user for the cluster and give it the `readWrite` role.
3. Create a new database and name it `prod` or `staging` depending on the environment.
4. Allow access from anywhere if you want to test the server locally. If you want to deploy the server on a remote server, then allow access from the IP address of the remote server that we will be creating later.

### Setup AWS and CI/CD

1. Create an AWS account and a Github account.
2. Refer to the following article: [How to Deploy a Node.js App to AWS EC2 Using GitHub Actions](https://medium.com/codemonday/github-actions-for-ci-cd-with-ec2-codedeploy-and-s3-e93e75bf1ce0) to setup the CI/CD pipeline.
3. Instead of adding the userdata, ssh into the new EC2 instance and follow the steps mentioned in the following gist: [How to setup a Node.js server on AWS EC2](https://gist.github.com/AdityaKG-169/0e11b81f28e26ffddc50a767cf1bdbca).
4. Make sure to create a `.env` file in the root directory of the server and add the environment variables as mentioned in the `.env.example` file or the table above.

### Setup Nginx for SSL

1. Follow the following article to setup Nginx for SSL: [How to Setup Nginx for SSL on Ubuntu Server](https://gist.github.com/AdityaKG-169/fe0c41a4bcf0f917ad44364ab158affc).
2. Make sure to edit the `nginx.conf` file as per the following gist: [Editing nginx.conf](https://gist.github.com/AdityaKG-169/12c1b57fc687a475ae06e5c273e09825). This edit is necessary so that the express server can receive the IP address of the user instead of the IP address of the proxy server.

## Code Guidelines

1. For every function, there must be comments stating why the function is needed and what it does.
2. Files must be arranged into folders based on their functionality.
3. All file and folders must be named in `camelCase`.
4. Try catching all errors and logging them in the `src/logs` folder.
5. Difference between helpers and util functions is that helper functions' response can directly be sent to frontend while utility functions' response cannot. Also, all the utility functions take direct arguments while helper functions take object(context) as argument.

## Miscellaneous

### Logging

All the logs are stored in the `logs` folder under the `src` directory.

There are 2 types of logs:

- `app` logs: These logs are generated by the application in the `try/catch` block.
- `network` logs: These logs are generated by the `morgan` package.

The log file for in-app errors would go by the following naming convention: `app_$ENVIRONMENT_$DD_MM_YYYY.logs.json`. Here `$ENVIRONMENT` is the environment variable `NODE_ENV` and `$DD_MM_YYYY` is the current date. Example: `app_development_01_01_2023.logs.json`.

The log file for network errors would go by the following naming convention: `network_$ENVIRONMENT_$DD_MM_YYYY.logs.json`. Here `$ENVIRONMENT` is the environment variable `NODE_ENV` and `$DD_MM_YYYY` is the current date. Example: `network_development_01_01_2023.logs.json`.

These log files are created only when a request is made to the server. If no request is made, then no log file is created.

**PS: The log files are created in the UTC timezone.**
In the remote server, the log file is created at `5:30 AM IST` and in the local server, the log file is created at `12:00 AM IST`.

### Verifying Origin

For every request, there should be a `x-custom-header` in the request header. The `x-custom-header` is encrypted using the `ENCRYPTION_KEY` and the encrypted string is sent in the `x-custom-header` header. The server decrypts the `x-custom-header` using the `ENCRYPTION_KEY` and verifies the origin of the request.

This is done to prevent any malicious requests from being made to the server.

The decrypted header is of the form: `origin::timestamp::randomString`. Here `origin` is the origin of the request, `timestamp` is the timestamp of the request, and `randomString` is a random string of length 10.

After decrypting the header, the random string is then stored in the redis cache, so that no other request can be made with the same random string.

## Contact

If you have any questions, feel free to contact me at [adityakrishnaoff@gmail.com
](mailto:adityakrishnaoff@gmail.com) or [@adityakrishnag\_](https://shimy.in/twitter) on Twitter. -->
