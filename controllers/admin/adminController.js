const mongoose = require("mongoose");
const Admin = require("../../models/admin/Admin");
const generator = require("generate-password");
const { validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRole = require("../../models/admin/AdminRoles.js");
const nodemailer = require("nodemailer");
const moment = require("moment");
const PasswordToken = require("../../models/user/PasswordToken.js");
const ProductCompany = require("../../models/admin/ProductCompany");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "a641587d14a1f1",
    pass: "48ddb8b7adbe89"
  }
});

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.getCompanyAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ company: req.params.company }).select(
      "-password"
    );
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let password = generator.generate({
    length: 10,
    numbers: true
  });

  if (req.body.hasOwnProperty("role")) {
    const { name, email, role, company } = req.body;

    try {
      const adminCompany = await ProductCompany.findById(company);
      const adminrole = await adminRole.findById(role);
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(422)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      admin = new Admin({
        name,
        email,
        avatar,
        password,
        role,
        company: adminCompany._id,
        company_name: adminCompany.name,
        role_name: adminrole.name,
        role_power: adminrole.power
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();
      const mailOptions = {
        from: '"Feta App" <test@fetaapp.com>',
        to: email,
        subject: "Registration Info",
        text: "This is to show that the registration was successfull",
        html: `<p><b>Hello ${name}</b></p>, 
      <p>You feta admin account has been successfully created. Below are your login details</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Admin Role: ${adminrole.name}</p>
      <p>Kindly keep your login details safe or you can also change your password to make your account more secure</p><br/><br/>
      <p>Feta App</p>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("Info: ", info);
        res.status(200).json({
          msg: "Admin Created and email sent",
          admin: admin
        });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  } else {
    const { name, email, company, phone, address } = req.body;

    try {
      const adminCompany = await ProductCompany.findById(company);
      const adminrole = await adminRole.findOne({ power: "1" });
      // return console.log(adminRole);
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(422)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      admin = new Admin({
        name,
        email,
        avatar,
        password,
        role: adminrole._id,
        company: adminCompany._id,
        company_name: adminCompany.name,
        phone: phone,
        role_name: adminrole.name,
        role_power: adminrole.power
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      adminCompany.admin = admin._id;
      adminCompany.admin_name = admin.name;
      adminCompany.admin_phone = phone;
      adminCompany.address = address;
      await adminCompany.save();

      const mailOptions = {
        from: '"Feta App" <test@fetaapp.com>',
        to: email,
        subject: "Registration Info",
        text: "This is to show that the registration was successfull",
        html: `<p><b>Hello ${name}</b></p>, 
      <p>You feta admin account has been successfully created. Below are your login details</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Admin Role: ${adminrole.name}</p>
      <p>Kindly keep your login details safe or you can also change your password to make your account more secure</p><br/><br/>
      <p>Feta App</p>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("Info: ", info);
        res.status(200).json({
          msg: "Admin Created and email sent",
          admin: admin
        });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.admin_id);
    //Check Post
    if (!admin) return res.status(404).json({ msg: "Admin not found" });
    await admin.remove();
    res.status(200).json({ mgs: "Admin Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Email not found" }] });
    }
    let token = generator.generate({
      length: 6,
      numbers: true
    });

    let searchedToken = await PasswordToken.findOne({ token });

    if (!searchedToken) {
      passwordToken = new PasswordToken({
        token: token,
        user: admin._id
      });
      await passwordToken.save();
      const mailOptions = {
        from: '"Feta App" <test@fetaapp.com>',
        to: admin.email,
        subject: "Reset Password",
        html: `<p><b>Hello ${
          admin.name
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
        user: admin._id
      });
      await passwordToken.save();
      const mailOptions = {
        from: '"Feta App" <test@fetaapp.com>',
        to: admin.email,
        subject: "Reset Password",
        html: `<p><b>Hello ${
          admin.name
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
  const { password, confirmPassword, adminId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ errors: [{ msg: "Password do not match" }] });
  }
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Server Error" }] });
    }

    const token = await PasswordToken.findOne({ user: adminId });
    if (!token) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Password Changed already" }] });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();
    await PasswordToken.deleteMany({ user: adminId });

    const mailOptions = {
      from: '"Feta App" <test@fetaapp.com>',
      to: admin.email,
      subject: "Password Changed",
      html: `<p><b>Hello ${admin.name},</b> </p>
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
