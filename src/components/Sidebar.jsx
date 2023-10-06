import { React, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="divider" disabled>
          General
        </Menu.Item>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to={"/dashboard"}>
              Dashboard
            </NavLink>
          </Menu.Item>
        {user && user.role === "admin" && (
          <>
            <Menu.Item key="divider" disabled>
              Administración
            </Menu.Item>
              <Menu.Item key="2" icon={<PieChartOutlined />}>
                <NavLink to={"/users"}>
                Usuarios
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<PieChartOutlined />}>
                <NavLink to={"/groups"}>
                  Grupos
                </NavLink>
              </Menu.Item>
          </>
        )}
        <Menu.Item key="divider" disabled>
          Configuración
        </Menu.Item>
          <Menu.Item key="4" icon={<PieChartOutlined />} onClick={logout}>
            Cerrar Sesión
          </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
