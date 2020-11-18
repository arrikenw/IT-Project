# E-FOLIO:

## Table of Contence
-  #### Introduction
    - Motivation for E-FOLIO
    - Demo 
- #### Set up
  - Installing Packages 
  - Backend env. Files
- #### System Reqirements
- #### Running
- #### Style Guide
  - Code Style
  - Constol Log 
  - API Responses
  - Git Hub
  - Documentation
- #### API Documentation
 - Users
 - Midia
 - Post
 - comments
- #### Tests Case
  


## Introduction
This project was created by the Podoju was consists of a backend server using node.js, Express and Mongoose;
 a frontend written using html, css, node.js, react.js, and Material UI; a database using mongoDB, and a file server using AWS S3 Bucket. 
 “E-FOLIO” is a web based digital portfolio system. E-FOLIO, allows users to ‘post’ work that they wish to showcase to their
 profile, share their profile with others.
### Motivation for E-FOLIO 
[Vision Documentation](/docs)

This folder, `/docs `, includes: 
- User Stories 
- Personas
- Motivational Model 
- Class Diagram
- Architecture Diagram 
### Demo
Bellow is a link to a demo the hosted project: 
[https://efolio.herokuapp.com/](https://efolio.herokuapp.com/)

Use the Demo login: 
- Email:
- Password:

## Set Up
#### Installing Packages
Make sure to run `npm install` in both the root directory and in the `/client` directory of this repository to install
the needed packages. Material UI is installed as a npm pakage, to save and install to the `package.json` dependencies, 
run: 
```
// with npm
npm install @material-ui/core@next @emotion/react @emotion/styled
```
#### Backend .env Files
you will also need to create your `.env.development` and `.env.test` in the root directory of this repository.
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

## System Requirements
This system requires: 

Backend
- Mongo DB ____(??version??)
- Node.js
- Expressive
- AWS Backet

Frontend
-Material UI ___ (??version)
-Node.js
-React.js

## Running
To run the backend server, run the command `npm run start` in the root directory of the repository

To run the frontend server for testing, run the command `npm run start` int the `/client` directory of the repository

To run the linter for the backend code,  run the command `npm run lint` in the root directory of the repository

To run the tests for the backend code,  run the command `npm run test` in the root directory of the repository

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
Test cases can be foun in the folder `/test`, or follow the link [Test Cases](/test).


[## Introduction]: https://github.com/arrikenw/IT-Project#introduction-1

[/docs]: /docs

[### Motivation for E-FOLIO]: /docs

[## Set Up]: /docs

[## Set Up]: /setup

[##-set-up]: ##-set-up