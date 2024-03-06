import React, { useState } from "react";
import "./pomodoro.scss";
import logo from "../../assets/logo.svg";
import { connect } from "react-redux";
import { updateToggle } from "../actions";
import "../../_variable.scss";

import "../reducer";

const Pomodoro = ({
  pomodoro,
  short,
  long,
  toggleType,
  updateToggle,
  activeColor,
}) => {
  const [activeButton, setActiveButton] = useState("pomodoro");

  const handleButton = (event, buttonType) => {
    if (event.type === "click") {
      // Обработка клика
      setActiveButton(buttonType);

      if (buttonType === "pomodoro") {
        updateToggle((toggleType = "pomodoro"));
      }

      if (buttonType === "short") {
        updateToggle((toggleType = "short"));
      }
      if (buttonType === "long") {
        updateToggle("long");
      }
    }
  };

  const buttonsData = [
    { type: "pomodoro", label: "pomodoro" },
    { type: "short", label: "short break" },
    { type: "long", label: "long break" },
  ];

  return (
    <div className="pomodoro">
      <div className="pomodoro__logo">
        <img src={logo} alt="logo" />

        <div className="pomodoro__buttons">
          {buttonsData.map((button) => (
            <button
              key={button.type}
              className={`pomodoro__button pomodoro__btn ${
                activeButton === button.type ? "active" && activeColor : ""
              }`}
              data-type={button.type}
              onClick={(e) => handleButton(e, button.type)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  pomodoro: state.pomodoro,
  short: state.short,
  long: state.long,
  toggleType: state.toggleType,
  activeColor: state.activeColor,
});

const mapDispatchToProps = {
  updateToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
