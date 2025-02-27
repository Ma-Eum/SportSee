import mockData from "../mocks/mockData.json"; // Import des données mockées
import { USE_MOCK_DATA, API_BASE_URL } from "../config"; // Configuration

console.log(`🛠️ Mode MockData activé : ${USE_MOCK_DATA}`);

/**
 * Récupère tous les utilisateurs (API ou Mock)
 * @returns {Promise<Array>}
 */
export const getAllUsers = async () => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des utilisateurs mockés...");
        return Promise.resolve(mockData.users || []);  // Retourne les utilisateurs mockés
    }

    try {
        // Vérification de l'URL pour l'API backend
        console.log(`📡 Tentative de récupération des utilisateurs depuis ${API_BASE_URL}/users`);

        // Exemple d'IDs utilisateurs que l'on récupère depuis l'API
        const userIds = [12, 18]; // Si le backend expose plusieurs utilisateurs par ID
        const userRequests = userIds.map((id) =>
            fetch(`${API_BASE_URL}/user/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        console.error(`❌ Erreur API ${res.status}: ${res.statusText}`);
                        return null; // Si la requête échoue, retourne null
                    }
                    return res.json();
                })
        );

        // Attente des résultats de toutes les requêtes
        const users = await Promise.all(userRequests);
        return users.filter((user) => user !== null); // Retourne les utilisateurs valides
    } catch (error) {
        console.error("❌ Erreur API ou récupération de données utilisateur échouée. Passage aux données mockées.");
        console.error(error); // Affiche l'erreur complète pour le debug
        return mockData.users; // Retourne les données mockées en cas d'erreur d'API
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
        );  // Recherche d'un utilisateur dans les données mockées
    }

    try {
        console.log(`📡 Tentative de récupération des données utilisateur: ${API_BASE_URL}/user/${userId}`);
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);

        if (!response.ok) throw new Error(`Erreur lors de la récupération des données de l'utilisateur ${userId}`);

        const userData = await response.json();
        return userData;  // Retourne les données utilisateur
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
        );  // Recherche des sessions dans les données mockées
    }

    try {
        console.log(`📡 Récupération de l'activité utilisateur depuis l'API: ${API_BASE_URL}/user/${userId}/activity`);
        const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
        if (!response.ok) throw new Error("Erreur lors de la récupération de l'activité");

        return await response.json();  // Retourne les données d'activité
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
        );  // Recherche des performances dans les données mockées
    }

    try {
        console.log(`📡 Récupération des performances utilisateur depuis l'API: ${API_BASE_URL}/user/${userId}/performance`);
        const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des performances");

        return await response.json();  // Retourne les données de performance
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
        );  // Recherche des sessions dans les données mockées
    }

    try {
        console.log(`📡 Récupération des sessions utilisateur depuis l'API: ${API_BASE_URL}/user/${userId}/average-sessions`);
        const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des sessions");

        return await response.json();  // Retourne les données des sessions moyennes
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return [];
    }
};
