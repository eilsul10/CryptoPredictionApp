import React, {Component} from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import Bitcoin from './bitcoin.component';
import $ from 'jquery';
import moment from 'moment';

export default class PriceTable extends Component {

    constructor(props) {
        super(props);
        this.state = {bitcoinPrice: '', date: ''};
    }

    componentDidMount () {
        // axios.get('mongodb://127.0.0.1:27017/todos/prices')  
        // .then(
        //     function (response) {    
        //     const prices = response.data;
        //     this.setState({prices})
// })  

    setInterval(this.newBitcoinPrice.bind(this), 20000);
    setInterval(this.newDate.bind(this), 20000);

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

    newDate() {
      this.setState({date: moment().format('MMMM Do YYYY, h:mm:ss a')})
    }

    // appendTable() {
    //   let newRow = $("<tr>").append (
    //     $("<td>").text("date"),
    //     $("<td>").text(this.state.bitcoinPrice)
    //   )

    //   $(".table").append(newRow);
    // }


    render() {
      
      let newRow = $("<tr>").append (
        $("<td>").text(this.state.date),
        $("<td>").text(this.state.bitcoinPrice)
      )

      $(".table").append(newRow);

        return (
            <table class="table">
            <thead>
              <tr>
              <th scope="col">Date</th>
              <th scope="col">Price</th>  
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{this.state.bitcoinPrice}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )
    }
}
