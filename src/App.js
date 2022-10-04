import React, { Component } from 'react'
import './App.css';
import ProductList from './Components/ProductList/ProductList';
import axios from 'axios';
import CheckoutPage from './Components/CheckoutPage/CheckoutPage';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome/Welcome';
import CachedIcon from '@mui/icons-material/Cached';
const baseURL = 'https://dummyjson.com/products';

export let ToastMessage = (message, show) => {
  let tost = document.querySelector('#tost-message');
  (show) ? tost.classList.add('visible') : tost.classList.remove('visible')
  if (show) tost.innerHTML = document.createElement('span').textContent = message;

  setTimeout(() => {
    tost.classList.remove('visible');
  }, 4000);
}

//main app components
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: null,
      isLoaded: false,
      allProducts: [],
      cartProduct: [],
    }
  }
  //for fetching all product api data
  componentDidMount() {
    axios.get(baseURL).then((response) => {
      //adding default quntity in all products data
      let products = response.data.products;
      products.forEach((product) => {
        product.quntity = 1;
      })

      this.setState({ isLoaded: true, allProducts: products });
    }).catch((error) => {
      this.setState({ isError: error });
    });


  }

  render() {
    let LoadingProducts = () =>{
      if(this.state.isLoaded === true && this.state.isError === null)
        {
           return <ProductList products={this.state.allProducts} addToCart={addToCart} />
        }
        else {
          return ( <div className='loading'><CachedIcon /></div>)
        }
    }
    //adding checked product in state
    let addToCart = (product, markDeletion, update, reload) => {

      if(markDeletion || update) {
        this.state.cartProduct.forEach((element, idx) => {
          if(markDeletion && element.title === product.title) {
            this.state.cartProduct.splice(idx, 1);
            ToastMessage(`${product.title} Product removed from the cart`, true);
          }
          if(update && element.title === product.title){
            element.quntity = product.quntity;
            ToastMessage(`${product.title} Product quntity changed.`, true);
          } 
          if(reload) this.setState({cartProduct : this.state.cartProduct});
        })
      }
      else {
        let flag = true;
        this.state.cartProduct.forEach((element) => {
          if(element.title === product.title ) {
            console.log('modified', element.quntity);
            flag = false;
            if(element.quntity !== product.quntity) element.quntity = product.quntity;
          }
        })

        if(flag) this.state.cartProduct.push(product);
        ToastMessage(`${product.title} Product added to the carts`, true);
      }
      

    }

    let removeCarts = () => {
      this.setState({cartProduct : []});
    }
    return (
      <>
        <Routes>
            <Route path='/checkout' element={
                <CheckoutPage  
                    products={this.state.cartProduct}
                    addToCart={addToCart} 
                    removeCart = {removeCarts}
                />} 
            />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/'  element={LoadingProducts()} />
        </Routes>
      </>
    )
  }
}

export default App
