import React, { useState, useEffect } from "react";
import "./timer.scss";
import { connect } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ pomodoro, short, long, toggleType }) => {
  let [minutes, setMinutes] = useState(0);
  // const [time, setTime] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerBtn, setTimerBtn] = useState("Start");
  let [timerType, setTimerType] = useState(pomodoro);
  let [progress, setProgress] = useState(timerType * 60);

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
  }, [toggleType, pomodoro, short, long, timerType]);

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
                return 0;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });

        setProgress(progress - 1);
        console.log(progress);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds, progress]);

  const startTimer = () => {
    setIsRunning((prevIsRunning) => {
      if (prevIsRunning) {
        setTimerBtn("start");
      } else {
        setTimerBtn("pause");
      }
      return !prevIsRunning; // Инвертируем текущее состояние
    });
  };

  return (
    <div className="timer">
      <div className="timer__circle">
        <CircularProgressbar
          value={progress}
          text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          maxValue={timerType * 60}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "16px",
            pathColor: "#007BFF",
            textColor: "#007BFF",
            trailColor: "#d6d6d6",
          })}
        />
        <p className="timer__count">{`${minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</p>
        <button className="timer__btn" onClick={startTimer}>
          {timerBtn}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pomodoro: state.pomodoro,
  short: state.short,
  long: state.long,
  toggleType: state.toggleType,
});

export default connect(mapStateToProps)(Timer);
