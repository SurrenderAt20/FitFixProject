const initialState = {
  loading: false,
  error: "",
  isLoggedOut: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP_REQUEST":
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        payload: action.payload,
      };
    case "SIGNUP_FAILURE":
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedOut: true,
      };
    default:
      return state;
  }
}
