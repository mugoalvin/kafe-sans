import ListOrder from "@/myComponents/ListOrder";
import Header from "../Views/Header";
import CategoriesContainer from "@/myComponents/CategoriesContainer";
import { FoodCategoryKey, allFoods, categories, getAllFoods } from "@/Functions/FunctionsAndValues";
import { FoodItem } from "@/myComponents/Food";
import { useState } from "react";
import FoodList, { getDiscountedPrice } from "@/myComponents/FoodList";
import Recipent from "@/myComponents/Recipent";
import ShippingCart from "@/myComponents/ShoppingCart";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import axios from "axios";
import AddFoodForm from "@/myComponents/AddFoodModal";

const Menu = ({ auth } : PageProps) => {
	const [availableFoods, setAvailableFoods] = useState<FoodItem[]>(allFoods);
	const [activeCategory, setActiveCategory] = useState<number>(0)
	const [foodOccurrenceMap, setFoodOccurrenceMap] = useState<Record<string, number>>({});
	const [selectedFoods, setSelectedFoods] = useState<FoodItem[] | []>([]);
	const [totalPrice, setTotalPrice] = useState<number | 0>(0);
	const [isNewFoodPromptOpen, toggleNewFoodPrompt] = useState<boolean>(false)
	const isCustomer = auth.user.isCustomer

	function getFilteredFood(category : [string, string, number, FoodCategoryKey | FoodCategoryKey[]]) {
		const filteredFoods = allFoods.filter(food => {
			return food.foodCategory === category[3]  || (Array.isArray(food.foodCategory) && food.foodCategory?.includes(category[3] as FoodCategoryKey));
		});
		return filteredFoods
	}

	const handleCategoryClick = (category : [string, string, number, FoodCategoryKey | FoodCategoryKey[]]) => {
		setActiveCategory(categories.indexOf(category))
		if (category[3] == 'all') {
			setAvailableFoods(allFoods)
		}
		else {
			setAvailableFoods(getFilteredFood(category))
		}
	}

	const addToShoppingList = async (newFood: FoodItem) => {

		const countNewFood = await Swal.fire({
			title: newFood.foodName,
			text: "How many do you need:",
			imageUrl: `images/${newFood.image}`,
			imageWidth: 300,
			imageHeight: 300,
			imageAlt: `Image of "${newFood.foodName}" here`,

			input: "number",
			inputAttributes: {
				min: '1',
				step: '1'
			},
			showCancelButton: true,
			confirmButtonText: "Add To Cart",
			confirmButtonColor: 'var(--green)',
			cancelButtonColor: 'var(--red)',
		});


		if(countNewFood.isConfirmed){
			const discountedPrice = newFood.discount !== undefined ? getDiscountedPrice(newFood.discount, newFood.price) : newFood.price;

			setTotalPrice( totalPrice + (newFood.discount == 0 ? newFood.price : discountedPrice));

			if (!selectedFoods.find((food: { foodName: string; }) => food.foodName === newFood.foodName)) {
                setSelectedFoods([...selectedFoods, newFood]);
                setFoodOccurrenceMap({...foodOccurrenceMap, [newFood.foodName] : Number(countNewFood.value)});
			}
			else {
                const updatedOccurrenceMap = { ...foodOccurrenceMap };
                updatedOccurrenceMap[newFood.foodName] = Number(countNewFood.value);
                setFoodOccurrenceMap(updatedOccurrenceMap);
			}
		}
	};

	function clearSelectedFood() {
		setSelectedFoods([])
		setTotalPrice(0)
		setFoodOccurrenceMap({})
	}

	function makePayment(computedPrice : number) {
		Swal.fire({
			title: "Are you sure?",
			text: `You are about to pay a total of Ksh ${computedPrice}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "var(--green)",
			cancelButtonColor: "var(--red)",
			confirmButtonText: "Yes, make payment!",
		  }).then((result) => {
			if (result.isConfirmed) {
				selectedFoods.forEach(selectedFood => {
					selectedFood.occurence = foodOccurrenceMap[selectedFood.foodName]
				});

				const sendRequest = async () => {
					try{
						const response = await axios.post('http://localhost:8000/saveOrder', { 'selectedFoods' : selectedFoods, 'userId' : auth.user.id, 'price' : computedPrice });

						if (response.data.isSuccessful) {
							Swal.fire({
								icon: "success",
								title: 'Order Placed',
								timer: 1500,
								showConfirmButton: false
							});
						}
					}
					catch(error : any) {
						console.log(error.response.config);
					}
				}
				sendRequest()
			}
		});
	}

	const createFoodClickEvent = async () => {
		toggleNewFoodPrompt(!isNewFoodPromptOpen)
	}

	const closeModal = () => {
		toggleNewFoodPrompt(false)
	}

	const addFood = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);		

		try {
			const response = await axios.post('http://localhost:8000/addFood', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});			
			Swal.fire({
				icon: 'success',
				title: `${formData.get('foodName')} added successfully`,
				showConfirmButton: false,
				timer: 700,
				timerProgressBar: true
			})
			toggleNewFoodPrompt(!isNewFoodPromptOpen)
			setAvailableFoods(await getAllFoods())
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Head title= "Menu" />

			<Header loggedInUser={auth.user} isCustomer={isCustomer}/>
			<main>
				<section>
					{!isCustomer && <ListOrder />}
					<CategoriesContainer title="Categories" categories={categories} activeCategory={activeCategory} allFoods={allFoods} getFilteredFood={getFilteredFood} handleCategoryClick={handleCategoryClick}/>
					<FoodList foods={availableFoods} addToShoppingList={ isCustomer ? addToShoppingList : undefined} isCustomer={isCustomer} createFoodClickEvent={createFoodClickEvent} activeCategory={activeCategory}/>
				</section>
				<section id="rigthSideBar">
					<Recipent auth={auth} isCustomer/>
					<ShippingCart foodOccurrenceMap={foodOccurrenceMap} selectedFoods={selectedFoods} totalPrice={totalPrice} clearSelectedFood={clearSelectedFood} makePayment={makePayment} />
				</section>
			</main>
			{isNewFoodPromptOpen ? <AddFoodForm addFood={addFood}/> : null}
		</>
	);
};

export default Menu;