import Buttons from './Buttons'
import '../../css/FoodButtons.css'

const FoodButtons = () => {


	return (
		<div className='foodButtonsDiv'>
			<Buttons buttonText='Edit' buttonStyle={{backgroundColor: 'var(--green)'}}/>
			<Buttons buttonText='Delete' buttonStyle={{backgroundColor: 'var(--red)'}}/>
			<Buttons buttonText='Out Of Stock' buttonStyle={{backgroundColor: 'var(--purple)'}}/>
		</div>
	)
}

export default FoodButtons