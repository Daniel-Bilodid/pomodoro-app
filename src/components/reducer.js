// reducers.js

const initialActiveColor = localStorage.getItem("activeColor");

const initialButtonColor = localStorage.getItem("buttonColor");

const initialFont = localStorage.getItem("activeFont");

const initialState = {
  pomodoro: parseInt(localStorage.getItem("pomodoro"), 10),
  short: parseInt(localStorage.getItem("short"), 10),
  long: parseInt(localStorage.getItem("long"), 10),
  closed: true,
  toggleType: "pomodoro",
  activeColor: initialActiveColor,
  buttonColor: initialButtonColor,
  activeFont: initialFont,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_POMODORO":
      return { ...state, pomodoro: action.payload };
    case "UPDATE_SHORT":
      return { ...state, short: action.payload };
    case "UPDATE_LONG":
      return { ...state, long: action.payload };
    case "TOGGLE_CLOSED":
      return { ...state, closed: !state.closed };
    case "UPDATE_TYPE":
      return { ...state, toggleType: action.payload };
    case "UPDATE_COLOR":
      return { ...state, activeColor: action.payload };
    case "UPDATE_BTN":
      return { ...state, buttonColor: action.payload };
    case "UPDATE_FONT":
      return { ...state, activeFont: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
