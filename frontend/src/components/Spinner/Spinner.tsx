import React from "react";
import "./_spinner.scss";

/* Elegant loading spinner — pure CSS thin ring animation */
const Spinner: React.FC = () => (
  <div className="spinner-container">
    <div className="spinner" />
  </div>
);

export default Spinner;
