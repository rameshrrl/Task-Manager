# Task Manager

High-level NodeJS task manager application with RESTful APIs to practice CRUD operations, Authentication, Pagination with various types of Request methods. This application's function was tested with JEST unit tests and CI/CD implemented with the help of GitHub Actions. This application has all the basic API practices like request query, params, body communications APIs with pagination and authentication. So one can get the required knowledge of working with the APIs easily with this application.

**Live application link** : [Application Link](https://rameshrrl-task-manager.herokuapp.com), use this link as a **base URL** and dive into the [Get Started](#get-started) section to learn more.

**Note:** `{{}}` With words are for placeholder purposes only. Make sure you're not using any `{{}}` while communicating with the APIs.

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
- [License](#license)
- [Contribute](#contribute)

## Features

☑️ **Promise based!**<br />
☑️ **ES6 and above standard javascript!**<br />
☑️ **Clean and functional response structure!**<br />
☑️ **Authenticated with JWT!**<br />

## Get Started

### Response Body

This application uses the **common response structure**. That ensures organized code structure. So I'm introducing the response structure first here.

| Key            | Return Type        | Description                                             |
| -------------- |--------------------|---------------------------------------------------------|
| **status**     | `boolean`          | Returns `true` or `false` based on success and failures.|
| **message**    | `string`           | Returns appropriate success and failure messeges        |
| **response**   | `Object` or `null` | Returns `Object` in success and `null` in failure cases.|

### Authentication

This application uses `JWT` authentication to ensure every API is authenticated except Register and Login APIs. Also add the `Bearer token` in all the API headers with the key of **authorization**.

```console
'Bearer <authenticationToken>'
```

### Create A User

```console
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

```console
  GET {{baseURL}}/user
```

To get specific user details no need to pass any parameters. The application will fetch the authenticated user data automatically when you access it with the authenticated token. Learn more about it here [Authentication](#authentication).


### Update A User

```console
  PUT {{baseURL}}/user/update
```

Update operations also follow the same request structure of creating [Create A User](#create-a-user).

**Note:** if you tried to update the `Email`, the application can detect that new email and returns you the updated authentication token.

### Delete A User

```console
  DELETE {{baseURL}}/user/remove
```

The application will delete the authenticated user data automatically when you access it with the authenticated token. Learn more about it here [Authentication](#authentication).

### Login A User

```console
  POST {{baseURL}}/user/login
```

```json
  {
    "email" : "{{$randomEmail}}",
    "password": "{{$randomPassword}}"
  }
```

### Logout A User

```console
  GET {{baseURL}}/user/logout
```

The application will log you out automatically when you access it with the authenticated token.

### Create A Task

```console
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


**Get Single Task**

```console
  GET {{baseURL}}/task/{{taskId}}
```

**Get Multiple Tasks**

```console
  GET {{base_url}}/task?skip={{number}}&limit={{number}}
```

The **id** is optional. When you pass the id application will return you a single task **Object** that matches the given task **id**. Otherwise, it will return an **Array** of tasks associated with the authenticated user.

When you fetch **Array** of tasks you can fetch using `skip` and `limit` properties. By default, the application will fetch the first 10 tasks as a result. Hence the default `skip` value is `0` and `limit` is `10`.

### Update A Task

```console
  PUT {{baseURL}}/task/update
```

```json
  {
    "task": {
            "_id": "{{taskID}}",
            "title": "{{$randomTitle}}",
            "description": "{{$randomDescription}}",
        }
  }
```

### Delete A Task

```console
  DELETE {{baseURL}}/task/remove
```

This application can support multiple delete and single delete as well. Check below request methods to learn more.

**Delete Single Task**

```json
  {
    "ids": "{{taskID}}"
  }
```

**Delete Multiple Tasks**

```json
  {
    "ids": ["taskID1", "taskID2"]
  }
```

## License

This project is licensed under the [MIT License](https://github.com/rameshrrl/task-manager/blob/main/LICENSE)

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.