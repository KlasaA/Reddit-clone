import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Posts, Favorites } from "./pages";
import { ServiceProvider } from "./contexts/ServiceProvider";

function App() {
  return (
    <ServiceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </ServiceProvider>
  );
}

export default App;
