import { useEffect, useState } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import PropTypes from "prop-types"; 
import { getUserActivity } from "../services/apiService";
import "../styles/components/_activityChart.scss"; 

const ActivityChart = ({ userId }) => { // ✅ Ajout du userId en prop
    const [data, setData] = useState([]);
    const [minValue, setMinValue] = useState(null);
    const [medianValue, setMedianValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

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

                    // Mise à jour des valeurs dans les états
                    setMinValue(minKilogram);
                    setMedianValue(medianKilogram);
                    setMaxValue(maxKilogram);
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

    // ✅ Tooltip personnalisé
    const CustomTooltip = ({ active, payload, coordinate  }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip"
                    style={{ 
                        left: `${coordinate.x + 35}px`, // ✅ Ajusté pour s'aligner avec la maquette
                        top: `-20px`,  // ✅ FIXE verticalement
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
                    
                    {/* ✅ Axe X modifié pour afficher des chiffres */}
                    <XAxis 
                        dataKey="day"  // Le jour transformé en chiffre
                        tick={{ fill: "#74798C" }} 
                        tickLine={false} 
                    />

                    {/* ✅ Axe Y gauche pour les calories - caché avec display: none */}
                    <YAxis 
                        yAxisId="left"
                        orientation="left"
                        tick={{ fill: "#74798C" }}
                        tickLine={false}
                        axisLine={false}
                        domain={[50, 300]}  
                        ticks={[50, 150]} 
                        style={{ display: 'none' }}  // Masquer cet axe
                    />

                    {/* ✅ Axe Y droit pour le poids (kg) */}
                    <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#74798C" }}
                        tickLine={false}
                        axisLine={false}
                        domain={[minValue - 5, maxValue]}  // Domaine dynamique basé sur min et max du poids
                        ticks={[minValue, medianValue, maxValue+1]} // Affiche 3 ticks : min, médian, max
                        
                    />

                    {/* ✅ Tooltip personnalisé */}
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(196, 196, 196, 0.5)", width: 56 }} />

                    {/* ✅ Barres ajustées pour le poids (kg) */}
                    <Bar yAxisId="right" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} />

                    {/* ✅ Barres ajustées pour les calories avec échelle réduite */}
                    <Bar yAxisId="left" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} scale="linear" />
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
