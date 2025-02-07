import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/layout/_dashboard.scss";
import PropTypes from "prop-types"; // 🔥 Importer PropTypes

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Header />
            <div className="dashboard-content">
                <Sidebar />
                <main className="dashboard-main">{children}</main>
            </div>
        </div>
    );
};

// 🔥 Ajout des PropTypes pour éviter l'erreur ESLint
DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
