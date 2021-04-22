import React from 'react'
import { getOrder } from '../core/helper/coreapicalls'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import OrderCard from './helper/OrderCard';
import {useState,useEffect} from 'react'
const MyOrders = () =>{
    const userId =  isAuthenticated() && isAuthenticated().user.id
    const [orders, setOrders] = useState([])

    useEffect(() =>{
        getOrder().then(responseData =>{
            let userOrders = responseData.filter(e=>e.user===userId);
            setOrders(userOrders);
        })
        .catch(err =>console.log('Erroring Fetching [ORDER] from DB',err))
    },[])


    return (
        <Base
        title = "My Orders"
        description = 'Check out your placed orders'
        >
            <div className="row">
            {orders.map((order,index) =>{
                return(
                    <div key = {index} className='col-4'>
                        <OrderCard
                            order = {order}
                        />
                    </div>
                )
            })}
            </div>
        </Base>
    )
}

export default MyOrders;