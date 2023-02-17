import React from 'react';
import { Link } from "react-router-dom";

class NoPage extends React.Component {

    render() {
        return <div><h1>404</h1><Link to="/">Home</Link></div>
    }
}

export default NoPage;