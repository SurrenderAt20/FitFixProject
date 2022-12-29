import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from "../actions/userActions";

const initialState = {
  loading: false,
  user: null,
  isLoggedIn: false,
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
        isLoggedOut: true,
        user: null,
      };
    default:
      return state;
  }
}
