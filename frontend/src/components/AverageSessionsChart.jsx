import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getUserActivity } from "../services/apiService";
import "../styles/components/_activityChart.scss"; // ✅ Import du style SCSS

const ActivityChart = ({ userId }) => { // ✅ Ajout de userId en prop
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!userId) return;
        console.log(`🔄 Récupération de l'activité pour userId: ${userId}`);
        getUserActivity(userId).then((activityData) => {
            if (activityData) {
                setData(activityData);
            }
        }).catch(error => console.error("❌ Erreur récupération activité :", error));
    }, [userId]);

    return (
        <div className="activity-chart">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#ff7300" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

ActivityChart.propTypes = {
    userId: PropTypes.string.isRequired, // ✅ Vérification de prop
};

export default ActivityChart;
