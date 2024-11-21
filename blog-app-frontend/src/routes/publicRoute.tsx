import React from "react";
import { Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  return (
    <div>
      <Outlet /> {/* Render nested public routes */}
    </div>
  );
};

export default PublicRoute;
