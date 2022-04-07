import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from '../src/Main.module.scss';

function App() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsIsAvailable] = useState(false);
    const logo = require('../src/image.jpg');

    useEffect(() => {
        axios('https://artisant.io/api/products')
            .then(res => {
                setProducts(res.data.data.products)
                setAllProducts(res.data.data.products)
            })
            .then(() => {
                setIsLoading(true);
            });
    }, [])

    const showAll = () => {
        setIsIsAvailable(false);
        setProducts(allProducts);
    }
    const showAvailable = () => {
        setIsIsAvailable(true);
        let arr: [] = [];
        products.map(item => {
                if (item['quantity_available'] > 0) {
                    arr.push(item);
                }
            }
        )
        setProducts(arr);
    }

    return (
        <main>
            {
                isLoading
                    ?
                    <></>
                    :
                    <div className={styles.flexWrapper}>
                            <div className={styles.availableBlock}>
                                {
                                    isAvailable
                                        ?
                                        <a href={'#'} onClick={showAll} className={styles.showAvailable}>Show all items</a>
                                        :
                                        <a href={'#'} onClick={showAvailable} className={styles.showAvailable}>Show available
                                            items</a>
                                }
                            </div>
                            <div className={styles.flexWrapper}>
                                {
                                    products.map((item, i) => (
                                        <div className={styles.wrapper} key={i}>
                                            <div>
                                                <div className={styles.wrapItem}>
                                                    <img src={logo} alt={styles.images}/>
                                                    <div className={styles.itemName}>{item['name']}</div>
                                                    <div className={styles.created_by}>
                                                        <p>created by</p>
                                                        {item['created_by']['display_name']}
                                                    </div>
                                                    <div className={styles.itemDescription}>
                                                        <div>
                                                            <p className={styles.available}>available</p>
                                                            <h3>
                                                                <p className={styles.availableItem}>{item['quantity_available']}</p>
                                                                of
                                                                <p className={styles.availableItem}>{item['quantity']}</p>
                                                            </h3>
                                                        </div>
                                                        <div className={styles.priceItem}>
                                                            <p className={styles.price}>price</p>
                                                            <h3>
                                                                {item['initial_price']} ETH
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    </div>
            }
        </main>
    )
}

export default App;
