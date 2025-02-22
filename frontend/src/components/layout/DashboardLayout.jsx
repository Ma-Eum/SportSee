import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/layout/_dashboard.scss";
import PropTypes from "prop-types";

const DashboardLayout = ({ children, hideNav = false }) => {
    return (
        <div className="dashboard-layout">
            <Header /> {/* ✅ Header sans hideNav */}
            <div className="dashboard-content">
                <Sidebar hideNav={hideNav} /> {/* ✅ Passe `hideNav` pour cacher la nav dans la Sidebar */}
                <main className="dashboard-main">{children}</main>
            </div>
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
    hideNav: PropTypes.bool,
};

export default DashboardLayout;
