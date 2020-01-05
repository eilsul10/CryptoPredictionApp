import React, {Component} from 'react';
import axios from 'axios';
// import { createChart } from 'lightweight-charts';
// import Chart from 'chart.js';

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
        
        // this.bitcoinChart();
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
    // const chart = createChart(document.body, { width: 300, height: 300 });
    // const lineSeries = chart.addLineSeries({
    //     title: 'May 2017 to October 2017',
    // });
    // lineSeries.setData([
    // { time: '2017-05-01', value: 2095.2 },
    // { time: '2017-06-01', value: 2484.1 },
    // { time: '2017-07-01', value: 2873.1 },
    // { time: '2017-08-01', value: 4817.7 },
    // { time: '2017-09-01', value: 4373.2 },
    // { time: '2017-10-01', value: 6484.5 },
    // ]);
    // chart.applyOptions({
    //     priceScale: {
    //         autoScale:true,
    //     },
    // })
}


    render() {














        return (
            <div class="p-3 mb-2">
                <h3>Current Bitcoin Price</h3>
                <p> 
                    { this.state.bitcoinPrice }
                </p>

                <h3>Prediction</h3>
                <h5>By 10/24/19: Bitcoin will pump back to 12k</h5>
                <p>The trend today (10/16/19) looks similar to the trend from July 2017 to September 2017</p>
                <h6>
                May to October 2017
                { this.bitcoinChart }
                </h6>
            </div>
        )
    }

}