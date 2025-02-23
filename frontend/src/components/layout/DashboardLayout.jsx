import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/layout/_dashboard.scss";
import PropTypes from "prop-types";
import { USE_MOCK_DATA } from "../config"; // ✅ Import du mode actuel

const DashboardLayout = ({ children, hideNav = false }) => {
    return (
        <div className="dashboard-layout">
            <Header hideNav={hideNav} />
            <div className="dashboard-content">
                <Sidebar hideNav={hideNav} />
                <main className="dashboard-main">
                    <div className="mode-indicator">
                        Mode : {USE_MOCK_DATA ? "Mock Data" : "API Backend"}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
    hideNav: PropTypes.bool,
};

export default DashboardLayout;
