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
    getAllUsers()
      .then((data) => {
        if (!data || data.length === 0) {
          console.warn("⚠️ Aucune donnée utilisateur disponible.");
          return;
        }

        console.log("✅ Liste des utilisateurs récupérée :", data);

        // Ajoutons un log pour vérifier la structure des données
        data.forEach((user, index) => {
          console.log(`Utilisateur ${index + 1}:`, user); // Log de chaque utilisateur pour vérifier sa structure
        });

        // Filtrage des utilisateurs valides
        const validUsers = data.filter(user => 
          user?.data?.userInfos?.firstName && user?.data?.userInfos?.lastName
        );

        console.log("📊 Utilisateurs valides :", validUsers);  // Log des utilisateurs après filtrage

        if (validUsers.length > 0) {
          setUsers(validUsers.map(user => user.data)); // Met à jour la liste des utilisateurs valides
          setSelectedUser(String(validUsers[0].data.id)); // Sélectionne le premier utilisateur par défaut
        } else {
          console.warn("⚠️ Aucun utilisateur valide trouvé.");
        }
      })
      .catch((err) => {
        console.error("❌ Erreur chargement utilisateurs:", err);
      });
  }, []);

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

        {/* 🔽 Sélection d'utilisateur via une liste déroulante */}
        <div className="user-selection">
          <select onChange={handleSelectChange} value={selectedUser} disabled={users.length === 0}>
            <option key="default" value="" disabled>
              Sélectionnez un utilisateur
            </option>
            {users.map((user) => (
              user?.id && user?.userInfos ? (
                <option key={user.id} value={String(user.id)}>
                  {user.userInfos.firstName} {user.userInfos.lastName}
                </option>
              ) : (
                <option key={`unknown-${user.id}`} value={String(user.id)}>
                  Utilisateur Inconnu
                </option>
              )
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
