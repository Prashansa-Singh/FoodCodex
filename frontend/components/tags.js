import { useState } from 'react';
import styles from './css/tag.module.css';
import Tag from './tag';

const tagColours = {
    'Personal': '#9868A6',
    'Halal': '#24B25C',
    'Vegan': '#24B25C',
    'Vegetarian': '#24B25C',
    'Pescatarian': '#24B25C',
    'Nut Free': '#F28157',
    'Dairy Free': '#F28157',
    'Gluten Free': '#F28157',
    'Allergy Friendly': '#F2A2CB',
    'Diabetes Friendly': '#F2A2CB',
};

const inactiveColour = '#d7d6d4';

export default function Tags({restaurant_data, page}) {
    const personal = getTag(restaurant_data.personalOption, page, 'Personal', tagColours['Personal']);
    const halal = getTag(restaurant_data.halalOption, page, 'Halal', tagColours['Halal']);
    const vegan = getTag(restaurant_data.veganOption, page, 'Vegan', tagColours['Vegan']);
    const vegetarian = getTag(restaurant_data.vegetarianOption, page, 'Vegetarian', tagColours['Vegetarian']);
    const pescatarian = getTag(restaurant_data.pescatarianOption, page, 'Pescatarian', tagColours['Pescatarian']);
    const nutsFree = getTag(restaurant_data.nutsFreeOption, page, 'Nut Free', tagColours['Nut Free']);
    const dairyFree = getTag(restaurant_data.dairyFreeOption, page, 'Dairy Free', tagColours['Dairy Free']);
    const glutenFree = getTag(restaurant_data.glutenFreeOption, page, 'Gluten Free', tagColours['Gluten Free']);
    const allergyFriendly = getTag(restaurant_data.allergyFriendlyOption, page, 'Allergy Friendly', tagColours['Allergy Friendly']);
    const diabetesFriendly = getTag(restaurant_data.diabetesFriendlyOption, page, 'Diabetes Friendly', tagColours['Diabetes Friendly']);

    const changeColour = (name, bool) => {
        const elem = document.getElementById(name);
        if (bool) {
            elem.style.backgroundColor = inactiveColour;
        } else {
            elem.style.backgroundColor = tagColours[name];
        }
    }
    
    const [personalOptionBool, setPersonalOption] = useState(restaurant_data.personalOption);

    const handlePersonalClick = () => {
        setPersonalOption(!personalOptionBool);
        changeColour('Personal', personalOptionBool);
    }

    const [halalOptionBool, setHalalOption] = useState(restaurant_data.halalOption);

    const handleHalalClick = () => {
        setHalalOption(!halalOptionBool);
        changeColour('Halal', halalOptionBool);
    }

    const [veganOptionBool, setVeganOption] = useState(restaurant_data.veganOption);

    const handleVeganClick = () => {
        setVeganOption(!veganOptionBool);
        changeColour('Vegan', veganOptionBool);
    }

    const [vegetarianOptionBool, setVegetarianOption] = useState(restaurant_data.vegetarianOption);

    const handleVegetarianClick = () => {
        setVegetarianOption(!vegetarianOptionBool);
        changeColour('Vegetarian', vegetarianOptionBool);
    }

    const [pescatarianOptionBool, setPescatarianOption] = useState(restaurant_data.pescatarianOption);

    const handlePescatarianClick = () => {
        setPescatarianOption(!pescatarianOptionBool);
        changeColour('Pescatarian', pescatarianOptionBool);
    }

    const [nutsFreeOptionBool, setNutsFreeOption] = useState(restaurant_data.nutsFreeOption);

    const handleNutsFreeClick = () => {
        setNutsFreeOption(!nutsFreeOptionBool);
        changeColour('Nut Free', nutsFreeOptionBool);
    }

    const [dairyFreeOptionBool, setDairyFreeOption] = useState(restaurant_data.dairyFreeOption);

    const handleDairyFreeClick = () => {
        setDairyFreeOption(!dairyFreeOptionBool);
        changeColour('Dairy Free', dairyFreeOptionBool);
    }

    const [glutenFreeOptionBool, setGlutenFreeOption] = useState(restaurant_data.glutenFreeOption);

    const handleGlutenFreeClick = () => {
        setGlutenFreeOption(!glutenFreeOptionBool);
        changeColour('Gluten Free', glutenFreeOptionBool);
    }

    const [allergyFriendlyOptionBool, setAllergyFriendlyOption] = useState(restaurant_data.allergyFriendlyOption);

    const handleAllergyFriendlyClick = () => {
        setAllergyFriendlyOption(!allergyFriendlyOptionBool);
        changeColour('Allergy Friendly', allergyFriendlyOptionBool);
    }

    const [diabetesFriendlyOptionBool, setDiabetesFriendlyOption] = useState(restaurant_data.diabetesFriendlyOption);

    const handleDiabetesFriendlyClick = () => {
        setDiabetesFriendlyOption(!diabetesFriendlyOptionBool);
        changeColour('Diabetes Friendly', diabetesFriendlyOptionBool);
    }

    if (page === 'edit') {
        return (
            <div className={styles.tag_container}>
                <span onClick={() => handlePersonalClick()}>
                    {personal}
                </span>
                <input type='hidden' name='personalOption' value={personalOptionBool} />

                <span onClick={() => handleHalalClick()}>
                    {halal}
                </span>
                <input type='hidden' name='halalOption' value={halalOptionBool} />

                <span onClick={() => handleVeganClick()}>
                    {vegan}
                </span>
                <input type='hidden' name='veganOption' value={veganOptionBool} />

                <span onClick={() => handleVegetarianClick()}>
                    {vegetarian}
                </span>
                <input type='hidden' name='vegetarianOption' value={vegetarianOptionBool} />

                <span onClick={() => handlePescatarianClick()}>
                    {pescatarian}
                </span>
                <input type='hidden' name='pescatarianOption' value={pescatarianOptionBool} />

                <span onClick={() => handleNutsFreeClick()}>
                    {nutsFree}
                </span>
                <input type='hidden' name='nutsFreeOption' value={nutsFreeOptionBool} />

                <span onClick={() => handleDairyFreeClick()}>
                    {dairyFree}
                </span>
                <input type='hidden' name='dairyFreeOption' value={dairyFreeOptionBool} />

                <span onClick={() => handleGlutenFreeClick()}>
                    {glutenFree}
                </span>
                <input type='hidden' name='glutenFreeOption' value={glutenFreeOptionBool} />

                <span onClick={() => handleAllergyFriendlyClick()}>
                    {allergyFriendly}
                </span>
                <input type='hidden' name='allergyFriendlyOption' value={allergyFriendlyOptionBool} />

                <span onClick={() => handleDiabetesFriendlyClick()}>
                    {diabetesFriendly}
                </span>
                <input type='hidden' name='diabetesFriendlyOption' value={diabetesFriendlyOptionBool} />
            </div>
        )
    }
    return (
        <div className={styles.tag_container}>
            {personal}
            {halal}
            {vegan}
            {vegetarian}
            {pescatarian}
            {nutsFree}
            {dairyFree}
            {glutenFree}
            {allergyFriendly}
            {diabetesFriendly}
        </div>
    );
}

function getTag(tag, page, name, colour) {
    if (tag == true) {
        return <Tag name={name} colour={colour} />;
    } else {
        if (page === 'view') {
            return null;
        } else {
            return <Tag name={name} colour={inactiveColour} />;
        }
    }
}