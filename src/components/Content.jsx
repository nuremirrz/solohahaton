import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { clientContext } from '../contexts/ClientContext';
import MediaCard from "./Card"
import Pagination from './Pagination';
import Loader from "../components/Loader";

const Content = () => {
    const { products, getProduct, currentPosts } = useContext(clientContext)
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        getProduct()
    }, [])
    console.log(products);

    const [region, setRegion] = useState(null)
    console.log(region);

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    useEffect(() => {
        if (region === "Иссык-Кульская область") {
            let arr = products.filter(item => item.region === "Иссык-Кульская область")
            setFilteredProducts(arr)
        }
        else if (region === "Нарынская область") {
            let arr = products.filter(item => item.region === "Нарынская область")
            setFilteredProducts(arr)
        }
        else if (region === "Джалал-Абадская область") {
            let arr = products.filter(item => item.region === "Джалал-Абадская область")
            setFilteredProducts(arr)
        }
    }, [region])
    console.log(filteredProducts)

    return (
        <>
            <div>
                <div className="big-img">
                    <img  src="https://travelunity.org/wp-content/uploads/2020/07/photo-1525026198548-4baa812f1183-1533x800.jpeg" alt="Party" />
                    <span></span>
                    
                </div>
                <div >                    
                    <div class="carousel-wrapper">
                        <div data-slides-per-row="3">
                            <div class="swiper-wrapper" >
                                <div className="filter">
                                    <div class="head-wears-img">

                                        <img onClick={() => {
                                            setRegion("Иссык-Кульская область")
                                        }} className="img1" src="https://www.open.kg/uploads/posts/2014-02/1392721663_themes-sp-3-images-mapkr_oblasti-pastbisha-issik-kul.jpg" alt="" />
                                    </div>                                    
                                </div>

                                <div className="filter">
                                    <div class="sweat-shirts-img">
                                        <img onClick={() => {
                                            setRegion("Нарынская область")
                                        }} className="img2" src="https://www.open.kg/uploads/posts/2014-02/1391536540_themes-sp-3-images-mapkr_oblasti-pastbisha-narin.jpg" alt="" />
                                    </div>                                    
                                </div>

                                <div className="filter">
                                    <div class="sweat-pants-img">
                                        <img onClick={() => {
                                            setRegion("Джалал-Абадская область")
                                        }} className="img3" src="http://akk.kg/wp-content/uploads/2019/09/gallery_jalalabad_region_07.jpg" alt="" />
                                    </div>                                   
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>

                <div className="js-products">

                    {
                        filteredProducts ? (
                            region ? (
                                <>
                                    <Button onClick={() => setRegion(null)}>Show all travels </Button>
                                    <div className="content">
                                        <div className="content-block">
                                            {filteredProducts.map(item => {
                                                return <MediaCard item={item} key={item.id} />
                                            })
                                            }
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <div className="content">
                                    <div className="content-block">
                                        {currentPosts.map(item => (
                                            <MediaCard item={item} key={item.id} />
                                        ))
                                        }
                                    </div>
                                    <Pagination />
                                </div>
                            )
                        ) : (
                            <Loader/>
                        )}
                </div>
            </div>
        </>

    );
};

export default Content;
