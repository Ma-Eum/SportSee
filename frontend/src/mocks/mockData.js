export const mockUserData = {
    id: 12,
    userInfos: {
        firstName: "Thomas",
        lastName: "Dupont",
        age: 31
    },
    todayScore: 0.12,
    keyData: {
        calorieCount: 1930,
        proteinCount: 155,
        carbohydrateCount: 290,
        lipidCount: 50
    }
};

export const mockActivity = {
    userId: 12,
    sessions: [
        { day: "1", kilogram: 80, calories: 240 },
        { day: "2", kilogram: 80, calories: 220 },
        { day: "3", kilogram: 81, calories: 280 },
        { day: "4", kilogram: 81, calories: 290 },
        { day: "5", kilogram: 80, calories: 160 },
        { day: "6", kilogram: 80, calories: 162 },
        { day: "7", kilogram: 79, calories: 140 }
    ]
};

export const mockAverageSessions = {
    userId: 12,
    sessions: [
        { day: 1, sessionLength: 30 },
        { day: 2, sessionLength: 40 },
        { day: 3, sessionLength: 50 },
        { day: 4, sessionLength: 30 },
        { day: 5, sessionLength: 50 },
        { day: 6, sessionLength: 60 },
        { day: 7, sessionLength: 70 }
    ]
};

export const mockPerformance = {
    userId: 12,
    kind: {
        1: "Cardio",
        2: "Energie",
        3: "Endurance",
        4: "Force",
        5: "Vitesse",
        6: "Intensité"
    },
    data: [
        { value: 80, kind: 1 },
        { value: 120, kind: 2 },
        { value: 140, kind: 3 },
        { value: 50, kind: 4 },
        { value: 200, kind: 5 },
        { value: 90, kind: 6 }
    ]
};
