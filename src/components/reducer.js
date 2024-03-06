// reducers.js
const initialState = {
  pomodoro: 25,
  short: 5,
  long: 15,
  closed: true,
  toggleType: "pomodoro",
  activeColor: "red",
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
    default:
      return state;
  }
};

export default rootReducer;
