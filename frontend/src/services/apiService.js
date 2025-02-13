import mockData from "../mocks/mockData.json"; // ✅ Import JSON directement

/**
 * Récupère les informations de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserData = async () => {
    console.log("🔄 Chargement des données utilisateur depuis mockData.json...");
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = mockData.users.find(user => user.id === 12); // ✅ Recherche l'utilisateur avec ID 12
            console.log("✅ Données utilisateur récupérées :", user);
            resolve(user);
        }, 500);
    });
};

/**
 * Récupère l'activité quotidienne de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserActivity = async () => {
    console.log("🔄 Chargement de l'activité utilisateur...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("✅ Activité utilisateur récupérée :", mockData.activity.sessions);
            resolve(mockData.activity.sessions);
        }, 500);
    });
};

/**
 * Récupère les sessions moyennes de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserAverageSessions = async () => {
    console.log("🔄 Chargement des sessions moyennes...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("✅ Sessions moyennes récupérées :", mockData.averageSessions.sessions);
            resolve(mockData.averageSessions.sessions);
        }, 500);
    });
};

/**
 * Récupère les performances de l'utilisateur
 * @returns {Promise<object>}
 */
export const getUserPerformance = async () => {
    console.log("🔄 Chargement des performances utilisateur...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("✅ Performances utilisateur récupérées :", mockData.performance);
            resolve(mockData.performance);
        }, 500);
    });
};
