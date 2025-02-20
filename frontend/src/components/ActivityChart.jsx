import { useEffect, useState } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import PropTypes from "prop-types"; 
import { getUserActivity } from "../services/apiService";
import "../styles/components/_activityChart.scss"; 

const ActivityChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUserActivity().then((activityData) => { 
            if (activityData) {
                setData(activityData);
            }
        });
    }, []);

    // ✅ Tooltip personnalisé avec position verticale FIXE
    const CustomTooltip = ({ active, payload, coordinate }) => {
        if (active && payload && payload.length) {
            return (
                <div 
                    className="custom-tooltip" 
                    style={{ 
                        left: `${coordinate.x + 35}px`, // ✅ Ajusté pour s'aligner avec la maquette
                        top: `-30px`,  // ✅ FIXE verticalement
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
            {/* ✅ Conteneur pour le titre et la légende */}
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

            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} barGap={10} barSize={7}>
                    {/* ✅ Lignes horizontales ajustées */}
                    <CartesianGrid stroke="#DEDEDE" vertical={false} strokeDasharray="3 3" />
                    
                    {/* ✅ Axe X */}
                    <XAxis 
                        dataKey="day" 
                        tick={{ fill: "#74798C" }} 
                        tickLine={false} 
                    />

                    {/* ✅ Axe Y droit avec SEULEMENT la médiane et la valeur min */}
                    <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#74798C" }}
                        tickLine={false}
                        axisLine={false}
                        domain={[50, 300]}  
                        ticks={[50, 150]}  
                    />

                    {/* ✅ Tooltip personnalisé avec curseur plus étroit et centré */}
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ fill: "rgba(196, 196, 196, 0.5)", width: 56 }} // 🔥 Réactive le curseur
                    />

                    {/* ✅ Barres ajustées */}
                    <Bar yAxisId="right" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="right" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivityChart;
