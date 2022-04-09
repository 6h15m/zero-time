export const initialState = {
  theme: "light",
};

export const SET_LIGHT = "setLight";
export const SET_DARK = "setDark";

export const setLight = {
  type: SET_LIGHT,
  data: {
    theme: "light",
  },
};

export const setDark = {
  type: SET_DARK,
  data: {
    theme: "dark",
  },
};

const reducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case SET_LIGHT: {
      return {
        ...state,
        theme: "light",
      };
    }
    case SET_DARK: {
      return {
        ...state,
        theme: "dark",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
