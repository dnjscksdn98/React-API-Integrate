import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

import useAsync from "./useAsync";
import User from "./User";

// <1> useState, useEffect
function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setUsers(null); // set users null
      setError(null); // set error null
      setLoading(true); // start loading

      // get users api data
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data); // set users
    } catch (e) {
      console.log(e.response.status);
      setError(e);
    }
    setLoading(false); // finish loading
  };

  // when component first render
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중...</div>; // if still loading
  if (error) return <div>에러 발생 !!</div>; // if error occurs
  if (!users) return null; // if users are invalid

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
