import "../../styles/layout/_sidebar.scss";
import PropTypes from "prop-types"; // ✅ Ajout de PropTypes
import yogaIcon from "../../assets/images/yoga-icon.png";
import swimIcon from "../../assets/images/natation-icon.png";
import bikeIcon from "../../assets/images/velo-icon.png";
import weightIcon from "../../assets/images/musculation-icon.png";

const Sidebar = ({ hideNav = false }) => {
    return (
        <aside className="sidebar">
            {!hideNav && ( // ✅ Vérifie bien hideNav avant d'afficher la nav
                <nav>
                    <ul>
                        <li><img src={yogaIcon} alt="Yoga" /></li>
                        <li><img src={swimIcon} alt="Natation" /></li>
                        <li><img src={bikeIcon} alt="Vélo" /></li>
                        <li><img src={weightIcon} alt="Musculation" /></li>
                    </ul>
                </nav>
            )}
            <div className="copyright">
                <p>Copyright SportSee 2020</p>
            </div>
        </aside>
    );
};

// ✅ Ajout de la validation des props
Sidebar.propTypes = {
    hideNav: PropTypes.bool,
};

export default Sidebar;
