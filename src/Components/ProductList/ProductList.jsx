import React from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FindProduct from '../FindProduct/FindProduct';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { ToastMessage } from '../../App';
import { Link } from 'react-router-dom';
import "./ProductList.css";
//return all product data in table formate
export default function ProductList(props) {
    const [category, setCategory] = React.useState('all');
    const [searchValue, setSearchValue] = React.useState(null);
    const HandleProduct = () => {
        if (searchValue !== null) {
            return (
                <SearchResult products={props.products} searchValue={searchValue} addToCart={props.addToCart} />
            )
        }
        else if(String(searchValue) === '/(?:)/i' || searchValue === null){
            return (
                <FilterResult products={props.products} category={category} addToCart={props.addToCart}  />
            )
        }
    }
    return (
        <>
            <FindProduct products={props.products} setCategorys={setCategory} setSearchValue={setSearchValue} />
            <div className="product-container">
                <table id='product-list'>
                    <thead>
                        <tr className='table-heading'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th></th>
                            <th>Buy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <HandleProduct />
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

let SearchResult = (props) => {
    let cnt = 0;
    let result = props.products.map((product, i) => {
        if (props.searchValue !== null) {
            if ((product.title).match(props.searchValue) !== null) {
                return <TableData key={product.id} product={product} addToCart={props.addToCart} />
            }
            else {
                cnt++;
                return "";
            }
        }
        return "";
    })

    if (cnt === result.length) {
        return (
            <tr>
                <td className='not-found' colSpan={6}>
                    <section className="not-found-group">
                        <SentimentVeryDissatisfiedIcon />
                        <span>Not Found</span>
                    </section>
                </td>
            </tr>
        );
    }
    else {
        return result;
    }
}

// Components Filter result 
let FilterResult = (props) => {
    let result = props.products.map((product, i) => {
        if (props.category === 'all') {
            return <TableData key={product.id} product={product} addToCart={props.addToCart} />
        }
        else if (props.category === product.category) {
            return <TableData key={product.id} product={product} addToCart={props.addToCart} />
        }
        return null;

    })

    return result;
}
// adding product as html table data 
let TableData = (props) => {
    let product = props.product;

    //getting reference of checkbox
    let checkBoxValue = null;
    const checkBoxRef = e => {
        checkBoxValue = e;
    };

    /**
     * this  handler is passed by parent components as props
     * for adding adding checked products 
     */
    let checkProductHandler = (e) => {
        const htmlCheckBox = e.target;
        if(htmlCheckBox.checked) {
            props.addToCart(product, false, false);
        }
        else {
            props.addToCart(product, true, false);
        }
    }

    // getting quntity onchage of quntity fields
    let updateQuntity = (e) => {
        if (e.target.value >= 1) {
            product.quntity = parseInt(e.target.value);
        }
        props.addToCart(product, false, true);
    }

    //on click of cart button 
    let addToCartButton = (e) => {
        if(checkBoxValue.checked) {
            ToastMessage(`${product.title} Already added to the carts`, true)
        }
        else {
            props.addToCart(product, false, false);
            checkBoxValue.checked = true;
        }
    }
    let AvailableStock = (props) => {
        if(props.stock > 0) {
            return (
                <>
                    <EmojiEmotionsIcon  className='success'/>
                    <span className='success'>In stock</span>
                </>
            )
        }
        else {
            return (
                <>
                    <SentimentVeryDissatisfiedIcon className='danger'/>
                    <span className='danger'>Not Available</span>
                </>
            )
        }
    }
    //return product data row
    return (
        <tr>
            <td className='product-img-container'>
                <img src={product.images[0]} alt="product" className='product-img' />
            </td>
            <td className='product-name'>
                <Link to='#'>{product.title}</Link>
            </td>
            <td className='product-stock'>
                <AvailableStock stock={product.stock}/> 
            </td>
            <td className='productPrice'>&#36;{product.price}</td>
            <td className='product-quntity-container'>
                <input type="number" defaultValue={product.quntity} name={'quntity_' + product.id} className='quntity' onChange={updateQuntity} min={0} max={100} />
                {/* <Quntity product={product} addToCart={props.addToCart} reload={false}/> */}
                <button className='product-btn' onClick={addToCartButton}>
                    <ShoppingCartIcon />
                </button>
            </td>
            <td className='select-product'>
                <input type="checkbox" ref={checkBoxRef} onClick={checkProductHandler} />
            </td>
        </tr>

    );
}
