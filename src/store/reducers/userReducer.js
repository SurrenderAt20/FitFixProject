const initialState = {
  loading: false,
  user: null,
  isLoggedIn: false,
  updatedProfile: false,
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
        isLoggedIn: true,
      };
    case "SIGNUP_FAILURE":
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.error,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "UPDATE_REQUEST":
      return {
        ...state,
        isLoggedIn: true,
        loading: true,
        profile: action.payload,
        updatedProfile: false,
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        updatedProfile: true,
      };
    case "UPDATE_FAILURE":
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        updatedProfile: false,
      };
    default:
      return state;
  }
}
