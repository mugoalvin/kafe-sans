import { chevronBack, chevronForward } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Category, { CategoryProps } from "./Category";
import { FoodCategoryKey } from "@/Functions/FunctionsAndValues";
import "../../css/Category.css";
import { FoodItem } from "./Food";

interface CategoriesContainerProps {
    title: string;
    categories: [string, string, number, FoodCategoryKey | Array<FoodCategoryKey>][]
    allFoods: FoodItem[]
    activeCategory: number | undefined

    handleCategoryClick: (category : [string, string, number, FoodCategoryKey | Array<FoodCategoryKey>]) => void
    getFilteredFood: (category : [string, string, number, FoodCategoryKey | FoodCategoryKey[]]) => FoodItem[]
}

const CategoriesContainer = ({activeCategory, categories, title, allFoods, handleCategoryClick, getFilteredFood }: CategoriesContainerProps) => {
    return (
        <span id="categoriesSpan">
            <div id="orderListDiv" className="mainSectionHeader">
                <h3>{title}</h3>
                <div id="arrowDiv">
                    <IonIcon icon={chevronBack} />
                    <IonIcon icon={chevronForward} />
                </div>
            </div>

            <div id="categories">
                {/* {children ? children : <h3>No Categories</h3>} */}

                {categories.map((category, index) => {
                    return (
                        <Category key={category[0]} image={String(category[1])} name={String(category[0])} noItems={category[0] == "All Menu" ? allFoods.length : getFilteredFood(category).length } onClickEvent={ () => handleCategoryClick(category) } isActive={index == activeCategory}/>
                    );
                })}

            </div>
        </span>
    );
};

export default CategoriesContainer;