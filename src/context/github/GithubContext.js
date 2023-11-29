import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search github api user database using username from input
  const searchUsers = async (username) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/search/users?q=${username}`, {
      headers: {
        Authorization: GITHUB_TOKEN,
      },
    });
    const { items } = await response.json();
    console.log(items);
    dispatch({
      type: "SEARCH_USERS",
      payload: items,
    });
  };

  // set loading state when requests are being made
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
