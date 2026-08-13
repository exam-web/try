import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Meals() {
  const { category } = useParams();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getMeals() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }

        const data = await response.json();

        setMeals(data.meals || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getMeals();
  }, [category]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>{category} Foods</h1>

      {meals.map((meal) => (
        <div key={meal.idMeal}>
          <h2>{meal.strMeal}</h2>

          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width="200"
          />

          <br />

          <button
            onClick={() =>
              navigate(`/meal/${meal.idMeal}`)
            }
          >
            View Details
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Meals;