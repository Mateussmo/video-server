# Video Server
## This is an API done in Express + Typescript. The Goal of this project is a video-server that receive requests to management users and rooms. 

# How To Install

```bash
$ git clone <https://github.com/Mateussmo/video-server.git>

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# Run the application in production mode
$ npm start

# The server will start on port 3000 - <http://localhost:3000>
```


## Setting the environment variables

Create an .env file

Inside it, add three environment variables

MONGO_DATABASE = URL to connect to mongodb

SECRET = A secret string, used to generate the token

EXPIRESIN = Token expiration time (Eg: 2 days)


## Project

### Run the server


```bash
# Run the application in development mode
$ npm run dev

# The server will start on port 3000 - <http://localhost:3000>
```

### Users Management 

#### Create a User


| Authenticated Route? | Method | Route Name | Request body                                                                  |
|----------------------|--------|------------|-------------------------------------------------------------------------------|
| No                   | POST   | /users     | {   "username": "string",   "password": "string",   "mobileToken": "string" } |


Note: mobileToken is not required

#### Authenticate a User 

| Authenticated Route? | Method | Route Name          | Request body                                       |
|----------------------|--------|---------------------|----------------------------------------------------|
| No                   | POST   | /users/authenticate | {   "username": "string",   "password": "string" } |


#### Update a User

| Authenticated Route? | Method | Route Name          | Request body                                          |
|----------------------|--------|---------------------|-------------------------------------------------------|
| Yes                  | PATCH  | /users              | {   "password": "string",   "mobileToken": "string" } |

Note: mobileToken is not required

#### Delete a User

| Authenticated Route? | Method | Route Name     | Request body |
|----------------------|--------|----------------|--------------|
| Yes                  | DELETE | /users/:userId |              |


#### List All Users

| Authenticated Route? | Method | Route Name | Request body |
|----------------------|--------|------------|--------------|
| No                   | GET    | /users     |              |

#### Find One User

| Authenticated Route? | Method | Route Name       | Request body |
|----------------------|--------|------------------|--------------|
| No                   | GET    | /users/:username |              |


### Rooms Management 

#### Create a Room

| Authenticated Route? | Method | Route Name | Request body          |
|----------------------|--------|------------|-----------------------|
| Yes                  | POST   | /rooms     | {  "name": "string" } |

#### Change the host of the Room

| Authenticated Route? | Method | Route Name     | Request body                                                       |
|----------------------|--------|----------------|--------------------------------------------------------------------|
| Yes                  | POST   | /rooms/:roomId | {  "currentHost": "string"(userId),  "newHost": "string"(userId) } |


#### Join a Room

| Authenticated Route? | Method | Route Name          | Request body |
|----------------------|--------|---------------------|--------------|
| Yes                  | PATCH  | /rooms/:roomId/join |              |


#### Leave a Room

| Authenticated Route? | Method | Route Name           | Request body |
|----------------------|--------|----------------------|--------------|
| Yes                  | PATCH  | /rooms/:roomId/leave |              |


#### Find One Room

| Authenticated Route? | Method | Route Name     | Request body |
|----------------------|--------|----------------|--------------|
| Yes                  | GET    | /rooms/:roomId |              |


#### Find All Rooms Given a username

| Authenticated Route? | Method | Route Name            | Request body |
|----------------------|--------|-----------------------|--------------|
| Yes                  | GET    | /rooms/user/:username |              |


### Tests Coverage

![image](https://user-images.githubusercontent.com/26530039/91669809-4b05aa80-eaee-11ea-894a-33ce1e804b6d.png)



### About the project 

The Application were made with express + typescript. 

It was used Domain Driven Design to development it with Tests unit and integrations.

A Dockerfile was created to do the deploy easier. 



