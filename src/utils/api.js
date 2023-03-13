import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-project-nc-news.onrender.com/api",
});

export const getArticles = (topic) => {
const config = { params: { topic: topic } }


  return api.get(`/articles`, config).then(({ data }) => {
    return data;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return api.get(`articles/${article_id}/comments`).then(({data}) => {
    return data;
  })
}