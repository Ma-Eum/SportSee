import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { getUserPerformance } from "../services/apiService";
import { useEffect, useState } from "react";
import "../styles/components/_performanceChart.scss"; // Import du style

const PerformanceChart = () => {
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        getUserPerformance().then((data) => { // ✅ Suppression du `userId`
            if (data) {
                setPerformance(data);
            }
        });
    }, []);

    if (!performance) return <p>Chargement...</p>;

    const categories = {
        1: "Cardio",
        2: "Énergie",
        3: "Endurance",
        4: "Force",
        5: "Vitesse",
        6: "Intensité"
    };

    const formattedData = performance.data.map(item => ({
        subject: categories[item.kind],
        value: item.value
    }));

    return (
        <div className="performance-chart">
            <h2>Performances</h2>
            <ResponsiveContainer width="100%" height={250}>
                <RadarChart outerRadius={90} data={formattedData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Performance" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceChart;