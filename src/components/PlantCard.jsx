import React from "react";
import { useState } from "react";

function PlantCard({ plant: { name, price, image, id } }) {
  const [clicked, setClicked] = useState(false)
  
  return (
    <li className="card" data-testid="plant-item" id={id}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {!clicked ? (
        <button className="primary" onClick={() => setClicked(true)}>In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
