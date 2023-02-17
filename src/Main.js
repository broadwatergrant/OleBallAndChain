import './Main.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInControl from './components/Auth/SignInControl';
import App from './components/App';
import MyHomeControl from './components/MyHomeControl';
import Services from './components/Services/Services';
import ServiceCreator from './components/Services/ServiceCreator';
import NoPage from './components/NoPage';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcBvxXxBucncF7wW_RkbQIKpRVKCuM4AE",
  authDomain: "oleballandchain-79f0a.firebaseapp.com",
  projectId: "oleballandchain-79f0a",
  storageBucket: "oleballandchain-79f0a.appspot.com",
  messagingSenderId: "576693658000",
  appId: "1:576693658000:web:5d0168d5b0c122f4ca1315",
  measurementId: "G-NPVPXE08N9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

class Main extends React.Component {
  
  constructor() {
    super();
    this.auth = getAuth();
    this.db = getFirestore();
    this.state = {user: null};

    this.handlePotentialNewUser = this.handlePotentialNewUser.bind(this);
    this.postNewUserData = this.postNewUserData.bind(this);
  }

  async postNewUserData(user) {
    if(!user || !user.email || !user.uid || !user.displayName) {
      console.error("Cannot post new user data for invalid user");
      return;
    }

    const userData = {
      displayName: user.displayName,
      email: user.email
    };

    await setDoc(doc(this.db, "user", user.uid), userData);
  }

  async handlePotentialNewUser(user) {
    if(!user || !user.uid) {
      console.error("Cannot handle null user");
      return;
    }

    const userRef = doc(this.db, "user", user.uid);
    const userData = await getDoc(userRef);

    if(!userData.exists()) {
      this.postNewUserData(user);
    }
  }
  
  componentDidMount() {  
    onAuthStateChanged(this.auth, (authUser) => {
      if (authUser) {
          this.handlePotentialNewUser(authUser);
          this.setState({user: authUser});
      } else {
          this.setState({user: null});
      }
    });    
  }

  render() {
    if (this.state.user != null) {
      return (
        <div className="App">
          <header className="App-header">
            <BrowserRouter>
              <Routes>
                  <Route index element={<App />} />
                  <Route path="MyHome" element={<MyHomeControl />}/>
                  <Route path="Services" element={<Services />}/>
                  <Route path="Services/Create" element={<ServiceCreator />}/>
                  <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </header>
        </div>

      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <SignInControl />
          </header>
        </div>
      );
    }
  }

}

export default Main;
