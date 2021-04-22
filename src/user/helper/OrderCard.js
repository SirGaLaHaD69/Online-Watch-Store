import React from 'react'

export default function OrderCard({order}) {

    const  formatDate = (date) => date.slice(0,10);

    return (
        <div className="card m-3" style={{width: "18rem"}}>
        <div className="card-body">
            <h5 class="card-title">Order id: {order.transaction_id}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Amount :{order.total_amount}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Order on :{formatDate(order.created_at)}</h6>
            <p class="card-text">{order.product_names}</p>
          
        </div>
        </div>
    )
}
