import styles from './css/experience.module.css';
import Experience from './experience';
import ExperienceForm from './experience-form';

export default function Experiences({experiences}) {
    return (
        <div className={styles.experiences_container}>
            <h5>Experiences</h5>
            <button className={styles.addbutton}><img src='/src/plus-icon.svg' /></button>
            <ExperienceForm />
            {experiences.map(experience => {
                return (
                    <Experience experience={experience} />
                );
            })}
        </div>
    );
}