import './App.css'
import React from 'react';
import { Link } from "react-router-dom";
import SignOutControl from './Auth/SignOutCountrol';

class App extends React.Component {

    render() {
        return <div>
            <Link to="Services">Services</Link>
            <SignOutControl />
            </div> ;
    }
}

export default App;