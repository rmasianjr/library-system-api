# library-system-api

  A simple NodeJs REST API for Library Management System.

## Build with

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Features

* Create, Read, Update and Delete resource.
* Authentication
* Borrowing (book)
* Returning (book)

## Installation

To get started, run this in your terminal: 

```
> git clone https://github.com/rmasianjr/library-system-api.git
> cd library-system-api
> npm install
```

In the root of the project create _.env_ file, and supply the following:

```
DATABASE=your-mongo-url
DATABASE_TEST=your-mongo-url-test
SECRET=your-secret
PORT_TEST=3001
```

To start the app, simply run: 

```
> npm start
```


