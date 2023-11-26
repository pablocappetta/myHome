import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const FirebaseContext = createContext();
// import * as Google from 'expo-google-app-auth';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const FirebaseProvider = ({ children }) => {


  const [firebaseApp, setFirebaseApp] = useState(null);
  const [user, setUser] = useState({
    name: null,
    lastName: null,
    email: null,
    profilePicture: null,
    isVerified: null,
    isRealtor: null,
    token: null,
    _id: null,
  });
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     iosClientId: '78227269948-rses0l35ae9agr6oon5qteuprpm4i13k.apps.googleusercontent.com',
//     androidClientId: '78227269948-hoo6255a6a4e8uq3i8luo648kgpraiq4.apps.googleusercontent.com',
//     webClientId: '78227269948-nhvdrn92e3rs09t5s7bh6ikrb6reu75e.apps.googleusercontent.com',
//   });


  useEffect(() => {
    const firebaseConfig = {
    apiKey: "AIzaSyB8d_EcK9pI7JH78IdzlzSZb9q9M6ofv4U",
    authDomain: "myhome-adi.firebaseapp.com",
    projectId: "myhome-adi",
    storageBucket: "myhome-adi.appspot.com",
    messagingSenderId: "78227269948",
    appId: "1:78227269948:web:cd0c173d01dd9e627b9639"
    };

    const app = initializeApp(firebaseConfig);
    setFirebaseApp(app);

    // Cleanup function
    return () => {
      app.delete().catch((error) => {
        console.error('Error cleaning up Firebase app:', error);
      });
    };
  }, []);

  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};