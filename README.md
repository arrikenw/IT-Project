# E-FOLIO:

## Table of Contents
-  #### Introduction
    - Motivation for E-FOLIO
    - Demo 
- #### Set up
  - Installing Packages 
  - Backend .env Files
- #### System Reqirements
- #### Running
- #### Style Guide
  - Code Style
  - Console Logging
  - API Responses
  - GitHub
  - Documentation
- #### API Documentation
 - Users
 - Media
 - Post
 - Comments
- #### Test Cases
  


## Introduction
E-folio is a web-based digital portfolio system. It allows users to post work that they hope to share with the world. Users can explore and search the posts of others and leave feedback and likes.

The system is composed of:
- A backend server that uses node.js with express middleware
- A react.js frontend that makes use of MaterialUI for styling
- A mongoDB database
- An Amazon S3 Bucket file server 

### Motivation for E-FOLIO 
Documentation on the core vision of our system can be found in our [/docs directory](/docs).

The  `/docs ` directory includes the following items: 
- User Stories 
- Personas
- Motivational Model 
- Class Diagram
- Architecture Diagram 

### Demo
A hosted demo of the project can be found [here](https://efolio.herokuapp.com/).

We have provided a demo account so that you can see a fully fleshed out account. However, feel free to create new user accounts and posts. 

Demo credentials
- Email: _______
- Password: _______

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

## Costs and licencing considerations
- Our system makes use of PDFTRON's node.js PDF libraries. To use these libraries commercially, a licencing fee must be paid.
A licence can be obtained at https://www.pdftron.com/licensing/.

- Our system is currently using the free-tier of AWS. Once in production, the system will need to be linked to a new amazon account and S3 bucket, and relevant usage fees will need to be paid. 
Pricing information can be found at https://aws.amazon.com/pricing/. 

- Our system currently makes use of a cloud hosted mongoDB server. If an externally hosted server will also be used in production, usage fees will apply.
 Pricing information can be found at https://www.mongodb.com/pricing.


## Backend Architecture
### General design

Our system's backend uses node.js with express middleware. The system is composed of the following key components:
- An index router that passes requests down to sub-routers. The router is located at ```/routes/index.js```.
- Sub-routers that authenticate the user and call controller functions. These routers are located in ```/routes```.
- A collection of controllers associated with comments, media, posts, and users. These controllers are located in ```/controllers```.
- A collection of Mongoose models and basic database connection logic. Models and DB logic are located in ```/models```.

We provide a more in-depth review of our authentication process and controller functionality below.

### Unconventional algorithms

Our post search performs a regex string search across post content and tags. This has a complexity of O(n), where n is the length of the entire corpus of our site. WE DOOMED, WHAT AN ALGORITHM!!!

### User authentication
Our system uses bearer tokens to authenticate requests. To ensure the security of user accounts, we have given the tokens a 6 hour expiry timer, preventing them for being reused by bad actors who gain access to a user's computer or token.


For all requests made to routes that require authentication, our middleware extracts and validates the authorization token provided in the request. There are three possible outcomes to this validation.

- If the token is valid, user information is injected into the request before it is passed to our controllers.
This user information can be accessed in a controller through ```req.user```, which contains the user's id and other data.

- If the token is invalid or expired, the server will respond with status code 403 and the message ```Forbidden```.

- If the token is not provided, the server will respond with status code 401 and the message ```Unauthorized```


Note that some routes do not require authentication, for example those that handle the service of posts with public visibility.

### Media controller (```/api/media```)

The media route is used for all requests that deal with the uploading, fetching, updating, or deletion of media files. All requests to this route are handled by the controller located at ```/controllers/media.js```.

#### Handling of special file types

Due to the limited support for web-display of microsoft ```.docx```, ```.xlsx```, and ```.pptx``` files, our media controller converts these files to ```.pdf``` form to allow them to be simply displayed in our frontend. 

When a request is made to our ```/api/media/add``` route, the controller identifies microsoft file formats and converts them to ```.pdf``` form. 
The converted files are stored in our s3 bucket, and our database stores metadata that reflects the details of the converted file.


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

### Users (```/api/user```)

The user route is used for all requests that need to modify, delete, or create user accounts. All requests to this route are handled by the controller located at ```/controllers/user.js```.

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
    
#### Add to pinned posts
###### Adds a post to the user's pinned post list
Request to: `/api/user/addToPinnedPosts` as a `POST` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON in the body, requiring the key-value pairs:
```JSON
{
    "postID": "<postID>"
}
```
Requirements:
- Authorization header is required
- Authentication token must a valid token
- A valid postID must be provided

Responses:
- On success: 
  - the response will have status code of "200" and will have the ID of the pinned post
  - ```JSON
    {
        "id": "<postID>"
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
    "Pinning the post was not successful - <reasonForError>"
    ```
    
#### Remove from pinned posts
###### Removes a post from the user's pinned post list
Request to: `/api/user/removeFromPinnedPosts` as a `POST` request

Takes: an authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```
and a JSON in the body, requiring the key-value pairs:
```JSON
{
    "postID": "<postID>"
}
```
Requirements:
- Authorization header is required
- Authentication token must a valid token
- A valid postID must be provided

Responses:
- On success: 
  - the response will have status code of "200" and will have the ID of the unpinned post
  - ```JSON
    {
        "id": "<postID>"
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
    "Pinning the post was not successful - <reasonForError>"
    
### Posts (```/api/post```)

The post route is used for all requests that create, edit, fetch, delete, like, or mutate posts. All requests to this route are handled by the controller located at ```/controllers/post.js```.

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
    
### Comments (```/api/comment```)

The comment route is used for all requests that create, delete, or like comments. All requests to this route are handled by the controller located at ```/controllers/comment.js```.

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

## Style Guide
### Code Style
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

### Documentation:
- code must have relevant comments explaining what blocks do
- API routes should be updated into this read me with all details included

## Tests Case
Test cases can be found in the `/test` directory. The directory can be accessed [here](/test).


[## Introduction]: https://github.com/arrikenw/IT-Project#introduction-1

[/docs]: /docs

[### Motivation for E-FOLIO]: /docs

[## Set Up]: /docs

[## Set Up]: /setup

[##-set-up]: ##-set-up