import axios from "axios";

// NC-News Back-end

const api = axios.create({
  baseURL: "https://backend-project-nc-news.onrender.com/api",
});

export const getArticles = (topic, sort_by, order, author) => {
  const config = { params: { topic, sort_by, order, author } };

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

export const getCommentsByArticleId = (article_id, sort_by) => {
  const config = { params: { sort_by } };

  return api.get(`articles/${article_id}/comments`, config).then(({ data }) => {
    return data;
  });
};

export const postComment = (input, article_id) => {
  return api.post(`articles/${article_id}/comments`, input).then(({ data }) => {
    return data;
  });
};

export const patchVote = (i, article_id) => {
  const input = { inc_votes: i };
  return api.patch(`articles/${article_id}`, input).then(({ data }) => {
    return data;
  });
};

export const patchCommentVote = (i, comment_id) => {
  const input = { inc_votes: i };
  return api.patch(`comments/${comment_id}`, input).then(({ data }) => {
    return data;
  });
};

export const deleteComment = (comment_id) => {
  return api.delete(`comments/${comment_id}`);
};

export const getTopics = () => {
  return api.get(`topics`).then(({ data }) => {
    return data;
  });
};

// OpenAI API

const openAIApiKey = process.env.OPENAI_API_KEY;

const openApi = axios.create({
  baseURL: "https://api.openai.com/v1/",
  headers: {
    Application: "application/json",
    Authorisation: `Bearer ${openAIApiKey}`,
    "OpenAI-Organization": "org-bnp0afpJ02bzWExr6F7S5goX",
  },
});

export const postPrompt = (topic, title) => {
  if (!openAIApiKey) {
    console.error(`No API key was found, please see README.md`);
  }

  const params = {
    model: "text-davinci-003",
    prompt: `Generate a blog article on the subject of ${topic}. The title of the article is ${title}. Finish the article using 200 tokens or less.`,
    suffix: "Text generated by ChatGPT.",
    max_tokens: 200,
    temperature: 0.5,
  };

  return openApi
    .post(`completions`, params)
    .then((res) => {
      return res.data.choices[0].text;
    })
    .catch((err) => {
      console.error(`An error occurred: ${err.message}`);
    });
};
