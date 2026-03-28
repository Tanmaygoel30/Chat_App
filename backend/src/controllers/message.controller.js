const User = require("../models/user.model");
const Message = require("../models/message.model");
const cloudinary = require("../lib/cloudinary");
const streamifier = require("streamifier");
const { io, userSocketMap } = require("../lib/socket");

exports.getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // show all users except me
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-passworrd",
    );

    res.status(200).json(users);
  } catch (err) {
    console.log("Error in getting users", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      //or because we want to get messages sent by me to user and messages sent by user to me
      $or: [
        {
          // messages sent by me to user
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          // messages sent by user to me
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getting messages", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let text = req.body?.text || "";
    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "chatApp" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageUrl = result.secure_url;
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new message", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sending message", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
