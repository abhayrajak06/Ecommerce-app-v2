import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

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
      return res.status(200).send({
        success: true,
        message: "Already registerd , Please Login...",
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
