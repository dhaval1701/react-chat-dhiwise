import React from "react";
// import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
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
import { auth, provider, db } from "firebase-config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignIn = ({ setIsAuth }) => {
  const signInRef = collection(db, "users");
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Check if the user already exists in Firestore
      const userSnapshot = await getDocs(
        query(signInRef, where("userId", "==", result.user.uid))
      );

      // If the user doesn't exist, add them to Firestore
      if (userSnapshot.empty) {
        await addDoc(signInRef, {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          userId: result.user.uid,
          // Add any other user data you want to store
        });
      }

      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 to-purple-200">
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold mb-4">
            Sign in to Let's Chat Account
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 11H20.5329C20.5769 11.3847 20.6 11.7792 20.6 12.1837C20.6 14.9184 19.6204 17.2204 17.9224 18.7837C16.4367 20.1551 14.404 20.9592 11.9796 20.9592C8.46933 20.9592 5.43266 18.947 3.9551 16.0123C3.34695 14.8 3 13.4286 3 11.9796C3 10.5306 3.34695 9.1592 3.9551 7.94698C5.43266 5.01226 8.46933 3 11.9796 3C14.4 3 16.4326 3.88983 17.9877 5.33878L16.5255 6.80101C15.3682 5.68153 13.8028 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.5265 19 18.1443 16.3923 18.577 13H12V11Z"></path>
          </svg>
          <button
            onClick={signInWithGoogle}
            className="bg-green-200 text-center font-bold py-2 px-4"
          >
            Sign in with Google
          </button>
          <p className="text-white mt-4">
            Do not violate the community guidelines or you will be banned for
            life!
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
