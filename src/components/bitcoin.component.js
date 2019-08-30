import React, {Component} from 'react';
import axios from 'axios';

export default class Bitcoin extends Component {
    // Initialize the state

    constructor(props) {
        super(props);
        this.state = {bitcoinPrice: ''};
    }

    componentDidMount () {
        axios.get('https://api.coinbase.com/v2/prices/BTC-USD/buy')
        .then(response => {
            console.log(response);
            this.setState({ bitcoinPrice: response.data.data.amount });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h3>Bitcoin Price</h3>
                <p>
                    { this.state.bitcoinPrice }
                </p>
            </div>
        )
    }

}