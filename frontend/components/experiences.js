import styles from './css/experience.module.css';
import Experience from './experience';
import ExperienceEdit from './experience-edit';
import ExperienceForm from './experience-form';
import ExperienceView from './experience-view';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { axiosInstance } from '../pages/api/axiosConfig';

export default function Experiences({experiences, id}) {

    const confirmDelete = () => {

		const body = {
			restaurantId: id,
		};

		const url = 'user/restaurant/experience/delete-all';

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you wish to delete all experiences for this restaurant record?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => deleteExperiences(url, body),
				},
				{
					label: 'No',
				}
			]
		});
	}

	const deleteExperiences = async (url, body) => {
		await axiosInstance.delete(url, { data: body })
			.then(function (response) {
				console.log(response.data);
				window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	}
    // the id read in from Experiences function up there is restaurant id (e.g. HochiMama's )
    console.log("experience.length: " + experiences.length);
    console.log("experience : " + experiences);
 
    return (
        <div className={styles.experiences_container}>
            <h5>Experiences</h5>
            <ExperienceForm id={id} />
            {
                experiences.length == 0 
                ? <>
                      <p>Click on the '+' button to add your first experience!</p>
                  </> 
                : <>
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
                    <div className={styles.button_container}>
                        <button onClick={() => confirmDelete()} className={styles.delete_button} >Delete All Experiences</button>
                    </div>
                </>
            }
        </div>
    );
}