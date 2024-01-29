import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
