import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { getUserPerformance } from "../services/apiService";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // ✅ Ajout pour la validation des props
import "../styles/components/_performanceChart.scss"; // ✅ Import du style

const PerformanceChart = ({ userId }) => { // ✅ Ajout du `userId` en prop
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        if (!userId) return;
        console.log(`🔄 Récupération des performances pour userId: ${userId}`);
        getUserPerformance(userId).then((data) => {
            if (data) {
                setPerformance(data);
            }
        }).catch(error => console.error("❌ Erreur récupération performances :", error));
    }, [userId]); // ✅ Mise à jour si `userId` change

    if (!performance) return <p>Chargement...</p>;

    // ✅ Mapping des catégories pour les afficher correctement
    const categories = {
        1: "Intensité",
        2: "Vitesse",
        3: "Force",
        4: "Endurance",
        5: "Énergie",
        6: "Cardio"
    };

    // ✅ Formatage des données pour le graphique
    const formattedData = performance.data.map(item => ({
        subject: categories[item.kind],
        value: item.value
    }));

    return (
        <div className="performance-chart">
            <ResponsiveContainer width="100%" height={263}> {/* ✅ Hauteur fixe */}
                <RadarChart outerRadius="65%" data={formattedData}> {/* ✅ Graphique légèrement réduit */}
                    <PolarGrid />
                    <PolarAngleAxis 
                        dataKey="subject"
                        tick={({ payload, x, y }) => {
                            let dx = 0, dy = 0, textAnchor = "middle";

                            switch (payload.value) {
                                case "Intensité": dy = -20; break; // 🔥 Décale vers le haut
                                case "Vitesse": dx = 20; dy = -12; textAnchor = "start"; break; // 🔥 Droite
                                case "Force": dx = 20; dy = -10; textAnchor = "start"; break; // 🔥 Droite et légèrement en haut
                                case "Endurance": dy = -5; break; // 🔥 Bas
                                case "Énergie": dx = -20; dy = -10; textAnchor = "end"; break; // 🔥 Gauche et légèrement en haut
                                case "Cardio": dx = -20; dy = -12; textAnchor = "end"; break; // 🔥 Gauche
                            }

                            return (
                                <text 
                                    x={x + dx} 
                                    y={y + dy} 
                                    textAnchor={textAnchor} 
                                    fill="white" 
                                    fontSize={12}
                                >
                                    {payload.value}
                                </text>
                            );
                        }}
                        tickLine={false} 
                    />
                    <Radar name="Performance" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

// ✅ Vérification des props
PerformanceChart.propTypes = {
    userId: PropTypes.string.isRequired, // ✅ Assure que `userId` est bien reçu en string
};

export default PerformanceChart;
