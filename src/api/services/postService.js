import { requestWithAuthHeader } from "../helpers";

export const createPost = (post) => requestWithAuthHeader("POST", "/posts", post);

export const getAllPosts = () => requestWithAuthHeader("GET", "/posts");
