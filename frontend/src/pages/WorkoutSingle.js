import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useParams } from 'react-router-dom'

const WorkoutSingle = () => {

    let params = useParams();
    const [workout, setWorkout] = useState(null)
    const history = useNavigate()
    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/' + params.singleId)
            const json = await response.json()

            if(response.ok) {
                setWorkout(json)
                
            }
        }
        fetchWorkout()        
    }, [workout])

    // console.log(workout)

    return (
        <div className='workout-single-page'>
            <h2>Workout Details</h2>
            {workout && 
            <>
                <h4> {workout.title} </h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <button onClick={() => history('/')}>Go back</button>
            </>
            }
            
        </div>
    );
}
 
export default WorkoutSingle;