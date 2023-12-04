import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // get github details for a single user
  const fetchUser = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: GITHUB_TOKEN,
      },
    });
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // fetch user repos for the user profile page
  const getUserRepos = async (username) => {
    setLoading();
    const response = await fetch(
      `${GITHUB_URL}/users/${username}/repos?sort=created&per_page=10`,
      {
        headers: {
          Authorization: GITHUB_TOKEN,
        },
      }
    );
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  // clear users state back to an empty array
  const clearUserState = () => dispatch({ type: "CLEAR_USERS" });

  // set loading state when requests are being made
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUserState,
        fetchUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
