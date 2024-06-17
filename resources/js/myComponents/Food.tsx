import { FoodCategoryKey } from "@/Functions/FunctionsAndValues";
import { getDiscountedPrice } from "./FoodList";
import FoodButtons from "./FoodButtons";
import '../../css/Food.css'


export interface FoodItem {
	id ? : number;
	image: string;
	foodName: string;
	price: number;
	discount?: number | undefined;
	isRecomended?: boolean;
	foodCategory ? :  FoodCategoryKey | FoodCategoryKey[]
	occurence ? : number;
	isCustomer: boolean
	onFoodSelect ? : () => void
}


const Food = ({ isCustomer, image, foodName, price, discount, isRecomended, onFoodSelect } : FoodItem) => {

	return (
		<div className="food" onClick={onFoodSelect}>
			<div id="imageAndComment">
				{discount ? ( <div id="discount">{discount}% OFF</div> ) : null}
				{isRecomended ? ( <div id="recommendation">Recommended</div> ) : null}
				<img src={`/images/${image}`} alt={`${image} Here`} />
			</div>
			<p id="foodName">{ foodName }</p>
			<div id="prices">
				<p id="price"> {  (discount == 100) ? <span id="freePrice">Free</span> :  `Ksh ${ discount ? getDiscountedPrice(discount, price) : price }`} </p>
				<p id="cancellerPrice">{discount ? `Ksh ${price}` : null}</p>
			</div>
			{!isCustomer && <FoodButtons />}
		</div>
	);
};

export default Food;