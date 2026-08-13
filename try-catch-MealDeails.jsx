import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MealDetails() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMealDetails() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch meal details");
        }

        const data = await response.json();

        if (!data.meals) {
          throw new Error("Meal not found");
        }

        setMeal(data.meals[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getMealDetails();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width="300"
      />

      <h2>Category: {meal.strCategory}</h2>

      <h2>Area: {meal.strArea}</h2>

      <h2>Instructions</h2>

      <p>{meal.strInstructions}</p>
    </div>
  );
}

export default MealDetails;