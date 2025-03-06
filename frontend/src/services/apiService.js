import mockData from "../mocks/mockData.json"; // Import des données mockées
import { USE_MOCK_DATA } from "../config"; // Configuration

const API_URL = "http://localhost:3000"; // L'URL de ton API

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
    // On va récupérer les utilisateurs depuis l'API backend en utilisant leurs IDs
    const userIds = [12, 18];  // Manuellement ou dynamiquement, il faut savoir quels utilisateurs on a
    const userPromises = userIds.map(async (id) => {
      const response = await fetch(`${API_URL}/user/${id}`);  // Récupérer les informations d'un utilisateur par ID
      if (!response.ok) {
        throw new Error(`Erreur API: Impossible de récupérer l'utilisateur avec l'ID ${id}`);
      }
      return response.json();  // Retourner les données de l'utilisateur
    });

    // Attendre que toutes les requêtes se terminent
    const users = await Promise.all(userPromises);
    console.log("✅ Liste des utilisateurs récupérés depuis le backend : ", users);
    return users.map(user => user.data);  // Retourner les données des utilisateurs
  } catch (error) {
    console.error("❌ Erreur de récupération des utilisateurs", error);
    return [];  // Retourner un tableau vide en cas d'erreur
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
    // Récupération des données d'un utilisateur depuis l'API
    const response = await fetch(`${API_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Erreur API: Impossible de récupérer les données de l'utilisateur ${userId}`);
    }

    const user = await response.json();
    console.log("✅ Données de l'utilisateur récupérées : ", user);
    return user.data;  // Retourne les données de l'utilisateur
  } catch (error) {
    console.error("❌ Erreur de récupération des données utilisateur", error);
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
    const response = await fetch(`${API_URL}/user/${userId}/activity`);
    if (!response.ok) {
      throw new Error("Erreur API: Impossible de récupérer l'activité de l'utilisateur");
    }

    const userActivity = await response.json();
    console.log("✅ Activité de l'utilisateur récupérée : ", userActivity);
    return userActivity.sessions;
  } catch (error) {
    console.error("❌ Erreur de récupération de l'activité utilisateur", error);
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
    const response = await fetch(`${API_URL}/user/${userId}/performance`);
    if (!response.ok) {
      throw new Error("Erreur API: Impossible de récupérer les performances de l'utilisateur");
    }

    const userPerformance = await response.json();
    console.log("✅ Performances de l'utilisateur récupérées : ", userPerformance);
    return userPerformance;
  } catch (error) {
    console.error("❌ Erreur de récupération des performances de l'utilisateur", error);
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
    const response = await fetch(`${API_URL}/user/${userId}/average-sessions`);
    if (!response.ok) {
      throw new Error("Erreur API: Impossible de récupérer les sessions moyennes de l'utilisateur");
    }

    const userAverageSessions = await response.json();
    console.log("✅ Sessions moyennes de l'utilisateur récupérées : ", userAverageSessions);
    return userAverageSessions.sessions;
  } catch (error) {
    console.error("❌ Erreur de récupération des sessions moyennes de l'utilisateur", error);
    return [];
  }
};
