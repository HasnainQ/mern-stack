import { useState } from 'react';
import { useWorkoutsContext } from '../hook/useWorkoutsContext'
import { useNavigate } from 'react-router-dom'

import '../styleComponents/modal.css'


const WorkoutUpdate = ({handleClose, show, workoutState}) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    const {dispatch} = useWorkoutsContext()
    
    const history = useNavigate()
    const [title, setTitle] = useState(workoutState.title)
    const [load, setLoad] = useState(workoutState.load)
    const [reps, setReps] = useState(workoutState.reps)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {
            title: title,
            load: load,
            reps: reps
        }

        const response = await fetch('/api/workouts/' + workoutState._id, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('workout updated', json)
            dispatch({type: 'UPDATE_WORKOUT', payload: json})
            history(`/workout/${workoutState._id}`)
        }
    }
    

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
            <form className="create update" onSubmit={handleSubmit}>
            <h3>Update a Workout</h3>
            <label>Exercise:</label>
            <input
             type="text"
             onChange={(e) => setTitle(e.target.value)}
             value={title}
             className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Load (in kg):</label>
            <input
             type="number"
             onChange={(e) => setLoad(e.target.value)}
             value={load}
             className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input
             type="number"
             onChange={(e) => setReps(e.target.value)}
             value={reps}
             className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Update Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
                <button onClick={handleClose}>Close</button>
            </section>
        </div>
    );
}
 
export default WorkoutUpdate;