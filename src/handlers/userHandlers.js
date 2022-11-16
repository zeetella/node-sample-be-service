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

const createUser = async (request, h) => {
  const user = request.payload;
  user.password = bcrypt.hashSync(user.password, 10);
  await UserModel.create(request.payload);
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

const getAllUsers = async (request, h) => {
  try {
    const promise1 = UserModel.find().exec();
    const promise2 = UserModel.find().exec();
    const promise3 = UserModel.find().exec();
    const promise4 = UserModel.find().exec();

    
    return await Promise.all([
      promise1,
      promise2,
      promise3,
      promise4,
    ]);

  } catch (e) {
    console.log(e);
  }
  return [];
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
