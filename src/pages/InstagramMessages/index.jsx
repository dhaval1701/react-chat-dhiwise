import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Input, Img, Text, Button, Heading, SelectBox } from "../../components";
import Sidebar1 from "../../components/Sidebar1";
import {
  collection,
  addDoc,
  getDocs,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Cookies from "universal-cookie";
import MessageList from "./lib";

function generateChatRoomId(userId1, userId2) {
  const sortedUserIds = [userId1, userId2].sort().join("");
  return sortedUserIds;
}

const cookies = new Cookies();

export default function InstagramMessagesPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [getTime, setGetTime] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      // Query all users from Firestore
      const usersRef = collection(db, "users");

      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      });

      // Return unsubscribe function to stop listening when component unmounts
      return unsubscribe;
    } catch (error) {
      console.error("Error getting users: ", error);
    }
  };

  useEffect(() => {
    const handleAuthStateChange = (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);
      } else {
        console.log("User is logged out");
      }
    };

    onAuthStateChanged(auth, handleAuthStateChange);

    return () => {
      // Cleanup function (optional): Remove the listener on unmount
      onAuthStateChanged(auth, handleAuthStateChange); // Remove listener on component unmount
    };
  }, []);
  console.log(auth?.currentUser?.uid, "currentUser Id");

  console.log(selectedUserId, "selected user id");

  const handleUserClick = (userId) => {
    const newChatRoomId = generateChatRoomId(userId, auth?.currentUser?.uid);
    setChatRoomId(newChatRoomId);
    setSelectedUserId(userId);
  };

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    window.location.reload();
    // setIsAuth(false);
    // setIsInChat(false);
  };

  console.log(chatRoomId?.includes(selectedUserId), "checcking");

  const getMessageTime = (value) => {
    console.log(value, "get message time value");
    setGetTime(value);
  };

  return (
    <>
      <Helmet>
        <title>Instagram Direct Messages - Chat and Engage on Instagram</title>
        <meta
          name="description"
          content="Check your Instagram messages and engage with your followers. Send direct messages, share stories, and connect with The Boyz and friends."
        />
      </Helmet>

      {/* page container section */}
      <div className="flex w-full justify-center overflow-auto bg-white-A700 md:flex-col">
        {/* sidebar navigation section of chat application */}
        {/* <Sidebar1 /> */}

        {/* main content section */}
        <div className="flex flex-1 h-screen justify-center  bg-gradient-to-br from-blue-200 to-purple-200  md:self-stretch">
          <div className="flex w-[81%] justify-evenly rounded border border-solid border-gray-300_01 md:w-full md:flex-col">
            {/* message list section */}
            <div className="w-[37%] border-r border-solid border-gray-300_01 bg-white-A700 md:w-full">
              {/* message list header section */}
              <div className="flex justify-between gap-5 border-b border-solid border-gray-300_01 bg-white-A700 p-5 md:pl-5">
                {/* <SelectBox
                  shape="square"
                  indicator={
                    <Img
                      src="images/img_arrowdown.svg"
                      alt="arrow_down"
                      className="h-[20px] w-[20px]"
                    />
                  }
                  name="Dropdown Menu"
                  placeholder={`thegriff`}
                  options={dropDownOptions}
                  className="w-[42%] gap-px font-semibold text-black-900_01 sm:pr-5"
                /> */}
                <Img
                  src={auth?.currentUser?.photoURL}
                  alt="edit image"
                  className="h-[40px] w-[40px]"
                />
                <button
                  className="bg-gray-500 p-2 text-white-A700"
                  onClick={signUserOut}
                >
                  Sign Out
                </button>
              </div>
              <div className="bg-white-A700 pt-2">
                {/* message list items section */}
                <div className="flex flex-col gap-px pt-[72px] md:pt-5">
                  {users
                    .filter((user) => auth?.currentUser?.uid !== user.userId)
                    .map((user) => (
                      <div
                        key={user.id}
                        className={`flex flex-1 ${
                          selectedUserId === user.userId
                            ? "bg-green-200 rounded-[12px]"
                            : "bg-white-A700"
                        } p-2`}
                        onClick={() => handleUserClick(user.userId)}
                      >
                        <div className="flex w-full items-center gap-3">
                          <img
                            src={user.photoURL}
                            alt="user image"
                            className="h-[56px] w-[56px] object-cover rounded-full"
                          />
                          <div className="flex flex-1 flex-col items-start">
                            <div className="flex items-start justify-between gap-5 self-stretch">
                              <h1 className="text-lg font-bold">
                                {user.displayName}
                              </h1>
                              {selectedUserId === user.userId && (
                                <div className="h-[8px] w-[8px] rounded bg-green-400" />
                              )}
                            </div>
                            <div className="flex items-center">
                              <p className="text-sm text-black-900_01">
                                {user.email}
                              </p>
                              <span className="text-black-900_01 font-normal">
                                &nbsp;·&nbsp;
                              </span>
                              <p className="text-sm text-gray-600">34m</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Render the MessageList component if a user is selected */}
            {selectedUserId && (
              <MessageList
                userId={selectedUserId}
                chatRoomId={chatRoomId}
                getMessageTime={getMessageTime}
              />
            )}
            {!selectedUserId && (
              <div className="w-[62%] bg-white-A700 pb-5 md:w-full h-screen flex justify-center items-center">
                <h1>No User Selected</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
