const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://jayrajsinghjs54:12345@cluster0.3qdap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const User = require("./models/user.js")
const Message = require("./models/message.js");
const User = require("./models/user.js");

/// end point to for registration

// app.post("/register", async (req, res) => {
//   const { name, email, password, image } = req.body;

//   const newUser = new User({ name, email, password, image });

//   newUser
//     .save()
//     .then(() => {
//       res.status(200).json({ message: "User registered successfully" });
//     })
//     .catch((error) => {
//       console.log("error creataing a user");
//       res.status(500).json({ error: "Internal server error" });
//     });
// });
app.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user if no duplicates are found
    const newUser = new User({ name, email, password, image });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error creating a user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/// endpoint for login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const secretKey = "Q$r2K6W8n!jCW%Zk";

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find({ _id: { $ne: userId } });

    res.json(users);
  } catch (error) {
    console.log("error fetching user:", error);
  }
});

app.post("/sendrequest", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return res.status(404).json({ error: "Receiver not found" });
  }
  receiver.requests.push({ from: senderId, message });
  await receiver.save();

  res.status(200).json({ message: "Request sent successfully" });
});

//get all the requests

app.get("/getrequests/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate(
      "requests.from",
      "name email image"
    );

    if (user) {
      res.json(user.requests);
    } else {
      res.status(404).json({ error: "User not found" });
      throw new Error("User not found");
    }
  } catch (error) {
    console.log("error fetching requests:", error);
  }
});

//accept a request

// app.post("/acceptrequest", async (req, res) => {
//   try {
//     const { userId, requestId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $pull: { requests: { from: requestId } },
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     await User.findByIdAndUpdate(userId, {
//       $push: { friends: requestId },
//     });

//     const friendUser = await User.findByIdAndUpdate(requestId, {
//       $push: { friends: userId },
//     });

//     if(!friendUser){
//       return res.status(200).json({message:"request accepted sucessfully"})
//     }
//   } catch (error) {
//     console.log("error accepting request:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
app.post("/acceptrequest", async (req, res) => {
  try {
    const { userId, requestId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { requests: { from: requestId } },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $push: { friends: requestId },
    });

    const friendUser = await User.findByIdAndUpdate(requestId, {
      $push: { friends: userId },
    });

    res
      .status(200)
      .json({ message: "Request accepted successfully", requestId });
  } catch (error) {
    console.log("Error accepting request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all of our friends chat
app.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const users = await User.findById(userId).populate(
      "friends",
      "name email image",
    );

    res.json(users.friends);
  } catch (error) {
    console.log("error fetching user:", error);
  }
});


// // const http = require("http").createServer(app);

// // const io = require("socket.io")(http);

// // const userSocketMap = {};

// // io.on("connection", socket => {
// //   console.log("a user connected:", socket.id)

// //   const userId = socket.handshake.query.userId;

// //   console.log("Userid", userId);

// //   if(userId !== "undefined"){
// //     userSocketMap[userId] = socket.id
// //   }


// //   console.log("user socket data ", userSocketMap)

// //    socket.on("disconnect",() => {
// //     console.log("user disconnected:", socket.id)
// //     delete userSocketMap[userId];

// // })

// // socket.on("sendMessage", ({senderId,receiverId,message}) => {
// //   const receriverSocketId = userSocketMap[receiverId];
// //   console.log("receiver socket id",receriverSocketId)
// //   if(receriverSocketId){
// //     io.to(receriverSocketId).emit("receiveMessage",{senderId,message})
// //   }
// // })
// // })

// // http.listen(6000,() =>{
// //   console.log("socket server is running on port 6000")
// // })


// // app.post("/sendMessage", async (req, res) => {
// //   try {
// //     const {senderId,receiverId,message} = req.body
// //     const newMessage = new Message({senderId,receiverId,message})
// //     await newMessage.save();

// //     const receriverSocketId = userSocketMap[receiverId];

// //     if(receriverSocketId){
// //       console.log("receiver socket id",receiverId)
// //       io.to(receriverSocketId).emit("newMessage",newMessage)
// //     }else{
// //       console.log("receiver socket id is not found ")
// //     }

// //     res.status(201).json(newMessage)

// //   } catch (error) {
// //     console.log("error sending message:", error)
// //   }
// // })


// // app.get("/messages",async(req,res) => {
// //   try {
// //     const {senderId,receiverId} = req.query;
// //     const messages = await Message.find({
// //       $or:[
// //         {senderId:senderId,receiverId:receiverId},
// //         {senderId:receiverId,receiverId:senderId}
// //       ]
// //     }).populate("senderId","_id name");
// //     res.status(200).json(messages);
// //   } catch (error) {
// //     console.log("error fetching messages:", error)
// //   }
// // })


// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// const userSocketMap = {};

// io.on("connection", (socket) => {
//   console.log("a user connected:", socket.id);

//   const userId = socket.handshake.query.userId;
//   console.log("Userid", userId);

//   if (userId !== "undefined") {
//     userSocketMap[userId] = socket.id;
//   }

//   console.log("user socket data", userSocketMap);

//   socket.on("disconnect", () => {
//     console.log("user disconnected:", socket.id);
//     delete userSocketMap[userId];
//   });

//   socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//     const receiverSocketId = userSocketMap[receiverId];
//     console.log("receiver socket id", receiverSocketId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
//     }
//   });
// });

// http.listen(6000, () => {
//   console.log("socket server is running on port 6000");
// });

// app.post("/sendMessage", async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;
//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();

//     const receiverSocketId = userSocketMap[receiverId];
//     if (receiverSocketId) {
//       console.log("receiver socket id", receiverSocketId);
//       io.to(receiverSocketId).emit("receiveMessage", newMessage);
//     } else {
//       console.log("receiver socket id is not found");
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("error sending message:", error);
//   }
// });

// app.get("/messages", async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.query;
//     const messages = await Message.find({
//       $or: [
//         { senderId: senderId, receiverId: receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).populate("senderId", "_id name");
//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("error fetching messages:", error);
//   }
// });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// debuging code form the chat gpt 
// const http = require("http").createServer(app);
// const io = require("socket.io")(http, {
//   cors: {
//     origin: "*", // Ensure CORS allows all origins; adjust if needed
//   },
// });

// const userSocketMap = {};

// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;
//   console.log("User connected:", userId, "Socket ID:", socket.id);

//   // Map userId to their socket ID
//   if (userId !== "undefined") {
//     userSocketMap[userId] = socket.id;
//     console.log("User socket map updated:", userSocketMap);
//   }


  
//   socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//     const receiverSocketId = userSocketMap[receiverId];
//     console.log("Received message:", message, "from", senderId, "to", receiverId);
    
//     // Send message to the receiver if connected
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
//       console.log("Message sent to receiver:", receiverSocketId);
//     } else {
//       console.log("Receiver not connected");
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//     delete userSocketMap[userId];
//   });
// });

// http.listen(6000, () => {
//   console.log("Socket server running on port 6000");
// });

// app.post("/sendMessage", async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;
//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();

//     const receiverSocketId = userSocketMap[receiverId];
//     if (receiverSocketId) {
//       console.log("receiver socket id", receiverSocketId);
//       io.to(receiverSocketId).emit("receiveMessage", newMessage);
//     } else {
//       console.log("receiver socket id is not found");
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("error sending message:", error);
//   }
// });

// app.get("/messages", async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.query;
//     const messages = await Message.find({
//       $or: [
//         { senderId: senderId, receiverId: receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).populate("senderId", "_id name");
//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("error fetching messages:", error);
//   }
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// real time working very finely 
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*", // Ensure CORS allows all origins; adjust if needed
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId, "Socket ID:", socket.id);

  // Map userId to their socket ID
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log("User socket map updated:", userSocketMap);
  }
