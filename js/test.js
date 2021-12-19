/******************* shipping address **********************/
var fullName = document.getElementById('fullName');
var email = document.getElementById('email');
var address = document.getElementById('address');
var city = document.getElementById('city');
var state = document.getElementById('state');
var zip = document.getElementById('zip');
var addressForm = document.querySelector('.address form');
var addressBtn = document.querySelector('#addBtn');
//header
var stateActive = document.querySelectorAll('nav i');
var addressLayout = document.getElementsByClassName('address')[0];
var paymentLayout = document.getElementsByClassName('payment')[0];
var deliveryLayout = document.getElementsByClassName('deliveryLayout')[0];
//test statement
var fullNameTest = /^[a-zA-z]{3,}$/;
var emailTest = /^[a-zA-z]{3,}@[a-zA-z0-9]{3,}(\.com)$/;
var addressTest =  /^[0-9][a-zA-z]{9,}$/;
var cityTest =  /^[a-zA-z]{5,}$/;
var codeTest =  /^[0-9]{4,}$/;

var inputs = document.forms[0].elements;

var flag = true;
var key = 0; //a3rf n l event at3ml
[].forEach.call(inputs, (input) => {
    input.addEventListener('keypress', function(e) {
        key++;
        //check
        //fullName
        if(!fullNameTest.test(fullName.value)) {
            fullName.style.border = '2px solid red';
            flag = false;
        } else {
            fullName.style.border = 'none';
            flag = true
        }
        //Email
        if(!emailTest.test(email.value)) {
            email.style.border = '2px solid red';
            flag = false;
        } else {
            email.style.border = 'none';
            flag = true
        }

        //address
        if(!addressTest.test(address.value)) {
            address.style.border = '2px solid red';
            flag = false;
        } else {
            address.style.border = 'none';
            flag = true
        }

        //city
        if(!cityTest.test(city.value)) {
            city.style.border = '2px solid red';
            flag = false;
        } else {
            city.style.border = 'none';
            flag = true
        }

        //code
        if(!codeTest.test(zip.value)) {
            zip.style.border = '2px solid red';
            flag = false;
        } else {
            zip.style.border = 'none';
            flag = true
        }

        addressBtn.style.border = 'none';
    })
    
})
//submit address form
addressForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(key);
    if(!flag || key == 0) { //error & done event
        alert('some inputs are invalid');
    } else {
        //change state
        stateActive.forEach(el => {
            el.classList.remove('active');
            if(el.id == 'payment') {
                el.classList.add('active');
            }
        })
        //change layout
        addressLayout.style.display = 'none';
        paymentLayout.style.display = 'initial';
    }
})


/**************** payment layout ******************/
//credit form inputs
var creditNum = document.getElementById('cardNum');
var creditName = document.getElementById('cardName');
var creditExpire = document.getElementById('date');
var creditCvv = document.getElementById('cvv');
var date = new Date();
var currentDate = date.toLocaleDateString();
var creditDateFormat = new Date(creditExpire.value);

var radioButton = document.getElementsByName('payment');

var clicked = false;
var entered = 0; //sure that user enter change event on payment method
var flag2 = false; //no err in payment method
radioButton.forEach(el => {
    el.addEventListener('click', function(e) {
        if (e.target.id == 'credit') {
            //handle validation on this form
            var allInputs = document.forms[1].elements;
            [].forEach.call(allInputs, (el) => {
                el.setAttribute('required', true);
                console.log(el);
            })
            clicked = true;
        } else if (e.target.id == 'paypal' || e.target.id == 'cash') {
            clicked = true;
        }
    });
})

//validate credit form inputs
//var creditInputs = document.forms[1].elements;
function validatePaymentForm () {
    //validate inputs
    var creditNumTest = /^[0-9]{9,}$/;
    var creditNameTest = /^[a-zA-z]{3,}$/;
    var cvvTest = /^[0-9]{4,}$/;
    //fire event
    [].forEach.call(creditInputs, input => {
        input.addEventListener('change', function(e) {
            //entered++;
            //creditName
            if(!creditNameTest.test(creditName.value)) {
                creditName.style.border = '2px solid red';
                flag2 = false;
            } else {
                creditName.style.border = 'none';
                flag2 = true
            }
            //creditNum
            if(!creditNumTest.test(creditNum.value)) {
                creditNum.style.border = '2px solid red';
                flag2 = false;
            } else {
                creditNum.style.border = 'none';
                flag2 = true
            }
            //creditCVV
            if(!cvvTest.test(creditCvv.value)) {
                creditCvv.style.border = '2px solid red';
                flag2 = false;
            } else {
                creditCvv.style.border = 'none';
                flag2 = true
            }
            //date
            if(new Date(currentDate) < new Date(creditExpire.value)) {//err
                creditExpire.style.backgroundColor = 'red';
                flag2 = false;
            } else {
                creditExpire.style.backgroundColor = 'white';
                flag2 = true
            }
        })        
    })
}

//submit payment data 
var orderBtn = document.getElementsByClassName('orderBtn')[0];

orderBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (clicked) {
        //change state
        stateActive.forEach(el => {
            el.classList.remove('active');
            if(el.id == 'delivery') {
                el.classList.add('active');
            }
        }) 
        //change layout
        paymentLayout.style.display = 'none';
        deliveryLayout.style.display = 'flex';
    } else {
        alert('you must choose payment type');
    }
})
