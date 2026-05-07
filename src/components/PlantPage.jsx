import React from "react";
import { useState, useEffect } from "react"
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

function PlantPage() {
  const [searchValue, setSearchValue] = useState("");
  const [plants, setPlants] = useState([]);
  const [inputDetails, setInputDetails] = useState({
    name: "",
    image: "",
    price: 0
  })
  const [trigger, setTrigger] = useState(0)

  function handleSearch(e) {
    const cleanedUpValue = e.target.value.trim().toLowerCase();
    setSearchValue(cleanedUpValue);
  }

  const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchValue))

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((p) => setPlants(p))
      .catch((err)=> console.log(err))
  }, [trigger])

  const handleSubmit = () => {
    if (inputDetails.name.trim() && inputDetails.image.trim() && inputDetails.price.trim()) {
      const newPlant = {
        name: inputDetails.name,
        image: inputDetails.image,
        price: inputDetails.price
      }
      fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlant)
      })
      .then((r) => r.json())
      .then((r) => {
        console.log(r)
        setPlants([...plants, r])
        setInputDetails({
          name: "",
          image: "",
          price: ""
        })
        (trigger)? setTrigger(0) :setTrigger(1)
      })
      .catch((err) => console.log(err))
  }
}

  return (
    <main>
      <NewPlantForm inputDetails={inputDetails} handleSubmit={handleSubmit} setInputDetails={setInputDetails}/>
      <Search onSearch={handleSearch} value={searchValue}/>
      <PlantList plants={filteredPlants}/>
    </main>
  );
}

export default PlantPage;
