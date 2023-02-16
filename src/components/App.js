import React from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import SignOutControl from './Auth/SignOutCountrol';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {author: "Not Defined", phrase: "Not Defined"};

        this.db = getDatabase();
        this.metaUpdateHandler = this.metaUpdateHandler.bind(this);
    }

    metaUpdateHandler(snapshot) {
        const metaData = snapshot.val();
        this.setState(metaData);
    }

    componentDidMount() {       
        const metaRef = ref(this.db, 'meta');
        onValue(metaRef, this.metaUpdateHandler);
    }

    render() {
        return <div>
            <p>Author: {this.state.author}</p>
            <p>Phrase: {this.state.phrase}</p>
            <SignOutControl />
            </div> 
    }
}

export default App;