# Efolio:
## Introduction
This project was created by the Podoju was consists of a backend server using node.js, Express and Mongoose;
 a frontend written using html, css, node.js and react.js; a database using mongoDB, and a file server using AWS S3 Bucket.

## Set Up
#### Installing Packages
Make sure to run "npm install" in both the root directory and in the /client directory of this repository to install
the needed packages
#### Backend .env Files
you will also need to create your ".env.development" and ".env.test" in the root directory of this repository.
These ".env" files should include the listed variables with the correct values for each.
```dotenv
PORT = <portForBackEndServer>
MONGO_USERNAME = <userNameForMMongoDBConnection>
MONGO_USERNAME = <passwordForMMongoDBConnection>
DB_NAME = <nameOfDataBase>
SECRET = <secretUsedToCreateAuthTokens>
AWS_ACCESS_KEY_ID = <accessKeyForAWSBucket>
AWS_SECRET_ACCESS_KEY = <secretAcessKeyForAWSBucket>
```
A different value should be used between the files ".env.development" and ".env.test" for the variable`DB_NAME`
 to ensure the tests are run on a different database than the development database.

## Running
To run the backend server, run the command `npm run start` in the root directory of the repository

To run the frontend server for testing, run the command `npm run start` int the `/client` directory of the repository

To run the linter for the backend code,  run the command `npm run lint` in the root directory of the repository

To run the tests for the backend code,  run the command `npm run test` in the root directory of the repository
##Style Guide
### Code Style:
- ####Use arrow functions when possible:
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
- ####Arrow functions with one parameter should not have brackets:
    - wrong:
    - ```javascript
      const myFunc = (param) => {};
      ```
    - right:
    - ```javascript
      const myFunc = param => {};
      ```
- ####Use promises over callbacks when possible:
  - may not be possible in all scenarios
  - wrong:
  - ```javascript
    synchronousFunc(param, (err, result) => {});
    ```
  - right:
  - ```javascript
    synchronousFunc(param).then(result).catch(err);
- ####Indentation is done with two spaces
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
- ####Camel case is used for variable and function names
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
- ####Callbacks must be declared individually
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
- ####When possible, Australian English spelling is used
  - May not be possible for specific packages
  - wrong:
  - ```javascript
    const bestColor = "#4132";
    ```
  - right:
  - ```javascript
    const bestColour = "#4132";
    ```
- ####Spaces after double slash for comments
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
- ####Use FIXME and TODO to annoate
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
### Console Logs:
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
### API Responses:
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
###Git Hub:
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
## API Documentation
Here is the needed documentation of the APIs used by the frontend to request to the backend.
### Users
#### Add User 
###### Creates a new user in the database and returns the user's ID
Request to: `/api/user/add` as a `POST` request

Takes a: JSON in the body, requiring the key-value pairs:
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
   "DOB": "<userDateOfBirth>",
   "phone": "<userPhoneNumber>",
   "bio": "<userBiography>"
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
######Generates and returns an authentication token for a given valid user
Request to: `/api/user/login` as a `POST` request

Takes a: JSON in the body, requiring the key-value pairs:
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
######Returns a user's details from a valid authentication token
Request to: `/api/user/get` as a `GET` request

Takes a: Authorization header with the format
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
######Returns a list user's public details from a list user IDs
Request to: `/api/user/getPublic` as a `POST` request

Takes a: JSON in the body, requiring the key-value pairs:
```JSON
{
    "ids": ["<userIDOne>", "<userIDTwo", "<...>"]
}
```
Requirements:
- No headers required
- user IDs must belong to valid users in the database

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
######Updates a user's detail from an update, a password and an authentication token
Request to: `/api/user/update` as a `POST` request

Takes a: Authorization header with the format
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
######Deletes a user from a password and an authentication token
Request to: `/api/user/delete` as a `POST` request

Takes a: Authorization header with the format
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