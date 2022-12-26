const initialState = {
  loading: false,
  error: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "SIGNUP_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
