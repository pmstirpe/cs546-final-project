//import express, express router as shown in lecture code
import {Router} from 'express';
import {userData} from '../data/index.js';
import * as helper from '../helpers.js';

const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.

  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    try {
      res.render('register');
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST

    const data = req.body;
    //make sure there is something in the req.body
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    // Add input checking for all fields
    let firstName = data.firstNameInput;
    let lastName = data.lastNameInput;
    let emailAddress = data.emailAddressInput;
    let password = data.passwordInput;
    let confirmPassword = data.confirmPasswordInput;
    let role = data.roleInput;

    if (confirmPassword !== password) {
      return res.status(400).json({error: 'Passwords do NOT match'});
    }

    try {
      helper.validateNewUser(firstName, lastName, emailAddress, password, role);
      const allUsers = await userData.getAll();
      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].emailAddress.toLowerCase() === emailAddress.toLowerCase()
        ) {
          throw 'Error: there is already a user with this Email Address';
        }
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      let newUser = await userData.createUser(
        firstName,
        lastName,
        emailAddress,
        password,
        role
      );
      if (newUser.insertedUser) {
        res.redirect('/login');
      } else {
        return res.status(500).json({error: 'Internal Server Error'});
      }
    } catch (e) {
      return res.status(500).json({error: 'Internal Server Error'});
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET'
    try {
      res.render('login');
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST

    /*get req.body username and password
    const { username, password } = req.body;
    here, you would get the user from the db based on the username, then you would read the hashed pw
    and then compare it to the pw in the req.body
    let match = bcrypt.compare(password, 'HASHED_PW_FROM DB');
    if they match then set req.session.user and then redirect them to the private page
    I will just do that here */
    // get password
    try {
      let username = req.body.emailAddressInput;
      let password = req.body.passwordInput;

      let userCheck = await userData.checkUser(username, password);
      req.session.user = {
        firstName: userCheck.firstName,
        lastName: userCheck.lastName,
        emailAddress: userCheck.emailAddress,
        role: userCheck.role,
        userId: userCheck._id
      };
      if (userCheck.role === 'admin') {
        //res.render('admin', {userName: userCheck.firstName, currentTime: helper.getCurrentDateTime()});
        res.redirect('admin');
      } else {
        //res.render('protected', {isAdmin: userCheck.role === 'admin', firstName: userCheck.firstName, currentTime: helper.getCurrentDateTime(), role: userCheck.role});
        res.redirect('protected');
      }
    } catch (e) {
      // If the user does not provide a valid login, you will render the login screen once again, and this
      //time show an error message (along with an HTTP 400 status code) to the user explaining that they
      //did not provide a valid username and/or password.
      //res.render('login');
      res.status(400).render('login', {loginError: true, error: e});
    }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  try {
    let user = req.session.user;
    res.render('protected', {
      isAdmin: user.role === 'admin',
      firstName: user.firstName,
      currentTime: helper.getCurrentDateTime(),
      role: user.role
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  try {
    let user = req.session.user;
    res.render('admin', {
      userName: user.firstName,
      currentTime: helper.getCurrentDateTime()
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.route('/error').get(async (req, res) => {
  //code here for GET

  res.status(403).render('error');
  //res.render('error');
  // res.status(403).json();
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  //res.send('Logged out');
  res.render('logout');
});

// Display the aboutus page
router.route("/aboutus").get(async (req, res) => {
  return res.render("aboutus");
});

//export router
export default router;
