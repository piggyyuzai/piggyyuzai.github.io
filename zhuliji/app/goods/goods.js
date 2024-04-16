// 初始化商品数量
var quantity = 1;
// 初始化购物车数量
var cartCount = 0;

// 加号按钮点击事件
function increaseQuantity() {
    quantity++;
    updateQuantityDisplay();
}

// 减号按钮点击事件
function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        updateQuantityDisplay();
    }
}

// 更新数量显示
function updateQuantityDisplay() {
    document.getElementById("quantity").innerText = quantity;
}

// 加入购物车按钮点击事件
function addToCart() {
    cartCount += quantity;
    updateCartCountDisplay();
    document.getElementById("cartCount").style.display = "block";
}

// 更新购物车数量显示
function updateCartCountDisplay() {
    document.getElementById("cartCount").innerText = cartCount;
}

// 初始化数量显示
window.onload = function () {
    updateQuantityDisplay();
    updateCartCountDisplay();
}
