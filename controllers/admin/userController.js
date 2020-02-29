const User = require("../../models/user/User");
const generator = require("generate-password");
const { validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const request = require("request");
const Company = require("../../models/admin/ProductCompany");
const UserDesignation = require("../../models/admin/UserDesignation");
const Territory = require("../../models/admin/Territory.js");

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
    const users = await User.find({ company: req.params.company }).select(
      "-password"
    );
    res.status(200).json(users);
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

  const {
    name,
    email,
    phone,
    company,
    territory,
    designation,
    route
  } = req.body;

  try {
    let user = await User.findOne({ email });
    const searchedcompany = await Company.findById(company);
    const serachedTerritory = await Territory.findById(territory);
    const searchedDesignation = await UserDesignation.findById(designation);
    if (user) {
      return res.status(422).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    user = new User({
      name,
      email,
      phone,
      avatar,
      password,
      territory,
      territory_name: serachedTerritory.name,
      designation,
      designation_name: searchedDesignation.name,
      routes: route,
      company: searchedcompany._id,
      company_name: searchedcompany.name
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const mailOptions = {
      from: '"Feta App" <test@fetaapp.com>',
      to: email,
      subject: "Feta User Registration Info",
      text: "This is to show that the registration was successfull",
      html: `<p><b>Hello ${name}</b></p> 
      <p>You feta user account has been successfully created. Below are your login details</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Phone: ${phone}</p>
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
        msg: "user Created and email sent",
        user: user
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

exports.updateUserRoute = async (req, res) => {
  try {
    const territory = await Territory.findOne({
      _id: req.body.form_territory
    });
    const company = await Company.findById(req.body.company);

    const user = await User.findById(req.params.user_id);

    if (!territory) {
      return res.status(404).json({
        msg: "No Territory Found"
      });
    }

    if (!company) {
      return res.status(404).json({
        msg: "No Company Found"
      });
    }

    if (!user) {
      return res.status(404).json({
        msg: "No User Found"
      });
    }

    user.territory = territory;
    user.territory_name = territory.name;
    user.routes = req.body.route;
    await user.save();
    res.status(200).json({
      msg: "User Route Updated",
      user
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    //Check Post
    if (!user) return res.status(404).json({ msg: "user not found" });
    await user.remove();
    res.status(200).json({ mgs: "User Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
