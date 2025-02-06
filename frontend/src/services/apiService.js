import axios from "axios";

const BASE_URL = "http://localhost:3000";

/**
 * Récupère les informations d'un utilisateur
 */
export const getUserData = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        return null;
    }
};

/**
 * Récupère l'activité quotidienne d'un utilisateur
 */
export const getUserActivity = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}/activity`);
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des activités :", error);
        return null;
    }
};

/**
 * Récupère les sessions moyennes d'un utilisateur
 */
export const getUserAverageSessions = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}/average-sessions`);
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des sessions moyennes :", error);
        return null;
    }
};
