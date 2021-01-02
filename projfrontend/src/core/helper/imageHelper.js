import React from 'react'
import './image.css'
const ImageHelper= ({product}) => {

    const imageurl = product?product.image:'https://media-exp1.licdn.com/dms/image/C4E03AQGZpZ28XDX27g/profile-displayphoto-shrink_200_200/0/1604828991672?e=1611792000&v=beta&t=DQgtpsQLmzuZKZj-2GBFjdwtE6tkD6Z_HlxK4r2Y3tY';
    return (
        <div className='rounded border border-dark pd-2'>
        <img src={imageurl}
        className='rounded mb-3'
        alt = '#'
        />    
        </div>
    )
}
export default ImageHelper;
