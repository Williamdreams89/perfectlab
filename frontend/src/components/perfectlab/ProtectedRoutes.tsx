import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const basicUserInfo = localStorage.getItem("access_token_f")

  if (!basicUserInfo) {
    console.log("basicUserInfo=", basicUserInfo)
    return <Navigate replace to={"/login"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;