import { useEffect, useState } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import PropTypes from "prop-types"; 
import { getUserActivity } from "../services/apiService";
import "../styles/components/_activityChart.scss"; 

const ActivityChart = ({ userId }) => { 
    const [data, setData] = useState([]);
    const [ticks, setTicks] = useState([]);

    useEffect(() => {
        if (!userId) return;

        console.log(`🔄 Récupération de l'activité pour userId: ${userId}`);

        getUserActivity(userId)
            .then((activityData) => { 
                if (activityData && activityData.length > 0) {
                    console.log("✅ Activité récupérée :", activityData);

                    const transformedData = activityData.map((item, index) => ({
                        ...item,
                        day: index + 1 
                    }));
                    setData(transformedData);

                    // ✅ Calcul des valeurs min, médiane et max du poids
                    const kilograms = activityData.map(item => item.kilogram);
                    const minKilogram = Math.min(...kilograms);
                    const maxKilogram = Math.max(...kilograms);
                    const medianKilogram = Math.round((minKilogram + maxKilogram) / 2); 

                    // ✅ Création d'un tableau de 3 ticks : Min-1, Médiane, Max+5
                    const roundedTicks = [minKilogram - 1, medianKilogram, maxKilogram + 5];
                    
                    setTicks(roundedTicks);

                    console.log("✅ Ticks alignés :", roundedTicks);
                } else {
                    console.error("❌ Aucune donnée d'activité trouvée !");
                    setData([]);
                }
            })
            .catch(error => {
                console.error("❌ Erreur récupération activité :", error);
                setData([]);
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

            <ResponsiveContainer width="100%" height={300}>  
                <BarChart 
                    data={data} 
                    barGap={10} 
                    barSize={7} 
                    barCategoryGap={5} 
                    margin={{ top: 30 }}  // ✅ Ajout d'une marge en haut
                >
                    <CartesianGrid stroke="#DEDEDE" vertical={false} strokeDasharray="3 3" />

                    <XAxis 
                        dataKey="day"  
                        tick={{ fill: "#74798C", dy: 10 }} // ✅ Ajout d'un espace sous les labels de X
                        tickLine={false} 
                    />

                    {/* ✅ Axe Y pour le poids avec 3 ticks (Min-1, Médiane, Max+5) */}
                    <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#74798C", dx: 10 }} // ✅ Ajout d'un espace à droite des labels de Y
                        tickLine={false}
                        axisLine={false}
                        domain={[ticks[0], ticks[2]]}  // ✅ Ajusté avec Min-1 et Max+5
                        ticks={ticks}  
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

ActivityChart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ActivityChart;
