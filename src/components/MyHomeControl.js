import React from 'react';
import { getDatabase } from "firebase/database";

class MyHomeControl extends React.Component {

    constructor(props) {
        super(props);

        this.db = getDatabase();
    }

    componentDidMount() {       
    }

    render() {
        return <div>
            <p>My Home Control</p>
            </div> 
    }
}

export default MyHomeControl;