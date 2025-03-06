import { useEffect, useState } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import PropTypes from "prop-types"; 
import { getUserActivity } from "../services/apiService";
import "../styles/components/_activityChart.scss"; 

const ActivityChart = ({ userId }) => { 
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!userId) return;

        console.log(`🔄 Récupération de l'activité pour userId: ${userId}`);

        getUserActivity(userId)
            .then((activityData) => { 
                if (activityData && activityData.length > 0) {
                    console.log("Données d'activité récupérées:", activityData);

                    // Transformer les données pour s'assurer qu'elles sont au bon format
                    const formattedData = activityData.map(item => ({
                        day: item.day,
                        kilogram: item.kilogram,
                        calories: item.calories
                    }));

                    console.log("✅ Activité récupérée :", formattedData);
                    setData(formattedData);
                } else {
                    console.error("❌ Aucune donnée d'activité trouvée !");
                    setData([]); // Si aucune donnée d'activité, on met à jour l'état avec un tableau vide
                }
            })
            .catch(error => {
                console.error("❌ Erreur récupération activité :", error);
                setData([]); // Assure que le composant ne plante pas
            });
    }, [userId]);

    const CustomTooltip = ({ active, payload, coordinate  }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip"
                    style={{ 
                        left: `${coordinate.x + 35}px`, 
                        top: `-20px` 
                    }}
                >
                    <p>{`${payload[0].value}kg`}</p>
                    <p>{`${payload[1].value}Kcal`}</p>
                </div>
            );
        }
        return null;
    };

    CustomTooltip.propTypes = {
        active: PropTypes.bool,
        payload: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number,
            })
        ),
        coordinate: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    };

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

            {/* Si les données sont valides, on affiche le graphique */}
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data} barGap={10} barSize={7}>
                        <CartesianGrid stroke="#DEDEDE" vertical={false} strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="day" 
                            tick={{ fill: "#74798C" }} 
                            tickLine={false} 
                        />
                        <YAxis 
                            yAxisId="right"
                            orientation="right"
                            tick={{ fill: "#74798C" }}
                            tickLine={false}
                            axisLine={false}
                            domain={[50, 300]}  
                            ticks={[50, 150]} 
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(196, 196, 196, 0.5)", width: 56 }} />
                        <Bar yAxisId="right" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} />
                        <Bar yAxisId="right" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>⚠️ Aucune donnée d activité disponible pour cet utilisateur.</p>
            )}
        </div>
    );
};

ActivityChart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ActivityChart;
