var express = require('express');
var router = express.Router();
let cors = require('cors');
let CryptoJS = require('crypto-js');
let AES = require('crypto-js/aes');
let fs = require('fs');
let random = require('randomkey');


router.use(cors());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list/:userName', (req, res) => {

  let userFE = req.params.userName;
  console.log("userFE", userFE);

  req.app.locals.db.collection("users").find({
      "userName": userFE
    }).toArray()
    .then(results => {
      console.log(results[0]);

      res.json(results[0].newsletter)
    })
})

router.post('/add', (req, res) => {
  // console.log(req.body);
  let userPass = req.body.password;
  // let secretPass = CryptoJS.AES.encrypt(userPass, 'secret key 12345').toString();
  let secretPass = CryptoJS.enc.Utf8.parse(userPass);
  let secretPassBase64 = CryptoJS.enc.Base64.stringify(secretPass);
  // console.log("secretPass", secretPass);
  let randomUserId = random(10);
  // console.log(randomUserId);
  let newUser = {
    "userName": req.body.userName,
    "userPass": secretPassBase64,
    "userId": randomUserId,
    "newsletter": false,
    "userEmail": req.body.userEmail
  }
  req.app.locals.db.collection("users").insertOne(newUser)
    .then(result => {
      console.log(result);

      res.redirect('http://127.0.0.1:5500/index.html')
    })
})

router.get('/login', (req, res) => {
  res.send("login get router")
})

router.post('/login', (req, res) => {
  console.log(req.body);
  console.log("req.body.userName", req.body.userName);
  console.log("req.body.password", req.body.userPass);

  let userNameInput = req.body.userName;
  let userPassInput = req.body.userPass;
  let userEmailInput = req.body.userEmail;

  req.app.locals.db.collection("users").find({
      "userName": userNameInput
    }).toArray()
    .then(results => {
      console.log("results", results);
      console.log("results[0].userPass", results[0].userPass);

      let userSecretPass = results[0].userPass;
      console.log("userSecretPass", userSecretPass);
      let secretPass = CryptoJS.enc.Base64.parse(userSecretPass);

      let textPass = CryptoJS.enc.Utf8.stringify(secretPass);
      console.log("textPass", textPass);

      // let originalPass = CryptoJS.AES.decrypt(users[user].userPass, 'secret key 12345');
      // console.log("originalPass1", originalPass);
      // originalPass = originalPass.toString(CryptoJS.enc.Utf8);
      // console.log("originalPass2", originalPass);

      console.log("results[0].userName", results[0].userName);
      console.log("results[0].userId", results[0].userId);
      console.log("results[0].newsletter", results[0].newsletter);

      if (textPass == userPassInput && results[0].userEmail == userEmailInput) {
        console.log("Stämmer bra");
        let success = {
          userName: results[0].userName,
          userId: results[0].userId,
          newsletter: ""
        }
        console.log("success", success);
        console.log("Inloggningen lyckades!!");
        return res.json(success);
      } else {
        console.log("Stämmer inte");
        console.log("Inloggningen misslyckades!");
        res.send("Terror")
      }

    })
})

router.get('/newsletter/:userName', (req, res) => {
  console.log(req.params);
  let findUser = req.params.userName;

  req.app.locals.db.collection("users").find({
      "userName": findUser
    }).toArray()
    .then(results => {
      if (results[0].newsletter == false || results[0].newsletter == "") {
        req.app.locals.db.collection("users").updateOne({
            userName: findUser
          }, {
            $set: {
              newsletter: true
            }
          })
          .then(results => {
            console.log("users updated with true");
            res.redirect('http://127.0.0.1:5500/index.html')
          })

      } else {
        req.app.locals.db.collection("users").updateOne({
            userName: findUser
          }, {
            $set: {
              newsletter: false
            }
          })
          .then(results => {
            console.log("users updated with false");
            res.redirect('http://127.0.0.1:5500/index.html')
          })
      }
    })
})



module.exports = router;