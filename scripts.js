import data from './data.js'

const itemsContainer = document.querySelector('#items')


data.forEach(mood => {
    const newDiv = document.createElement('div');
	newDiv.className = 'item'
	const img = document.createElement('img');
	img.src = mood.image
	img.width = 300
	img.height = 300
	newDiv.appendChild(img)
	itemsContainer.appendChild(newDiv)
    const desc = document.createElement ('p')
    desc.innerText = mood.desc
    newDiv.appendChild(desc)
    const price = document.createElement ('p')
    price.innerText = mood.price
    newDiv.appendChild(price)

    const button = document.createElement('button')
    button.id = mood.name
    button.dataset.price = mood.price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
});

// CART
const cart = []

function addItems(name, price) {
    const item = {name: name, price: price, qty: 1}
    cart.push(item)
}

function showItems() {
    console.log (`You have ${cart.length} item(s) in your cart`)
    cart.forEach(item => {
        console.log(`${item.qty} x ${item.name} @ ${item.price} = ${item.price * item.qty}`)
    });
}

addItems('apple', 1.99)
showItems()