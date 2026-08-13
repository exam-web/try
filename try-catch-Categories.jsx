import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function getCategories() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      setCategories(data.categories);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Meal Categories</h1>

      <button onClick={getCategories}>
        Show Categories
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {categories.map((category) => (
        <div key={category.idCategory}>
          <h2>{category.strCategory}</h2>

          <img
            src={category.strCategoryThumb}
            alt={category.strCategory}
            width="200"
          />

          <br />

          <button
            onClick={() =>
              navigate(`/meals/${category.strCategory}`)
            }
          >
            Show Foods
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Categories;