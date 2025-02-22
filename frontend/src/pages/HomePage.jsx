import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getAllUsers } from "../services/apiService";
import "../styles/pages/_homePage.scss";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers).catch(err => console.error("❌ Erreur chargement utilisateurs:", err));
  }, []);

  return (
    <DashboardLayout hideNav={true}> {/* ✅ Cache la nav */}
      <div className="homepage-container">
        <h1>Choisissez un profil</h1>
        <div className="user-list">
          {users.map((user) => (
            <Link key={user.id} to={`/profile/${user.id}`} className="user-card">
              {user.userInfos.firstName} {user.userInfos.lastName}
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
