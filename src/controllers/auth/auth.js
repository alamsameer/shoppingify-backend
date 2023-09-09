import bcrypt from 'bcrypt';
import User from "../../models/user.js";
import jwt from "jsonwebtoken"

export const signUp=async (req, res) => {
    try {
      const { name, email, password,url} = req.body;
      console.log({ name, email, password,url} );
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = {
        name,
        email,
        password: hashedPassword,
        photoUrl:url
      };
  
      // Add the user to the database
      const newUserData = await User.create(newUser);
      const id=newUserData._id
      console.log(id);
      // Generate a JWT token
      const token = jwt.sign({ email,id}, process.env.JWT_SECRET, { expiresIn: '1h' });
      //return cookie
      res.cookie('token', token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
      });
      // Return the token to the client
      res.status(201).json({ message: 'User registered successfully',token });
    } catch (error) {
      console.log(error);
      res.cookie('token',"", {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
      });
      res.status(500).json({ error: 'Error registering user' });
    }
  }

export const signIn=async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({  email, password} );
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const id=user._id
    console.log("sign id user",id);
    // Generate a JWT token
    const token = jwt.sign({ email,id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'none'
    });
    // Return the token to the client
    res.json({ message: 'User logged in successfully',token  });
  } catch (error) {
    console.log(error);
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'none'
    });
    res.status(500).json({ error: 'Error logging in user' });
  }
}