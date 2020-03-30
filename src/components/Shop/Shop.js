import React from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    const firstTen = fakeData.slice(0, 30)
    const [products, setProducts] = useState(firstTen);
    const [cart, serCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        serCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        handleAddProduct={handleAddProduct}
                        product={pd}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart ={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;