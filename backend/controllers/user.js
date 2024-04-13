import argon2 from "argon2";
import user from '../models/user.js';


export const register = async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body;
    console.log(firstname, lastname, email, passwords)
    try {
      const existingUser = await user.findOne({ email });
      if (existingUser)
        return res.status(400).json({ error: 'User already Exits' });
      const fullname = firstname + ' ' + lastname;
      const newuser = new user({ email, password, name: fullname });
      const token = await newuser.generateAuthToken();
      await newuser.save();
      res.json({ message: 'success', token: token });
    } catch (error) {
      console.log('Error in register ' + error);
      res.status(500).send(error);
    }
  };
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const valid = await user.findOne({ email });
      if (!valid) res.status(200).json({ message: 'User dont exist' });
      const validPassword = await argon2.verify(valid.password,password);
      if (!validPassword) {
        res.status(200).json({ message: 'Invalid Credentials' });
      } else {
        const token = await valid.generateAuthToken();
        await valid.save();
        res.cookie('userToken', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ token: token, status: 200 });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  export const validUser = async (req, res) => {
    try {
      const validuser = await user
        .findOne({ _id: req.rootUserId })
        .select('-password');
      if (!validuser) res.json({ message: 'user is not valid' });
      res.status(201).json({
        user: validuser,
        token: req.token,
      });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log(error);
    }
  };

  // export const googleAuth = async (req, res) => {
  //   try {
  //     const { tokenId } = req.body;
  //     const client = new OAuth2Client(process.env.CLIENT_ID);
  //     const verify = await client.verifyIdToken({
  //       idToken: tokenId,
  //       audience: process.env.CLIENT_ID,
  //     });
  //     const { email_verified, email, name, picture } = verify.payload;
  //     if (!email_verified) res.json({ message: 'Email Not Verified' });
  //     const userExist = await user.findOne({ email }).select('-password');
  //     if (userExist) {
  //       res.cookie('userToken', tokenId, {
  //         httpOnly: true,
  //         maxAge: 24 * 60 * 60 * 1000,
  //       });
  //       res.status(200).json({ token: tokenId, user: userExist });
  //     } else {
  //       const password = email + process.env.CLIENT_ID;
  //       const newUser = await user({
  //         name: name,
  //         profilePic: picture,
  //         password,
  //         email,
  //       });
  //       await newUser.save();
  //       res.cookie('userToken', tokenId, {
  //         httpOnly: true,
  //         maxAge: 24 * 60 * 60 * 1000,
  //       });
  //       res
  //         .status(200)
  //         .json({ message: 'User registered Successfully', token: tokenId });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: error });
  //     console.log('error in googleAuth backend' + error);
  //   }
  // };
  
  export const logout = (req, res) => {
    req.rootUser.tokens = req.rootUser.tokens.filter((e) => e.token != req.token);
  };
