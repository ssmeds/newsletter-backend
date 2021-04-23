var express = require('express');
var router = express.Router();
let cors = require('cors');


router.use(cors());

/* GET users listing. */
router.get('/', (req, res) => {


  let checkForAdmin = `<div>
  <h1>Inloggning för administratörer</h1>
  <form action="https://stinas-newsletter.herokuapp.com/admin" method="post">
    <input type="text" name="userName" id="userName" placeholder="Användarnamn">
    <input type="password" name="userPass" id="password" placeholder="Lösenord">
    <button type="submit">Logga in</button></form>
</div>`

  // let adminInputName = req.body.userName;
  //   let adminInputPass = req.body.userPass;


  // if (adminInputName === "admin" && adminInputPass === "admin") {
  //   console.log("get / answer");
  //   res.send(adminInputName);
  //   res.redirect('https://stinas-newsletter.herokuapp.com/admin/users')
  // } else {
  //   console.log("redirect from get /");
  //   res.redirect('back')
  // }
  res.send(checkForAdmin);
})

router.post('/', function (req, res, next) {
  console.log(req.body);
  let adminInputName = req.body.userName;
  let adminInputPass = req.body.userPass;

  if (adminInputName === "admin" && adminInputPass === "admin") {
    console.log("post / answer");
    // res.send(adminInputName);
    // res.redirect('https://stinas-newsletter.herokuapp.com/admin/users')
    req.app.locals.db.collection("users").find().toArray()
      .then(results => {
        console.log(results);
        let showUsers = `<div><h2>Alla användare</h2>`

        // <script>
        //   if(!localStorage.getItem("adminloggedin")) {
        // window.location.replace("https://stinas-newsletter.herokuapp.com/admin");
        //   }</script>

        for (user in results) {
          showUsers += `<div>Användarnamn: ${results[user].userName} - Email: ${results[user].userEmail} - Lösenord: ${results[user].userPass} - Id: ${results[user].userId} - Nyhetsbrev: ${results[user].newsletter}</div>`
        }
        showUsers += `</div>`
        res.send(showUsers);
      })
  } else {
    console.log("redirect from post /");
    res.redirect('back')
  }
});

// router.get('/users', (req, res) => {

// req.app.locals.db.collection("users").find().toArray()
//   .then(results => {
//     console.log(results);
//     let showUsers =
//       `
//       // <script>
//       //   if(!localStorage.getItem("adminloggedin")) {
//       // window.location.replace("https://stinas-newsletter.herokuapp.com/admin");
//       //   }</script>

//       <div><h2>Alla användare</h2>`

//     for (user in results) {
//       showUsers += `<div>Användarnamn: ${results[user].userName} - Email: ${results[user].userEmail} - Lösenord: ${results[user].userPass} - Id: ${results[user].userId} - Nyhetsbrev: ${results[user].newsletter}</div>`
//     }
//     showUsers += `</div>`
//     res.send(showUsers);
//   })
// });

module.exports = router;