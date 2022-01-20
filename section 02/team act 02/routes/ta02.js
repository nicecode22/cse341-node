//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const userList = [];
router.post('/addUser', (req, res, next) => {
  msg = false;
  let user = req.body.user;
  if (!userList.includes(user)){
    userList.push(user);
  }   
  res.redirect('/ta02');
  
        
});


let msg;
router.post('/removeUser', (req, res, next) => {
  let user = req.body.user;
  let index = userList.indexOf(user);
  
  if (index == -1){
    msg = true;
  } else {
    msg = false;
    userList.splice(index, 1);
  }
  res.redirect('/ta02');
});

// router.get('/', (req, res, next) => {
//   res.render('pages', {
//     title: 'Team Activity 02',
//     path: '/ta02', // For pug, EJS
//     activeTA03: true, // For HBS
//     contentCSS: true, // For HBS
//   });

  router.get('/', (req, res, next) => {
    res.render('pages/ta02', {
      title: 'Team Activity 02',
      users: userList,
      path: '/ta02', // For pug, EJS
      message: msg,
      activeTA03: true, // For HBS
      contentCSS: true, // For HBS
    });

});



module.exports = router;
