import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "Email is required" });
    if (!password) return res.send({ message: "Password is required" });
    if (!phone) return res.send({ message: "Phone is required" });
    if (!address) return res.send({ message: "Address is required" });

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(406).send({
        success: false,
        message: "Already registerd , Please Login",
      });
    }

    //register user
    //hasing the password
    const hashedPassword = await hashPassword(password);

    //save the record
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Registerd Successfully !!!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while register",
      success: false,
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user?.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while login",
      error,
    });
  }
};
