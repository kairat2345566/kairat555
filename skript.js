/// Сохранение корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Загрузка корзины из localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Вызовите loadCart() при загрузке страницы
loadCart();
// Загрузка корзины из localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = []; // Если корзина не найдена, создаем пустую корзину
    }
    updateCart();
}
function addToCart(productId, productName, productPrice) {
    // Поиск товара в корзине
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1; // Увеличиваем количество, если товар уже есть в корзине
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    saveCart();  // Сохраняем корзину после изменения
    updateCart(); // Обновляем отображение корзины
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // Удаляем товар
    saveCart();  // Сохраняем корзину после удаления
    updateCart(); // Обновляем отображение корзины
}

function updateQuantity(productId, quantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = quantity;
        saveCart();  // Сохраняем корзину после изменения количества
        updateCart(); // Обновляем отображение корзины
    }
}
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Ваша корзина пуста</p>`;
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>${item.price * item.quantity} руб.</span>
                <button onclick="removeFromCart(${item.id})">Удалить</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });
    }

    cartTotalContainer.innerHTML = cart.length === 0 ? '' : `Общая стоимость: ${totalPrice} руб.`;
}
function clearCart() {
    cart = [];  // Очищаем корзину
    localStorage.removeItem('cart');  // Удаляем корзину из localStorage
    updateCart();  // Обновляем интерфейс корзины
}
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Получаем данные формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Проверка, что корзина не пуста
    if (cart.length === 0) {
        alert('Корзина пуста, добавьте товары.');
        return;
    }

    // Оформление заказа
    alert(`Спасибо за заказ, ${name}! Мы отправим ваш заказ на адрес: ${address}.`);

    // Очистка корзины
    clearCart();
});

function saveCart() {
    const simplifiedCart = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));
    localStorage.setItem('cart', JSON.stringify(simplifiedCart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const simplifiedCart = JSON.parse(savedCart);
        cart = simplifiedCart.map(item => {
            const product = products.find(p => p.id === item.id);
            return { ...product, quantity: item.quantity };
        });
    } else {
        cart = [];
    }
    updateCart();
}
