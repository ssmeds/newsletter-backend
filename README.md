# newsletter-backend

# Newsletter

A school project for creating a log in page with newsletter options.

Here you will find the front end of this project: [Newsletter-frontend](https://github.com/ssmeds/newsletter-frontend)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites and Installation

You will need a code editor of your own choice. And a terminal to write your commands.

For this project I have used the following:

* node.js
* express
* npm
* crypto-js
* randomkey
* cors
* mongodb
* nodemon (optional)

Download and install [NodeJS](https://nodejs.org/en/download/) according to your computer.

Installing Npm
```
npm install -g npm
```
Installing Express
```
npm install express
```
Installing Crypto-js
```
npm install crypto-js
```
Installing Randomkey
```
npm install --save randomkey
```
Installing Cors
```
npm install cors
```
Installing Mongodb
```
npm install mongodb --save
```
Installing Nodemon (optional)
```
npm install -g nodemon
```

## Deployment

You can host this project on any site you prefer. I have deployed via [GitHub Pages](https://pages.github.com/) and [Heroku](https://heroku.com).

You will have to change the url for the MongoDB if you want to access your database. You will find the url in **app.js**.

You must change the fetch url located in the [frontends](https://github.com/ssmeds/newsletter-frontend) **script.js** to your backends hostings url.


The Backend also has a monolithic application where you can log in as admin to see every user and all their information stored in the database.

The url for the admin page is [yourBackEndUrl/admin](https://yourbackendurl/admin)

Log in is

* username: admin
* password: admin

Run your backend with the command npm start or nodemon

## Built With

* [NodeJS Express](https://expressjs.com/en/starter/installing.html) - The web framework used
* [NPM](https://docs.npmjs.com/) - Package Management

## Authors

* **Stina Smeds** - [Ssmeds](https://github.com/ssmeds)

## Acknowledgments

* Janne Kemi - my teacher for giving us this awesome project to work on
* Inspiration - Dark Coding Music on Youtube
