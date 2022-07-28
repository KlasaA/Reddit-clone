import User from "../models/user.js";

export const signUp = async (req, res) => {
  const {
    userName: { user },
    email,
    password,
    admin,
  } = req.body;

  try {
    const newUser = await User.create({
      user,
      email,
      password,
      admin,
    });
    res.status(201).json(newUser);
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
    }
    if (user.password != password) {
      return res.status(400).json({ message: "Password is incorrect!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// spremiti podatke dobivine sa frontenda u varijablu
// vidjeti je li postoji user sa tim mailom u bazi
// ako ne postoji response neka bude message : "user doesen't exist"
// ako postoji provjeriti je li dobiveni password isti kao u bazi
// ako nisu response neka bude message: "wrong user/password"
// ako je dobiveni password isti kao u bazi res.status(200) , vratim frontedu usera iz baze
