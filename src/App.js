import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faUndo, fa } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	const [items, setItems] = useState([]);

	const [inputValue, setInputValue] = useState('');

	
	const [totalItemCount, setTotalItemCount] = useState(6)


	const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};
	
		const newItems = [...items, newItem];
	
		setItems(newItems);
		setInputValue('');
		calculateTotal();

	};

	const handleRemoveButtonClick = (index) => {

		const removeItem = [...items]

		removeItem.splice(index, 1);

	
		setItems(removeItem);
		
	};

	const toggleComplete = (index) => {
		const newItems = [...items];
	
		newItems[index].isSelected = !newItems[index].isSelected;
	
		setItems(newItems);
	};

	const handleQuantityIncrease = (index) => {
		const newItems = [...items];
	
		newItems[index].quantity++;
	
		setItems(newItems);
		calculateTotal();

	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];
	
		newItems[index].quantity--;
	
		setItems(newItems);
		calculateTotal();

	};

	const calculateTotal = () =>{
		const totalItemCount = items.reduce((total,item) => {
			return total + item.quantity
		}, 0)
		setTotalItemCount(totalItemCount);
	}

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
				<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} 
				className='add-item-input' placeholder='Add an item...' />
<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
				</div>
				<div className='item-list'>
	{items.map((item, index) => (
		<div className='item-container'>
		<div className='item-name' onClick={() => toggleComplete(index)}>
						{item.isSelected ? (
					<>
						<FontAwesomeIcon icon={faCheckCircle} />
						<span className='completed'>{item.itemName}</span>
					</>
				) : (
					<>
						<FontAwesomeIcon icon={faCircle} />
						<span>{item.itemName}</span>
					</>
				)}
			</div>
			
			<div className='item-options'>
			<div className='quantity'>
				<button>
					<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
				</button>
				<span> {item.quantity} </span>
				<button>
	<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
</button>
</div>
<div className='delete'> 
			<button> 
			<span onClick={() => handleRemoveButtonClick(index)} >X</span>
			</button>
			</div>
			</div>
			
		</div>
	))}
</div>
                   <div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;
