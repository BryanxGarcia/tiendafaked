import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <div style={{ position:'fixed', display: 'flex', height: '100%', overflow: 'scroll initial', margin: '0 20px 0 0', flex: '0 0 25%' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          Bienvenido
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink  to="/productos">
            <CDBSidebarMenuItem icon="archive">Productos</CDBSidebarMenuItem>
          </NavLink>
          <NavLink  to="/productosTable">
            <CDBSidebarMenuItem icon="archive">CRUD Productos</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          style={{
            padding: '20px 5px',
          }}
        >
          E-commerce
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  </div>
  );
};

export default Menu