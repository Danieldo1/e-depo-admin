import React from 'react'

const Products = ({products}) => {
  return (
    <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-4 mt-4">
            {products.map((product) => (
                <div key={product._id} className="w-1/4">
                    <div className="border p-4 rounded-md bg-gray-50">
                        <h3 className="text-lg font-bold">{product.title}</h3>
                        <p className="text-gray-600">{product.description}</p>
                    </div>
                </div>
        ))}
        </div>
    </div>
  )
}

export default Products