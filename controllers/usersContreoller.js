
const { ObjectId } = require("mongodb");
const bson = require("bson");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../model/users");
const { use } = require("../app");

//Login User

exports.LoginUser = async (req, res) => {
  try {
    if (req.body.name === undefined || req.body.password === undefined) {
      res.status(500).send({ error: "UserNodeFound" });
    } else {
      const name = req.body.name;
      const password = req.body.password;
      console.log(password);
      const Users = await user.find()

      const isMatch = await bcrypt.compare(password, Users[0].password);
      if (!isMatch) {
        res.status(500).send({ error: "Login Feild" });
      } else {
        const response = {
          id: Users[0]._id,
          name: Users[0].name,
        };

        let token = jwt.sign(response, "secret", { expiresIn: 86400 });
        console.log(token);
        res.status(200).send({ auth: true, token: token });
      }
      console.log(isMatch, "passsssssssssss");
    }
  } catch (error) {
    console.log(error);
  }
};

//Add Users Api

exports.AddUsers = async (req, res) => {
  try {
    // const isUser = await db.get().collection(collection.USERS).find().toArray();

    const isUser = await user.find();

    isUser.map((response) => {
      return response;
    });

    // console.log(req.body.email);
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    };

    userDetails.password = await bcrypt.hash(req.body.password, 10);

    // userDetails.mobile = await bcrypt.hash(req.body.mobile, 10);
    // console.log(userDetails);

    // console.log(userDetails);

    // await db.get().collection(collection.USERS).insertMany([userDetails]);
    await user.create([userDetails]);
  } catch (error) {
    console.log(error);
  }
};

// Get Users Api

exports.GetUsers = async (req, res) => {
  try {
    const users = await user.find();

    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

//Delete User Api

exports.DeleteUser = async (req, res) => {
  try {
    console.log(req.query._id, "qqqqqqqqqqqqqqqq");
    const id = req.query._id;
    const users = await user.deleteOne({ _id: ObjectId(id) });

    res.send("delete");
  } catch (error) {
    console.log(error);
  }
};

// Update Users

exports.UpdateUser = async (req, res) => {
  try {
    console.log(req.body.name);
    console.log(req.query._id);
    let id = req.query._id;

    let details = await user.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: { name: req.body.name } }
    );
    res.send({ message: "updated" });
  } catch (error) {
    console.log(error);
  }
};
