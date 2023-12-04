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

// get github details for a single user
export const fetchUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: GITHUB_TOKEN,
    },
  });
  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();

    return data;
  }
};

// fetch user repos for the user profile page
export const getUserRepos = async (username) => {
  const response = await fetch(
    `${GITHUB_URL}/users/${username}/repos?sort=created&per_page=10`,
    {
      headers: {
        Authorization: GITHUB_TOKEN,
      },
    }
  );
  const data = await response.json();

  return data;
};
