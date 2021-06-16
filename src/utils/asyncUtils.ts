import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const httpClient = axios.create({
    withCredentials: true,
});

export { httpClient };
