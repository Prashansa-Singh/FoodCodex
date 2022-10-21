import styles from './css/experience.module.css';
import Experience from './experience';
import ExperienceEdit from './experience-edit';
import ExperienceForm from './experience-form';
import ExperienceView from './experience-view';

export default function Experiences({experiences, id}) {
    return (
        <div className={styles.experiences_container}>
            <h5>Experiences</h5>
            <ExperienceForm id={id} />
            <div className={styles.cards}>
                {experiences.reverse().map(experience => {
                    return (
                        <div key={experience._id} >
                            <Experience experience={experience} />
                            <ExperienceView experience={experience} />
                            <ExperienceEdit experience={experience} restId={id} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}