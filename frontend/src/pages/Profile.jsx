import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";
import DashboardLayout from "../components/layout/DashboardLayout";
import AverageSessionsChart from "../components/AverageSessionsChart";
import ActivityChart from "../components/ActivityChart";
import PerformanceChart from "../components/PerformanceChart"; // 🔥 Ajout du bon import

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserData(12).then((data) => {
            if (data) {
                setUser(data);
            }
        });
    }, []);

    return (
        <DashboardLayout>
            <div className="profile">
                {user ? (
                    <>
                        <h1>Bonjour <span className="user-name">{user.userInfos.firstName}</span> !</h1>
                        <p>Âge : {user.userInfos.age} ans</p>
                        <p>Calories brûlées : {user.keyData.calorieCount}</p>
                        <p>Félicitations ! Vous avez explosé vos objectifs hier 🎉</p>


                        {/* Graphique des activités */}
                        <ActivityChart />
                        
                        {/* Graphique des sessions moyennes */}
                        <AverageSessionsChart />
                        
                        {/* Graphique de performance */}
                        <PerformanceChart />
                    </>
                ) : (
                    <p>Chargement des données...</p>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Profile;