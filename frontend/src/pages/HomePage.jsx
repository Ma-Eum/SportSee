import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getAllUsers } from "../services/apiService";
import "../styles/pages/_homePage.scss";

const HomePage = () => {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [selectedUser, setSelectedUser] = useState(""); // Utilisateur sélectionné
  const navigate = useNavigate(); // Gestion de la navigation

  // 🔄 Charge la liste des utilisateurs au chargement de la page
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); // Fonction qui bascule entre mockData et API

        if (!data || data.length === 0) {
          console.warn("⚠️ Aucune donnée utilisateur disponible.");
          return;
        }

        console.log("✅ Liste des utilisateurs récupérée :", data);

        // Mise à jour de la liste des utilisateurs
        setUsers(data);
        // Par défaut, sélectionne le premier utilisateur
        setSelectedUser(String(data[0].id));
      } catch (err) {
        console.error("❌ Erreur chargement utilisateurs:", err);
      }
    };

    fetchUsers();
  }, []); // Le tableau vide [] garantit que l'effet s'exécute une seule fois après le premier rendu

  // 🔄 Gestion du changement de sélection
  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  // 🚀 Redirection vers la page du profil sélectionné
  const handleGoToProfile = () => {
    if (selectedUser) {
      navigate(`/profile/${selectedUser}`); // Redirige vers le profil de l'utilisateur
    }
  };

  return (
    <DashboardLayout hideNav={true}>
      <div className="homepage-container">
        <h1>Choisissez un profil</h1>

         {/* 🔽 Affichage des prénoms et âges des utilisateurs */}
         <div className="user-names">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={user.id || index}>
                {/* Affichage du prénom, nom et âge */}
                {user?.userInfos?.firstName || `Utilisateur ${index + 1}`}{" "}
                {user?.userInfos?.lastName || ""} - Age: {user?.userInfos?.age || "Non précisé"}
              </div>
            ))
          ) : (
            <p>Aucun utilisateur disponible</p>
          )}
        </div>

        {/* 🔽 Sélection d'utilisateur via une liste déroulante */}
        <div className="user-selection">
          <select onChange={handleSelectChange} value={selectedUser} disabled={users.length === 0}>
            <option key="default" value="">
              Sélectionnez un utilisateur
            </option>
            {users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user?.userInfos?.firstName} {user?.userInfos?.lastName}
              </option>
            ))}
          </select>

          <button onClick={handleGoToProfile} disabled={!selectedUser}>
            Voir le profil
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
