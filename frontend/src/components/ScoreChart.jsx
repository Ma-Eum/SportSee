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
            .then((data) => {
                console.log("Données utilisateur récupérées pour userId " + userId, data); // Log des données

                // Vérification de la présence de 'todayScore' ou 'score' dans les données
                if (data) {
                    const todayScore = data.todayScore || data.score; // On vérifie les deux possibilités

                    if (typeof todayScore === 'number') {
                        const calculatedScore = todayScore * 100;  // Multiplie par 100 pour obtenir le pourcentage
                        setScore(calculatedScore);  // On utilise la donnée 'todayScore' ou 'score'
                    } else {
                        console.error(`❌ Le score de l'utilisateur ${userId} n'est pas valide`);
                        setScore(0);  // Si le score n'est pas valide, mettre la valeur à 0
                    }
                } else {
                    console.error(`❌ Aucune donnée trouvée pour l'utilisateur ${userId}`);
                    setScore(0);  // En cas d'erreur, mettre le score à 0
                }
            })
            .catch((error) => {
                console.error("❌ Erreur récupération score pour userId " + userId, error);
                setScore(0);  // En cas d'erreur, mettre le score à 0
            });
    }, [userId]);

    if (score === null) return <p>Chargement...</p>;  // Afficher "Chargement..." si le score n'est pas encore défini

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
                    <p className="score-percentage">{score.toFixed(0)}%</p> {/* Affichage du score avec 0 décimale */}
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
