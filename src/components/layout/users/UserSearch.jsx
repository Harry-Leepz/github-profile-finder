import { useState, useContext } from "react";
import GithubContext from "../../../context/github/GithubContext";

export default function UserSearch() {
  const { users, searchUsers, clearUserState } = useContext(GithubContext);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = () => {
    setInput("");
    clearUserState();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input === "") {
      alert("Please enter something...");
    } else {
      searchUsers(input);
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