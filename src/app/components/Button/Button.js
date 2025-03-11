import React from "react";

const Button = ({ label, handleChange, type, className }) => {
  return (
    <div>
      <button
        className={className}
        onClick={handleChange}
        type={type ? type : "button"}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
