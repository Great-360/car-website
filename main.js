let search = document.querySelector('.search-box');
let menu = document.querySelector('.navbar');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
};

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
};

window.onscroll = () => {
    search.classList.remove('active');
    menu.classList.remove('active');
};

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// Store
const product = [
    {id: 1, name: "BMW", price: 150000, image: "imgs/car1.avif"},
    {id: 2, name: "Mercedes", price: 200000, image: "imgs/car2.webp"},
    {id: 3, name: "Audi", price: 250000, image: "imgs/car3.webp"},
    {id: 4, name: "Porsche", price: 300000, image: "imgs/car4.avif"},
    {id: 5, name: "Toyota", price: 350000, image: "imgs/car5.avif"},
    {id: 6, name: "Nissan", price: 400000, image: "imgs/car6.avif"},
    {id: 7, name: "Jante", price: 150, image: "imgs/part1.webp"},
    {id: 8, name: "Wheels", price: 110, image: "imgs/part2.webp"},
    {id: 9, name: "Motor", price: 1500, image: "imgs/part3.webp"},
    {id: 10, name: "Vilbrequin", price: 180, image: "imgs/part4.jpg"},
    {id: 11, name: "Retroviseur", price: 15, image: "imgs/part5.avif"},
    {id: 12, name: "Auto Spare Sparts", price: 50, image: "imgs/part6.avif"},
];

const categories = [...new Set(product.map((item) => item))];


let cartItems = [];
let cartCount = 0;

const updateCart = () => {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cartCount;

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = cartItems.map(item => {
        return `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>$${item.price}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" min="1"></p>
                <button class="btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.innerText = total;
}

const addToCart = (id) => {
    const product = categories.find(item => item.id === id);
    const cartItem = cartItems.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    cartCount++;
    updateCart();
}

const removeFromCart = (id) => {
    const cartItem = cartItems.find(item => item.id === id);
    cartCount -= cartItem.quantity;
    cartItems = cartItems.filter(item => item.id !== id);
    updateCart();
}

const updateQuantity = (id, quantity) => {
    const cartItem = cartItems.find(item => item.id === id);
    const oldQuantity = cartItem.quantity;
    cartItem.quantity = parseInt(quantity, 10);
    cartCount += cartItem.quantity - oldQuantity;
    updateCart();
}

const openCart = () => {
    document.getElementById('cart-modal').style.display = 'flex';
    document.querySelector('header').style.zIndex = 0;
}

const closeCart = () => {
    document.getElementById('cart-modal').style.display = 'none';
}

let cart = document.getElementById('root');
cart.innerHTML = categories.map((item) => {
    let {image, name, price} = item;
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
                <p>${name}</p>
                <h2>$ ${price}.00</h2>` +
                "<button onclick='addToCart(" + item.id + ")'>Add to cart</button>" +
            `</div>
        </div>
    `;
}).join('');
