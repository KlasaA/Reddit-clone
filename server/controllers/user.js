import User from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
export const signUp = async (req, res) => {
  const { userName, email, password, admin, confirmPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      email,
      hashedPassword,
      admin,
    });
    if (password === confirmPassword) {
      res.status(201).json(newUser);
    } else {
      return res.status(400).json({ message: "Password do not match" });
    }
  } catch (error) {
    if (error.code == 11000) {
      return res
        .status(400)
        .json({ message: "User with that email already exist!" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with that email doesen't exist!" });
    } else {
      const correctPassword = bcrypt.compareSync(password, user.hashedPassword);
      if (!correctPassword) {
        return res.status(400).json({ message: "Password is incorrect!" });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const newPassword = Math.random().toString(36).slice(-8);

  const hashedNewPassowrd = await bcrypt.hash(newPassword, 10);
  try {
    await User.findOneAndUpdate(
      { email: email },
      { hashedPassword: hashedNewPassowrd }
    );
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: "antonio.klasicek@gmail.com",
      to: email,
      subject: "NEW PASSWORD",
      text: newPassword,
    };
    send();
    async function send() {
      const result = await transporter.sendMail(mailOptions);
      console.log(result);
    }
    return res.status(200).json(newPassword);
  } catch (error) {}
};

export const changeUserInfo = async (req, res) => {
  const { userId, updatedUserName, updatedPassword } = req.body;
  const updatedHashedPassword = await bcrypt.hash(updatedPassword, 10);
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { userName: updatedUserName, hashedPassword: updatedHashedPassword }
    );
    return res.status(200).json({ message: "Succesfuly changed user info" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// iz bodija dohvatiti email
// pronaci tog usera pod tim emailom u bazi
// promeijniti mu šifru u neku random
// poslati mu tu šifru na mail
