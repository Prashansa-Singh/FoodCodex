import styles from './css/tag.module.css';

export default function Tag({name, colour, displayX}) {
    return (
        <div className={styles.tag} style={{'background-color': colour}} id={name}>
            <p><b>{name}</b></p>
            <p id={"x" + name} style={{'display': displayX ? 'flex' : 'none'}} >&#10006;</p>
        </div>
    );
}