import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserData } from "../services/apiService";
import "../styles/components/_scoreChart.scss";

const ScoreChart = ({ userId }) => {
    const [score, setScore] = useState(null);

    useEffect(() => {
        if (!userId) return;
        console.log(`🔄 Récupération du score pour userId: ${userId}`);
        getUserData(userId)
            .then((data) => setScore(data.todayScore * 100))
            .catch((error) => console.error("❌ Erreur récupération score :", error));
    }, [userId]);

    if (score === null) return <p>Chargement...</p>;

    const data = [
        { name: "Score", value: score },
        { name: "Restant", value: 100 - score }
    ];

    const COLORS = ["#FF0000", "#FBFBFB"];

    return (
        <div className="score-chart">
            <div className="chart-container">
                <h2>Score</h2>
                <div className="circle-background"></div>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={85}
                            outerRadius={95}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                            cornerRadius={15}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
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

ScoreChart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ScoreChart;
