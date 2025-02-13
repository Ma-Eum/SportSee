import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";
import "../styles/components/_scoreChart.scss"; // Fichier SCSS à créer

const ScoreChart = () => {
    const [score, setScore] = useState(null);

    useEffect(() => {
        getUserData().then((data) => {
            if (data) {
                setScore(data.todayScore * 100); // Conversion en pourcentage
            }
        });
    }, []);

    if (score === null) return <p>Chargement...</p>;

    const data = [
        { name: "Score", value: score },
        { name: "Restant", value: 100 - score }
    ];

    const COLORS = ["#FF0000", "#FBFBFB"]; // Rouge pour le score, gris pour le reste

    return (
        <div className="score-chart">
            <h2>Score</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={450} // Rotation pour débuter en haut
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <p className="score-text"><strong>{score}%</strong> de votre objectif atteint</p>
        </div>
    );
};

export default ScoreChart;
