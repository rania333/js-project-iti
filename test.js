//get data from local storage
var storedProducts = localStorage.getItem('products');
var products = JSON.parse(storedProducts);
var cartBtn = document.getElementById('cartBtn');
//open cart
var cartContent = document.getElementById('cartContent');
cartBtn.addEventListener('click', function() {
    if(cartContent.style.display == 'none') {
        cartContent.style.display = 'flex';
    } else {
        cartContent.style.display = 'none';
    }
});

//fill cart
var leftSide = document.getElementsByClassName('left')[0];
var cartHeader = document.querySelector('.left > header');
function fillCartData() {
    if (products.length == 0) {//no products
        //hide header
        leftSide.style.display ='none';
        var h1 = document.createElement('h1');
        h1.setAttribute('class', 'emptyCart');
        h1.textContent = 'Your cart is Empty now';
        cartContent.appendChild(h1);
    } else {
        getDataFromCart();
    }
}

//get Data from Array
fillCartData();

function getDataFromCart () {
    displayOrderSummary();
    displayCartHeader();
    //create products part
        //create section for products
    productsContainer = document.createElement('section');
    productsContainer.setAttribute('class', 'cartProduct');
    //insert as last element
    leftSide.insertBefore(productsContainer, leftSide.lastElementChild.nextSibling);
    //create products title -> title for columns
    var headerRow = document.createElement('header');
    var firstCol = document.createElement('h2');
    firstCol.textContent = 'Product Name';
    var secondCol = document.createElement('h2');
    secondCol.textContent = 'Quantity';
    var thirdCol = document.createElement('h2');
    thirdCol.textContent = 'Price';
    var fourthCol = document.createElement('h2');
    fourthCol.textContent = 'Total';
    headerRow.append(firstCol, secondCol, thirdCol, fourthCol);
    productsContainer.insertBefore(headerRow, productsContainer.firstElementChild);
    console.log(products);
    products.forEach(prod => {
        createProduct(prod);
    });
}
//order summary part
function displayOrderSummary() {
    var rightDiv = cartContent.lastElementChild;
    rightDiv.style.display = 'block';
}
function displayCartHeader() {
    console.log(cartHeader);
    cartHeader.style.display = 'flex';
}
//create article for every product
function createProduct(product) {
    var article = document.createElement('article');
    article.setAttribute('id', product.prodId);
    var div = document.createElement('div'); //first column
    div.setAttribute('class', 'pData');
    var photo = document.createElement('img');
    photo.src = product.prodImg;
    photo.height = 60;
    photo.width = 60;
    //title and category and paragraph
    var divData = document.createElement('div');
    var productTitle = document.createElement('h3');
    productTitle.textContent = product.prodTitle;
    var prodCat = document.createElement('h5');
    prodCat.textContent = product.prodCat ;
    divData.append(productTitle, prodCat);
    //append photo and product data in div
    div.append(photo, divData);
    //quantity part
    var pQnt = document.createElement('div'); //second col
    pQnt.setAttribute('class', 'pQnt');
    var minusSpan = document.createElement('span');
    minusSpan.textContent = '-';
    minusSpan.setAttribute('class','minus');
    var numSpan = document.createElement('span');
    numSpan.textContent =  product.prodQnt ;
    numSpan.setAttribute('class','prodQ');
    var plusSpan = document.createElement('span'); 
    plusSpan.textContent = '+';
    plusSpan.setAttribute('class','plus');

    pQnt.append(minusSpan, numSpan, plusSpan);
    //price part
    var priceDiv = document.createElement('div'); //third col
    priceDiv.setAttribute('class', 'pPrice');
    var priceSpan = document.createElement('span');
    priceSpan.textContent = '$' + product.prodPrice ;
    priceDiv.append(priceSpan)
    //total row price
    var totalRowPrice = document.createElement('div'); //fourth column
    totalRowPrice.setAttribute('class', 'pTotal');
    var totalSpan = document.createElement('span');
    totalSpan.textContent = '$' + (parseInt(numSpan.textContent) * (product.prodPrice)); 
    totalRowPrice.append(totalSpan);
    //append all column row
    article.append(div, pQnt, priceDiv, totalRowPrice);
    //append product as last child
    if(productsContainer.children.length == 0) { //first element
        productsContainer.append(article);
    } else {
        productsContainer.insertBefore(article, productsContainer.lastElementChild.nextSibling);
    }
}
//calculate total price in cart header
var numOfItems = document.getElementById('numOfItem');
numOfItems.textContent = products.length+' Items';
//calculate total price and total items in summary
var numOfItemInSummary = document.getElementById('numOfItemInSummary');
numOfItemInSummary.textContent = products.length + 'Items';

