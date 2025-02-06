import { mockUserData, mockActivity, mockAverageSessions, mockPerformance } from "../mocks/mockData";

/**
 * Récupère les informations d'un utilisateur (Mock)
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserData = async (userId) => {
    console.log(`Fetching user data for userId: ${userId}`); // Évite l'erreur ESLint
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockUserData), 500); // Simule un délai de réponse
    });
};

/**
 * Récupère l'activité quotidienne d'un utilisateur (Mock)
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserActivity = async (userId) => {
    console.log(`Fetching activity data for userId: ${userId}`);
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockActivity), 500);
    });
};

/**
 * Récupère les sessions moyennes d'un utilisateur (Mock)
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserAverageSessions = async (userId) => {
    console.log(`Fetching average sessions for userId: ${userId}`);
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockAverageSessions), 500);
    });
};

/**
 * Récupère les performances d'un utilisateur (Mock)
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserPerformance = async (userId) => {
    console.log(`Fetching performance data for userId: ${userId}`);
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockPerformance), 500);
    });
};
