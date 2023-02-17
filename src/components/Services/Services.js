import React from 'react';
import { Link } from "react-router-dom";

class Services extends React.Component {

    render() {
        return <div><h1>Services</h1><Link to="/Services/Create">Request or Grant</Link></div>
    }
}

export default Services;