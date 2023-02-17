import React from 'react';
import TransactionDirectionComponent from './TransactionDirection';
import { TransactionDirection } from './TransactionDirection';
import UserFinder from '../UserFinder';

class ServiceCreator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {direction: TransactionDirection.None};

        this.handleTransactionDirectionChange = this.handleTransactionDirectionChange.bind(this);
    }

    handleTransactionDirectionChange(transDir) {
        console.log("From Creator: ", transDir);
        this.setState({direction: transDir})
    }

    handleUserSelected(otherUser) {
        console.log(otherUser);
    }

    render() {
        return <div>
            <h1>Service Creator</h1>
            <TransactionDirectionComponent onChange = {this.handleTransactionDirectionChange} />
            {this.state.direction !== 0 && <UserFinder onUserSelected={this.handleUserSelected}/>}
            </div>
    }
}

export default ServiceCreator;