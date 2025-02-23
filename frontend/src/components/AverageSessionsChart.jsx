import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getUserAverageSessions } from "../services/apiService";
import "../styles/components/_averageSessionsChart.scss"; // ✅ Import du style SCSS

const days = ["L", "M", "M", "J", "V", "S", "D"];

// 🎯 Tooltip personnalisé
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p>{`${payload[0].value} min`}</p>
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
};

// 🎯 Fonction pour gérer l'opacité de la ligne
const calculateOpacity = (index, activeIndex, totalPoints) => {
    if (activeIndex === null) return 0.1; // 🔥 Opacité faible par défaut
    const distance = Math.abs(index - activeIndex);
    return Math.max(1 - distance / totalPoints, 0.1); // 🔥 Plus proche du point actif = plus opaque
};

const AverageSessionsChart = ({ userId }) => {
    const [data, setData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        if (!userId) return;
        console.log(`🔄 Récupération des sessions moyennes pour userId: ${userId}`);
        getUserAverageSessions(userId)
            .then((sessionData) => {
                if (sessionData && sessionData.length > 0) {
                    console.log("✅ Sessions moyennes récupérées :", sessionData);
                    setData(sessionData);
                } else {
                    console.error("❌ Aucune session moyenne trouvée !");
                    setData([]);
                }
            })
            .catch(error => {
                console.error("❌ Erreur récupération sessions moyennes :", error);
                setData([]);
            });
    }, [userId]);

    return (
        <div className={`average-sessions-chart ${hoverIndex !== null ? `active-${hoverIndex}` : ""}`}>
            <div className="background-gradient"></div>
            <h2>Durée moyenne des sessions</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    onMouseMove={(e) => setHoverIndex(e.activeTooltipIndex)}
                    onMouseLeave={() => setHoverIndex(null)}
                    margin={{ top: 50, right: 0, left: 0, bottom: 15 }}
                >
                    <XAxis
                        dataKey="day"
                        tickFormatter={(day) => days[day - 1]}
                        className="x-axis"
                        tick={{ fill: "white", textAnchor: "middle" }}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={0}
                        interval="preserveStartEnd"
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    
                    {/** 🎯 Génération dynamique de la ligne avec opacité évolutive **/}
                    {data.map((point, index) => (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey="sessionLength"
                            stroke="white"
                            strokeWidth={2.5}
                            dot={false}
                            opacity={calculateOpacity(index, hoverIndex, data.length)}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

AverageSessionsChart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default AverageSessionsChart;
