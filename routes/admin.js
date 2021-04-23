var express = require('express');
var router = express.Router();
let cors = require('cors');
// let CryptoJS = require('crypto-js');
// let AES = require('crypto-js/aes');
// let fs = require('fs');
// let random = require('randomkey');


router.use(cors());

/* GET users listing. */
router.get('/', function (req, res, next) {
  let logInAdmin = `<div>
  <form action="/login" method="post">
  <input type="text" name="userName" id="userName" placeholder="Användarnamn">
  <input type="password" name="userPass" id="password" placeholder="Lösenord">
  <button type="submit">Logga in</button></form></div>`

  res.send(logInAdmin);

});

router.get('/users', (req, res) => {

  let logInAdmin = `<script>
  if(!localStorage.getItem("adminId")) {
window.location.replace("/admin");
  }</script>
  <div><h2>Alla användare</h2>`
  res.send(logInAdmin);

});

module.exports = router;