import axios from "axios";

export const fetchBlogs = async () => {
  const response = await axios.get("https://dev.to/api/articles?username=fahad_khan1226&per_page=8");
  return response.data;
};

export const fetchBlog = async (id: number) => {
  const response = await axios.get(`https://dev.to/api/articles/${id}`);
  return response.data;
};

// https://dev.to/api/articles/${articleId}
