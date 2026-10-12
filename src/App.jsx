import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import PlaceDetails from "./pages/PlaceDetails";
import StaysPage from "./pages/StaysPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/explore"
        element={<ExplorePage />}
      />

      <Route
        path="/place/:placeId"
        element={<PlaceDetails />}
      />

      <Route
        path="/stays"
        element={<StaysPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
    </Routes>
  );
}

export default App;