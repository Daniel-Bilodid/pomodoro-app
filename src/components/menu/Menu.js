import React, { useState, useEffect } from "react";
import "./menu.scss";
import settings from "../../assets/icon-settings.svg";
import { connect } from "react-redux";
import close from "../../assets/icon-close.svg";
import arrowUp from "../../assets/icon-arrow-up.svg";
import arrowDown from "../../assets/icon-arrow-down.svg";
import { motion, useAnimation } from "framer-motion";

import {
  updatePomodoro,
  updateShort,
  updateLong,
  toggleClosed,
  updateColor,
  updateBtn,
  updateFont,
  updateBody,
} from "../actions";

const Menu = ({
  pomodoro,
  short,
  long,
  activeColor,
  buttonColor,
  activeFont,
  bodyEl,
  updatePomodoro,
  updateShort,
  updateLong,
  updateColor,
  updateBtn,
  updateFont,
  updateBody,
}) => {
  let [submitToggle, setSubmitToggle] = useState(false);
  let [closed, setClose] = useState(true);

  const [tempPomodoro, setTempPomodoro] = useState(pomodoro);
  const [tempShort, setTempShort] = useState(short);
  const [tempLong, setTempLong] = useState(long);
  const [tempColor, setTempColor] = useState(activeColor);
  const [tempButtonColor, setTempButtonColor] = useState(buttonColor);
  const [tempFont, setTempFont] = useState(activeFont);
  const bodyElement = document.querySelector("body");
  const appOpacity = document.querySelector(".app__opacity");

  const [tempBodyEl, setTempBodyEl] = useState(bodyEl);
  const controls = useAnimation();

  const [fontStyle, setFontStyle] = useState(activeFont);

  useEffect(() => {
    const storedPomodoro = parseInt(localStorage.getItem("pomodoro"), 10);
    const storedShort = parseInt(localStorage.getItem("short"), 10);
    const storedLong = parseInt(localStorage.getItem("long"), 10);
    const storedColor = localStorage.getItem("activeColor");
    const storedButtonColor = localStorage.getItem("buttonColor");
    const storedFont = localStorage.getItem("activeFont");
    const storedBodyEl = localStorage.getItem("bodyEl");

    if (!isNaN(storedPomodoro)) {
      updatePomodoro(storedPomodoro);
    }
    if (!isNaN(storedShort)) {
      updateShort(storedShort);
    }
    if (!isNaN(storedLong)) {
      updateLong(storedLong);
    }
    if (storedColor) {
      updateColor(storedColor);
    }
    if (storedFont) {
      updateFont(storedFont);
    }

    if (storedButtonColor) {
      updateBtn(storedButtonColor);
    }

    if (storedBodyEl) {
      updateBody(storedBodyEl);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("pomodoro", pomodoro.toString());

    localStorage.setItem("short", short.toString());
    localStorage.setItem("long", long.toString());
    localStorage.setItem("activeColor", activeColor);
    localStorage.setItem("buttonColor", buttonColor);
    localStorage.setItem("activeFont", activeFont);

    if (isNaN(pomodoro)) {
      updatePomodoro(25);
    }

    if (isNaN(short)) {
      updateShort(5);
    }

    if (isNaN(long)) {
      updateLong(15);
    }
  }, [
    pomodoro,
    short,
    long,
    activeColor,
    buttonColor,
    closed,
    activeFont,
    updatePomodoro,
    updateShort,
    updateLong,
  ]);

  const endAnimation = async () => {
    appOpacity.style.opacity = 1;
    bodyElement.style.background = "rgb(30, 33, 63)";
    await controls.start({ translateY: 950, transition: { duration: 0.7 } });
  };

  const onClose = () => {
    appOpacity.style.opacity = 1;
    bodyElement.style.background = "rgb(30, 33, 63)";

    endAnimation();
    if (!submitToggle) {
      updatePomodoro(tempPomodoro);
      updateShort(tempShort);
      updateLong(tempLong);
      updateColor(tempColor);
      updateBtn(tempButtonColor);
      updateBody(tempBodyEl);
      updateFont(tempFont);
    }
  };

  const startAnimation = async () => {
    await controls.start({ translateY: -355, transition: { duration: 0.7 } });
  };

  const onOpen = () => {
    const bodyElement = document.querySelector("body");
    const appOpacity = document.querySelector(".app__opacity");
    appOpacity.style.opacity = 0.5;
    bodyElement.style.background = "rgb(10, 12, 28)";

    setClose((closed = false));
    setSubmitToggle((submitToggle = false));
    startAnimation();
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
        if (pomodoro !== 0) {
          updatePomodoro(pomodoro - 1);
        }
        break;
      case "short":
        if (short !== 0) {
          updateShort(short - 5);
        }

        break;
      case "long":
        if (long !== 0) {
          updateLong(long - 5);
        }

        break;
      default:
    }
  };

  const handleColorListClick = (e) => {
    const clickedColor = e.target.dataset.color;

    if (clickedColor) {
      updateColor(clickedColor);
    }
    switch (clickedColor) {
      case "red":
        updateBtn("#f87070");
        break;
      case "blue":
        updateBtn("#70f3f8");
        break;
      case "purple":
        updateBtn("#d881f8");
        break;
      default:
    }
  };

  const handleFontList = (e) => {
    const clickedFont = e.target.dataset.font;

    setFontStyle(clickedFont);

    switch (clickedFont) {
      case "kumbh":
        updateBody("'Kumbh Sans', sans-serif");

        break;
      case "roboto":
        updateBody("'Roboto Slab', serif");

        break;
      case "mono":
        updateBody("'Space Mono', monospace");

        break;
      default:
    }
  };

  useEffect(() => {
    updateFont(fontStyle);
  }, [fontStyle]);

  const handeSubmit = () => {
    setSubmitToggle((submitToggle = true));
    setTempPomodoro(pomodoro);
    setTempShort(short);
    setTempLong(long);
    setTempColor(activeColor);
    setTempFont(activeFont);
    setTempButtonColor(buttonColor);

    setTempBodyEl(bodyEl);
    bodyElement.style.fontFamily = bodyEl;
    endAnimation();
  };

  return (
    <>
      <div className="menu__icon">
        <img onClick={onOpen} src={settings} alt="settings" />
      </div>

      <motion.div
        initial={{ translateY: 0 }}
        animate={controls}
        className={`menu ${closed ? "closed" : ""}`}
      >
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
                  <div className="menu__select-name">
                    {type} {type !== "pomodoro" ? "break" : ""}
                  </div>
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

            <div className="menu__line sub__line"></div>

            <div className="menu__font">
              <div className="menu__font-name">font</div>

              <div className="menu__font-list" onClick={handleFontList}>
                <div
                  className={`menu__font-kumbh menu__font-style ${
                    activeFont === "kumbh" ? "active__font" : ""
                  }`}
                  data-font="kumbh"
                >
                  Aa
                </div>
                <div
                  className={`menu__font-roboto menu__font-style ${
                    activeFont === "roboto" ? "active__font" : ""
                  }`}
                  data-font="roboto"
                >
                  Aa
                </div>
                <div
                  className={`menu__font-mono menu__font-style ${
                    activeFont === "mono" ? "active__font" : ""
                  }`}
                  data-font="mono"
                >
                  Aa
                </div>
              </div>
            </div>

            <div className="menu__line sub__line"></div>

            <div className="menu__color">
              <div className="menu__color-name">color</div>

              <div className="menu__color-list" onClick={handleColorListClick}>
                <div
                  className={`menu__color-style menu__color-red`}
                  data-color="red"
                >
                  <span
                    className={`${
                      activeColor === "red" ? "active__color" : ""
                    }`}
                  >
                    <svg
                      width="13.819481"
                      height="10.573975"
                      viewBox="0 0 13.8195 10.574"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <path
                        id="Path 2"
                        d="M0.707108 5.20703L4.65974 9.15967L13.1124 0.707031"
                        stroke="#161932"
                        stroke-opacity="1.000000"
                        stroke-width="2.000000"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className={`menu__color-style menu__color-blue`}
                  data-color="blue"
                >
                  <span
                    className={` ${
                      activeColor === "blue" ? "active__color" : ""
                    }`}
                  >
                    <svg
                      width="13.819481"
                      height="10.573975"
                      viewBox="0 0 13.8195 10.574"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <path
                        id="Path 2"
                        d="M0.707108 5.20703L4.65974 9.15967L13.1124 0.707031"
                        stroke="#161932"
                        stroke-opacity="1.000000"
                        stroke-width="2.000000"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className={`menu__color-style menu__color-purple `}
                  data-color="purple"
                >
                  <span
                    className={` ${
                      activeColor === "purple" ? "active__color" : ""
                    }`}
                  >
                    <svg
                      width="13.819481"
                      height="10.573975"
                      viewBox="0 0 13.8195 10.574"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <path
                        id="Path 2"
                        d="M0.707108 5.20703L4.65974 9.15967L13.1124 0.707031"
                        stroke="#161932"
                        stroke-opacity="1.000000"
                        stroke-width="2.000000"
                      />
                    </svg>
                  </span>
                </div>
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
      </motion.div>
    </>
  );
};

const mapStateToProps = (state) => ({
  pomodoro: state.pomodoro,
  short: state.short,
  long: state.long,
  activeColor: state.activeColor,
  buttonColor: state.buttonColor,
  activeFont: state.activeFont,
  bodyEl: state.bodyEl,
});

const mapDispatchToProps = {
  updatePomodoro,
  updateShort,
  updateLong,
  toggleClosed,
  updateColor,
  updateBtn,
  updateFont,
  updateBody,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
