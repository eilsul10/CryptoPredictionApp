import React, {Component} from 'react';
import axios from 'axios';
import { createChart } from 'lightweight-charts';

export default class Bitcoin extends Component {
    // Initialize the state

    constructor(props) {
        super(props);
        this.state = {bitcoinPrice: ''};
    }

    componentDidMount () {

        setInterval(this.newBitcoinPrice.bind(this), 1000);

        this.bitcoinChart();
    }

    componentWillUnmount () {
        
        this.bitcoinChart();
    }


    newBitcoinPrice() {
        axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
        .then(response => {
            this.setState({ bitcoinPrice: response.data.data.amount });        
        })
        .catch(function (error){
            console.log(error);
        })
    }

    bitcoinChart(){
    const chart = createChart(document.body, { width: 400, height: 300 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
    { time: '2019-04-16', value: 80.01 },
    { time: '2019-04-17', value: 96.63 },
    { time: '2019-04-18', value: 76.64 },
    { time: '2019-04-19', value: 81.89 },
    { time: '2019-04-20', value: 74.43 },
    ]);
}


    render() {
        return (
            <div class="p-3 mb-2 bg-dark text-white">
                <h3>Bitcoin Price</h3>
                <p> 
                    { this.state.bitcoinPrice }
                </p>

                <h3>Interesting Trends</h3>
                <p>
                { this.bitcoinChart }
                </p>
            </div>
        )
    }

}