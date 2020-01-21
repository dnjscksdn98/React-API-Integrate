import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

import useAsync from "./useAsync";
import User from "./User";

// <2> useReducer => 리듀서를 다른 파일에 분리를 해서 코드의 재사용성 증가
// LOADING, SUCCESS, ERROR
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null
      };

    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null
      };

    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });

  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });

    try {
      const response = await axios.get(
        "http://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // destructuring assignment
  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생 !!</div>;
  if (!users) return null;

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
