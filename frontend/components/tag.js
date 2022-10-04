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

const shortNames = {
    personalOption: 'P',
    halalOption: 'H',
    veganOption: 'V',
    vegetarianOption: 'Ve',
    pescatarianOption: 'Pe',
    nutsFreeOption: 'N',
    dairyFreeOption: 'D',
    glutenFreeOption: 'G',
    allergyFriendlyOption: 'A',
    diabetesFriendlyOption: 'Di'
}

export default function Tag({name, colour, displayX, page}) {
    return (
        <div className={styles.tag} style={{'background-color': colour}} id={name}>
            {(page === 'viewAll') ? <p><b>{shortNames[name]}</b></p> : <p><b>{tagNames[name]}</b></p>}
            <p id={"x" + name} style={{'display': displayX ? 'flex' : 'none'}} >&#10006;</p>
        </div>
    );
}