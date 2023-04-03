
const Post = require("../model/post");
const { ObjectId } = require("mongodb");
exports.getPost = async (req, res) => {
  try {
    const datas = await Post.find();
    res.send(datas);
  } catch (error) {
    console.log(error);
  }
};

exports.AddPost = async (req, res) => {
  try {
    console.log(req.body);
    const { post, message } = req.body;
    const data = {
      post,
      message,
      createdBy: req.query._id,
    };

    const result = await Post.create(data);
    //  await post.create(data);
   res.status(200).send({Message:"New Post Added"})
    console.log(req.query._id);
  } catch (error) {
    console.log(error);
  }
};

exports.addcomment = async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.query._id);
    console.log(req.body.comment);
    const data = {
      comments: [{ comment: req.body.comment, sentBy: req.user }],
    };
    console.log(data, req.query._id);
    await Post.findByIdAndUpdate(req.query._id, {
      $addToSet: data,
    });
    res.send({Message:"comment Posted"})
  } catch (error) {
    console.log(error);
  }
};

// exports.getLike= async(req,res)=>{
//     try {

//         console.log(req.user)
//         console.log(req.query._id);
//         const data = {
//             liked: [{ Liked:req.user}],
//           };
//           await Post.findByIdAndUpdate(req.query._id, {
//             $addToSet:data
//         })
//         res.send("Liked")

//     } catch (error) {
//         console.log(error);

//     }

// }

exports.deletePost = async (req, res) => {
  try {
    console.log(req.query._id);
    const id = req.query._id;
    const users = await Post.deleteOne({ _id: ObjectId(id) });
    res.send("Deleted Post")
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost=async(req,res)=>{
    try {
        console.log(req.body.post);
    console.log(req.query._id);

    let id = req.query._id;

    let details = await Post.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: { post: req.body.post } }
    );
    res.send({ message: "updated" });
    } catch (error) {
        console.log(error);
        
    }
}