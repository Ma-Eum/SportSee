import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";
import "../styles/components/_scoreChart.scss"; // ✅ Import du style SCSS

const ScoreChart = () => {
    const [score, setScore] = useState(null);

    useEffect(() => {
        getUserData().then((data) => {
            if (data) {
                setScore(data.todayScore * 100); // ✅ Conversion en pourcentage
            }
        });
    }, []);

    if (score === null) return <p>Chargement...</p>;

    const data = [
        { name: "Score", value: score },
        { name: "Restant", value: 100 - score }
    ];

    const COLORS = ["#FF0000", "#FBFBFB"]; // ✅ Rouge pour le score, gris clair pour le reste

    return (
        <div className="score-chart">
            <div className="chart-container">
                <h2>Score</h2>{/* ✅ Superposé sur le graphique */}
                {/* ✅ Fond du cercle */}
                <div className="circle-background"></div>
                {/* ✅ Graphique */}
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={85}
                            outerRadius={95}
                            startAngle={90}
                            endAngle={450} // ✅ Assure une rotation correcte
                            dataKey="value"
                            cornerRadius={15} // ✅ Arrondit les extrémités
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {/* ✅ Texte au centre */}
                <div className="score-center">
                    <p className="score-percentage">{score}%</p>
                    <p className="score-label">
                        de votre <br /> objectif
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ScoreChart;
