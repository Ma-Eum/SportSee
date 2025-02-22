import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/layout/_dashboard.scss";
import PropTypes from "prop-types";

const DashboardLayout = ({ children, hideNav = false }) => {
    return (
        <div className="dashboard-layout">
            <Header />
            <div className="dashboard-content">
                <Sidebar hideNav={hideNav} /> {/* ✅ Passe hideNav à Sidebar */}
                <main className="dashboard-main">{children}</main>
            </div>
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
    hideNav: PropTypes.bool, // ✅ Ajout de la validation des props
};

export default DashboardLayout;
