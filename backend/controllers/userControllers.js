const { User } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  // Check if any of them is undefined
  if (!name || !email || !password) {
    console.log(req.body);
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Please enter all the fields",
    });
  }

  // Check if user already exists in our DB
  const userExists = await User.findOne({ email }).exec();

  if (userExists) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "User already exists",
    });
  }

  // Register and store the new user
  const userCreated = await User.create({
    name,
    email,
    password: await generateHashedPassword(password),
    pic,
  });

  if (userCreated) {
    return res.status(201).json({
      success: true,
      statusCode: 201,
      _id: userCreated._id,
      name: userCreated.name,
      email: userCreated.email,
      pic: userCreated.pic,
      token: generateToken(userCreated._id, userCreated.email),
      message: "User Created Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to create the User",
    });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if any of them is undefined
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Please enter all the fields",
    });
  }

  // Check if user already exists in our DB
  const userExists = await User.findOne({ email }).exec();

  // If user exists and password is verified
  if (userExists && await verifyPassword(password, userExists.password)) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      pic: userExists.pic,
      token: generateToken(userExists._id, userExists.email),
      message: "Authenticated Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid Email or Password",
    });
  }
};

module.exports = { registerUser, authUser };
