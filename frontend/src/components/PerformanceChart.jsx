import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { getUserPerformance } from "../services/apiService";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/components/_performanceChart.scss";

const PerformanceChart = ({ userId }) => {
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getUserPerformance(userId)
            .then((performanceData) => {
                console.log("✅ Données de performance :", performanceData);
                if (performanceData && performanceData.data && Array.isArray(performanceData.data)) {
                    setPerformance(performanceData);
                } else {
                    console.error("❌ Données de performance invalides !");
                    setPerformance(null);
                }
            })
            .catch((error) => {
                console.error("❌ Erreur récupération des performances :", error);
                setPerformance(null);
            });
    }, [userId]);

    if (!performance) return <p>Chargement...</p>;

    // ✅ Correction : Traduire les catégories en texte clair
    const categoryLabels = {
        1: "Intensité",
        2: "Vitesse",
        3: "Force",
        4: "Endurance",
        5: "Énergie",
        6: "Cardio",
    };

    // ✅ Corriger le mapping des données pour éviter [object Object]
    const formattedData = performance.data.map(item => ({
        subject: categoryLabels[item.kind] || "Inconnu",
        value: item.value
    }));

    return (
        <div className="performance-chart">
            <ResponsiveContainer width="100%" height={263}>
                <RadarChart outerRadius="65%" data={formattedData}>
                    <PolarGrid stroke="rgba(255, 255, 255, 0.3)" />

                    <PolarAngleAxis 
                        dataKey="subject"
                        tick={{ fill: "white", fontSize: 13, fontWeight: 500 }}
                        tickSize={15} // ✅ Ajoute de l'espace entre les libellés et le graphique
                    />

                    {/* ✅ Correction du fillOpacity */}
                    <Radar 
                        name="Performance"
                        dataKey="value"
                        stroke="#FF0101"
                        fill="#FF0101"
                        fillOpacity={0.7} 
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

PerformanceChart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default PerformanceChart;
