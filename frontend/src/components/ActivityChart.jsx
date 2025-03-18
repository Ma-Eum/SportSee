import { useEffect, useState } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import PropTypes from "prop-types"; 
import { getUserActivity } from "../services/apiService";
import "../styles/components/_activityChart.scss"; 

const ActivityChart = ({ userId }) => { // ✅ Ajout du userId en prop
    const [data, setData] = useState([]);
    const [ticks, setTicks] = useState([]);

    useEffect(() => {
        if (!userId) return;

        console.log(`🔄 Récupération de l'activité pour userId: ${userId}`);

        getUserActivity(userId)
            .then((activityData) => { 
                if (activityData && activityData.length > 0) {
                    console.log("✅ Activité récupérée :", activityData);
// Nous allons transformer le champ 'day' en un numéro (1, 2, 3, ...)
                    const transformedData = activityData.map((item, index) => ({
                        ...item,
                        day: index + 1 // Assigne 1, 2, 3... pour chaque jour 
                    }));
                    setData(transformedData);

                    // Calcul des valeurs min, médiane, max pour le poids (kilogram)
                    const kilograms = activityData.map(item => item.kilogram);
                    const minKilogram = Math.min(...kilograms);
                    const maxKilogram = Math.max(...kilograms);
                    const medianKilogram = Math.round((minKilogram + maxKilogram) / 2); 

                    // ✅ Création d'un tableau de 4 ticks : Min-1, Min, Médiane, Max+2
                    const roundedTicks = [minKilogram - 1, medianKilogram, maxKilogram + 4];
                    
                    setTicks(roundedTicks);

                    console.log("✅ Ticks alignés :", roundedTicks);
                } else {
                    console.error("❌ Aucune donnée d'activité trouvée !");
                    setData([]);
                }
            })
            .catch(error => {
                console.error("❌ Erreur récupération activité :", error);
                setData([]); // Assure que le composant ne plante pas
            });
    }, [userId]);

    return (
        <div className="activity-chart">
            <div className="chart-header">
                <h2>Activité quotidienne</h2>
                <div className="chart-legend">
                    <div className="legend-item">
                        <span className="dot black"></span> Poids (kg)
                    </div>
                    <div className="legend-item">
                        <span className="dot red"></span> Calories brûlées (kCal)
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} barGap={10} barSize={7} barCategoryGap={5}>
                    <CartesianGrid stroke="#DEDEDE" vertical={false} strokeDasharray="3 3" />

                    <XAxis 
                        dataKey="day"  
                        tick={{ fill: "#74798C" }} 
                        tickLine={false} 
                    />

                    {/* ✅ Axe Y pour le poids avec 3 ticks (Min-1,  Médiane, Max+4) */}
                    <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#74798C" }}
                        tickLine={false}
                        axisLine={false}
                        domain={[ticks[0], ticks[3]]} 
                        ticks={ticks}  // ✅ Correction pour 4 ticks bien alignés
                        interval={0}  
                        allowDecimals={false}
                    />

                    {/* ✅ Axe Y pour les calories - avec une échelle réduite */}
                    <YAxis 
                        yAxisId="left"
                        orientation="left"
                        tick={{ fill: "transparent" }} 
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 'auto']}  
                        style={{ display: 'none' }}  
                    />

                    <Tooltip cursor={{ fill: "rgba(196, 196, 196, 0.5)", width: 56 }} />

                    {/* ✅ Barres ajustées avec le bon yAxisId */}
                    <Bar yAxisId="right" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="left" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// ✅ Ajout de la vérification des props
ActivityChart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ActivityChart;
