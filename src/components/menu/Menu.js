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
} from "../actions";

const Menu = ({
  pomodoro,
  short,
  long,
  activeColor,
  updatePomodoro,
  updateShort,
  updateLong,
  updateColor,
}) => {
  let [submitToggle, setSubmitToggle] = useState(false);
  let [closed, setClose] = useState(true);

  const [buttonColor, setButtonColor] = useState("#f87070");
  const [tempPomodoro, setTempPomodoro] = useState(pomodoro);
  const [tempShort, setTempShort] = useState(short);
  const [tempLong, setTempLong] = useState(long);
  const [tempColor, setTempColor] = useState(activeColor);
  const [tempButtonColor, setTempButtonColor] = useState(buttonColor);
  const bodyElement = document.querySelector("body");

  const [bodyEl, setBodyEl] = useState(bodyElement);
  const [tempBodyEl, setTempBodyEl] = useState(bodyEl);
  const controls = useAnimation();

  useEffect(() => {
    const storedPomodoro = parseInt(localStorage.getItem("pomodoro"), 10);
    const storedShort = parseInt(localStorage.getItem("short"), 10);
    const storedLong = parseInt(localStorage.getItem("long"), 10);
    const storedColor = localStorage.getItem("activeColor");
    const storedButtonColor = localStorage.getItem("buttonColor");

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

    if (storedButtonColor) {
      setButtonColor(storedButtonColor);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("pomodoro", pomodoro.toString());
    localStorage.setItem("short", short.toString());
    localStorage.setItem("long", long.toString());
    localStorage.setItem("activeColor", activeColor);
    localStorage.setItem("buttonColor", buttonColor);
  }, [pomodoro, short, long, activeColor, buttonColor]);

  const endAnimation = async () => {
    await controls.start({ translateY: 450, transition: { duration: 0.8 } });
  };

  const onClose = () => {
    endAnimation();
    if (!submitToggle) {
      updatePomodoro(tempPomodoro);
      updateShort(tempShort);
      updateLong(tempLong);
      updateColor(tempColor);
      setButtonColor(tempButtonColor);
      setBodyEl(tempBodyEl);
    }
  };

  const startAnimation = async () => {
    await controls.start({ translateY: -355, transition: { duration: 0.8 } });
  };

  const onOpen = () => {
    setClose((closed = false));
    setSubmitToggle((submitToggle = false));
    startAnimation();

    console.log("hi");
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
          updatePomodoro(pomodoro - 5);
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

  const handleFontList = (e) => {
    const clickedFont = e.target.dataset.font;

    if (clickedFont) {
      switch (clickedFont) {
        case "kumbh":
          setBodyEl(
            (bodyElement.style.fontFamily = "'Kumbh Sans', sans-serif")
          );

          break;
        case "roboto":
          setBodyEl((bodyElement.style.fontFamily = "'Roboto Slab', serif"));

          break;
        case "mono":
          setBodyEl((bodyElement.style.fontFamily = "'Space Mono', monospace"));

          break;
        default:
          break;
      }
    }
  };

  const handeSubmit = () => {
    setSubmitToggle((submitToggle = true));
    setTempPomodoro(pomodoro);
    setTempShort(short);
    setTempLong(long);
    setTempColor(activeColor);
    setTempButtonColor(buttonColor);

    setTempBodyEl(bodyEl);
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

              <div className="menu__font-list" onClick={handleFontList}>
                <div
                  className="menu__font-kumbh menu__font-style"
                  data-font="kumbh"
                >
                  <span>Aa</span>
                </div>
                <div
                  className="menu__font-roboto menu__font-style"
                  data-font="roboto"
                >
                  <span>Aa</span>
                </div>
                <div
                  className="menu__font-mono menu__font-style"
                  data-font="mono"
                >
                  <span>Aa</span>
                </div>
              </div>
            </div>

            <div className="menu__line"></div>

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
});

const mapDispatchToProps = {
  updatePomodoro,
  updateShort,
  updateLong,
  toggleClosed,
  updateColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
