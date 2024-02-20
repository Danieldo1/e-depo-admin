import React from 'react'
import { Minus, Plus } from "lucide-react";

const AllItems = ({ item, addQuantity, removeQuantity, cart}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={item.images[0] || "/noimage.svg"}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-gray-500 line-clamp-1">{item.description}</p>
        </div>
      </div>
      <div className="md:flex md:items-center md:space-x-4">
        <button
          onClick={() => removeQuantity(item._id)}
          className="bg-gray-200 px-2 py-2 rounded hover:bg-gray-300"
        >
          <Minus className="w-4 h-4" />
        </button>
        <p className="text-center">
          {cart.filter((id) => id === item._id).length}
        </p>
        <button
          onClick={() => addQuantity(item._id)}
          className="bg-gray-200 px-2 py-2  rounded hover:bg-gray-300"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div>
        <p className="text-lg font-bold">
          $ {cart.filter((id) => id === item._id).length * item.price}
        </p>
      </div>
    </div>
  );
}

export default AllItems