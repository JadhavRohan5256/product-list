import React from 'react'
import UndoIcon from '@mui/icons-material/Undo';
import './FindProduct.css';
import { Link } from 'react-router-dom';

// main Find product components 
export default function FindProduct(props) {
    
    return (
        <div className="find-product">
            <Filter allProduct={props.products} setCategorys={props.setCategorys}  setSearchValue={props.setSearchValue}/> {/*child components */}
            <SearchProduct setSearchValue={props.setSearchValue} setCategory={props.setCategorys}/>  {/*child components */}
        </div>
    )
}


//filter components 
let Filter = (props) => {
    let category = [];
    props.allProduct.forEach((product) => {
        if(category.indexOf(product.category) === -1) category.push(product.category);
    })

    // onchange select box getting selected value sending to parents 
    let getSelectValue = (e) => {
        props.setCategorys(e.target.value);
        if(props.searchValue !== null) props.setSearchValue(null);
    }

    // reseting select box value
    let resetFunction = (e) => {
        e.preventDefault();
        e.target['filter-by-name'].value = 'all';
        props.setCategorys('all');
        if(props.searchValue !== null) props.setSearchValue(null);
    }
    return (
        <div className="filter-container" >
            <form action="#" onSubmit={resetFunction}  >
                <section className="filter-box">
                    <select name='filter-by-name' onChange={getSelectValue} > 
                        <option value='all'>All Product</option>
                        {
                            category.map((item, i) => {
                                return <option key={i} value={item}  >{item}</option>;
                            })
                        }
                    </select>
                </section>

                <button className="reset" type='submit' >
                    <UndoIcon />    
                    <span>Reset</span>
                </button>
            </form>
        </div>
    );
}

//components search by product
let SearchProduct = (props) => {
    let searchHandler = (e) => {
        let search = e.target.value.trim();
        props.setSearchValue(new RegExp(search, 'i')); 
    }
    return (
         <div className="search-container">
            <input type="text" name='search' id='search' placeholder='Search here..' onKeyUp={searchHandler} onKeyDown={searchHandler}/>
            <Link to="/checkout" className='add-to-cart-btn'>AddToCart</Link>
         </div>
    );
}
