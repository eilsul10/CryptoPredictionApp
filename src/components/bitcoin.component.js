import React, {Component} from 'react';
import axios from 'axios';

export default class Bitcoin extends Component {
    // Initialize the state

    constructor(props) {
        super(props);
        this.state = {bitcoinPrice: ''};
    }

    componentDidMount () {

        setInterval(this.newBitcoinPrice.bind(this), 1000);
        // this.setState({intervalId: intervalId})
        // this.setState({bitcoinPrice: updatedPrice});
        // this.newBitcoinPrice(updatedPrice)
        // axios.get('https://api.coinbase.com/v2/prices/BTC-USD/buy')
        // .then(response => {
        //     console.log(response);
        //     this.setState({ bitcoinPrice: response.data.data.amount });
        //     setInterval(() => { 
        //         this.componentDidMount()
        //     }, 1000);
        
        // })
        // .catch(function (error){
        //     console.log(error);
        // })
    }

    // componentWillUnmount() {
    //     clearInterval(this.state.intervalId)
    // }

    newBitcoinPrice() {
        axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
        .then(response => {
            // console.log(response);
            this.setState({ bitcoinPrice: response.data.data.amount });
            // setInterval(() => { 
            //     this.componentDidMount()
            // }, 1000);
        
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