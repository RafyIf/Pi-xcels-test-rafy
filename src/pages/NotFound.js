import React from "react";
import { useLocation } from "react-router-dom";

export default function NotFound() {
  let { pathname } = useLocation();
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>Not Found Page {pathname.replace("/","").toUpperCase()}</h1>
      </div>
    </div>
  );
}
