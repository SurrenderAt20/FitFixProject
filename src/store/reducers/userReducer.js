const initialState = {
  loading: false,
  error: "",
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
      };
    case "SIGNUP_FAILURE":
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
