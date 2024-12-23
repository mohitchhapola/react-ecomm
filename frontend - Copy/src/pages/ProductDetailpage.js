import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDeatail from '../features/product-list/components/ProductDeatail'

function ProductDetailpage() {
  return (
    <div>
        <Navbar>
            <ProductDeatail></ProductDeatail>
        </Navbar>
    </div>
  )
}

export default ProductDetailpage