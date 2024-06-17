import { IonIcon } from "@ionic/react";
import { options } from "ionicons/icons";
import Food, { FoodItem } from "./Food";
import CreateFood from "./CreateFood";
import { FoodCategories } from "@/Functions/FunctionsAndValues";
import "../../css/FoodList.css";

interface FoodListProps {
    activeCategory : number
    foods: FoodItem[];
    isCustomer : boolean
    addToShoppingList ? : (newFood: FoodItem) => void
    createFoodClickEvent ?: () => void
}

export function getDiscountedPrice(discount: number, currentPrice: number) {
    return currentPrice - (discount / 100) * currentPrice;
}

const FoodList = ({ activeCategory, isCustomer, foods, addToShoppingList, createFoodClickEvent }: FoodListProps) => {

    const styles = {
        h2 : {
            display : 'flex',
            alignItems: 'center',
            justifyContent : 'center',
            fontSize : 20,
            fontWeight: 900,
            width: '412%',
            height: '1700%',
            color : 'var(--greyText)',
            zIndex: 2
        }
    }

    return (
        <span id="foodSpan">
            <div id="orderListDiv" className="mainSectionHeader">
                <h3>Special Menu For You</h3>
                <div id="arrowDiv">
                    <IonIcon icon={options} />
                    <p>Filter</p>
                </div>
            </div>

            <div id="foodDiv">
                {
                    foods.length == 0 ? <h2 style={styles.h2}>{ FoodCategories[activeCategory].charAt(0).toUpperCase() + FoodCategories[activeCategory].slice(1)} Not Available</h2> :
                    (
                        foods.map((food: FoodItem) => (
                            <Food key={food.foodName} foodName={food.foodName} image={food.image} price={food.price} discount={food.discount} isRecomended={food.isRecomended} onFoodSelect={() => addToShoppingList && addToShoppingList(food)} isCustomer={isCustomer} />
                        ))
                    )
                }
                {!isCustomer && <CreateFood createFoodClickEvent={createFoodClickEvent}/> }
            </div>
        </span>
    );
};

export default FoodList;