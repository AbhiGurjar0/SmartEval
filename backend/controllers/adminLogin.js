import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = async (req, res) => {
  let { enrollmentNumber, password, role } = req.body;
  if (role && role !== "admin") {
    req.flash("error", "Role mismatched");
    return res.json({ success: false, messages: req.flash("error") });
  }

  if (!enrollmentNumber || !password) {
    req.flash("error", "Enter enrollmentNumber and password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let admin = await Admin.findOne({ enrollmentNumber });
  if (!admin) {
    req.flash("error", "adminis does not exist. Please Register First!");
    return res.json({ success: false, messages: req.flash("error") });
  }

  const validPass = await bcrypt.compare(password, admin.password);

  if (!validPass) {
    req.flash("error", "Invalid enrollmentNumber or Password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let token = jwt.sign(
    { enrollmentNumber: admin.enrollmentNumber, id: admin._id, role: role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  req.flash("success", "admin Logged In Successfully 🎉");
  return res.json({
    success: true,
    messages: req.flash("success"),
    user: {
      id: admin._id,
      name: admin.name,
      enrollmentNumber: admin.enrollmentNumber,
    },
  });
};

export const adminRegister = async (req, res) => {
  try {
    let { name, enrollmentNumber, password, role } = req.body;

    if (!name || !enrollmentNumber || !password)
      return res.json({ success: false, messages: ["Enter All Details"] });

    let isExist = await Admin.findOne({ enrollmentNumber });
    if (isExist) {
      req.flash("error", "Admin Already Exist. Please Login");
      return res.json({ success: false, messages: req.flash("error") });
    }

    password = await bcrypt.hash(password, 10);

    let admin = await Admin.create({ name, enrollmentNumber, password });

    req.flash("success", "Admin Registered Successfully. Please Login");
    return res.json({ success: true, messages: req.flash("success") });
  } catch (err) {
    req.flash("error", "Error in register");
    return res.json({ success: false, messages: req.flash("error") });
  }
};
export const adminLogout = async (req, res) => {
  console.log("Admin Logout Called");
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  req.flash("success", "Admin Logged Out Successfully");
  return res.json({ success: true, messages: req.flash("success") });
};