//calculate total price in card
var totalItemPriceInSummary = document.getElementById('totalItemPriceInSummary');
totalItemPriceInSummary.textContent = calcTotal() + " $";
var totalPriceSummary = document.getElementById('totalPriceSummary');
totalPriceSummary.textContent = calcTotal() + ' $';

function calcTotal() {
    var sum = 0;
    products.forEach(prod => {
        var singleProd = prod.prodQnt * prod.prodPrice;
        sum += singleProd
    });
    return sum;
}

//promo code 
var promoBtn = document.getElementById('apply');
var promoInput = document.getElementById('promo');
var total = document.getElementById('totalPriceSummary');
var descount = 0, totalAfterPromo = calcTotal();
//add to local storage to zeroes it
localStorage.setItem('promoCode', descount);
localStorage.setItem('total', totalAfterPromo);
promoBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(promoInput.value == 12345) {
        descount = 50;
        totalAfterPromo = calcTotal() - descount;
        //create new element
        var s = document.createElement('span');
        s.textContent = `you have 50 EGP Off`;
        s.style.color = '#4B6587';
        var promoForm = document.getElementById('promoForm');
        promoForm.insertBefore(s, promoForm.lastElementChild);
        //prevent to fire event again
        promoBtn.disabled = true;
        //change value
        total.textContent = totalAfterPromo + ' $';
        console.log(descount);

    } else {
        var s = document.createElement('span');
        s.textContent = 'this code is expired!';
        s.style.color = 'red';
        var promoForm = document.getElementById('promoForm');
        promoForm.insertBefore(s, promoForm.lastElementChild);
        descount = 0 ;
        totalAfterPromo = calcTotal();
        //prevent to fire event again
        promoBtn.disabled = true;
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    //add to local storage
localStorage.setItem('promoCode', descount);
localStorage.setItem('total', totalAfterPromo);
})


//switch to onther page
var checkout = document.getElementById('checkout');
checkout.addEventListener('click', function(e) {
    window.location.href = './order.html';
})

//increase and decrease quantity
var minus = document.getElementsByClassName('minus');
var prodQ = document.getElementsByClassName('prodQ'); //product quantity
var plus = document.getElementsByClassName('plus');

//decrease quantity
[].forEach.call(minus, (prod) => {
    prod.addEventListener('click', function(e) {
        var prodId = prod.parentElement.parentElement.id;
        var product = products.find(p => p.prodId == prodId);
        if(product.prodQnt == 1) {
            products.pop(product);
            localStorage.setItem("products", JSON.stringify(products));
            window.location.reload();
        } else {
            products.forEach(p => {
                if(p.prodId == product.prodId) {
                    p.prodQnt -= 1;
                }
            })
            localStorage.setItem("products", JSON.stringify(products));
            window.location.reload();
        }
    })
});

//increase quantity
[].forEach.call(plus, (prod) => {
    prod.addEventListener('click', function(e) {
        var prodId = prod.parentElement.parentElement.id;
        products.forEach(p => {
            if(p.prodId == prodId) {
                p.prodQnt += 1;
            }
        })
        localStorage.setItem("products", JSON.stringify(products));
        window.location.reload();
})
})