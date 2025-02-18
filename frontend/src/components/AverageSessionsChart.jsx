import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { 
    LineChart, 
    Line, 
    XAxis, 
    Tooltip, 
    ResponsiveContainer
} from "recharts";
import { getUserAverageSessions } from "../services/apiService";
import "../styles/components/_averageSessionsChart.scss"; // ✅ Import du style SCSS

const days = ["L", "M", "M", "J", "V", "S", "D"];

// 🎯 Tooltip personnalisé qui affiche la durée de session au survol
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

const AverageSessionsChart = () => {
    const [data, setData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null); // 🔥 Suivi du point actif

    useEffect(() => {
        getUserAverageSessions().then((sessionData) => {
            if (sessionData) {
                setData(sessionData);
            }
        });
    }, []);

    // 🔥 Calcul dynamique du dégradé
    const gradientId = "dynamicOpacityGradient";
    const gradientStops = hoverIndex === null 
    ? [
        { offset: "100%", opacity: "0.5" }
    ]
    : [
        { offset: "0%", opacity: "0.4" }, // Début faible (10%)
        { offset: `${(hoverIndex / (data.length - 1)) * 100}%`, opacity: "0.8" }, // Point actif (80%)
        { offset: "100%", opacity: "1" } // Fin (100%)
    ];

    return (
        <div className={`average-sessions-chart ${hoverIndex !== null ? `active-${hoverIndex}` : ""}`}>
            {/* ✅ Ajout du dégradé dynamique */}
            <div className="background-gradient"></div>

            <h2>Durée moyenne des sessions</h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    onMouseMove={(e) => setHoverIndex(e.activeTooltipIndex)}
                    onMouseLeave={() => setHoverIndex(null)}
                    margin={{ top: 50, right: 15, left: 15, bottom: 15 }}
                >
                    {/* ✅ Définition du dégradé */}
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                            {gradientStops.map((stop, index) => (
                                <stop 
                                    key={index} 
                                    offset={stop.offset} 
                                    stopColor="white" 
                                    stopOpacity={stop.opacity} 
                                />
                            ))}
                        </linearGradient>
                    </defs>

                    <XAxis
                        dataKey="day"
                        tickFormatter={(day) => days[day - 1]}
                        className="x-axis"
                    />

                    <Tooltip content={<CustomTooltip />} cursor={false} />

                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        className="session-line"
                        stroke={`url(#${gradientId})`} // ✅ Dégradé dynamique appliqué
                        strokeWidth={2.5}
                        dot={false} // ❌ Cache les points par défaut
                        activeDot={{ 
                            className:"recharts-active-dot",
                            r: 6, // Taille du point normal
                            strokeWidth: 3, 
                            stroke: "white",
                            fill: "white",
                            opacity: 1,
                        }} // ✅ Utilise la classe CSS
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AverageSessionsChart;
