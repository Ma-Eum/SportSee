import "../../styles/layout/_header.scss";
import logo from "../../assets/images/logo.png"; // ✅ Import du logo

const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="SportSee" className="logo" /> {/* ✅ Ajout du logo */}
            <nav>
                <ul>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
