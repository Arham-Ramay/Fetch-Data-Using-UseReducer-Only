import React, { useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  loading: true,
  error: "",
  posts: [], // Change to an array to store multiple posts
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        posts: action.payload, // Store all posts in the array
        error: "",
      };

    case "FETCH_ERROR":
      return {
        loading: false,
        posts: [],
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

function FetchData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch(error => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, []);

  return (
    <>
      {state.loading ? "loading" : (
        <ul>
          {state.posts.map(post => (
            <li key={post.id}>{post.body}</li>
          ))}
        </ul>
      )}
      {state.error ? state.error : null}
    </>
  );
}

export default FetchData;