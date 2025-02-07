import "../../styles/layout/_sidebar.scss";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><img src="/icons/yoga.svg" alt="Yoga" /></li>
                    <li><img src="/icons/swim.svg" alt="Natation" /></li>
                    <li><img src="/icons/bike.svg" alt="Vélo" /></li>
                    <li><img src="/icons/weight.svg" alt="Musculation" /></li>
                </ul>
            </nav>
            <p>© SportSee 2024</p>
        </aside>
    );
};

export default Sidebar;
