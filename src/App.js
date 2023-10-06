import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Groups from "./pages/Groups";
import AddGroup from "./pages/AddGroup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/group/:id" element={<EditUser />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/add" element={<AddGroup />} />
          <Route path="/groups/edit:id" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
