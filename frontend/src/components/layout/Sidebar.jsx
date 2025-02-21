import "../../styles/layout/_sidebar.scss";
import yogaIcon from "../../assets/images/yoga-icon.png";
import swimIcon from "../../assets/images/natation-icon.png";
import bikeIcon from "../../assets/images/velo-icon.png";
import weightIcon from "../../assets/images/musculation-icon.png";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><img src={yogaIcon} alt="Yoga" /></li>
                    <li><img src={swimIcon} alt="Natation" /></li>
                    <li><img src={bikeIcon} alt="Vélo" /></li>
                    <li><img src={weightIcon} alt="Musculation" /></li>
                </ul>
            </nav>
            {/* ✅ Ajout d'une div pour mieux gérer le positionnement */}
            <div className="copyright">
                <p>Copiryght SportSee 2020</p>
            </div>
        </aside>
    );
};

export default Sidebar;