import axios from "axios";
import { WEBSITE_URL } from "../resources/BasicInfo";

export const API_BASE_URL = `${WEBSITE_URL}/api`;

export const AXIOS_CREATE_CONFIG = {
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

export async function getBlogPostsRegistry() {
    const apiUrl = `${API_BASE_URL}/blog-posts-registry`;

    try {
        const response = await axios.get(apiUrl);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getOneBlogPost(slug) {
    const apiUrl = `${API_BASE_URL}/blog-post/${slug}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
}
