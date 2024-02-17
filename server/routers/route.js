const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/middleware')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const jwt_decode = require('jwt-decode');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
    console.log("register");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.send({ error: "Fill Complete details" })
    }
    console.log('inside register api');
    console.log(name + " " + email + " " + password);

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        console.log(name + " " + email + " " + password);

        const oldUser = await User.findOne({ email });


        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        const response = await User.create({
            name,
            email,
            password: encryptedPassword
        });

        const hashedToken = jwt.sign(
          { email: response.email, name: response.name, id: response._id },
          process.env.JWT_SECRET
        );
    
        const transport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: 'orville89@ethereal.email',
              pass: '91zjPhssfvBYJk5F1R'
          }
        });
        console.log("hhhhhhhhh");
        const mailOptions = {
            from: 'testMailForWeb@gmail.com',
            to: email,
            subject: "Verify your password",
            html: `<p>Click <a href="http://localhost:5173/verifyEmail/${hashedToken}">here</a> to verify your Email
            or copy and paste the link below in your browser. <br> http://localhost:5173/verifyEmail/${hashedToken}
            </p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        // Send the token in the response
        res.json({ data: hashedToken ,mailresponse, success: "User Registered Successfully" });

        // res.send({ status: "Data Save Succesfully" });
    } catch (error) {
        res.status(400).send({ message: error });
    }
});


router.get("/verifyEmail/:token", async (req, res) => {
  console.log('Inside verify email');
  try {
    const { token } = req.params;

    // Decode the token to extract the email
    const decodedToken = jwt_decode(token);
    const { email } = decodedToken;
    console.log('Decoded email:', email);
    
  
    const user = await User.findOne({ email: email });

    if (user) {
   
      user.isVerified = true;
      await user.save(); // Save the changes to the user object

      console.log('User verified:', user);
     
      res.status(200).send({ message: "Email verified successfully" });
    } else {
      console.log('User not found with email:', email);
    
      res.status(404).send({ message: "User not found with this email" });
    }
  } catch (error) {
    console.log('Error verifying email:', error);
  
    res.status(500).send({ message: "An error occurred while verifying email" });
  }
});


router.post("/login", async (req, res) => {
    console.log("login");
    const { email, password } = req.body;

    console.log(email + " " + password);

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    console.log(user);
    if (await bcrypt.compare(password, user.password)) {
        console.log(user);
        const token = jwt.sign({ email: user.email, name: user.name, id: user._id }, process.env.JWT_SECRET)
        if (res.status(201)) {
            return res.json({ status: "ok", message: "Login Successfully", data: token, user: user });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Authentication" });
})

router.post('/forgotPassword', async (req, res) => {
    console.log('inside forgot password api');
    try {
      console.log('forgotPassword');
      const { email } = req.body;
  
      console.log(email);
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: 'User Not found' });
      }
      console.log(user);
  
      const hashedToken = jwt.sign(
        { email: user.email, name: user.name, id: user._id },
        process.env.JWT_SECRET_RESET
      );
  
      const transport = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'orville89@ethereal.email',
            pass: '91zjPhssfvBYJk5F1R'
        }
      });
      
      const mailOptions = {
          from: 'testMailForWeb@gmail.com',
          to: email,
          subject: "Reset your password",
          html: `<p>Click <a href="http://localhost:5173/resetpassword/${hashedToken}">here</a> to reset your password
          or copy and paste the link below in your browser. <br> http://localhost:5173/resetpassword/${hashedToken}
          </p>`
      }
      const mailresponse = await transport.sendMail(mailOptions);
      // Send the token in the response
      res.json({ data: hashedToken ,mailresponse});
    } catch (error) {
      console.error('Error in forgot password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  



router.post('/resetPassword/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET_RESET);
      const {id} = decode;
      // console.log(id, password);
      const hashPassword = await bcrypt.hash(password, 10);
  
      await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
  
      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error in reset password:', error);
      return res.status(400).json({ message: 'Error in reset password', error });
    }
  });

module.exports = router;
