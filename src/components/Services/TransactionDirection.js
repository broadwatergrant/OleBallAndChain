import React from 'react';

export const TransactionDirection = {
    None: 0,
    Request: 1,
    Grant: 2
}

class TransactionDirectionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: "grant"};

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }

    render() {
        return <div>
                <select id="lang" onChange={this.onChange} value={this.state.value}>
                <option value={TransactionDirection.None}>Select:</option>
                <option value={TransactionDirection.Request}>Request Service From:</option>
                <option value={TransactionDirection.Grant}>Grant Service To:</option>
                </select>
                <p></p>
            </div> ;
    }
}

export default TransactionDirectionComponent;