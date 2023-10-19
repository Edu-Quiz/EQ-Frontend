import { Layout, Menu } from 'antd';
import { React, useState } from "react";
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { PieChartOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from "../logo.png"
const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const menuSegments = ['/dashboard', '/users', '/groups'];
  const selectedKey = menuSegments.find((segment) => location.pathname.includes(segment));

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu theme="dark" selectedKeys={selectedKey ? [selectedKey] : []} mode="inline">
        <Menu.Item style={{ height: "0%", display: "flex", justifyContent: "center" }} key="logo" disabled>
          <img style={{ display: "block", margin: "auto" }} src={logo}></img>
        </Menu.Item>
        <Menu.Item key="divider-1" disabled>
          General
        </Menu.Item>
          <Menu.Item key="/dashboard" icon={<PieChartOutlined />}>
            <NavLink to={"/dashboard"}>
              Dashboard
            </NavLink>
          </Menu.Item>
        {user && user.role === "admin" && (
          <>
            <Menu.Item key="divider-2" disabled>
              Administración
            </Menu.Item>
              <Menu.Item key="/users" icon={<UserOutlined />}>
                <NavLink to={"/users"}>
                Usuarios
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/groups" icon={<TeamOutlined />}>
                <NavLink to={"/groups"}>
                  Grupos
                </NavLink>
              </Menu.Item>
          </>
        )}
        <Menu.Item key="divider-3" disabled>
          Configuración
        </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logout}>
            Cerrar Sesión
          </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
