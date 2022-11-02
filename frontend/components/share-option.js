import styles from './css/experience.module.css';

export default function ShareOption({userId, restaurant_data, experiences}) {

    const closeOptionView = () => {
        const viewId = "option" + userId;
        document.getElementById(viewId).style.display="none";
    }

    return (
        <div className={styles.experience_container} id={"option" + userId}>
            <div id={"option" + userId}>
                In option
                <Checkbox onClick={() => setPriceChecked(true)}
                    checked={checked}
                    onChange={handlesharePriceRating}
                    inputProps={{ 'aria-label': 'controlled' }} label="sharePriceName"
                />
            </div>
            <Button onClick={() => { openPresentShareLinkView(); setPresentShareLinkState(true); } }>
                    confirm
                </Button>
                <Button onClick={() => { closeOptionView()} }>
                    cancel
                </Button>
        </div>
    )
}