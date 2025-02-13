import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";
import DashboardLayout from "../components/layout/DashboardLayout";
import AverageSessionsChart from "../components/AverageSessionsChart";
import ActivityChart from "../components/ActivityChart";
import PerformanceChart from "../components/PerformanceChart"; 
import ScoreChart from "../components/ScoreChart";
import NutritionCard from "../components/NutritionCard";

import caloriesIcon from "../assets/images/calories-icon.png";
import proteinIcon from "../assets/images/protein-icon.png";
import carbsIcon from "../assets/images/carbs-icon.png";
import fatIcon from "../assets/images/fat-icon.png";

import "../styles/pages/profile.scss"; // 🔥 Import du bon style

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("🔄 Tentative de récupération des données utilisateur...");
        getUserData().then((data) => { // ✅ Suppression du `userId`
            console.log("✅ Données reçues :", data);
            if (data) {
                setUser(data);
            }
        }).catch(error => console.error("❌ Erreur lors de la récupération des données :", error));
    }, []);

    return (
        <DashboardLayout>
            <div className="profile">
                {user ? (
                    <>
                        <h1>Bonjour <span className="user-name">{user.userInfos.firstName}</span> !</h1>
                        <p className="congrats-message">Félicitations ! Vous avez explosé vos objectifs hier 🎉</p>

                        <div className="dashboard-container">
                            {/* 🟥 Graphiques Principaux */}
                            <div className="charts-container">
                                <ActivityChart />
                                <div className="charts-bottom">
                                    <AverageSessionsChart />
                                    <PerformanceChart />
                                    <ScoreChart score={user.todayScore} />
                                </div>
                            </div>

                            {/* 🟦 Cartes Infos Clés à droite */}
                            <div className="key-info-container">
                                <NutritionCard type="Calories" value={user.keyData.calorieCount} unit="kCal" icon={caloriesIcon} />
                                <NutritionCard type="Protéines" value={user.keyData.proteinCount} unit="g" icon={proteinIcon} />
                                <NutritionCard type="Glucides" value={user.keyData.carbohydrateCount} unit="g" icon={carbsIcon} />
                                <NutritionCard type="Lipides" value={user.keyData.lipidCount} unit="g" icon={fatIcon} />
                            </div>

                        </div>
                    </>
                ) : (
                    <p>Chargement des données...</p>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Profile;
