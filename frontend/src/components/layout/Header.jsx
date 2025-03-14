import { Link, useLocation } from "react-router-dom";
import "../../styles/layout/_header.scss";
import logo from "../../assets/images/logo.png"; // ✅ Import du logo

const Header = () => {
    const location = useLocation(); // ✅ Récupère l'URL actuelle
    const isHomePage = location.pathname === "/"; // ✅ Vérifie si on est sur la HomePage

    return (
        <header className="header">
            <img src={logo} alt="SportSee" className="logo" /> {/* ✅ Ajout du logo */}
            {!isHomePage && ( // ✅ Cache la navigation si on est sur la HomePage
                <nav>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/profil/12">Profil</Link></li>
                        <li><Link to="/settings">Réglage</Link></li>
                        <li><Link to="/chat">Communauté</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
