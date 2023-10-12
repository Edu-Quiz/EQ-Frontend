import { App } from 'antd';
import Users from "./pages/Users/Users";
import Groups from "./pages/Groups/Groups";
import Login from "./components/Auth/Login";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import AddGroup from "./pages/Groups/AddGroup";
import EditGroup from "./pages/Groups/EditGroup";
import ViewGroup from "./pages/Groups/ViewGroup";
import RenderGame from './pages/Game/RenderGame';
import AddAssignment from "./pages/Assignments/AddAssignment";
import Dashboard from "./pages/General/Dashboard";
import PageLayout from "./pages/General/PageLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function ReactApp() {

  return (
    <div>
      <BrowserRouter>
        <App>
          <PageLayout route={window.location.pathname}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
              <Route path="/group/:group_id" element={<ViewGroup />} />
              <Route path="/group/:group_id/assignment/add" element={<AddAssignment />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/add" element={<AddGroup />} />
              <Route path="/groups/edit/:id" element={<EditGroup />} />
              <Route path="/game/:id" element={<RenderGame />} />
            </Routes>
          </PageLayout>
        </App>
      </BrowserRouter>
    </div>
  );
}

export default ReactApp;
