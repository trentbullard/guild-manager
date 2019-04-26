import axios from "axios";

export default axios.create({
  baseURL: `http://census.daybreakgames.com/s:${
    process.env.REACT_APP_EQ2_API_SECRET
  }/get/eq2`
});
