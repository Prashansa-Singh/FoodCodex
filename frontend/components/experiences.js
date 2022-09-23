import styles from './css/experience.module.css';
import Experience from './experience';
import ExperienceForm from './experience-form';

export default function Experiences({experiences, id}) {
    return (
        <div className={styles.experiences_container}>
            <h5>Experiences</h5>
            <ExperienceForm id={id} />
            {experiences.reverse().map(experience => {
                return (
                    <Experience experience={experience} />
                );
            })}
        </div>
    );
}