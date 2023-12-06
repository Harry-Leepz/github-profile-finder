import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: GITHUB_TOKEN,
  },
});

// search github api users database using username from input
export const searchUsers = async (username) => {
  const response = await github.get(`/search/users?q=${username}`);
  return response.data.items;
};

// get github user details and 10 latest repos
export const fetchUserData = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?sort=created&per_page=10`),
  ]);

  return { user: user.data, repos: repos.data };
};
