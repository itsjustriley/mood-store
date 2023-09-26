import data from './data.js'

const itemsContainer = document.querySelector('#items')

// loop once for the number of items in data
// create a new div element and give it the 'item' class
// create an image element using the appropriate image
// append that image to the new div
// create p elements for descriptin and price, append them
// create add to cart button and assign it an id based on mood
// create data attribute data-price linked to button
for (let i = 0; i < data.length; i += 1) {
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	const img = document.createElement('img');
	img.src = data[i].image
	img.width = 300
	img.height = 300
	newDiv.appendChild(img)
	itemsContainer.appendChild(newDiv)
    const desc = document.createElement ('p')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)
    const price = document.createElement ('p')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    const button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)


}

