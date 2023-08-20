import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Pizza Special",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m2",
//     name: "Fish Pasta",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);

  const { loading, error, httpRequest } = useHttp();
  useEffect(() => {
    let loadedMeals = [];

    const httpDataHandler = (data) => {
      for (const i in data) {
        const priceSrtring = data[i].price;
        loadedMeals.push({
          id: i,
          price: +priceSrtring,
          name: data[i].name,
          description: data[i].description,
        });
      }
      setMeals(loadedMeals);
    };

    httpRequest(
      {
        url: "https://react-http-testing-f9590-default-rtdb.firebaseio.com/meals.json",
      },
      httpDataHandler
    );
  }, [httpRequest]);

  const mealList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Card>
        {loading && <h3 style={{ textAlign: "center" }}>Loading....</h3>}
        {!loading && !error && (
          <div>
            <h1 style={{ textAlign: "center" }}>
              <u>Meal List</u>
            </h1>
            <ul>{mealList}</ul>
          </div>
        )}
        {error && (
          <h2 style={{ textAlign: "center" }}>Something went Wrong..</h2>
        )}
        {}
      </Card>
    </>
  );
};

export default MealsAvailable;
