import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { getUserPerformance } from "../services/apiService";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/components/_performanceChart.scss";

const PerformanceChart = ({ userId }) => {
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        if (!userId) return;
        console.log(`🔄 Récupération des performances pour userId: ${userId}`);
        getUserPerformance(userId)
            .then((data) => setPerformance(data))
            .catch((error) => console.error("❌ Erreur récupération performances :", error));
    }, [userId]);

    if (!performance) return <p>Chargement...</p>;

    const categories = performance.kind;

    const formattedData = performance.data.map(item => ({
        subject: categories[item.kind],
        value: item.value
    }));

    return (
        <div className="performance-chart">
            <ResponsiveContainer width="100%" height={263}>
                <RadarChart outerRadius="65%" data={formattedData}>
                    <PolarGrid />
                    <PolarAngleAxis 
                        dataKey="subject"
                        tick={{ fill: "white", fontSize: 12 }}
                    />
                    <Radar name="Performance" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

PerformanceChart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default PerformanceChart;
