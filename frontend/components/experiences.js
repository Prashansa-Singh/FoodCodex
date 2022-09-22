import styles from './css/experience.module.css';
import Experience from './experience';

export default function Experiences({experiences}) {
    return (
        <div className={styles.experiences_container}>
            {experiences.map(experience => {
                return (
                    <Experience experience={experience} />
                );
            })}
        </div>
    );
}