import { useState } from 'react';
import styles from './css/tag.module.css';
import Tag from './tag';

const tagColours = {
    personalOption: '#24B25C',
    halalOption: '#24B25C',
    veganOption: '#24B25C',
    vegetarianOption: '#24B25C',
    pescatarianOption: '#24B25C',
    nutsFreeOption: '#24B25C',
    dairyFreeOption: '#24B25C',
    glutenFreeOption: '#24B25C',
    allergyFriendlyOption: '#24B25C',
    diabetesFriendlyOption: '#24B25C'
};

const inactiveColour = '#d7d6d4';

export default function Tags({restaurant_data, page}) {
    const onTagsDefault = {
        personalOption: restaurant_data.personalOption,
        halalOption: restaurant_data.halalOption,
        veganOption: restaurant_data.veganOption,
        vegetarianOption: restaurant_data.vegetarianOption,
        pescatarianOption: restaurant_data.pescatarianOption,
        nutsFreeOption: restaurant_data.nutsFreeOption,
        dairyFreeOption: restaurant_data.dairyFreeOption,
        glutenFreeOption: restaurant_data.glutenFreeOption,
        allergyFriendlyOption: restaurant_data.allergyFriendlyOption,
        diabetesFriendlyOption: restaurant_data.diabetesFriendlyOption
    }

    const tags = [
        {
            name: 'personalOption',
            tag: getTag(restaurant_data.personalOption, page, 'personalOption', tagColours['personalOption'])
        },
        {
            name: 'halalOption',
            tag: getTag(restaurant_data.halalOption, page, 'halalOption', tagColours['halalOption'])
        },
        {
            name: 'veganOption',
            tag: getTag(restaurant_data.veganOption, page, 'veganOption', tagColours['veganOption'])
        },
        {
            name: 'vegetarianOption',
            tag: getTag(restaurant_data.vegetarianOption, page, 'vegetarianOption', tagColours['vegetarianOption'])
        },
        {
            name: 'pescatarianOption',
            tag: getTag(restaurant_data.pescatarianOption, page, 'pescatarianOption', tagColours['pescatarianOption'])
        },
        {
            name: 'nutsFreeOption',
            tag: getTag(restaurant_data.nutsFreeOption, page, 'nutsFreeOption', tagColours['nutsFreeOption'])
        },
        {
            name: 'dairyFreeOption',
            tag: getTag(restaurant_data.dairyFreeOption, page, 'dairyFreeOption', tagColours['dairyFreeOption'])
        },
        {
            name: 'glutenFreeOption',
            tag: getTag(restaurant_data.glutenFreeOption, page, 'glutenFreeOption', tagColours['glutenFreeOption'])
        },
        {
            name: 'allergyFriendlyOption',
            tag: getTag(restaurant_data.allergyFriendlyOption, page, 'allergyFriendlyOption', tagColours['allergyFriendlyOption'])
        },
        {
            name: 'diabetesFriendlyOption',
            tag: getTag(restaurant_data.diabetesFriendlyOption, page, 'diabetesFriendlyOption', tagColours['diabetesFriendlyOption'])
        }
    ]

    const [onTags, setOnTags] = useState(onTagsDefault);

    const updateTags = (changeTag) => {
        setOnTags({
            ...onTags,
            [changeTag]: !onTags[changeTag],
        });
        changeColour(changeTag);
    }

    const changeColour = (tag) => {
        const elem = document.getElementById(tag);
        const xid = "x" + tag;
        const x = document.getElementById(xid);
        if (onTags[tag]) {
            elem.style.backgroundColor = inactiveColour;
            x.style.display = "none";
        } else {
            elem.style.backgroundColor = tagColours[tag];
            x.style.display = "flex";
        }
    }

    const displayTags = (name, tag, pageName) => {
        if (pageName === 'edit') {
            return (
                <>
                    <span onClick={() => updateTags(name)}>
                        {tag}
                    </span>
                    <input type='hidden' name={name} value={onTags[name]} />
                </>
            );
        } else {
            return (
                <>{tag}</>
            );
        }
    }

    return (
        <div className={styles.tag_container}>
            {tags.map(({name, tag}) => displayTags(name, tag, page))}
        </div>
    );
}

function getTag(tag, page, name, colour) {
    if (tag == true) {
        if (page === 'edit') {
            return <Tag name={name} colour={colour} displayX={true} />;
        } else if (page === 'viewAll') {
            return <Tag name={name} colour={colour} displayX={false} page={page} />;
        } else {
            return <Tag name={name} colour={colour} displayX={false} />;
        }  
    } else {
        if (page === 'view' || page === 'viewAll') {
            return null;
        } else {
            return <Tag name={name} colour={inactiveColour} displayX={false} />;
        }
    }
}