///////////////////// o ///////////////////////
  // socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
  //   const receiverSocketId = userSocketMap[receiverId];
  //   console.log("Received message:", message, "from", senderId, "to", receiverId);

  //   // Save message to database
  //   const newMessage = new Message({ senderId, receiverId, message });
  //   await newMessage.save();

  //   // Send message to the receiver if connected
  //   if (receiverSocketId) {
  //     io.to(receiverSocketId).emit("receiveMessage", newMessage);
  //     console.log("Message sent to receiver:", receiverSocketId);
  //   } else {
  //     console.log("Receiver not connected");
  //   }
  // });
/////////////////// o /////////////////


socket.on("sendMessage", ({ senderId, receiverId, message }) => {
  const receiverSocketId = userSocketMap[receiverId];
  console.log("Received message:", message, "from", senderId, "to", receiverId);

  // Emit message to receiver directly without saving it to the database
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receiveMessage", { senderId, receiverId, message });
    console.log("Message sent to receiver:", receiverSocketId);
  } else {
    console.log("Receiver not connected");
  }
});











///////////////////////////////////////////////
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
  });
});

http.listen(6000, () => {
  console.log("Socket server running on port 6000");
});
//////////////////////// o ///////////////////
// No need to emit message again here
// app.post("/sendMessage", async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;
//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("error sending message:", error);
//   }
// });
////////////////////////// o ////////////
// app.post("/sendMessage", async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;
//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();

//     // Send message to the receiver if connected via Socket.IO
//     const receiverSocketId = userSocketMap[receiverId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("receiveMessage", newMessage);
//       console.log("Message sent to receiver:", receiverSocketId);
//     } else {
//       console.log("Receiver not connected");
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("error sending message:", error);
//     res.status(500).json({ error: "Message not sent" });
//   }
// });



// app.post("/sendMessage", async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;
//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();

//     // Emit the latest message to both the sender and receiver
//     const receiverSocketId = userSocketMap[receiverId];
//     const senderSocketId = userSocketMap[senderId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("receiveMessage", newMessage);
//     }
//     if (senderSocketId) {
//       io.to(senderSocketId).emit("receiveMessage", newMessage);
//     }
    
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error sending message:", error);
//     res.status(500).json({ error: "Message not sent" });
//   }
// });

app.post("/sendMessage", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    // Emit the new message to the receiver
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }

    // Emit an event for both the sender and receiver to update the chat list preview
    io.to([receiverSocketId, userSocketMap[senderId]]).emit("latestMessage", {
      userId: senderId,
      latestMessage: newMessage,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(500).json({ error: "Message not sent" });
  }
});



app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");
    res.status(200).json(messages);
  } catch (error) {
    console.log("error fetching messages:", error);
  }
});
////////////////////////////////// real time working very finely ///////////





app.get("/latestMessage", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const latestMessage = await Message.findOne({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .sort({ timeStamp: -1 }) // Sort by timestamp in descending order
      .limit(1);
    res.status(200).json(latestMessage || { message: "No messages yet" });
  } catch (error) {
    console.log("Error fetching latest message:", error);
    res.status(500).json({ error: "Error fetching latest message" });
  }
});

