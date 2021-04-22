import React from 'react'
import Menu from './Menu'

export default function Base({
    title = 'The Base Page',
    className = 'bg-dark text-white p-4',
    description = 'My description',
    children 
}) {

    

    return (
        
        <div>
            <Menu/>
            <div className="container-fluid mt-4">
                <div className="jumbotron bg-light text-dark text-center">
                    <h2 className="display-4">
                        {title}
                    </h2>
                    <p className='lead'>{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fuild text-white text-center py-3" style={{background:"#046150"}}>
                    <h4>For any queries reach me out on instagram</h4>
                    
                        <a href="https://www.linkedin.com/in/theblackmarlin/" target="_blank"><button className="btn btn-dark btn-lg" > Contact me</button></a>
                    <div className="container">
                        <span className='text-danger'>
                            Django Reacteeeeeeeeeeerrrrrrr
                        </span>
                    </div>
                </div>
            </footer>

        </div>
    )
}
