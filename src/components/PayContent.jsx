import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'; 
import { Link } from 'react-router-dom';
import Comment from '../components/Comment'


export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
  render() {
    return (
      <div id="PaymentForm">
        <Cards id="pay"
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <h2 className="creditzag">Введите ваши данные</h2>
        <form className="inpForm">
            <input className="creditcard"
              type="text"
              name="name"
              placeholder="User Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
        	<input className="creditcard"
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input className="creditcard"
            type="tel"
            name="expiry"
            placeholder="Card Validity"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />          
          <input className="creditcard"
            type="tel"
            name="cvc"
            placeholder="Card's cvc  "
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <Link to="/">
            <button className="pay-btn">Buy</button>
          
          </Link>
        </form>
           
      </div>
    );
  }
}