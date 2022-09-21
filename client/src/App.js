import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Posts, Favorites, UserInfo, Followed } from "./pages";
import { ServiceProvider } from "./contexts/ServiceProvider";


function App() {
  return (
    <ServiceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/followed-users" element={<Followed />} />
          <Route path="/UserInfo" element={<UserInfo />} />
        </Routes>
      </Router>
    </ServiceProvider>
  );
}

export default App;
