# Multi-Project Issue Tracker

A serverless, distributed web application for tracking and managing issues across multiple projects.

## Features

- Create and manage multiple projects
- Add, update, and delete issues within projects
- Track issue details including description, status, and priority
- Dynamic project selection via dropdown menu
- Backend data validation to prevent duplicate project names

## Technology Stack

- Frontend: Next.js, Tailwind CSS, React Hooks
- Backend: AWS Lambda
- API: AWS API Gateway (RESTful)
- Database: AWS DynamoDB

## Architecture

This application follows a serverless, distributed architecture:

- The frontend is built with Next.js, providing a responsive and interactive user interface.
- API requests are handled through AWS API Gateway, which routes them to appropriate AWS Lambda functions.
- Lambda functions process the requests and interact with the DynamoDB database.
- DynamoDB stores all project and issue data in a scalable, NoSQL format.

## Getting Started

To run this project locally, you must first have an active AWS account. 
1. **Set up your AWS Account for using API Gateway**:
    Information to set up your local machine can be found here: 
    `https://docs.aws.amazon.com/apigateway/latest/developerguide/setting-up.html`
2. **Fork this repository**:  
    Fork the repository into your personal gitHub account to make your own changes.
3. **Clone your repository**: 
    Clone the repository to your local machine using
    ```bash
    git clone https://github.com/yourAccountName/issue-tracker.git
    ```
4. **Install dependencies**: 
    Install Node locally if you don't have it already and run
    ```bash
    npm install
    ```
5. **Run the application**:
    Run the local development server using:
    ```bash
    npm run dev
    ```
## API Endpoints

1. **Add local env file**:  
    At the root level add a .env.local file
2. **Create your API endpoint**:
    Using AWS API Gateway, create your RestAPI.  
    You can use the AWS documentation to guide yourself through: `https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html`
3. **Add API endpoint to .env.local file**:  
    Add your local API endpoint using:
    ```bashx
    NEXT_PUBLIC_API_ENDPOINT=<your API endpoint here>
    ```
4. **Create dynamoDB tables**:  
    This project uses two dynamoDB tables:  
    - issues
    - projects  
    `https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html`
5. **Configure Lambda Functions**:
    The lambda function code for the two endpoints is provided in the `app/lamdbdas` directory. 



## Future Enhancements
Adding Auth using AWS Cognito.
- Allowing users to only view projects they are a part of.
- Only authorized users can update/delete their own issues.
- Only authorized users can create new issues for projects they are assigned to. 

