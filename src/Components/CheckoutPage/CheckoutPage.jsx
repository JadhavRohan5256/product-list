import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './CheckoutPage.css'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// main checkout page components 
export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {

    return (
      <div className="checkout-wrapper">
        <LeftSide products={this.props.products} addToCart={this.props.addToCart} />
        <RightSide products={this.props.products} removeCart={this.props.removeCart} />
      </div>
    )
  }
}


// left side components of checkout page 
export let LeftSide = (props) => {

  return (
    <section className="left-container">
      <table id='checkout-table'>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quntity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {
            props.products.map((product, i) => {
              return <TableData key={i} product={product} addToCart={props.addToCart} />
            })
          }
        </tbody>
      </table>
    </section>
  );
}

// table data of left side components 
let TableData = (props) => {
  //on click close icon product are delteing from parents
  let removeProductHandler = (e) => {
    props.addToCart(props.product, true, false, true);
  }


  let increaseQuntity = (e) => {
    if(props.product.quntity <= 100) {
      props.product.quntity += 1;
      props.addToCart(props.product, false, true, true);
    } 
  }
  let decreaseQuntity = (e) => {
    if(props.product.quntity > 1) {
      props.product.quntity -= 1;
      props.addToCart(props.product, false, true, true);
    }
    
  }
  return (
    <tr>
      <td className='checkout-img-box'>
        <CloseIcon onClick={removeProductHandler} className='closeIcon'/>
        <img src={props.product.images[0]} alt="product-img" />
      </td>
      <td>{props.product.title}</td>
      <td>&#36; {props.product.price}</td>
      <td>
        <section className="quntity-box">
          <RemoveIcon className='decreaseIcon' onClick={decreaseQuntity}/>
          <span className='quntit' >{props.product.quntity}</span>
          <AddIcon className='increaseIcon' onClick={increaseQuntity}/>
        </section>
      </td>
      <td className="product-total">&#36;{props.product.quntity * props.product.price}</td>
    </tr>
  )
}

// Right side components of checkout page 
export let RightSide = (props) => {
  let subTotal = 0;
  let total = 0;
  props.products.forEach((product) => {
    subTotal += product.price;
    total += (product.price * product.quntity);
  });

  // if cart is empty then disabled proceed btn 
  let disabled = '';
  if (total <= 0) disabled = 'disabled';

  let removeHandler = () => {
    props.removeCart();
  }
  return (
    <section className="right-container">
      <h2 className='cart-title'>Cart total</h2>
      <section className="subtotal">
        <h3>Subtotal</h3>
        <span>&#36;{subTotal}</span>
      </section>
      <section className="total">
        <h3>Total</h3>
        <span>&#36;{total}</span>
      </section>
      <section className="proceed-box">
        <Link to='/welcome' className={'proceed-btn ' + disabled} onClick={removeHandler}>proceed to checkout</Link>
      </section>
    </section>
  );
}