import styles from './css/tag.module.css';
import Tag from './tag';

export default function Tags({restaurant_data}) {
    return (
        <div className={styles.tag_container}>
			{(restaurant_data.personalOption == true) ? <Tag name='Personal' colour='#9868A6' /> : null}
            {(restaurant_data.halalOption == true) ? <Tag name='Halal' colour='#24B25C' /> : null}
            {(restaurant_data.veganOption == true) ? <Tag name='Vegan' colour='#24B25C' /> : null}
            {(restaurant_data.vegetarianOption == true) ? <Tag name='Vegetarian' colour='#24B25C' /> : null}
            {(restaurant_data.pescatarianOption == true) ? <Tag name='Pescatarian' colour='#24B25C' /> : null}
            {(restaurant_data.nutsFreeOption == true) ? <Tag name='Nut Free' colour='#F28157' /> : null}
            {(restaurant_data.dairyFreeOption == true) ? <Tag name='Dairy Free' colour='#F28157' /> : null}
            {(restaurant_data.glutenFreeOption == true) ? <Tag name='Gluten Free' colour='#F28157' /> : null}
            {(restaurant_data.allergyFriendlyOption == true) ? <Tag name='Allergy Friendly' colour='#F2A2CB' /> : null}
            {(restaurant_data.diabetesFriendlyOption == true) ? <Tag name='Diabetes Friendly' colour='#F2A2CB' /> : null}
        </div>
    );
}