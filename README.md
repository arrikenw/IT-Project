This is the basic structure for connect front and backend.

Node.js with express was used for the backend and React is used for the front end

##### Installing Packages

Make sure to run "npm install" in both the root directory and in the /client directory of this repository to install
the needed packages

##### creating .env file

you will also need to create your ".env" file in the root directory and put in the lines:

"env=development"

"port=8000"

into the .env file 

##### Running the servers

use the command "npm start" in the root directory to start the backend server

user the command "npm start" in the /client directory to start the front end server

### Media
#### Add media 
###### Creates a new media document in the database, saves the media blob to a s3 bucket, returns the media document id
Request to: `/api/media/add` as a `POST` request

Takes:

An Authorization header with the format
```
Authorization: "Bearer <authenticationToken>"
```

and HTML form data containing the following fields:
```
-isPrivate: "<privacyBoolean>",
-name: "<fileDisplayName>",
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
   "canAccess": ["<UserOneID>", "<UserTwoID">, "<...>"],
   "creator": "<creatorUserID",
   "name": "<mediaDisplayName>"
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
###### Retrieves
Request to: `/api/media/` as a `GET` request

Takes: An Authorization header with the format
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
  - the response will have a status code of "200" and will contain a base64 encoding of the media file

- On failure: 
  - the response will have the appropriate non "2XX" status code and will have a string with the reason of failure
  - status code in the form of "4XX" are for user input error
  - status code in the form of "5XX" are for server error
  - ```
    "Media retrieval failed - <reasonForError>"
    ```