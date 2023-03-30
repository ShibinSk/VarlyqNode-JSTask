const { mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    message: {
      type: String,
    },
    comments:  [
        {
          comment: {
            type: String,
          },
          sentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
          },
          sentAt: {
            type: Date,
            default: new Date()
          },
          liked: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Users",
            },
          ],
        },
      ],
    },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports =  Post 
