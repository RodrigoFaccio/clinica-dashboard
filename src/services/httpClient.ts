import axios from "axios";
let baseURL;
export const httpClient = axios.create({
        baseURL: "https://nodedeploy-api-sexy.onrender.com",
       //baseURL: "http://localhost:3001",
     });