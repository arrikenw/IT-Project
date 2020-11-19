# E-FOLIO:

## Table of Contents

* [Introduction](#introduction)
    - Motivation for E-FOLIO
    - Demo 
* [Set Up](#set-up)
* [System Requirements](#system-requirements)
* [Running](#running)
* [Deployment](#deployment)
* [Style Guide](style-guide)
  - Code Style
  - Console Logging
  - API Responses
  - GitHub
  - Documentation
- [Features](#features)
- [API Documentation](#API-documentation)
  - Users
  - Midia
  - Post
  - comments
- [Tests Case](#Test-Case)

  

## Introduction

The problem that we as a software development team have answered is to construct a digital portfolio system primarily for students to 
display their work, but could be used by anyone as a digital portfolio. The concept is essentially for a user to be able to showcase
work that they are proud of on a digital platform. In the case of students the platform they also have to be able to reflect on their 
work and be able to submit assessable work. This means a balance between the privacy (to ensure no plagiarism) and display work they are 
proud of.  For this digital portfolio system to be compatible with many fields it must accept many file types. And finally allow the user
to reflect on their work so that they may develop.  
 
As an answer to this problem Podoju has developed the “E-FOLIO”, and is a web based digital portfolio system. E-FOLIO, allows users to 
‘post’ work that they wish to showcase to their profile, share their profile with others.  This project was created by the Podoju was 
consists of a backend server using node.js, Express and Mongoose;a frontend written using html, css, node.js, react.js, and Material UI;
a database using mongoDB, and a file server using AWS S3 Bucket. 

### Motivation for E-FOLIO 
E-Foilio as the response to the problem was motivated by the idea that this platform should be able to be used by anyone who wanted
to show case their work, but is primarily for the academic arena. In order to grasp the differnt user types we made personas. 


[Vision Documentation](/docs)

This folder, `/docs `, includes: 
- Personas
     - Building a range of personas help as understand the users needs, behaviours, goals and experiences. Four Sets of uses were
      identified, the undergraduate student, the post graduate student, the lecturer, and industry representatives.  
- Motivational Model
     - We used a Motivational Model to represent the requirement of this project.  Motivational Models are created using the DO-BE-FEEL 
     method of questioning in meetings with the client.  What should the system DO? What should the system BE? How should the user FEEl? 
     These answers are then mapped to a diagram, the parallelograms are the "DO", the cloud is the "BE", and the heart is the "FEEL". 

![motivationalModel](/docs/motivationalModel.pdf)

- User Stories
    - The user stories created to help define the features fo this project were drived form the motivational model and the personas. There
     are general user stories for all types of users, but there are also specific user stories that answer the needs of that specific user 
     group.
- Class Diagram 
    - How the pages in the frontend interact is demonstrated in this diagram. 

![classDiagram](/docs/Class%20Diagram.pdf)
- Architecture Diagram 
    - The system implemented for this project has a frontend; which is responsible for the user interface, a backend server; which handles 
    requests from the frontend; and finally a database which provides the necessary data to the backend server. 

![archectureDiagram](/docs/Architecture%20Diagram.pdf)
### Demo
Bellow is a link to a demo the hosted project: 
[https://efolio.herokuapp.com/](https://efolio.herokuapp.com/)


### Demo
A hosted demo of the project can be found [here](https://efolio.herokuapp.com/).

We have provided a demo account so that you can see a fully fleshed out account. However, feel free to create new user accounts and posts. 

Demo credentials
- Email: _______
- Password: _______

## Set Up
#### Installing Packages
To install the required Node.js packages, run the command `npm install` in both the root directory and in the `/client` directory of this repository. In order to use the npm, ensure Node.js is installed. 

#### Creating MongoDB Database
Efolio uses a database maintained by MongoDB to store and retreive the websites data. These instructions are for using MongoDB's cloud hosted database. However, a locally hosted MongoDB server can be used [instead](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/).

To create a database to use with Efolio, first make an account and create a cluster  with their [website](https://www.mongodb.com/). The currently deployed version of Efolio uses the free tier of MongoDB. 

Once the cluster has been made, navigate to "Network Access" under "Security" on the right side menu. Within this tab, the IP address of Efolio server can be whitelisted to allow the backend server to access the MongoDB database. An IP address of 0.0.0.0 can also be added to whitelist all IP addresses.

<p align="center">
  <img src="images/mongo_db_ip_address.png"  width="1000" >
</p>

Next, navigate to the "Database Access" tab and create a new database user. Ensure the authentication method is password and the user is given both read and write privileges. The username and password created here will be used by the backend server to access the MongoDB database.

<p align="center">
  <img src="images/mongo_db_new_user.png"  width="1000" >
</p>


#### Creating AWS S3 Bucket
Efolio uses an AWS S3 Bucket to store user's uploaded files, such as images, videos and other documents. In the currently deployed version, a free S3 Bucket is used with limited monthly requests.

 To create a AWS S3 Bucket, first create an AWS account [here](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=default&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).  Next navigate to the service called "S3". This can be done by simply searching for "S3" in the Find Services search box.
 
 <p align="center">
  <img src="images/aws_bucket_search.png"  width="1000" >
</p>

Select the orange "Create bucket" icon and create the S3 bucket. Ensure the Bucket name is recorded as it will be later. Do not change any other settings for the S3 Bucket.

 <p align="center">
  <img src="images/aws_bucket_creation.png"  width="1000" >
</p>

Finally, navigate to your username at the top right and select "My Security Credentials" from the drop down menu. Open the "Access keys (access key ID and secret access key)" menu and pree the "Create New Access Key" icon. Record the newly created Access Key ID and Secret Key.

 <p align="center">
  <img src="images/aws_key_creation.png"  width="1000" >
</p>


#### Backend .env Files
The backend server requires the two `.env` files `.env.development` and `.env.test` to be created at the root of the repository in order for the development and testing environments to function.
The `.env` files should include the listed variables with the correct values for each.
```dotenv
PORT = <portForBackEndServer>
MONGO_USERNAME = <userNameForMongoDBConnection>
MONGO_USERNAME = <passwordForMongoDBConnection>
DB_NAME = <nameOfDataBase>
SECRET = <secretUsedToCreateAuthTokens>
AWS_ACCESS_KEY_ID = <accessKeyForAWSBucket>
AWS_SECRET_ACCESS_KEY = <secretAcessKeyForAWSBucket>
AWS_BUCKET_NAME = <AWSBucketName>
```
Attributes:
- <b>\<portForBackEndServer></b> should the port which the backend server should run on.
- <b>\<userNameForMongoDBConnection></b> should be the username of the created mongoDB user made earlier.
- <b>\<passwordForMongoDBConnection></b> should be the password of the created mongoDB user made earlier.
- <b>\<nameOfDataBase></b> should be a name for the MongoDB Collection used by the backend server. For initial set up, any server name can be chosen as a new Collection will made if supplied name does not exist. The Collection name should differ between the two `.env` files `.env.development` and `.env.test`to ensure the tests are not run on the development Collection.
- <b>\<secretUsedToCreateAuthTokens></b> Should be a long random string with which access tokens can be securely generated from. The secret currently used in deployment is 138 characters long.
- <b>\<accessKeyForAWSBucket></b> Should be the Access Key ID created earlier when setting up the AWS S3 Bucket.
- <b>\<secretAcessKeyForAWSBucket></b> Should be the Secret Key created earlier when setting up the AWS S3 Bucket.
- <b>\<AWSBucketName></b> Should be the Bucket name created earlier when setting up the AWS S3 Bucket.

#### GitHub Actions Continuous Integration
Continuous Inegration testing allows the code to automatically tested whenever a new pull request to the Master branch is made. The GitHub action can be found within the `.github` directory and the testing is done the package Jest. 

To set up the continuous integration testing, the attributes from the `.env.test` file made prior must be replicated within the GitHub secrets of the repository. Navigate to the repository settings and click onto he "Secrets" tab. Enter the `.env.test` attributes with the same key and value pairs.

 <p align="center">
  <img src="images/github_actions.png"  width="1000" >
</p>

## System Requirements
This system requires: 
- Mongo DB server
	- can be hosted locally or on the cloud
- Node.js
	- version 12.x^
	- key  packages used
		- Express
		- Mongoose
		- Jest
		- React
		- Material UI
- AWS S3 Bucket

## Running

#### Development Backend Server
To run the backend server in development mode, run the command `node server.js` with the environmental variable "NODE_ENV" set to "development". This can be done on Linux with the command `NODE_ENV=development node ./server.js`. To do this Windows, run either `SET NODE_ENV=development&node server.js` or the script `npm run start`. These commands should be run within the root directory of the repository.

#### Development Frontend Server
To run a server for frontend development, run the command `react-scripts start` or the script `npm run start` in the `/client` directory of the repository. The front end server will automatically request to the backend server for a simple development process.

#### Backend Testing
To run the tests for the backend code,  run the command `npm run test` in the root directory of the repository. This will run all of the integration tests created for the backend and display which tests succeed and which failed. These tests are run on the test MongoDB collection as it uses the `.env.test` file created earlier. To ensure no race conditions affect testing, do not run multiple tests at the same time, including the GitHub continuous integration testing.

#### Code Linting
Eslint was used in the creation of Efolio, and ensure consistency within the code. To run Eslint on the project, run the command `npm run lint` in the root directory of the repository.

## Deployment
Efolio is current deployed with Heroku [here](https://efolio.herokuapp.com/). Deployment can be done locally or using a hosting service such as Heroku. 

#### Local Deployment
To deploy locally, run the command `npm run build` in the `/client` directory to create a build of the frontend. Next run the backend server with the the environmental variable "NODE_ENV" set to "production" as well as the other environmental variable specified in the `.env` files. Ensure this is done the in root of the repository.

Demo Commands:
- For Linux:
	- `NODE_ENV=production PORT=<port> MONGO_USERNAME=<username> MONGO_USERNAME=<password> DB_NAME=<dbname> SECRET=<secret> AWS_ACCESS_KEY_ID=<accesskey> AWS_SECRET_ACCESS_KEY=<secretkey>
AWS_BUCKET_NAME=<bucketname> node ./server.js`
- For Windows:
	- `SET "NODE_ENV=production" & SET "PORT=<port>" & SET "MONGO_USERNAME=<username>" & SET "MONGO_USERNAME=<password>" & SET "DB_NAME=<dbname>" & SET "SECRET=<secret>" & SET "AWS_ACCESS_KEY_ID=<accesskey>" & SET "AWS_SECRET_ACCESS_KEY=<secretkey>" & SET
"AWS_BUCKET_NAME=<bucketname>" & node ./server.js`

#### Remote Deployment
The process for remote deployment is same to local deployment. Repeat the above process on the chosen remoting hosting solution. The rest of this guide will foucs of deployment on Heroku, which the project was streamlined for.

#### Heroku Deployment
Create an Heroku account [here](https://www.heroku.com/) and create a new app. Within the app, select the "Deploy" tab and choose "GitHub" under "Deployment Method" and connect the repository to the app. Alternate deployment methods can be used as well.  

 <p align="center">
  <img src="images/heroku_select_repo.png"  width="1000" >
</p>

Navigate to the "Settings" tab and select the "Reveal Config Vars" icon. Within here, add the key value pairs specified in the `.env` files to the Heroku app. Ensure the key value pair: `NODE_ENV` and `production` is also included.

 <p align="center">
  <img src="images/heroku_add_vars.png"  width="1000" >
</p>

Navigate back to the "Deploy" tab and select the branch to be deployed under "Manual Deploy" and select "Deploy Branch". Automatic deploys can be also be enabled if desired. This should deploy the Efolio project to the link `<appname>.herokuapp.com`. The creation of the build of the frontend is handled by the script `heroku-postbuild` which can be found in the file `./package.json`.

## Database
#### Database description
Our database stores account data, comments, media file metadata, and posts created by users. 
File storage for uploaded media is not handled by our database – instead, the files are stored in an AWS S3 bucket and their key stored in our database. 
Our fields have basic validation on length and content, and custom validation is used to ensure that emails used by accounts have a valid format.
#### Technology rationale
We selected MongoDB as our database for a handful of reasons:
- The document-store / schemaless approach allowed us to quickly iterate on our design
- Our team was familiar with mongoDB and had previously used it to build other systems  
- Our data was well suited to a “document” style  – many fields are _____ FILL IN HERE____________

#### Document description
##### Media
The media document type is used to store media metadata. The id of the media file is used as a key for the media content stored in our S3 bucket. 

The document stores:
- A general "content category"
- The MIME-type and extension of the file
- Privacy settings

The document also stores the following references:
- The id of the <b>user</b> who uploaded the media file
##### Posts
The post document is used to represent the user-produced content that our e-folio system displays. 

The document stores:
- Privacy settings
- A tile and description
- Tags and a general "content category"
- A list of <b>Comment</b> documents representing the comments made on a post 

The document also stores the following references:
- The ids of the <b>media</b> documents that contain the thumbnails and files used in the post
- The id of the <b>user</b> who created the post
- An array of <b>user</b> ids that represent the users permitted to access a private post
##### User
The user document represents the users of our website.

The document stores:
- Privacy settings
- Contact details
- Biographical data
- Username and a hashed password

The document also stores the following references:
- The id of a <b>media</b> document that contains the profile picture of the user.

##### Comment
The comment document is used to store data about comments made on user posts.

The document stores:
- The comment body
- Timestamps and other dating information

The document also stores the following references
- The ids of the <b>users</b> who have liked the post
- The id of the <b>user</b> who posted the comment

##### Diagram
We have provided a "crows-foot" diagram of the relations between documents used in our database. Note that the S3 bucket included in the diagram is <b>NOT</b> part of our database.
<img src="/images/db.png"/> 

#### CI/CD Pipeline
We have built a simple CI/CD pipeline to improve code quality and assist in the deployment of updates. 
Tests triggered on merge requests to master must pass before code can be merged, and once merged, the updated master branch will be automatically deployed.
We provide a brief sketch of the role of the CI/CD pipeline in the development cycle below.
##### Development lifecycle 
1. Create feature branch
2. Write new code, test locally
3. Make pull request
4. \[CI\] Integration tests are automatically run using Github actions
    - If tests fail, the merge cannot be completed. Return to step 2
    - If tests pass, proceed to step 5
5. Review and approve merge, pull onto master
6. \[CD\] Merge onto master triggers an automatic deployment to Heroku using Github actions
7. Heroku will install relevant packages and start the server. The site is now deployed  and reflects the latest changes from master

## Costs and licencing considerations
- Our system makes use of PDFTRON's node.js PDF libraries. To use these libraries comercially, a licencing fee must be paid.
A licence can be obtained at https://www.pdftron.com/licensing/.

- Our system is currently using the free-tier of AWS. Once in production, the system will need to be linked to a new amazon account and S3 bucket, and relevant usage fees will need to be paid. Pricing information can be found at https://aws.amazon.com/pricing/. 

- Our system currently makes use of a cloud hosted mongoDB server. If an externally hosted server will also be used in production, usage fees will apply. Pricing information can be found at https://www.mongodb.com/pricing.



## Style Guide
### Code Style
- #### Use arrow functions when possible:
  - may not be possible in all scenarios
  - wrong:
  - ```javascript
    function myFunc(param) {};
    const myFunc = function(param) {};
    ```
  - right:
  - ```javascript
    const myFunc = (param) => {};
    ```
- #### Arrow functions with one parameter should have brackets:
    - wrong:
    - ```javascript
      const myFunc = param => {};
      ```
    - right:
    - ```javascript
      const myFunc = (param) => {};
      ```
- #### Use promises over callbacks when possible:
  - may not be possible in all scenarios
  - wrong:
  - ```javascript
    synchronousFunc(param, (err, result) => {});
    ```
  - right:
  - ```javascript
    synchronousFunc(param).then(result).catch(err);
- #### Indentation is done with two spaces
  - tabs are not used
  - wrong:
  - ```javascript
    if (boolean) {    
        console.log("no tabs");
    };
    ```
  - right:
  - ```javascript
    if (boolean) {    
      console.log("two spaces for indentation");
    };
    ```
- #### Camel case is used for variable and function names
  - wrong:
  - ```javascript
    const myvariablename = 5;
    const my_variable_name = 5;
    
    const myfuncname = (param) => {};
    const my_func_name = (param) => {};
    ```
  - right:
  - ```javascript
    const myVariableName = 5;
    
    const myFuncName = (param) => {};
    ```
- #### Callbacks must be declared individually
  - required to avoid "callback hell"
  - wrong:
  - ```javascript
    synchronousFunc(param, (err, result) => {});
    ```
  - right:
  - ```javascript
    const callBack = (err, result) => {};
    
    synchronousFunc(param, callBack);
    ```
- #### When possible, Australian English spelling is used
  - May not be possible for specific packages
  - wrong:
  - ```javascript
    const bestColor = "#4132";
    ```
  - right:
  - ```javascript
    const bestColour = "#4132";
    ```
- #### Spaces after double slash for comments
  - wrong:
  - ```javascript
    //This is a function
    const myFunc = () => {};
    ```
  - right:
  - ```javascript
    // This is a function
    const myFunc = () => {};
    ```
- #### Use FIXME and TODO to annoate
  - wrong:
  - ```javascript
    // this needs to be fixed
    const brokenFunc = () => {};
    
    // need to add error handling
    ```
  - right:
  - ```javascript
    // FIXME brokenFunc does not work
        const brokenFunc = () => {};
        
    // TODO need to add error handling
    ```
- We are currently using a modified version of airbnb's style guide. Read more about it 
[here](https://medium.com/docon/airbnb-javascript-style-guide-key-takeaways-ffd0370c053) and 
[here](https://airbnb.io/javascript/).
### Console Logs
- console logs should be done should be done before every `res.send()` is done in the backend
    - console logs should have the structure: `"<Func> (not) successful - <reasonOrInformation"`
- there should be no console logs in the frontend code and should be present in development
- console log should always be informative:
    - wrong:
    - ```javascript
      console.log("testing");
      ```
    - right:
    - ```javascript
      console.log("successfully trimmed firstName from user input");
      ```
### API Responses
- in a successful response, the error code should be in the form of "2XX" and be a JSON with
relevant data:
    - wrong:
    - ```javascript
      res.status(300);
      res.send("Successful request!");
      ```
    - right:
    - ```javascript
      res.status(201)
      res.send({ id: userID, email: user.email });
      ```
- in an unsuccessful response, the error code should be in the form of not "2XX" and be 
a string with the correct form:
    - the correct form is of `"<request> not successful - <reasonOrError>"`
    - the response string should be in a form that can be directly shown to a front end user
    - status codes in the form "4XX" are used for user error
    - status codes in the form "5XX" are used for server error
    - wrong:
    - ```javascript
      res.status(500);
      res.send("formidable.parse parse error");
      
      
      res.status(400);
      res.send("updateUser not successful - mongoose error: duplicate key: { email }");
      ```
    - right:
    - ```javascript
      res.status(400);
      res.send("Update user not successful - an account with that email already exists");
      
      res.status(500);
      res.send("File upload not successful - something went wrong, try again");
      ```
 
### Git Hub:
- Branches should be named `<developerName>/<featureName>`:
    - wrong:
    - ```
      benBranch
      
      loginPage
      ```
    - right:
    - ```
      ben/login-page
      ```
- before a pull request is made, the code **must have passed all the tests**, including new tests
made for the new functionality
- **all new code _must_ have tests created as new functionality is created**
- a pull request **must be reviewed by another** before being approved
- when a pull request is made, the relevant trello post is **moved into review**
- when a pull request is approved, the relevant trello post is **moved into done**
### Documentation:
- code must have relevant comments explaining what blocks do
- API routes should be updated into this read me with all details included

## Features




## API Documentation
Here is the needed documentation of the APIs used by the frontend to request to the backend.
### Users
#### Add User 
###### Creates a new user in the database and returns the user's ID
Request to: `/api/user/add` as a `POST` request

Takes: a JSON in the body, requiring the key-value pairs:
```JSON
{
   "email": "<userEmail>",
   "password": "<userPassword>",
   "firstName": "<userFirstName>",
   "lastName": "<userLastName>",
   "userName": "<userUserName>"
}
```
JSON can also include the optional key-value pairs:
```JSON
{
   "organisation": "<userOrganisation>",
   "professionalFields": ["<fieldOne>", "<fieldTwo>", "<...>"],
   "dateOfBirth": "<userDateOfBirth>",
   "phoneNumber": "<userPhoneNumber>",
   "biography": "<userBiography>",
   "tags": ["<tagOne>", "<tagTwo>"],
   "private": "boolean",
   "phoneNumberPrivate": "boolean",
   "emailPrivate": "boolean",
   "profilePic": "<mediaID>"
}
```
Requirements:
- No headers required
- password must be greater than 8 characters
- password must be less than 80 characters
- email must be a valid email with an "@" and a domain
- email must be unique in the database
- userName must be unique in the database

Responses:
- On success: 
  - the response will have status code of "201" and will have the new user's id
  - ```JSON
    {
       "id": "<userID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Sign up not successful - <reasonForError>"
    ```

#### Login User
###### Generates and returns an authentication token for a given valid user
Request to: `/api/user/login` as a `POST` request

Takes: a JSON in the body, requiring the key-value pairs:
```JSON
{
    "email": "<userEmail>",
    "password": "<userPassword>"
}
```
Requirements:
- No headers required
- email must belong to a user currently in the database
- password must match the password for the specified user email
Responses:
- On success: 
  - the response will have status code of "200" and will have the generated authentication token
  - ```JSON
    {
        "token": "<authenticationToken>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Login in not successful - <reasonForError>"
    ```
#### Get User
###### Returns a user's details from a valid authentication token
Request to: `/api/user/get` as a `GET` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
Requirements:
- Authorization header is required
- Authentication token must a valid token

Responses:
- On success: 
  - the response will have status code of "200" and will the user's details
  - ```JSON
    {
        "_id": "<userID>",
        "professionalFields": ["<fieldOne>", "<fieldTwo>", "<...>"],
        "role": "<userRole>",
        "email": "<userEmail>",
        "firstName": "<userFirstName>",
        "lastName": "<userLastName>",
        "userName": "<userUserName>"
    }
    ```
- on unauthorized:
  - the response will have status code "401" which represents a missing authentication token
- on forbidden:
  - the response will have status code "403" which represents an invalid authentication token
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Get user not successful - <reasonForError>"
    ```
#### Get Public User
###### Returns a list user's public details from a list user IDs
Request to: `/api/user/getPublic` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and an optional JSON body, which can include the optional key-value pair:
```JSON
{
   "search": "<searchString>",
   "filters": {
       "filterFieldOne": "<filterValueOne>",
       "filterFieldTwo": "<filterValueTwo>"
   },
   "IDMatch": ["<postIDOne>", "<postIDTwo>"],
   "limit": "<numberOfPosts>",
   "skip": "<numberOfPostsToSkip>",
   "sortField": "<fieldToSortBy>",
   "sortDirection": "<directionOfSort>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- filters is a JSON of key value pairs that the posts must have
- IDMatch is a list of IDs that a post much match atleast one of
- limit is the amount of users which should be returned
- skip is the amount  of users which should be skipped 
- sortField is a valid field from posts to which the result should be sorted by
- sortDirection is either "asc" or "desc"
Responses:
- On success: 
  - the response will have status code of "200" and will have a list of the users' public details
  - ```JSON
    [
           {
                "_id": "<userOneID>",
                "professionalFields": ["<fieldOneOne>", "<fieldOneTwo>", "<...>"],
                "role": "<userOneRole>",
                "firstName": "<userOneFirstName>",
                "lastName": "<userOneLastName>",
                "userName": "<userOneUserName>"
           },
           {
                "_id": "<userTwoID>",
                "professionalFields": ["<fieldTwoOne>", "<fieldTwoTwo>", "<...>"],
                "role": "<userTwoRole>",
                "firstName": "<userTwoFirstName>",
                "lastName": "<userTwoLastName>",
                "userName": "<userTwoUserName>"
           },
           "..."
    ]
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Get public user not successful - <reasonForError>"
    ```
#### Update User
###### Updates a user's detail from an update, a password and an authentication token
Request to: `/api/user/update` as a `POST` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON in the body, requiring the key-value pairs:
```JSON
{
    "update": {
            "firstName": "<updatedUserFirstName>",
            "email": "<updatedUserEmail>",
            "<updateKey>": "<updateValue>"
    },
    "password": "<userPassword>"
}
```
Requirements:
- Authorization header is required
- Authentication token must a valid token
- Update JSON can include, but does not have any of the keys:
  - email (must be a valid, unique email)
  - firstName
  - lastName
  - userName (must be unique)
  - password
  - organisation
  - bio
  - professionalFields
  - DOB
  - phone
- Password must match the user for the given authentication token 

Responses:
- On success: 
  - the response will have status code of "200" and will have the updated user's id
  - ```JSON
    {
        "id": "<userID>"
    }
    ```
- on unauthorized:
  - the response will have status code "401" which represents a missing authentication token
- on forbidden:
  - the response will have status code "403" which represents an invalid authentication token
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Update user not successful - <reasonForError>"
    ```
#### Delete User
###### Deletes a user from a password and an authentication token
Request to: `/api/user/delete` as a `POST` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON in the body, requiring the key-value pairs:
```JSON
{
    "password": "<userPassword>"
}
```
Requirements:
- Authorization header is required
- Authentication token must a valid token
- Password must match the user for the given authentication token

Responses:
- On success: 
  - the response will have status code of "200" and will have the deleted user's id
  - ```JSON
    {
        "id": "<userID>"
    }
    ```
- on unauthorized:
  - the response will have status code "401" which represents a missing authentication token
- on forbidden:
  - the response will have status code "403" which represents an invalid authentication token
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Delete user not successful - <reasonForError>"
    ```

### Media
#### Add media 
###### Creates a new media document in the database, saves the media blob to a s3 bucket, returns the media document id
Request to: `/api/media/add` as a `POST` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```

and HTML form data containing the following fields:
```
-isPrivate: "<privacyBoolean>",
-givenFileName: "<fileDisplayName>",
-mediafile: <mediablob>"
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- file display name must be <= 20 characters
- a privacy status must be provided
- a media file must be provided
- the media file must have a size <= 100 mb

Responses:
- On success: 
  - the response will have a status code of "201" and will contain the media metadata
```JSON
{
   "_id": "<mediaID>",
   "mimeType": "<mimeType>",
   "contentCategory": "<fileCategory>",
   "extension": "<fileExtension>",
   "isPrivate": "<privacyBoolean>",
   "canAccess": ["<UserOneID>", "<UserTwoID>", "<...>"],
   "creator": "<creatorUserID",
   "givenFileName": "<mediaDisplayName>"
}
```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Media upload failed - <reasonForError>"
    ```


#### Get media 
###### Retrieves media
Request to: `/api/media/` as a `GET` request

Takes: an Authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON request body containing the following key-value pair:
```JSON
{
   "mediaID": "<mediaDocumentID>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- MediaID must be a valid document id

Responses:
- On success: 
  - the response will have a status code of "200" and will contain base64 encoding of the media file in the following format
```JSON
{
   "b64media": "<base64 encoding of file>"
}
```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Media retrieval failed - <reasonForError>"
    ```

#### Delete media 
###### Deletes file from s3 bucket and removes media metadata from database
Request to: `/api/media/delete` as a `POST` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```

and HTML form data containing the following fields:
```JSON
{
   "mediaID": "<mediaDocumentID>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- Provided media ID must be valid

Responses:
- On success: 
  - The response will have a status code of "200" and will contain the following message:
   "Media deletion success - deleted <"deletedMediaID">"
   
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Media deletion failed - <reasonForError>"
    ```

#### Update media 
###### Updates the privacy and display metadata for a media file
Request to: `/api/media/update` as a `POST` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```

and HTML form data containing the following fields:
```JSON
{
   "isPrivate": "<mediaDocumentID>",
   "canAccess": "[<userID1>, <userID2>, ... <userIDn>]",
   "givenFileName": "<fileName>"
}
```
Requirements:
- Authentication token must be associated with the original creator of the media file
- Authentication token must be a valid token
- Provided media ID must be valid
- isPrivate, canAccess, and givenFileName must be provided 

Responses:
- On success: 
  - The response will have a status code of "201" and will contain the following message:
   "Media update success - updated <updatedMediaId>"

- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Media update failed - <reasonForError>"
    ```

## Posts
#### Get Post 
###### Gets a lists of post from the database and which match the search requirements, must be public posts or belong to the searching user
Request to: `/api/post/get` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and an optional JSON body, which can include the optional key-value pair:
```JSON
{
   "search": "<searchString>",
   "filters": {
       "filterFieldOne": "<filterValueOne>",
       "filterFieldTwo": "<filterValueTwo>"
   },
   "IDMatch": ["<postIDOne>", "<postIDTwo>"],
   "limit": "<numberOfPosts>",
   "skip": "<numberOfPostsToSkip>",
   "sortField": "<fieldToSortBy>",
   "sortDirection": "<directionOfSort>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- filters is a JSON of key value pairs that the posts must have
- IDMatch is a list of IDs that a post much match atleast one of
- limit is the amount of posts which should be returned
- skip is the amount  of posts which should be skipped 
- sortField is a valid field from posts to which the result should be sorted by
- sortDirection is either "asc" or "desc"

Responses:
- On success: 
  - the response will have status code of "200" and will have an array of the matching posts
  - ```JSON
    [
        {
            "likedBy": ["<userID>", "<userID2>"],
            "private": "<trueOrFalse>",
            "id_": "<firstPostID>",
            "title": "<postTitle>",
            "userID":  "<createdByUserID>",
            "description": "<postDescription>",
            "comments": [
                {
                    "likeBy": ["<userID2>"],
                    "userID": "<createdByUserID>",
                    "comment": "<commentBody>",
                    "updatedAt": "<lastUpdatedDateTime>",
                    "createdAt": "<createdAtDateTime>"
                }
            ],
            "updatedAt": "<lastUpdatedDateTime>",
            "createdAt": "<createdAtDateTime>"
        }
    ]
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Get post not successful - <reasonForError>"
    ```

#### Add Post 
###### Creates a new post with the given values for a logged in user
Request to: `/api/post/add` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body:
```JSON
{
   "title": "<postTitle>",
   "mediaID": "<postMediaID>"
}
```
JSON can also include the optional key-value pairs:
```JSON
{
   "description": "<postDescription>",
   "private": "<boolean>",
   "thumbnailURL": "<thumbNailURLL>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- mediaID and thumbnailURL must be valid IDs from the media database
Responses:
- On success: 
  - the response will have status code of "201" and will have an json of the new post ID
  - ```JSON
    {
        "id": "<newPostID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Add post not successful - <reasonForError>"
    ```
 
#### Add Post 
###### Creates a new post in the database and returns the posts's ID
Request to: `/api/post/add` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON in the body, requiring the key-value pairs:
```JSON
{
   "title": "<postTitle>",
   "description": "<postDescription>"
}
```
JSON can also include the optional key-value pair:
```JSON
{
   "private": "<boolean>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- private must be a boolean: true or false

Responses:
- On success: 
  - the response will have status code of "201" and will have the new post's id
  - ```JSON
    {
       "id": "<postID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Add post not successful - <reasonForError>"
    ```

#### Get Public Post 
###### Gets a lists of post from the database and which match the search requirements, must be public posts
Request to: `/api/post/getPublic` as a `POST` request

Takes: and a JSON body, which can include the optional key-value pair:
```JSON
{
   "search": "<searchString>",
   "filters": {
       "filterFieldOne": "<filterValueOne>",
       "filterFieldTwo": "<filterValueTwo>"
   },
   "limit": "<numberOfPosts>",
   "skip": "<numberOfPostsToSkip>",
   "sortField": "<fieldToSortBy>",
   "sortDirection": "<directionOfSort>"
}
```
Requirements:
- filters is a JSON of key value pairs that the posts must have
- limit is the amount of posts which should be returned
- skip is the amount  of posts which should be skipped 
- sortField is a valid field from posts to which the result should be sorted by
- sortDirection is either "asc" or "desc"

Responses:
- On success: 
  - the response will have status code of "200" and will have an array of the matching posts
  - ```JSON
    [
        {
            "likedBy": ["<userID>", "<userID2>"],
            "private": "<trueOrFalse>",
            "id_": "<firstPostID>",
            "title": "<postTitle>",
            "userID":  "<createdByUserID>",
            "description": "<postDescription>",
            "comments": [
                {
                    "likeBy": ["<userID2>"],
                    "userID": "<createdByUserID>",
                    "comment": "<commentBody>",
                    "updatedAt": "<lastUpdatedDateTime>",
                    "createdAt": "<createdAtDateTime>"
                }
            ],
            "updatedAt": "<lastUpdatedDateTime>",
            "createdAt": "<createdAtDateTime>"
        }
    ]
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Get public post not successful - <reasonForError>"
    ```

#### Update Post 
###### Update a post belonging to the logged in user
Request to: `/api/post/update` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pairs:
```JSON
{
   "postID": "<updatePostID>",
   "update": {
       "postFieldOne": "<updatedPostFieldValue>",
       "postFieldTwo": "<updatedPostFieldValue>"
   }
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- the post being updated must belong to the logged in user (authorization token matches postID)

Responses:
- On success: 
  - the response will have status code of "200" and have the updated post's ID
  - ```JSON
    {
        "postID": "<updatedPostID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Update post not successful - <reasonForError>"
    ```

#### Delete Post 
###### Delete a post belonging to the logged in user
Request to: `/api/post/delete` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pair:
```JSON
{
   "postID": "<deletePostID>",
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- the post being deleted must belong to the logged in user (authorization token matches postID)

Responses:
- On success: 
  - the response will have status code of "200" and have the deleted post's ID
  - ```JSON
    {
        "postID": "<deletedPostID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Delete post not successful - <reasonForError>"
    ```

#### Like Post 
###### Likes a post for a logged in user
Request to: `/api/post/like` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pair:
```JSON
{
   "postID": "<likePostID>",
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- must be a valid postID

Responses:
- On success: 
  - the response will have status code of "200" and have the liked post's ID
  - ```JSON
    {
        "postID": "<likedPostID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Like post not successful - <reasonForError>"
    ```


#### Unlike Post 
###### Unlikes a post for a logged in user
Request to: `/api/post/unlike` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pair:
```JSON
{
   "postID": "<unlikePostID>",
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- must be a valid postID

Responses:
- On success: 
  - the response will have status code of "200" and have the unliked post's ID
  - ```JSON
    {
        "postID": "<unlikedPostID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Like post not successful - <reasonForError>"
    ```

## Comments
#### Add Comment 
###### Adds a comment to a post for a logged in user
Request to: `/api/comment/add` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pairs:
```JSON
{
   "postID": "<commentPostID>",
   "comment": "<commentBody>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- postID must belong to a valid post

Responses:
- On success: 
  - the response will have status code of "201" and will have the id of the post the comment was added to
  - ```JSON
    {
        "postID": "<commentedPostID>",
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Add comment not successful - <reasonForError>"
    ```
 
#### Update Comment 
###### Updates a comment of a post for a logged in user
Request to: `/api/comment/update` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pairs:
```JSON
{
   "postID": "<commentPostID>",
   "commentID": "<updateCommentID>",
   "comment": "<newCommentBody>"
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- postID must belong to a valid post
- commentID must belong to the logged in user

Responses:
- On success: 
  - the response will have status code of "200" and will have the id of the updated comment
  - ```JSON
    {
        "commentID": "<UpdatedCommentedID>",
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Update comment not successful - <reasonForError>"
    ```
 
#### Delete Comment 
###### Deletes a comment of a post for a logged in user
Request to: `/api/comment/delete` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pairs:
```JSON
{
   "postID": "<commentPostID>",
   "commentID": "<deleteCommentID>",
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- postID must belong to a valid post
- commentID must belong to the logged in user

Responses:
- On success: 
  - the response will have status code of "200" and will have the id of the deleted comment
  - ```JSON
    {
        "commentID": "<DeletedCommentedID>",
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Delete comment not successful - <reasonForError>"
    ```

#### Like Comment 
###### Likes a comment of a post for a logged in user
Request to: `/api/comment/like` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pair:
```JSON
{
   "postID": "<commentPostID>",
   "commentID": "<likeCommentID>",
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- must be a valid postID

Responses:
- On success: 
  - the response will have status code of "200" and have the liked comments's ID
  - ```JSON
    {
        "CommentID": "<likedCommentID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Like comment not successful - <reasonForError>"
    ```


#### Unlike Comment 
###### Unlikes a comment of a post for a logged in user
Request to: `/api/comment/unlike` as a `POST` request
Takes : an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON body, which must include key-value pair:
```JSON
{
   "postID": "<commentPostID>",
   "commentID": "<likeCommentID>",
}
```
Requirements:
- Authorization header is required
- Authentication token must be a valid token
- must be a valid postID

Responses:
- On success: 
  - the response will have status code of "200" and have the unliked comments's ID
  - ```JSON
    {
        "CommentID": "<unlikedCommentID>"
    }
    ```
- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Unlike comment not successful - <reasonForError>"
    ```

## Tests Case
Test cases can be found in the `/test` directory. The directory can be accessed [here](/test).

