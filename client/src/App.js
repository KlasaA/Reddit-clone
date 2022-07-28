import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Posts } from "./pages";
import {ServiceProvider} from "./contexts/ServiceProvider";

function App() {
  return (
    <ServiceProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </ServiceProvider>
  );
}

export default App;
