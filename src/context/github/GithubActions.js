const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// search github api users database using username from input
export const searchUsers = async (username) => {
  const response = await fetch(`${GITHUB_URL}/search/users?q=${username}`, {
    headers: {
      Authorization: GITHUB_TOKEN,
    },
  });
  const { items } = await response.json();

  return items;
};
