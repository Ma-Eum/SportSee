import { Link } from "react-router-dom";
import "../styles/pages/_404.scss"; // Ajoute un style spécifique si besoin

const Page404 = () => {
    return (
        <div className="not-found">
            <h1>Oups !</h1>
            <p>{`La page que vous cherchez n'existe pas ou l'utilisateur n'a pas été trouvé.`}</p>
            <Link to="/" className="home-button">{`Retour à l'accueil`}</Link>
        </div>
    );
};

export default Page404;
