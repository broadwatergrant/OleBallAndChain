import React from 'react';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

class UserFinder extends React.Component {

    constructor(props) {
        super(props);

        this.db = getFirestore();

        this.state = {queryText: "", response: "Search for a User"};

        this.handleChange = this.handleChange.bind(this);
        this.executeQuery = this.executeQuery.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if(event.key === 'Enter') {
            this.executeQuery();
        }
    }

    handleChange(event) {
        this.setState({queryText: event.target.value});
    }

    async executeQuery() {
        const atIndex = this.state.queryText.indexOf("@");
        const dotIndex = this.state.queryText.indexOf(".");

        if(atIndex === -1 || dotIndex === -1 || dotIndex < atIndex) {
            this.setState({response: "Invalid Email."});
            return;
        }
        this.setState({response: "Searching..."});
        const userRef = collection(this.db, "user");
        const q = query(userRef, where("email", "==", this.state.queryText));
        const querySnap = await getDocs(q);

        if(querySnap.size === 0) {
            this.setState({response: "No User Found"});
            return;
        }

        if(querySnap.size > 1) {
            console.error("Recieved multiple matches")
        }

        const otherUserDoc = querySnap.docs[0];
        this.setState({response: "Found: " + otherUserDoc.data().displayName});
        this.props.onUserSelected({
            uid: otherUserDoc.id,
            displayName: otherUserDoc.data().displayName,
            email: otherUserDoc.data().email
        });
    }

    render() {
        return <div>Email: <input type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input><button onClick={this.executeQuery}>Search</button>
        <br /><p>{this.state.response}</p></div>
    }
}

export default UserFinder;