# Task Manager

Simple **NodeJS!** task manager application for practicing CRUD operations and Authentication.

## Table of content

- [Features](#features)
- [Response Body](#response-body)
- [Authentication](#authentication)
- [Create A User](#create-a-user)
- [Get A User](#get-a-user)
- [Update A User](#update-a-user)
- [Delete A User](#delete-a-user)
- [Login A User](#login-a-user)
- [Logout A User](#logout-a-user)
- [Create A Task](#create-a-task)
- [Get A Task](#get-a-task)
- [Update A Task](#update-a-task)
- [Delete A Task](#delete-a-task)
- [Contribute](#contribute)

## Features

☑️ **Promise based!**.<br />
☑️ **ES6 and above standard javascript!**.<br />
☑️ **Clean and functional response structure!**.<br />
☑️ **Authenticated with JWT!**.<br />

## Getting Started

### Response Body

This application uses the **common response structure**. That ensures organized code structure. So I'm introducing the response structure first here.

| Key            | Return Type        | Description                                             |
| -------------- |--------------------|---------------------------------------------------------|
| **status**     | `boolean`          | Returns `true` or `false` based on success and failures.|
| **message**    | `string`           | Returns appropriate success and failure messeges        |
| **response**   | `Object` or `null` | Returns `Object` in success and `null` in failure cases.|

### Authentication

This application uses `JWT` authentication to ensure every API is authenticated except Register and Login APIs. Also add the `Bearer token` in all the API headers with the key of **authorization**.

```javascript
'Bearer <authenticationToken>'
```

### Create A User

```shell
  POST {{baseURL}}/user/register
```

```json
  {
    "user" : {
        "firstName" : "{{$randomFirstName}}",
        "lastName" : "{{$randomLastName}}",
        "phone": {
            "code": "{{$randomCountryCode}}",
            "number": "{{$randomPhoneNumber}}"
        },
        "email" : "{{$randomEmail}}",
        "password": "{{$randomPassword}}"
    }
  }
```

### Get A User

```shell
  GET {{baseURL}}/user
```

To get specific user details no need to pass any parameters. The application will fetch the authenticated user data automatically when you access it with the authenticated token. Learn more about it here [Authentication](#authentication).


### Update A User

```shell
  PUT {{baseURL}}/user/update
```

Update operations also follow the same request structure of creating [Create A User](#create-a-user).

**Note:** if you tried to update the `Email`, the application can detect that new email and returns you the updated authentication token.

### Delete A User

```shell
  DELETE {{baseURL}}/user/remove
```

The application will delete the authenticated user data automatically when you access it with the authenticated token. Learn more about it here [Authentication](#authentication).

### Login A User

```shell
  POST {{baseURL}}/user/login
```

```json
  {
    "email" : "{{$randomEmail}}",
    "password": "{{$randomPassword}}"
  }
```

### Logout A User

```shell
  GET {{baseURL}}/user/logout
```

The application will log you out automatically when you access it with the authenticated token.

### Create A Task

```shell
  POST {{baseURL}}/task/create
```

```json
  {
    "task": {
    "title": "{{$randomJobTitle}}",
    "description": "{{$randomPhrase}}"
    }
  }
```

### Get A Task

```shell
  GET {{baseURL}}/task/:id?
```

The **id** is optional. When you pass the id application will return you a single task **Object** that matches the given task **id**. Otherwise, it will return an **Array** of tasks associated with the authenticated user.

### Update A Task

```shell
  PUT {{baseURL}}/task/update
```

```javascript
  {
    "task": {
            "_id": "{{taskID}}",
            "title": "{{$randomTitle}}",
            "description": "{{$randomDescription}}",
        }
  }
```

### Delete A Task

```shell
  DELETE {{baseURL}}/task/remove
```

This application can support multiple delete and single delete as well. Check below request methods to learn more.

**Delete Multiple Task**

```json
  {
    "ids": ["taskID1", "taskID2"]
  }
```

**Delete Single Task**

```json
  {
    "ids": "{{taskID}}"
  }
```

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.