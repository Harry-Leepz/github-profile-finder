import { useContext } from "react";
import GithubContext from "../../../context/github/GithubContext";

import Spinner from "../Spinner";
import UserItem from "./UserItem";

export default function UserResults() {
  const { loading, users } = useContext(GithubContext);

  return (
    <>
      {loading && <Spinner />}

      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
