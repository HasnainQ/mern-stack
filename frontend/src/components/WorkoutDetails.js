import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hook/useWorkoutsContext'
import WorkoutUpdate from './WorkoutUpdate'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import WorkoutSingle from '../pages/WorkoutSingle';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const [showModal, setShowModal] = useState(false)

    const showModalHandle = () => {
        setShowModal(true)
    }

    const hideModalHandle = () => {
        setShowModal(false)
    }

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    return (
        <div className="workout-details">
            <h4> {workout.title} </h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
            <Link to={`/workout/${workout._id}`}>View More</Link>
            <WorkoutUpdate show={showModal} handleClose={hideModalHandle} workoutState={workout}></WorkoutUpdate>
            <span className="material-symbols-outlined edit-square-button" onClick={showModalHandle}>edit_square </span>
        </div>
    );
}
 
export default WorkoutDetails;