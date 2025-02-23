import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
                    <li><Link to="/yoga"><img src={yogaIcon} alt="Yoga" /></Link></li>
                    <li><Link to="/natation"><img src={swimIcon} alt="Natation" /></Link></li>
                    <li><Link to="velo"><img src={bikeIcon} alt="Vélo" /></Link></li>
                    <li><Link to="/musculation"><img src={weightIcon} alt="Musculation" /></Link></li>
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
