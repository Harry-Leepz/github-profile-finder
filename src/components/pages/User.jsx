import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import Spinner from "../layout/Spinner";

import GithubContext from "../../context/github/GithubContext";

export default function User() {
  const { user, fetchUser, loading } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    fetchUser(params.login);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className='mb-4'>
          <Link to='/' className='btn btn-ghost'>
            Back To Search
          </Link>
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0'>
            <div className='rounded-lg shadow-xl card image-full'>
              <figure>
                <img src={user.avatar_url} alt='Github Profile Avatar' />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
