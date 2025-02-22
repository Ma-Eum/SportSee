import PropTypes from "prop-types";
import "../../styles/layout/_sidebar.scss";
import yogaIcon from "../../assets/images/yoga-icon.png";
import swimIcon from "../../assets/images/natation-icon.png";
import bikeIcon from "../../assets/images/velo-icon.png";
import weightIcon from "../../assets/images/musculation-icon.png";

const Sidebar = ({ hideNav = false }) => {
    return (
        <aside className="sidebar">
            <nav className={hideNav ? "hidden-nav" : ""}> {/* ✅ Masque la nav mais garde l'espace */}
                <ul>
                    <li><img src={yogaIcon} alt="Yoga" /></li>
                    <li><img src={swimIcon} alt="Natation" /></li>
                    <li><img src={bikeIcon} alt="Vélo" /></li>
                    <li><img src={weightIcon} alt="Musculation" /></li>
                </ul>
            </nav>
            <div className="copyright">
                <p>Copyright SportSee 2020</p>
            </div>
        </aside>
    );
};

Sidebar.propTypes = {
    hideNav: PropTypes.bool,
};

export default Sidebar;
