import mockData from "../mocks/mockData.json";

/**
 * Récupère tous les utilisateurs disponibles.
 */
export const getAllUsers = async () => {
    console.log("🔄 Récupération de tous les utilisateurs...");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mockData.users && mockData.users.length > 0) {
                console.log("✅ Utilisateurs récupérés :", mockData.users);
                resolve(mockData.users);
            } else {
                console.error("❌ Aucun utilisateur trouvé !");
                reject("Aucun utilisateur trouvé");
            }
        }, 500);
    });
};

/**
 * Récupère les informations de l'utilisateur par son ID.
 */
export const getUserData = async (userId) => {
    console.log(`🔄 Récupération des données utilisateur pour l'ID: ${userId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockData.users.find(user => user.id === parseInt(userId));
            if (user) {
                console.log("✅ Utilisateur trouvé :", user);
                resolve(user);
            } else {
                console.error("❌ Utilisateur non trouvé !");
                reject("Utilisateur introuvable");
            }
        }, 500);
    });
};

/**
 * Récupère l'activité quotidienne de l'utilisateur.
 */
export const getUserActivity = async (userId) => {
    console.log(`🔄 Récupération de l'activité pour userId: ${userId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!mockData.activity || !Array.isArray(mockData.activity.sessions)) {
                console.error("❌ Données d'activité non disponibles !");
                return reject("Données d'activité introuvables");
            }

            const activity = mockData.activity.find(activity => activity.userId === parseInt(userId));
            if (activity) {
                console.log("✅ Activité récupérée :", activity.sessions);
                resolve(activity.sessions);
            } else {
                console.error("❌ Activité utilisateur non trouvée !");
                reject("Activité utilisateur introuvable");
            }
        }, 500);
    });
};

/**
 * Récupère les sessions moyennes de l'utilisateur.
 */
export const getUserAverageSessions = async (userId) => {
    console.log(`🔄 Récupération des sessions moyennes pour userId: ${userId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!mockData.averageSessions || !Array.isArray(mockData.averageSessions.sessions)) {
                console.error("❌ Données des sessions moyennes non disponibles !");
                return reject("Données des sessions moyennes introuvables");
            }

            const userSessions = mockData.averageSessions.find(session => session.userId === parseInt(userId));
            if (userSessions) {
                console.log("✅ Sessions moyennes récupérées :", userSessions.sessions);
                resolve(userSessions.sessions);
            } else {
                console.error("❌ Sessions moyennes non trouvées !");
                reject("Sessions moyennes introuvables");
            }
        }, 500);
    });
};

/**
 * Récupère les performances de l'utilisateur.
 */
export const getUserPerformance = async (userId) => {
    console.log(`🔄 Récupération des performances pour userId: ${userId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!mockData.performance || !Array.isArray(mockData.performance.data)) {
                console.error("❌ Données de performances non disponibles !");
                return reject("Données de performances introuvables");
            }

            const performance = mockData.performance.find(perf => perf.userId === parseInt(userId));
            if (performance) {
                console.log("✅ Performances récupérées :", performance.data);
                resolve(performance);
            } else {
                console.error("❌ Performances utilisateur non trouvées !");
                reject("Performances utilisateur introuvables");
            }
        }, 500);
    });
};
