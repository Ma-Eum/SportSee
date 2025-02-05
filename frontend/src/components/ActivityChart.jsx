import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getUserActivity } from "../services/apiService";

const ActivityChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUserActivity(12).then((activityData) => {
            if (activityData) {
                setData(activityData.sessions);
            }
        });
    }, []);

    return (
        <div className="activity-chart">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="kilogram" fill="#282D30" name="Poids (kg)" />
                    <Bar dataKey="calories" fill="#E60000" name="Calories brûlées (kCal)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivityChart;
