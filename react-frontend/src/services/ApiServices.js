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

export async function getBlogPostsRegistry(page = 1, perPage = 10) {
    const apiUrl = `${API_BASE_URL}/blog-posts-registry`;

    try {
        const response = await axios.get(apiUrl, {
            params: {
                page: page,
                per_page: perPage,
            },
        });
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
