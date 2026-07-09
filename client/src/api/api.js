const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (method, endpoint, body = null) => {
    const token = localStorage.getItem("walletly_token");

    const headers = { "Content-Type": "application/json" };

    if(token) headers["Authorization"] = `Bearer ${token}`;

    const config = {
        method,
        headers,
    };

    if(body) config.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    const data = await response.json();

    if(!response.ok){
        const error = new Error(data.message || "Something went wrong");
        error.status = response.status;
        error.errors = data.errors || null;
        throw error;
    }

    return data;
};

export const authAPI = {
    register: (data) => request("POST", "/auth/register", data),
    login: (data) => request("POST", "/auth/login", data),
    getProfile: () => request("GET", "/auth/profile"),
    logout: () => request("POST", "/auth/logout"),
};

export const expenseAPI = {
    getAll: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return request("GET", `/expenses${query ? `?${query}` : ""}`);
    },
    create: (data) => request("POST", "/expenses", data),
    getById: (id) => request("GET", `/expenses/${id}`),
    update: (id, data) => request("PUT", `/expenses/${id}`, data),
    delete: (id) => request("DELETE", `/expenses/${id}`),
    getAnalytics: (month) =>
        request("GET", `/expenses/analytics${month ? `?month=${month}` : ""}`),
};

export const userAPI = {
    updateBudget: (data) => request("PUT", "/users/budget", data),
};