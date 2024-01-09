import mongoose from "mongoose";

import asyncHandler from "../utiles/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utiles/Apierror.js";
import { ApiResponse } from "../utiles/Apiresponse.js";
const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (fullName === "") {
    throw new ApiError(400, "all field are required");
  }
  if (email === "") {
    throw new ApiError(400, "all field are required");
  }
  if (password === "") {
    throw new ApiError(400, "all field are required");
  }
  const userExists = await User.findOne({
    $or: [{ email }],
  });
  if (userExists) {
    throw new ApiError(409, "user email already exists");
  }
  const savetodb = await User.create({
    fullName,
    email,
    password,
  });

  const created = await User.findById(savetodb._id);
  if (!created) {
    throw new ApiError(500, "something went wrong with creating user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, created, "user registered successfully"));
});

export { userRegister };
