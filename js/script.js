/*jshint esversion: 6 */
const todoList = [];
let condition = false;
let sorting = false; 

const parentTable = document.getElementById('table-head');
const parentElement = document.getElementById('div-for-table');

const clearInput = () => {
	document.getElementById('name-author').value = "";
	document.getElementById('date-created').value = "";
	document.getElementById('to-do').value = "";
};

const newTable = (todoList) => {
		const lastTable = document.getElementById('table-new');
		if(lastTable !== null) {
		lastTable.parentNode.removeChild(lastTable);
		}
		
		const newTable = document.createElement('table');
		newTable.border = '1';
		newTable.id = 'table-new';
		newTable.className = 'table-new';
		// newTable.border = '1';

		for(let i = 0; i < todoList.length; i++) {
			const tr = document.createElement('tr');
			tr.id = i;

			const td = document.createElement('td');
			const inputNameAuthor = document.createElement('input');
			inputNameAuthor.className = 'input-field';
			inputNameAuthor.value = todoList[i].nameAuthor;
			inputNameAuthor.setAttribute('disabled', '');
			td.appendChild(inputNameAuthor);

			const inputDateCreated = document.createElement('input');
			inputDateCreated.type = 'date';
			inputDateCreated.className = 'input-field';
			inputDateCreated.value = todoList[i].dateCreated;
			inputDateCreated.setAttribute('disabled', '');
			td.appendChild(inputDateCreated);	

			const inputToDo = document.createElement('input');
			inputToDo.className = 'input-field';
			inputToDo.value = todoList[i].toDo;
			inputToDo.setAttribute('disabled', '');
			td.appendChild(inputToDo);	

			const btnEdit = document.createElement('button');
			btnEdit.className = 'btn';
			btnEdit.id = i;
			btnEdit.innerText = 'Edit';
			btnEdit.onclick = function() {editTodo(btnEdit,
				btnDel, 
				tr, 
				inputNameAuthor, 
				inputDateCreated, 
				inputToDo)};

			const btnDel = document.createElement('button');
			btnDel.className = 'btn';
			btnDel.id = 'del';
			btnDel.innerText = 'Delete';
			btnDel.onclick = function() {delTodo(btnEdit, 
				btnDel, 
				tr,
				inputNameAuthor, 
				inputDateCreated, 
				inputToDo)};

			td.appendChild(btnEdit);
			td.appendChild(btnDel);

			tr.appendChild(td);

			newTable.appendChild(tr);
		}
		parentTable.insertAdjacentElement('afterend', newTable);
};

 function editTodo(btnEdit, 
	btnDel, 
	tr, 
	inputNameAuthor, 
	inputDateCreated, 
	inputToDo) {

	condition = !condition;
	const i = tr.id;

	if(condition) {
		inputNameAuthor.removeAttribute('disabled', '');
		inputDateCreated.removeAttribute('disabled', '');
		inputToDo.removeAttribute('disabled', '');
		btnEdit.innerHTML='Save';
		btnDel.innerHTML='Back';

	} else {
		todoList[i].nameAuthor = inputNameAuthor.value;
		todoList[i].dateCreated = inputDateCreated.value;
		todoList[i].toDo = inputToDo.value;

		inputNameAuthor.setAttribute('disabled', '');
		inputDateCreated.setAttribute('disabled', '');
		inputToDo.setAttribute('disabled', '');
		btnEdit.innerHTML='Edit';
		btnDel.innerHTML='Delete';
		console.log('after edit', todoList);
	}
}

function delTodo(btnEdit, 
	btnDel, 
	tr,
	inputNameAuthor, 
	inputDateCreated, 
	inputToDo) { 

	const i = tr.id;
	condition = !condition;

	if(!condition) {
		inputNameAuthor.value = todoList[i].nameAuthor;
		inputDateCreated.value = todoList[i].dateCreated;
		inputToDo.value = todoList[i].toDo;

		inputNameAuthor.setAttribute('disabled', '');
		inputDateCreated.setAttribute('disabled', '');
		inputToDo.setAttribute('disabled', '');

		btnEdit.innerHTML='Edit';
		btnDel.innerHTML='Delete';

		console.log('back', todoList);	
	} else {
		todoList.splice(i,1);
		condition = !condition;
		console.log('after del', todoList);
	}

	newTable(todoList);
}

sortFields = (title) => {
	sorting = !sorting;
	switch (title) {
		case 'nameAuthor' :
			sorting 
			? todoList.sort((a, b) => a.nameAuthor > b.nameAuthor ? 1 : -1) 
			: todoList.sort((a, b) => a.nameAuthor < b.nameAuthor ? 1 : -1);
			break;
		case 'dateCreated' :
			sorting 
			? todoList.sort((a, b) => a.dateCreated > b.dateCreated ? 1 : -1) 
			: todoList.sort((a, b) => a.dateCreated < b.dateCreated ? 1 : -1);
			break;
		case 'toDo' :
			sorting 
			? todoList.sort((a, b) => a.toDo > b.toDo ? 1 : -1) 
			: todoList.sort((a, b) => a.toDo < b.toDo ? 1 : -1);
			break;
	}
	newTable(todoList);
};

const select = document.querySelector('select');
const inputForFilter = document.getElementById('search');

inputForFilter.oninput = function () {
	let arr = [];
	const filterValue = inputForFilter.value.toLowerCase().trim();

	let newValue = '';
	let newValue1 = '';
	if(filterValue !== '') {
		todoList.forEach(item => {
			switch(select.value) {
				case 'Author':
					newValue = item.nameAuthor;
					break;
				case 'To Do':
					newValue= item.toDo;
					break;
				case 'none': 
					newValue = item.nameAuthor + ' ' + item.toDo;
					break;
			}
			let words = newValue.split(' ');
			let compare = '';
				for(let i = 0; i < words.length; i++) {
					compare = words[i].slice(item, filterValue.length).toLowerCase();
					if(compare == filterValue ) {
						if(!arr.includes(item)) {				
							arr.push(item);
							console.log('arr', arr);
						}
					}
	
				}
	
			});
	} else arr = todoList;
	newTable(arr);
};


add.onclick = () => {
	let nameAuthor = document.getElementById('name-author').value.trim();
	let date = document.getElementById('date-created').value.trim();
	let toDo = document.getElementById('to-do').value.trim();

	if(nameAuthor && date && toDo) {
		todoList.push({
		nameAuthor: nameAuthor,
		dateCreated: date,
		toDo: toDo
		});
		newTable(todoList);
	} 
		else alert('Input all filds');
		console.log('todoList', todoList);
		clearInput();
};
