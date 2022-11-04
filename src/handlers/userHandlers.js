const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CONFIGS = require("../configs/configs");

const _generateToken = (user, role = CONFIGS.USER.DEFAULT_ROLE) => {
  const token = jwt.sign(
    {
      sub: user._id,
      scope: role,
    },
    CONFIGS.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const createUser = (request, h) => {
  const user = request.payload;
  user.password = bcrypt.hashSync(user.password, 10);
  UserModel.create(request.payload);
  return {
    message: "User created successfully",
  };
};

const login = async (request, h) => {
  try {
    const user = request.payload;
    const userFound = await UserModel.findOne({ email: user.email })
      .select("+password")
      .exec();
    if (userFound) {
      console.log(userFound);
      const passwordMatch = bcrypt.compareSync(
        user.password,
        userFound.password
      );
      if (passwordMatch) {
        return {
          accessToken: _generateToken(userFound),
        };
      }
    }
    return {
      message: "Invalid user email or password",
    };
  } catch (e) {
    console.log(e);
  }
};

const updateUser = (request, h) => {
  UserModel.findByIdAndUpdate(request.params.id, request.payload).exec();
  return {
    message: "User updated successfully",
  };
};

const getAllUsers = (request, h) => {
  return UserModel.find({}).exec();
};

const getUserById = (request, h) => {
  return UserModel.findById(request.params.id);
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  login,
};
