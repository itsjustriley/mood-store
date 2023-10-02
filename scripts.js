import data from './data.js'

const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')


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

const all_items_button = Array.from(document.querySelectorAll("button"))

// -------------------------
// EVENT LISTENERS

// add to cart button
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItems(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))

// remove from cart button
itemList.addEventListener('click',  function(e) {
    const name = e.target.dataset.name
    const price = e.target.dataset.price
    if (e.target && e.target.classList.contains('remove-all')) {
        removeItem(name)
    }
    if (e.target && e.target.classList.contains('add-one')) {
        addItems(name, price)
    }
    if (e.target && e.target.classList.contains('remove-one')) {
        removeItem(name, 1)
    }
})

// allow user to set number of items
itemList.addEventListener('change', function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
})


// CART
const cart = []

// -------------------------
// Add Items to Cart
function addItems(name, price) {
    let itemExists = false;
    
    cart.forEach(item => {
        if (item.name === name) {
            item.qty += 1
            itemExists = true
        }
    })
    if (!itemExists){
        const item = {name, price, qty: 1}
        cart.push(item)
    }
    showItems()
}

// -------------------------
// Show Items
function showItems() {
    let s = 's'
    let totalQty = getTotalQty()
    
    if (totalQty === 1) {
        s = ''
    }

    cartQty.innerHTML = (`You have ${totalQty} item${s} in your cart`)

    let itemStr = ''
    cart.forEach(item => {
        let totalItemPrice = Math.round((item.qty * item.price) * 100)/100
        itemStr += `<li>
        <p>${item.name} ${item.price} x ${item.qty} = ${(totalItemPrice)}</p>
        <button class="remove-all" data-name="${item.name}">Remove</button>
        <button class="add-one" data-name="${item.name}">+</button>
        <button class="remove-one" data-name="${item.name}">-</button>
        <input class="update" type="number" data-name="${item.name}" placeholder="set item quantity">
        </li>`
    });
    itemList.innerHTML = itemStr
    cartTotal.innerHTML = `Total in cart: $${getCartTotal()}`
}

// -------------------------
// Get Total
function getCartTotal() {
    let total = 0
    cart.forEach(item => {
        total += item.price * item.qty
    })
    return total.toFixed(2)
}

// -------------------------
//  Get total quantity of items
function getTotalQty() {
    const totalQty = cart.reduce((itemCount, item) => itemCount + item.qty, 0);
    return totalQty
}

// -------------------------
// Remove Item
function removeItem(name, qty = 0){
    cart.forEach((item, index) => {
        if (item.name === name) {
            if (qty > 0){
                item.qty -= qty
            }
            if (item.qty < 1 || qty === 0) {
                cart.splice(index, 1);
            }
            showItems()
            return
        }
    });
    
}

// -------------------------
// Update Cart
function updateCart(name, qty) {
    cart.forEach(item => {
        if (item.name === name) {
            item.qty = qty
        }
        if (item.qty < 1) {
            removeItem(name)
        }
    })
    showItems()
}

showItems()
