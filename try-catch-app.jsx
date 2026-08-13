import { BrowserRouter, Routes, Route } from "react-router-dom";

import Categories from "./pages/Categories";
import Meals from "./pages/Meals";
import MealDetails from "./pages/MealDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/meals/:category" element={<Meals />} />
        <Route path="/meal/:id" element={<MealDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
