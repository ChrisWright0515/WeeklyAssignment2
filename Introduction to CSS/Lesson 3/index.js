window.onload = addButton()

const cartObj= {
    Name :  [],
    Price : [],
    Img: []

}

function addButton(){
    const buttons = document.getElementsByClassName("shop-item-button")
    for(i of buttons){
        i.addEventListener('click',addToCart)
    }
    const purchaseBtn = document.getElementById('purchaseBtn')
    purchaseBtn.addEventListener('click', purchase)
    purchaseBtn.addEventListener('click', total)
}

function addToCart(){
    const itemValue = this.parentNode.children[0].id
    const itemDetails = this.parentNode.parentNode
    const itemPic = itemDetails.children[1].src
    const itemName = itemDetails.children[0].textContent    
    if(cartObj.Name.indexOf(itemName) > -1){
        alert("Sorry thats already in your cart")
        return
    }
    else{
        cartObj.Name.unshift(itemName)
        cartObj.Price.unshift(itemValue)
        cartObj.Img.unshift(itemPic)
        console.log(cartObj)
        showCart()
        total()
    }
}

function showCart(){
    const cart = document.getElementById("cart-items")
    const cartRow = document.createElement('div')
    cartRow.classList.add("cart-row")
    cart.appendChild(cartRow)

    const cartItems = document.createElement('div')
    cartItems.classList.add('cart-item')
    cartItems.classList.add('cart-column')
    cartRow.appendChild(cartItems)

    const cartImg = document.createElement('img')
    cartImg.classList.add('cart-item-image')
    cartImg.src = cartObj.Img[0]
    cartItems.appendChild(cartImg)

    cartItemName = document.createElement('span')
    cartItemName.classList.add('cart-item-title')
    cartItemName.innerHTML = cartObj.Name[0]
    cartItems.appendChild(cartItemName)

    cartItemPrice = document.createElement('span')
    cartItemPrice.classList.add('cart-price')
    cartItemPrice.classList.add('cart-column')
    cartItemPrice.innerHTML = `$${cartObj.Price[0]}`
    cartItemPrice.id = `${cartObj.Price[0]}`
    cartRow.appendChild(cartItemPrice)

    cartQuantity = document.createElement('div')
    cartQuantity.classList.add('cart-quantity')
    cartQuantity.classList.add('cart-column')
    cartRow.appendChild(cartQuantity)

    input = document.createElement('input')
    input.type = 'number'
    input.classList.add('cart-quantity-input')
    input.value= "1"
    input.addEventListener('change', duplicateItem)
    input.addEventListener('change', total)
    cartQuantity.appendChild(input)

    removeBtn = document.createElement('button')
    removeBtn.classList.add('btn')
    removeBtn.classList.add('btn-danger')
    removeBtn.innerHTML = "REMOVE"
    removeBtn.addEventListener('click', removeItems)
    removeBtn.addEventListener('change', total)
    cartQuantity.appendChild(removeBtn)
}

function removeItems(){
    parent = this.parentNode.parentNode
    child = parent.children[0]
    grandchild = child.children[1].textContent
    if(cartObj.Name.indexOf(grandchild) > -1){
        for( var i = 0; i < cartObj.Name.length; i++){ 
            if ( cartObj.Name[i] === grandchild) { 
                cartObj.Name.splice(i, 1); 
                cartObj.Price.splice(i, 1); 
                cartObj.Img.splice(i, 1); 
                i--
            }
        }
        parent.remove()
        total()
    }
}

function duplicateItem(){
    multiplier = this.value
    findPrice = this.parentNode.parentNode
    findLabel = findPrice.children[0]
    label = findLabel.children[1].textContent
    regPrice = findPrice.children[1]
    for( var i = 0; i < cartObj.Name.length; i++){ 
        if ( cartObj.Name[i] === label) {
            const multiplier2 = cartObj.Price[i]
            newPrice =  multiplier2 * multiplier
            finalPrice = newPrice.toFixed(2)
            regPrice.id = `${finalPrice}`
            regPrice.textContent = `$${finalPrice}`
        }
    }
}

function total (){
    totalPrice = document.getElementById('totalPrice') 
    prices = document.body.getElementsByClassName('cart-price')
    totalArr= []
    for(i=0; i < prices.length;i++){
        integers =  prices[i].id
        totalArr.push(Number(integers))    
    }
    sum =totalArr.reduce((a , b) => a + parseFloat(b), 0)
    sumRound = sum.toFixed(2)
    totalPrice.innerHTML = `$${sumRound}`
}

function purchase(){
    wholeCart = document.getElementById('cart-items')
    while(wholeCart.firstChild){
    wholeCart.removeNode(wholeCart.firstChild)
    }

    cartObj.Name.splice(0,cartObj.Name.length)
    cartObj.Price.splice(0,cartObj.Price.length)
    cartObj.Img.splice(0,cartObj.Img.length)
}