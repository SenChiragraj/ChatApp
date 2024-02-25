import User from '../data/UserModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../middleware/generateToken.js';

export const loginUser = async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(user);
  if(user){
    const isValidPassword = bcrypt.compareSync(password, user.password);
    isValidPassword && res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }else {
    res.status(401).json({message : "Invalid Password or Email"});
  }
};

export const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, pic } = req.body;
  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: 'Email already registered' });
    }

    const hashed = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      pic,
    });

    if (newUser) {
      const token = generateToken(newUser._id);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        pic: newUser.pic,
        token,
      });
    } else {
      return res.status(500).json({ message: 'Server Error' });
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAll = async (req, res) => {
  try {
    let user = await User.find();
    if (user)
      return res.status(201).json({ user });
    else
      return res.status(401).json({ message: 'Internal Server Error' })
  } catch (err) {
    return res.status(401).json({ 'Error': err })
  }
}