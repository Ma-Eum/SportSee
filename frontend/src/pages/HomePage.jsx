import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/apiService";
import "../styles/pages/_homePage.scss";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        if (!data || data.length === 0) {
          console.warn("⚠️ Aucune donnée utilisateur disponible.");
          return;
        }
        setUsers(data);
        setSelectedUser(String(data[0].id));
      } catch (err) {
        console.error("❌ Erreur chargement utilisateurs:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleGoToProfile = () => {
    if (selectedUser) {
      navigate(`/profile/${selectedUser}`);
    }
  };

  return (
    <div className="homepage-container">
      <h1>Choisissez un profil</h1>
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
  );
};

export default HomePage;
