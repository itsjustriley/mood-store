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
        itemStr += `<li> ${item.name} ${item.price} x ${item.qty} = ${(totalItemPrice)}</li>`
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
            return
        }
    });
    
}

// -------------------------

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItems(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))