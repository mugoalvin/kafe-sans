import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { FoodItem } from './Food';
import Buttons from './Buttons';
import '../../css/AddFoodModal.css'
import { FoodCategories } from '@/Functions/FunctionsAndValues';

const Modal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(1.7px);
`;

const FormContainer = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	width: 400px;
	max-width: 90%;
`;

interface AddFoodFormProps {
	addFood: (event: React.FormEvent<HTMLFormElement>) => void;
}


const AddFoodForm = ({ addFood } : AddFoodFormProps) => {

	return (
		<Modal>
			<FormContainer>
				<form id='addFoodForm' onSubmit={(event) => addFood(event)}>
					<h2>Add Food Details</h2>
					<div>
						<input type="file" name="image"/>
					</div>
					<div>
						<input type="text" name="foodName" placeholder='Food Name'/>
						<input type="number" name="price" placeholder='Price'/>
					</div>
					<div>
						<input type="number" name="discount" placeholder='Discount' min={0} max={100}/>
					</div>
					<div>
						<select name="foodCategory" >
							<option disabled selected>Choose Food Category</option>
							{
								FoodCategories.map( foodCategory => (
									<option value={foodCategory} key={foodCategory}>{foodCategory}</option>
								))
							}
						</select>
					</div>
					<div id='isRecomended'>
						<input type="checkbox" name="isRecomended" placeholder='Food Name'/>Recommended
					</div>
					<div id='modalButtonDiv'>
						<Buttons buttonText="Add Food" />
						{/* <Buttons buttonText='Cancel' onClickAction={closeModal}/> */}
					</div>
				</form>
			</FormContainer>
		</Modal>
	);
};

export default AddFoodForm;