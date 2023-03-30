const db = require("../config/connection");
const collection = require("../config/cllection");
const { ObjectId } = require("mongodb");
const bson = require("bson");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Login User

exports.LoginUser = async (req, res) => {
  try {
    if (req.body.name === undefined || req.body.password === undefined) {
      res.status(500).send({ error: "UserNodeFound" });
    } else {
      const name = req.body.name;
      const password = req.body.password;
      console.log(password);
      const Users = await db
        .get()
        .collection(collection.USERS)
        .find()
        .toArray();

      const isMatch = await bcrypt.compare(password, Users[0].password);
      if (!isMatch) {
        res.status(500).send({ error: "Login Feild" });
      } else {
        const res = {
          id: Users[0]._id,
          name: Users[0].name,
        };

        let token = jwt.sign(res, "secret", { expiresIn: 86400 });
         console.log(token);
         res.status(500).send("hyy");
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
    console.log(req.body.name);
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    };

    userDetails.password = await bcrypt.hash(req.body.password, 10);
    console.log(userDetails);

    console.log(userDetails);

    await db.get().collection(collection.USERS).insertMany([userDetails]);
  } catch (error) {
    console.log(error);
  }
};

// Get Users Api

exports.GetUsers = async (req, res) => {
  try {
    const users = await db.get().collection(collection.USERS).find().toArray();

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
    const users = await db
      .get()
      .collection(collection.USERS)
      .deleteOne({ _id: ObjectId(id) });

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

    let details = await db
      .get()
      .collection(collection.USERS)
      .update(
        {
          _id: ObjectId(id),
        },
        { $set: { name: req.body.name } }
      );
  } catch (error) {
    console.log(error);
  }
};
