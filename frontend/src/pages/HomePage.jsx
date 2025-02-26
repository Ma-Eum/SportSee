import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getAllUsers } from "../services/apiService";
import "../styles/pages/_homePage.scss";

const HomePage = () => {
  const [users, setUsers] = useState([]); // Stocke la liste des utilisateurs
  const [selectedUser, setSelectedUser] = useState(""); // Stocke l'utilisateur sélectionné
  const navigate = useNavigate(); // Permet de naviguer vers le profil sélectionné

  // 🔄 Charge la liste des utilisateurs au chargement de la page
  useEffect(() => {
    getAllUsers()
      .then((data) => {
        console.log("✅ Liste des utilisateurs récupérée :", data);
        setUsers(data);
        if (data.length > 0) {
          setSelectedUser(data[0].id); // Par défaut, sélectionne le premier utilisateur
        }
      })
      .catch((err) => console.error("❌ Erreur chargement utilisateurs:", err));
  }, []);

  // 🔄 Gestion du changement de sélection
  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  // 🚀 Redirection vers la page du profil sélectionné
  const handleGoToProfile = () => {
    if (selectedUser) {
      navigate(`/profile/${selectedUser}`);
    }
  };

  return (
    <DashboardLayout hideNav={true}>
      <div className="homepage-container">
        <h1>Choisissez un profil</h1>

        {/* 🔽 Sélection d'utilisateur via une liste déroulante */}
        <div className="user-selection">
          <select value={selectedUser} onChange={handleSelectChange}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.userInfos?.firstName} {user.userInfos?.lastName}
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