import "./styles/App.scss";
import "./styles/partials/_globals.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ItemsPage from "./pages/ItemsPage/ItemsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage"

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:listId" element={<ItemsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
