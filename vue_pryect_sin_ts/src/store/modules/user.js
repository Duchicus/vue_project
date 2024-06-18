import axios from "axios";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || '';

const state = {
    user: user,
    token: token,
};

const getters = {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
};

const actions = {
    async fetchRegister({ commit }, userData) {
        try {
            const res = await axios.post("https://backend-tuktuk.onrender.com/users/", userData);
            commit("registerUser", res.data); 
        } catch (error) {
            console.error('registration error', error);
        }
    },
    async fetchLogin({ commit }, userData) {
        try {
            const res = await axios.post("https://backend-tuktuk.onrender.com/users/login", userData);
            commit("setUser", res.data.user);
            commit("setToken", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            console.error(error);
        }
    }
};

const mutations = {
    setUser: (state, user) => (state.user = user),
    setToken:(state, token) => (state.token = token),
};
export default {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations,
};