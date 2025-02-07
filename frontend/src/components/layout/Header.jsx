import "../../styles/layout/_header.scss";

const Header = () => {
    return (
        <header className="header">
            <h1>SportSee</h1>
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
