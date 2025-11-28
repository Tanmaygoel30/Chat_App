const User = require("../models/user.model");
const Message = require("../models/message.model");

exports.getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // show all users except me
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-passworrd"
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
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getting messages", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sending message", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
