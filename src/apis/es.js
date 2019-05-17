import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_ES_ROOT_URI}`,
  auth: {
    username: `${process.env.REACT_APP_ES_USERNAME}`,
    password: `${process.env.REACT_APP_ES_PASSWORD}`
  }
});
