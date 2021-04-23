var express = require('express');
var router = express.Router();
let cors = require('cors');
// let CryptoJS = require('crypto-js');
// let AES = require('crypto-js/aes');
// let fs = require('fs');
// let random = require('randomkey');


router.use(cors());

/* GET users listing. */
router.get('/', (req, res) => {
  res.send("Det här är admin routerns get")
})

router.post('/', function (req, res, next) {
  let adminInputName = req.body.userName;
  let adminInputPass = req.body.userPass;

  if (adminInputName === "admin" && adminInputPass === "admin") {
    res.redirect('/users')
  } else {
    res.redirect('/')
  }

});

router.get('/users', (req, res) => {

  req.app.locals.db.collection("users").find().toArray()
    .then(results => {
      let showUsers = `<script>
  if(!localStorage.getItem("adminId")) {
window.location.replace("/admin");
  }</script>
  <div><h2>Alla användare</h2>`

      for (user in results) {
        showUsers += `<div>
<div>${results[user]}</div>
`
        showUsers += `</div>`
        res.send(showUsers);
      }
    })

});

module.exports = router;