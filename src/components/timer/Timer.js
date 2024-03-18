import React, { useState, useEffect } from "react";
import "./timer.scss";
import { connect } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({
  pomodoro,
  short,
  long,
  toggleType,
  activeColor,
  activeFont,
}) => {
  let [minutes, setMinutes] = useState(0);
  // const [time, setTime] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerBtn, setTimerBtn] = useState("Start");
  let [timerType, setTimerType] = useState(pomodoro);
  let [progress, setProgress] = useState(timerType * 60);
  let [timerColor, setTimerColor] = useState("#f87070");
  let [timerFont, setTimerFont] = useState("kumbh");

  // useEffect(() => {
  //   if (totalTimeInSeconds !== 0) {
  //     setProgress((progress = totalTimeInSeconds));

  //     setTotal((total = totalTimeInSeconds));
  //   }
  // }, [totalTimeInSeconds, progress]);

  useEffect(() => {
    if (toggleType === "pomodoro") {
      setMinutes(pomodoro);
      setSeconds(0);

      setTimerType(pomodoro);
      setProgress(timerType * 60);
    } else if (toggleType === "short") {
      setMinutes(short);
      setSeconds(0);
      setProgress(timerType * 60);
      setTimerType(short);
    } else if (toggleType === "long") {
      setMinutes(long);
      setSeconds(0);
      setProgress(timerType * 60);
      setTimerType(long);
    }

    switch (activeColor) {
      case "red":
        setTimerColor("#f87070");
        break;
      case "blue":
        setTimerColor("#70f3f8");
        break;
      case "purple":
        setTimerColor("#d881f8");
        break;
      default:
    }
    
    switch (activeFont) {
      case "kumbh":
        setTimerFont("timer__count kumbh");
        break;
      case "roboto":
        setTimerFont("timer__count roboto");
        break;
      case "mono":
        setTimerFont("timer__count mono");
        break;
      default:
    }
  }, [
    toggleType,
    pomodoro,
    short,
    long,
    timerType,
    activeColor,
    activeFont,
    timerFont,
    timerColor,
  ]);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                clearInterval(timer);
                setIsRunning(false);
                setSeconds(0);
                setTimerBtn("restart");
                return 0;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });

        setProgress(progress - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds, progress, timerColor]);

  const startTimer = () => {
    if (timerBtn === "restart") {
      restartTimer();
    }
    setIsRunning((prevIsRunning) => {
      if (prevIsRunning) {
        setTimerBtn("start");
      } else {
        setTimerBtn("pause");
      }
      return !prevIsRunning; // Инвертируем текущее состояние
    });
  };

  const restartTimer = () => {
    setMinutes(timerType);
    setProgress(timerType * 60);
  };

  return (
    <div className="timer">
      <div className="circle__t">
        <div className="timer__circle">
          <CircularProgressbar
            value={progress}
            maxValue={timerType * 60}
            strokeWidth={3}
            styles={buildStyles({
              strokeLinecap: "butt",
              textSize: "16px",
              pathColor: timerColor,
              textColor: "#007BFF",
              trailColor: "#161932",
            })}
          />
          <h1 className={`timer__count ${activeFont}`}>{`${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`}</h1>
          <button className="timer__btn" onClick={startTimer}>
            {timerBtn}
          </button>
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
  activeFont: state.activeFont,
});

export default connect(mapStateToProps)(Timer);
