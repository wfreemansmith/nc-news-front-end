import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-project-nc-news.onrender.com/api",
});

export const getArticles = (topic) => {
  const config = { params: { topic: topic } };

  return api.get(`/articles`, config).then(({ data }) => {
    return data;
  });
};

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const getUserByUsername = (username) => {
  return api.get(`/users/${username}`).then(({ data }) => {
    return data;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return api.get(`articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const postComment = (input, article_id) => {
  return api.post(`articles/${article_id}/comments`, input).then(({data}) => {
    console.log({api: data})
    return data;
  })
}