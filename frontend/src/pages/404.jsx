import { Link } from "react-router-dom";
import "../styles/pages/_404.scss"; 

const Page404 = () => {
    return (
        <div className="not-found">
            <h1>Oups !</h1>
            <p>La page que vous cherchez n&apos;existe pas ou l&apos;utilisateur n&apos;a pas été trouvé.</p>
            
            <div className="buttons">
                <Link to="/" className="home-button">Retour à l&apos;accueil</Link>
                <button className="back-button" onClick={() => window.history.back()}>
                    Retour à la page précédente
                </button>
            </div>
        </div>
    );
};

export default Page404;
