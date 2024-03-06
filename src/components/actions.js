// actions.js
export const updatePomodoro = (value) => ({
  type: "UPDATE_POMODORO",
  payload: value,
});

export const updateShort = (value) => ({
  type: "UPDATE_SHORT",
  payload: value,
});

export const updateLong = (value) => ({
  type: "UPDATE_LONG",
  payload: value,
});

export const toggleClosed = () => ({
  type: "TOGGLE_CLOSED",
});

export const updateToggle = (value) => ({
  type: "UPDATE_TYPE",
  payload: value,
});

export const updateColor = (value) => ({
  type: "UPDATE_COLOR",
  payload: value,
});
