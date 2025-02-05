import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";
import AverageSessionsChart from "../components/AverageSessionsChart";
import ActivityChart from "../components/ActivityChart";

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
        <div>
            {user ? (
                <>
                    <h1>Bonjour {user.userInfos.firstName} !</h1>
                    <p>Âge : {user.userInfos.age} ans</p>
                    <p>Calories brûlées : {user.keyData.calorieCount}</p>

                    {/* Graphique des activités */}
                    <ActivityChart />
                    
                    {/* Graphique des sessions moyennes */}
                    <AverageSessionsChart />
                </>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Profile;
