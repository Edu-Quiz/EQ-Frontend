import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Groups from "./pages/Groups";
import AddGroup from "./pages/Groups/AddGroup";
import ViewGroup from "./pages/Groups/ViewGroup";

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
          <Route path="/group/:group_id" element={<ViewGroup />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/add" element={<AddGroup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
