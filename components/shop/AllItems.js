import React from "react";
import { Minus, Plus } from "lucide-react";

const AllItems = ({ item, addQuantity, removeQuantity, cart }) => {
    function truncateText(text) {
      const words = text.split(" ");
      if (words.length > 3) {
        return words.slice(0, 1).join(" ") + "...";
      }
      return text;
    }
  return (
    <div className="flex items-center justify-between  ">
      <div className="flex items-center space-x-4 ">
        <img
          src={item.images[0] || "/noimage.svg"}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="max-w-[33%]">
          <h3 className="text-lg font-bold ml-1">{truncateText(item.title)}</h3>
          <p className="text-gray-600 text-sm flex items-center">
            {item.properties ? (
              Object.keys(item.properties).map((key, index) => (
                <span key={index} className="text-gray-600 gap-2 text-sm">
                  <span className="font-bold mx-1">{key}</span>{" "}
                  <span className="mx-1">{item.properties[key]}</span>
                  {/* {index < Object.keys(item.properties).length - 1 ? ", " : ""} */}
                </span>
              ))
            ) : (
              <p>{truncateText(item.description)}</p>
            )}
          </p>
        </div>
      </div>
      <div className="md:flex md:items-center md:space-x-4">
        <button
          onClick={() => removeQuantity(item._id)}
          className="bg-gray-200 p-1 md:p-2 rounded hover:bg-gray-300"
        >
          <Minus className="w-4 h-4" />
        </button>
        <p className="text-center">
          {cart.filter((id) => id === item._id).length}
        </p>
        <button
          onClick={() => addQuantity(item._id)}
          className="bg-gray-200 p-1 md:p-2 rounded hover:bg-gray-300"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="text-center">
        <p className="text-base font-bold">
          $ {cart.filter((id) => id === item._id).length * item.price}
        </p>
      </div>
    </div>
  );
};

export default AllItems;
