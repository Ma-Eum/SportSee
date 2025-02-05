import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getUserAverageSessions } from "../services/apiService";

const AverageSessionsChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUserAverageSessions(12).then((sessionData) => {
            if (sessionData) {
                setData(sessionData.sessions);
            }
        });
    }, []);

    return (
        <div className="average-sessions-chart">
            <h2>Durée moyenne des sessions</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sessionLength" stroke="#FF0000" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AverageSessionsChart;
