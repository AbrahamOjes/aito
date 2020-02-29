const User = require("../../models/user/User");
const generator = require("generate-password");
const { validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const PasswordToken = require("../../models/user/PasswordToken.js");
const SubmissionTarget = require("../../models/admin/SubmissionTarget");
const VisitTarget = require("../../models/admin/VisitTarget");
const Submission = require("../../models/admin/Submission");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "a641587d14a1f1",
    pass: "48ddb8b7adbe89"
  }
});

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// exports.signUp = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

//   const { name, email, phone, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(422).json({ errors: [{ msg: "User already exists" }] });
//     }

//     const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

//     user = new user({
//       name,
//       email,
//       avatar,
//       password,
//       role
//     });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();
//     const mailOptions = {
//       from: '"Feta App" <test@fetaapp.com>',
//       to: email,
//       subject: "Feta User Registration Info",
//       text: "This is to show that the registration was successfull",
//       html: `<p><b>Hello ${name}</b></p>,
//       <p>You feta user account has been successfully created. Below are your login details</p>
//       <p>Email: ${email}</p>
//       <p>Password: ${password}</p>
//       <p>Phone: ${phone}</p>
//       <p>Kindly keep your login details safe or you can also change your password to make your account more secure</p><br/><br/>
//       <p>Feta App</p>`
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.log(err);
//         return next(err);
//       }
//       console.log("Info: ", info);
//       res.status(200).json({
//         msg: "user Created and email sent",
//         user: user
//       });
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("server error");
//   }
// };

exports.signIn = async (req, res) => {
  const { phone, password } = req.body;
  try {
    let user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtUserAuthSecret"),
      { expiresIn: 360000 },
      (error, userToken) => {
        if (error) throw err;
        res.json({ userToken });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    let d = new Date(),
      month = d.getMonth(),
      year = d.getFullYear();

    const user = await User.findById(req.user.id).select("-password");
    const submissionTarget = await SubmissionTarget.findOne({
      company: user.company,
      territory: user.territory
    });
    const visitTarget = await VisitTarget.findOne({
      company: user.company,
      territory: user.territory
    });
    const submissions = await Submission.find({ user: user._id });
    const currentMonthSubmission = await Submission.find({
      date: { $lt: new Date(), $gt: new Date(year + "," + month) }
    });
    const submissionCount = currentMonthSubmission.length;

    res.json({
      user,
      submissionTarget,
      visitTarget,
      submissions,
      submissionCount
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = await User.findById(req.body.user_id);

    user.name = req.body.name;
    user.email = req.body.email;

    await user.save();

    res.status(201).json({
      user,
      msg: "Your profile update is Successfull"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { phone } = req.body;
    let user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Phone number not found" }] });
    }
    let token = generator.generate({
      length: 6,
      numbers: true
    });

    let searchedToken = await PasswordToken.findOne({ token });

    if (!searchedToken) {
      passwordToken = new PasswordToken({
        token: token,
        user: user._id
      });
      await passwordToken.save();
      const mailOptions = {
        from: '"Feta App" <test@fetaapp.com>',
        to: user.email,
        subject: "Reset Password",
        html: `<p><b>Hello ${
          user.name
        },</b> you recently requested for a password reset code.</p>
      <p>Your password reset code is ${passwordToken.token}</p>
      <p>If you didn't request for a password reset code, no further action is required from you</p><br/><br/>
      <p>Feta App</p>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err });
        }
        console.log("Info: ", info);
        res.status(201).json({
          msg: "Email sent",
          token_id: passwordToken.id
        });
      });
    } else {
      let newToken = generator.generate({
        length: 6,
        numbers: true
      });

      passwordToken = new PasswordToken({
        token: newToken,
        user: user._id
      });
      await passwordToken.save();
      const mailOptions = {
        from: '"Feta App" <test@fetaapp.com>',
        to: user.email,
        subject: "Reset Password",
        html: `<p><b>Hello ${
          user.name
        },</b> you recently requested for a password reset code.</p>
      <p>Your password reset code is ${passwordToken.token}</p>
      <p>If you didn't request for a password reset code, no further action is required from you</p><br/><br/>
      <p>Feta App</p>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("Info: ", info);
        res.status(201).json({
          msg: "Email sent",
          token_id: passwordToken.id
        });
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const { code } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    let token = await PasswordToken.findOne({ token: code });
    if (!token) {
      return res.status(400).json({ errors: [{ msg: "Invalid Code" }] });
    }
    var now = moment(new Date()); //todays date
    var end = moment(token.date); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    if (Math.round(days) > 0) {
      return res.status(400).json({ errors: [{ msg: "Code has expired" }] });
    }
    res.status(200).json({ msg: "Token Verified", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { password, confirmPassword, userId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ errors: [{ msg: "Password do not match" }] });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Server Error" }] });
    }

    const token = await PasswordToken.findOne({ user: userId });
    if (!token) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Password Changed already" }] });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    await PasswordToken.deleteMany({ user: userId });

    const mailOptions = {
      from: '"Feta App" <test@fetaapp.com>',
      to: user.email,
      subject: "Password Changed",
      html: `<p><b>Hello ${user.name},</b> </p>
      <p>Your password change was successful</p>  <br/>  
      <p>Feta App</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("Info: ", info);
      res.status(201).json({
        msg: "Password successfull Changed",
        token_id: passwordToken.id
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
