import mockData from "../mocks/mockData.json"; // Import du mock
import { USE_MOCK_DATA, API_BASE_URL } from "../config"; // Configuration

/**
 * Récupère tous les utilisateurs (API ou Mock)
 * @returns {Promise<Array>}
 */
export const getAllUsers = async () => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des utilisateurs mockés...");
        return Promise.resolve(mockData.users || []);
    }

    try {
        console.log("🔄 Récupération des utilisateurs depuis l'API...");
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
        return await response.json();
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return [];
    }
};

/**
 * Récupère les informations d'un utilisateur (API ou Mock)
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
export const getUserData = async (userId) => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des données mockées...");
        return Promise.resolve(
            mockData.users.find(user => user.id === Number(userId)) || null
        );
    }

    try {
        console.log("🔄 Récupération des données depuis l'API...");
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return await response.json();
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return null;
    }
};

/**
 * Récupère l'activité quotidienne d'un utilisateur (API ou Mock)
 * @param {string} userId 
 * @returns {Promise<Array>}
 */
export const getUserActivity = async (userId) => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des données mockées pour l'activité...");
        return Promise.resolve(
            mockData.activity.find(activity => activity.userId === Number(userId))?.sessions || []
        );
    }

    try {
        console.log("🔄 Récupération de l'activité depuis l'API...");
        const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
        if (!response.ok) throw new Error("Erreur lors de la récupération de l'activité");
        return await response.json();
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return [];
    }
};

/**
 * Récupère les performances d'un utilisateur (API ou Mock)
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
export const getUserPerformance = async (userId) => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des données mockées pour la performance...");
        return Promise.resolve(
            mockData.performance.find(performance => performance.userId === Number(userId)) || null
        );
    }

    try {
        console.log("🔄 Récupération des performances depuis l'API...");
        const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des performances");
        return await response.json();
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return null;
    }
};

/**
 * Récupère les sessions moyennes d'un utilisateur (API ou Mock)
 * @param {string} userId 
 * @returns {Promise<Array>}
 */
export const getUserAverageSessions = async (userId) => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des sessions mockées...");
        return Promise.resolve(
            mockData.averageSessions.find(session => session.userId === Number(userId))?.sessions || []
        );
    }

    try {
        console.log("🔄 Récupération des sessions depuis l'API...");
        const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des sessions");
        return await response.json();
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return [];
    }
};
