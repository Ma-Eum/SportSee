import { useParams } from "react-router-dom";
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

import "../styles/pages/_profile.scss";

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(`🔄 Récupération des données pour userId: ${userId}`);
        getUserData(userId)
            .then((data) => setUser(data))
            .catch(error => console.error("❌ Erreur récupération utilisateur :", error));
    }, [userId]);

    return (
        <DashboardLayout>
            <div className="profile">
                {user ? (
                    <>
                        <h1>Bonjour <span className="user-name">{user.userInfos.firstName}</span> !</h1>
                        <p className="congrats-message">Félicitations ! Vous avez explosé vos objectifs hier 🎉</p>

                        <div className="dashboard-container">
                            <div className="charts-container">
                                <ActivityChart userId={userId} />
                                <div className="charts-bottom">
                                    <AverageSessionsChart userId={userId} />
                                    <PerformanceChart userId={userId} />
                                    <ScoreChart userId={userId} />
                                </div>
                            </div>

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