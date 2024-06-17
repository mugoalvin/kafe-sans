import { FoodItem } from "@/myComponents/Food";
import axios from "axios";

export type FoodCategoryKey = 'all' | 'main' | 'burger' | 'juice' | 'bento' | 'salad' | 'spanish' | 'seaFood' | 'pancake' | 'iceCream' | 'fruits' | 'others'
export const FoodCategories = [ 'all' , 'main' , 'burger' , 'juice' , 'bento' , 'salad' , 'spanish' , 'seaFood' , 'pancake' , 'iceCream' , 'fruits' , 'others' ]

export const categories: [string, string, number, FoodCategoryKey | Array<FoodCategoryKey>][] = [
    ["All Menu", "🍽️", 0, "all"],
    ["Main Dishes", "🥘", 1, "main"],
    ["Burger", "🍔", 50, "burger"],
    ["Juice", "🧃", 10, "juice"],
    ["Bento", "🍱", 7, "bento"],
    ["Salad", "🥗", 14, "salad"],
    ["Tacos", "🌮", 27, "spanish"],
    ["Sea Food", "🍣", 5, "seaFood"],
    ["Pancake", "🥞", 22, "pancake"],
    ["Ice Cream", "🍨", 18, "iceCream"],
    ["Fruits", "🍎", 18, "fruits"],
];

export let allFoods: FoodItem[] = []

export async function getAllFoods() {
    try {
        const response = await axios.get('http://localhost:8000/getFoods');
        allFoods = response.data.foods;
    } catch (error) {
        console.log(error);
    }
    return allFoods;
}

getAllFoods();