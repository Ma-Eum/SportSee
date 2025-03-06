import mockData from "../mocks/mockData.json"; // Import des données mockées
import { USE_MOCK_DATA , API_BASE_URL} from "../config"; // Configuration

console.log(`🛠️ Mode MockData activé : ${USE_MOCK_DATA}`);

/**
 * Récupère tous les utilisateurs (API ou Mock)
 * @returns {Promise<Array>}
 */
export const getAllUsers = async () => {
    if (USE_MOCK_DATA) {
        console.log("🔄 Utilisation des utilisateurs mockés...");
        return Promise.resolve(mockData.users || []); // Retourne les utilisateurs mockés
    }
  
    try {
        // Simule la récupération des utilisateurs via le tableau USER_MAIN_DATA
        const USER_MAIN_DATA = [
            {
                id: 12,
                userInfos: {
                    firstName: 'Karl',
                    lastName: 'Dovineau',
                    age: 31,
                },
                todayScore: 0.12,
                keyData: {
                    calorieCount: 1930,
                    proteinCount: 155,
                    carbohydrateCount: 290,
                    lipidCount: 50
                }
            },
            {
                id: 18,
                userInfos: {
                    firstName: 'Cecilia',
                    lastName: 'Ratorez',
                    age: 34,
                },
                score: 0.3,
                keyData: {
                    calorieCount: 2500,
                    proteinCount: 90,
                    carbohydrateCount: 150,
                    lipidCount: 120
                }
            }
        ];

        console.log("✅ Utilisateurs récupérés : ", USER_MAIN_DATA);
        return USER_MAIN_DATA; // Retourne tous les utilisateurs
    } catch (error) {
        console.error("❌ Erreur de récupération des utilisateurs", error);
        return []; // Retourne un tableau vide en cas d'erreur
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
      return Promise.resolve(mockData.users.find(user => user.id === Number(userId)) || null);
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`);
      if (!response.ok) throw new Error(`Erreur lors de la récupération des données de l'utilisateur ${userId}`);
      const userData = await response.json();
      return userData; // Retourne les données utilisateur
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
