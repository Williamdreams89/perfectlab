import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DefaultLayout = () => {
    const basicUserInfo = localStorage.getItem("access_token_f")
  if (basicUserInfo) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultLayout;