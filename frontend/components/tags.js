import styles from './css/tag.module.css';
import Tag from './tag';

export default function Tags({restaurant_data, page}) {
    const personal = getTag(restaurant_data.personalOption, page, 'Personal', '#9868A6');
    const halal = getTag(restaurant_data.halalOption, page, 'Halal', '#24B25C');
    const vegan = getTag(restaurant_data.veganOption, page, 'Vegan', '#24B25C');
    const vegetarian = getTag(restaurant_data.vegetarianOption, page, 'Vegetarian', '#24B25C');
    const pescatarian = getTag(restaurant_data.pescatarianOption, page, 'Pescatarian', '#24B25C');
    const nutsFree = getTag(restaurant_data.nutsFreeOption, page, 'Nut Free', '#F28157');
    const dairyFree = getTag(restaurant_data.dairyFreeOption, page, 'Dairy Free', '#F28157');
    const glutenFree = getTag(restaurant_data.glutenFreeOption, page, 'Gluten Free', '#F28157');
    const allergyFriendly = getTag(restaurant_data.allergyFriendlyOption, page, 'Allergy Friendly', '#F2A2CB');
    const diabetesFriendly = getTag(restaurant_data.diabetesFriendlyOption, page, 'Diabetes Friendly', '#F2A2CB');
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
            return <Tag name={name} colour='#d7d6d4' />;
        }
    }
}