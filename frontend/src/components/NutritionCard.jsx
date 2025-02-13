import PropTypes from "prop-types";
import "../styles/components/_nutritionCard.scss";


const NutritionCard = ({ type, value, unit, icon }) => {
    return (
        <div className="nutrition-card">
            <img src={icon} alt={type} className="nutrition-icon" />
            <div>
                <p className="nutrition-value">{value}{unit}</p>
                <p className="nutrition-type">{type}</p>
            </div>
        </div>
    );
};

NutritionCard.propTypes = {
    type: PropTypes.string.isRequired, // S'assure que type est fourni
    value: PropTypes.number.isRequired, // Doit être un nombre
    unit: PropTypes.string.isRequired, // Ajoute une unité comme 'kCal' ou 'g'
    icon: PropTypes.string.isRequired, // S'assure que l'icône est bien fournie
};

export default NutritionCard;
