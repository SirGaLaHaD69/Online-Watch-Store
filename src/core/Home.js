import React from 'react'
import {useState,useEffect} from 'react'
import {getProduct} from './helper/coreapicalls'
import Base from './Base'
import '../styles.css'
import Card from './Card'
const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() =>{
        getProduct().then(responseData =>{
            setProducts(responseData);
        })
        .catch(err =>console.log('Erroring Fetching from DB',err))
    },[])

    return (
        <Base 
        title = "Marlin Tees"
        description = 'Welcome to Marlin T shirt store'
        >
            <div className="row">
            {products.map((product,index) =>{
                return(
                    <div key = {index} className='col-4'>
                        <Card
                            product = {product}
                        />
                    </div>
                )
            })}
            </div>
        </Base>
    )
}

export default Home;