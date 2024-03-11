// reducers.js

const initialActiveColor = localStorage.getItem("activeColor");

const initialButtonColor = localStorage.getItem("buttonColor");

const initialState = {
  pomodoro: localStorage.getItem("pomodoro"),
  short: 5,
  long: 15,
  closed: true,
  toggleType: "pomodoro",
  activeColor: initialActiveColor,
  buttonColor: initialButtonColor,
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
    default:
      return state;
  }
};

export default rootReducer;
