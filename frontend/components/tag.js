import styles from './css/tag.module.css';

const tagNames = {
    personalOption: 'Personal',
    halalOption: 'Halal',
    veganOption: 'Vegan',
    vegetarianOption: 'Vegetarian',
    pescatarianOption: 'Pescatarian',
    nutsFreeOption: 'Nut Free',
    dairyFreeOption: 'Dairy Free',
    glutenFreeOption: 'Gluten Free',
    allergyFriendlyOption: 'Allergy Friendly',
    diabetesFriendlyOption: 'Diabetes Friendly'
}

export default function Tag({name, colour, displayX}) {
    return (
        <div className={styles.tag} style={{'background-color': colour}} id={name}>
            <p><b>{tagNames[name]}</b></p>
            <p id={"x" + name} style={{'display': displayX ? 'flex' : 'none'}} >&#10006;</p>
        </div>
    );
}