import React from 'react';
import { getAuth, signOut } from "firebase/auth";

class SignOutControl extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.auth = getAuth();
        this.signOutWasClicked = this.signOutWasClicked.bind(this);
    }
    
    
    signOutWasClicked() {
        console.log("Sign Out Clicked");
        signOut(this.auth).then().catch((error) => {
            console.error(error);
        });
    }

    render() {
        return <button onClick={this.signOutWasClicked}>Sign Out</button>
    }
}



export default SignOutControl;