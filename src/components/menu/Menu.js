import React, { useState } from "react";
import "./menu.scss";
import settings from "../../assets/icon-settings.svg";
import { connect } from "react-redux";
import close from "../../assets/icon-close.svg";
import arrowUp from "../../assets/icon-arrow-up.svg";
import arrowDown from "../../assets/icon-arrow-down.svg";

import {
  updatePomodoro,
  updateShort,
  updateLong,
  toggleClosed,
  updateColor,
} from "../actions";

const Menu = ({
  pomodoro,
  short,
  long,
  updatePomodoro,
  updateShort,
  updateLong,
  updateColor,
}) => {
  let [submitToggle, setSubmitToggle] = useState(false);
  let [closed, setClose] = useState(true);

  const onClose = () => {
    setClose((closed = true));

    if (!submitToggle) {
      updatePomodoro((pomodoro = 25));
      updateShort((short = 5));
      updateLong((long = 10));
      updateColor("red");
      setButtonColor("#f87070");
    }
  };
  const onOpen = () => {
    setClose((closed = false));
    setSubmitToggle((submitToggle = false));
  };

  const handleArrowClickUp = (type) => {
    switch (type) {
      case "pomodoro":
        updatePomodoro(pomodoro + 5);
        break;
      case "short":
        updateShort(short + 5);
        break;
      case "long":
        updateLong(long + 5);
        break;
      default:
    }
  };

  const handleArrowClickDown = (type) => {
    switch (type) {
      case "pomodoro":
        updatePomodoro(pomodoro - 5);
        break;
      case "short":
        updateShort(short - 5);
        break;
      case "long":
        updateLong(long - 5);
        break;
      default:
    }
  };

  const [activeColor, setActiveColor] = useState("red");
  const [buttonColor, setButtonColor] = useState("#f87070");

  const handleColorListClick = (e) => {
    const clickedColor = e.target.dataset.color;

    if (clickedColor) {
      setActiveColor(clickedColor);
      updateColor(clickedColor);
    }
    switch (clickedColor) {
      case "red":
        setButtonColor("#f87070");
        break;
      case "blue":
        setButtonColor("#70f3f8");
        break;
      case "purple":
        setButtonColor("#d881f8");
        break;
      default:
    }
  };
  const handeSubmit = () => {
    setSubmitToggle((submitToggle = true));
    setClose((closed = true));
  };

  return (
    <div className="menu">
      <div className="menu__icon">
        <img onClick={onOpen} src={settings} alt="settings" />
      </div>

      <div
        className={`menu__settings ${closed ? "menu__settings-closed" : ""}`}
      >
        <div className="menu__settings-head">
          <span>Settings</span>

          <img onClick={onClose} src={close} alt="close" />
        </div>

        <div className="menu__line"></div>

        <div className="menu__minutes">
          <div className="menu__minutes-time">time (minutes)</div>

          <div className="menu__select">
            {["pomodoro", "short", "long"].map((type) => (
              <div key={type} className="menu__select-item">
                <div className="menu__select-name">{type}</div>
                <div className="menu__select-input">
                  <span>
                    {type === "pomodoro"
                      ? pomodoro
                      : type === "short"
                      ? short
                      : long}
                  </span>
                  <div className="menu__select-arrows">
                    <img
                      className="arrowUp"
                      src={arrowUp}
                      alt="arrowUp"
                      onClick={() => handleArrowClickUp(type)}
                    />
                    <img
                      className="arrowDown"
                      src={arrowDown}
                      alt="arrowDown"
                      onClick={() => handleArrowClickDown(type)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="menu__line"></div>

          <div className="menu__font">
            <div className="menu__font-name">font</div>

            <div className="menu__font-list">
              <div className="menu__font-kumbh menu__font-style">
                <span>Aa</span>
              </div>
              <div className="menu__font-roboto menu__font-style">
                <span>Aa</span>
              </div>
              <div className="menu__font-mono menu__font-style">
                <span>Aa</span>
              </div>
            </div>
          </div>

          <div className="menu__line"></div>

          <div className="menu__color">
            <div className="menu__color-name">color</div>

            <div className="menu__color-list" onClick={handleColorListClick}>
              <div
                className={`menu__color-style menu__color-red ${
                  activeColor === "red" ? "active" : ""
                }`}
                data-color="red"
              ></div>
              <div
                className={`menu__color-style menu__color-blue ${
                  activeColor === "blue" ? "active" : ""
                }`}
                data-color="blue"
              ></div>
              <div
                className={`menu__color-style menu__color-purple ${
                  activeColor === "purple" ? "active" : ""
                }`}
                data-color="purple"
              ></div>
            </div>
          </div>
        </div>

        <button
          className="menu__button"
          onClick={handeSubmit}
          style={{ backgroundColor: buttonColor }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pomodoro: state.pomodoro,
  short: state.short,
  long: state.long,
  activeColor: state.activeColor,
});

const mapDispatchToProps = {
  updatePomodoro,
  updateShort,
  updateLong,
  toggleClosed,
  updateColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
