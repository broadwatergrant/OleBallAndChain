import './Main.css';
import React from 'react';
import SignInControl from './components/Auth/SignInControl';
import App from './components/App';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, child, update } from "firebase/database";

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
    this.db = getDatabase();
    this.state = {user: null};

    this.handlePotentialNewUser = this.handlePotentialNewUser.bind(this);
    this.postNewUserData = this.postNewUserData.bind(this);
  }

  postNewUserData(user) {
    if(!user || !user.email || !user.uid || !user.displayName) {
      console.error("Cannot post new user data for invalid user");
      return;
    }

    const userRef = ref(this.db, 'user');
    const userKey = user.uid;

    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email
    };

    const updates = {};
    updates['/' + userKey] = userData;

    update(userRef, updates);
  }

  handlePotentialNewUser(user) {
    if(!user || !user.uid) {
      console.error("Cannot handle null user");
      return;
    }

    const userRef = ref(this.db, 'user');
    get(child(userRef, user.uid)).then((snapshot) => {
      if(!snapshot.exists()) {
        this.postNewUserData(user);
      }
    }).catch((error) => {
      console.error(error);
    });
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
            <App />
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
