import mockData from "../data/mockData.json"; // Import du mock
import { USE_MOCK_DATA, API_BASE_URL } from "../config"; // Configuration

/**
 * Récupère les données d'un utilisateur (API ou Mock)
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
export const getUserData = async (userId) => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des données mockées...");
        return new Promise((resolve) => {
            const user = mockData.users.find(user => user.id === Number(userId));
            resolve(user || null);
        });
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
 * Récupère les sessions moyennes d'un utilisateur
 * @param {string} userId 
 * @returns {Promise<Array>}
 */
export const getUserAverageSessions = async (userId) => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des sessions mockées...");
        return new Promise((resolve) => {
            const userSessions = mockData.averageSessions.find(session => session.userId === Number(userId));
            resolve(userSessions ? userSessions.sessions : []);
        });
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
