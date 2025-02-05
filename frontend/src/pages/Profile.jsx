import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserData(12).then((data) => {
            console.log("Données reçues dans Profile.jsx :", data); // Vérifier si les données arrivent
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
                </>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Profile;
