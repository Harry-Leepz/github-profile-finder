import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import GithubContext from "../../context/github/GithubContext";

export default function User() {
  const { user, fetchUser } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    fetchUser(params.login);
  }, []);

  return <div>User</div>;
}
