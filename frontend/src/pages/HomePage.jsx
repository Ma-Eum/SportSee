import { Link } from "react-router-dom";
import "../styles/pages/_homePage.scss";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Choisissez un profil</h1>
      <div className="user-list">
        <Link to="/profile/12" className="user-card">Thomas Dupont</Link>
        <Link to="/profile/13" className="user-card">Nouveau Utilisateur</Link>
      </div>
    </div>
  );
};

export default HomePage;
