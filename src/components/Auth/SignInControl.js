import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

class SignInControl extends React.Component {
    
    constructor(props) {
        super(props);

        this.auth = getAuth();
        this.provider = new GoogleAuthProvider();
        this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.signInWasClicked = this.signInWasClicked.bind(this);
    }

    signInWasClicked() {
        signInWithPopup(this.auth, this.provider)
        .then().catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    render() {
        return <button onClick={this.signInWasClicked}>Sign In</button>
    }
}



export default SignInControl;