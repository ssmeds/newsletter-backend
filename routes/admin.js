var express = require('express');
var router = express.Router();
let cors = require('cors');


router.use(cors());

/* GET users listing. */
router.get('/', (req, res) => {
  let adminInputName = req.body.userName;
  let adminInputPass = req.body.userPass;

  if (adminInputName === "admin" && adminInputPass === "admin") {
    res.send(adminInputName)
  } else {
    res.redirect('back')
  }
})

router.post('/', function (req, res, next) {
  console.log(req.body);
  let adminInputName = req.body.userName;
  let adminInputPass = req.body.userPass;

  if (adminInputName === "admin" && adminInputPass === "admin") {
    res.redirect('https://stinas-newsletter.herokuapp.com/admin/users')
  } else {
    res.redirect('back')
  }
});

router.get('/users', (req, res) => {

  req.app.locals.db.collection("users").find().toArray()
    .then(results => {
      console.log(results);
      let showUsers =
        `
        // <script>
        //   if(!localStorage.getItem("adminloggedin")) {
        // window.location.replace("https://stinas-newsletter.herokuapp.com/admin");
        //   }</script>
          
        <div><h2>Alla användare</h2>`

      for (user in results) {
        showUsers += `<div>Användarnamn: ${results[user].userName} - Email: ${results[user].userEmail} - Lösenord: ${results[user].userPass} - Id: ${results[user].userId} - Nyhetsbrev: ${results[user].newsletter}</div>`
      }
      showUsers += `</div>`
      res.send(showUsers);
    })
});

module.exports = router;