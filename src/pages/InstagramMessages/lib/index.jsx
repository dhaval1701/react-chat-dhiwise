import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Input,
  Img,
  Text,
  Button,
  Heading,
  SelectBox,
} from "../../../components";
import {
  collection,
  addDoc,
  getDocs,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  or,
} from "firebase/firestore";
import { auth, db } from "firebase-config";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import dayjs from "dayjs";

const MessageList = ({ userId, chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const chatContainerRef = useRef(null);

  const messagesRef = collection(db, "messages");

  console.log(chatRoomId, "chat room id");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      //   where("userId", "==", userId),
      where("chatRoomId", "==", chatRoomId),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });
  }, [chatRoomId]);

  //   console.log(userName, "username");
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userSnapshot = await getDocs(
          query(collection(db, "users"), where("userId", "==", userId))
        );

        const userData = userSnapshot.docs.map((doc) => doc.data());

        console.log(userData);
        setUserData(userData[0]);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, [userId]);

  const handleInputChange = (value) => {
    setNewMessage(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async (event) => {
    console.log(newMessage, auth.currentUser.displayName);

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      chatRoomId: chatRoomId,
    });

    setNewMessage("");
  };

  console.log(messages, "messages");

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when component mounts or when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Assuming messages is your state containing the chat messages

  const handleEmojiSelect = (emoji) => {
    // Add the selected emoji to the message input
    handleInputChange(newMessage + emoji.native);
    // Close the emoji picker
    setShowPicker(false);
  };

  // Function to calculate isCurrentUser, messageDate, prevMessageDate, and showDate
  const calculateMessageDateInfo = (message, index) => {
    const isCurrentUser = auth.currentUser.uid === message.userId;

    // Get the date of the current message
    const messageDate = dayjs
      .unix(message.createdAt.seconds)
      .format("YYYY-MM-DD");

    const messageTime = dayjs
      .unix(message?.createdAt?.seconds)
      .format("hh:mm A");

    // Get the date of the previous message
    const prevMessageDate =
      index > 0
        ? dayjs.unix(messages[index - 1].createdAt.seconds).format("YYYY-MM-DD")
        : null;

    // Check if the current message date is different from the previous one
    const showDate = messageDate !== prevMessageDate;

    return { isCurrentUser, messageDate, showDate, messageTime };
  };

  const calculateMessageTimeInfo = (message, index) => {
    const isCurrentUser = auth.currentUser.uid === message.userId;

    // Get the date of the current message
    const messageTime = dayjs
      .unix(message.createdAt.seconds)
      .format("MMMM DD, YYYY");

    return { messageTime };
  };

  return (
    <div className="w-[62%] bg-white-A700 pb-5 md:w-full">
      {/* message thread header section */}
      <div className="flex flex-col items-center h-screen">
        <div className="flex h-[10%] items-center justify-between gap-5 self-stretch border-b border-solid border-gray-300_01 bg-white-A700 pb-2.5 pl-9 pr-5 pt-[9px] sm:pl-5">
          <div className="flex w-[33%] items-center justify-center gap-3">
            {/* Display the user's name */}
            <h6 className="text-lg font-bold">{userData?.displayName}</h6>
          </div>
          <div className="flex gap-4 p-2">
            <img
              src={userData?.photoURL}
              alt="user image"
              className="h-[56px] w-[56px] object-cover rounded-full"
            />
          </div>
        </div>

        {/* message thread conversation section */}
        <div className="flex flex-col justify-between items-end gap-12 self-stretch px-[17px] pb-[30px] pt-[9px] sm:pb-5 h-[90%] relative">
          {/* Render messages */}
          <div
            ref={chatContainerRef}
            className="flex flex-col items-end gap-2 self-stretch px-[7px] pb-[30px] pt-[9px] sm:pb-5 overflow-auto"
          >
            <div className="flex flex-col items-center self-stretch">
              {messages.length === 0 ? (
                <div className="mt-10">
                  <p className="text-lg text-gray-500">Start a chat</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const { isCurrentUser, messageDate, showDate, messageTime } =
                    calculateMessageDateInfo(message, index);

                  return (
                    <>
                      {showDate && (
                        <div className="flex justify-center items-end p-5 h-[10%]">
                          <p className="text-sm text-gray-600 mt-2 mb-1">
                            {dayjs
                              .unix(message.createdAt.seconds)
                              .format("MMMM DD, YYYY")}
                          </p>
                        </div>
                      )}{" "}
                      <div
                        key={message.id}
                        className={`flex max-w-[50%] ${
                          isCurrentUser
                            ? "justify-end self-end"
                            : "items-center gap-2 self-stretch"
                        }`}
                      >
                        {isCurrentUser ? (
                          // Render message sent by current user
                          <>
                            <div className="flex flex-col items-start">
                              {/* Message content */}
                              <div className="flex self-center rounded-[12px] border border-solid border-gray-200 bg-gray-200 p-3 m-1">
                                <Text as="p" className="break-all">
                                  {" "}
                                  {/* Add break-all to allow long words to break */}
                                  {message.text}
                                </Text>
                              </div>
                              <div className="ml-auto">
                                {" "}
                                {/* Use ml-auto to push this to the right */}{" "}
                                {/* Add margin right */}
                                <p className="text-[9px] text-gray-600">
                                  {messageTime}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          // Render message sent by other users
                          <>
                            <Img
                              src={userData?.photoURL}
                              alt="profile image"
                              className="mb-4 h-[24px] w-[24px] self-end rounded-[50%]"
                            />
                            <div className="flex flex-col items-start">
                              {/* Message content */}
                              <div className="flex self-center rounded-[12px] border border-solid border-gray-200 p-3 m-1">
                                <Text as="p" className="break-all">
                                  {message.text}
                                </Text>
                              </div>
                              <div className="ml-1">
                                {" "}
                                {/* Adjust margin here */}
                                <p className="text-[9px] text-gray-600">
                                  {messageTime}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </div>

          {/* message input area section */}
          <Input
            type="text"
            value={newMessage}
            onChange={handleInputChange} // Pass the onChange handler to the Input component
            placeholder="Enter something..."
            size="md"
            variant="outline"
            shape="round"
            color="undefined_undefined"
            // name="Emoji Input"

            // prefix={

            // }
            suffix={
              <>
                <button
                  type="submit"
                  className="send-button bg-green-400 p-2 rounded-[12px]"
                  onClick={handleSubmit}
                >
                  Send
                </button>
                {showPicker && (
                  <div className="emoji-picker absolute bottom-0 mb-40 right-0">
                    <Picker onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
                <button
                  type="button"
                  className="emoji-button"
                  onClick={() => setShowPicker(!showPicker)}
                >
                  😊
                </button>
              </>
            }
            className="w-[100%] gap-[25px] !rounded-[22px] mb-10 p-5"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageList;
