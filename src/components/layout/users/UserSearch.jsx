import { useState, useContext } from "react";
import GithubContext from "../../../context/github/GithubContext";
import AlertContext from "../../../context/alert/AlertContext";

import { searchUsers } from "../../../context/github/GithubActions";

export default function UserSearch() {
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = () => {
    setInput("");
    dispatch({ type: "CLEAR_USERS" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (input === "") {
      setAlert("Please enter something", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(input);
      dispatch({ type: "SEARCH_USERS", payload: users });

      setInput("");
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search...'
                value={input}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg btn-primary'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={handleClick} className='btn btn-ghost btn-lg'>
            {" "}
            Clear{" "}
          </button>
        </div>
      )}
    </div>
  );
}
