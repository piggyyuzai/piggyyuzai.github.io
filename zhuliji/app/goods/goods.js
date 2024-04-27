// 初始化商品数量
var quantity = 1;
// 初始化购物车数量
var cartCount = 0;
// 初始化数量显示
window.onload = function () {
    updateQuantityDisplay();
    updateCartCountDisplay();
}

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

// 加入购物车按钮点击事件
function addToCart() {
    cartCount += quantity;
    updateCartCountDisplay();
    document.getElementById("cartCount").style.display = "block";
}
// 更新数量显示
function updateQuantityDisplay() {
    document.getElementById("quantity").innerText = quantity;
}
// 更新购物车数量显示
function updateCartCountDisplay() {
    document.getElementById("cartCount").innerText = cartCount;
}




document.addEventListener('DOMContentLoaded', function () {
    const source = document.getElementById('product-template').innerHTML;
    const template = Handlebars.compile(source);
    const renderedHtml = template(productData);
    document.querySelector('.goods-list').innerHTML = renderedHtml;

    // 添加点击获取商品id
    document.querySelectorAll('.goods a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 获取被点击商品的 ID
            const id = link.getAttribute('data-id');
            //阻止默认行为
            event.preventDefault();
            // 根据商品 ID 查找对应的商品信息
            const selectedProduct = productData.goods.find(product => product.id.toString() === id);

            const detailSource = `
                <div class="head">
                    <img src="{{image}}" style="width: 60%;">
                    <div class="butt">
                        <div>数量</div>
                        <div onclick="decreaseQuantity()" style="margin: 0 10px 0;cursor: pointer;">-</div>
                        <div id="quantity">1</div>
                        <div onclick="increaseQuantity()" style="margin: 0 20px 0 10px;cursor: pointer;">+</div>
                        <div onclick="addToCart()" style="cursor: pointer;">加入购物车</div>
                        <img src="../image/cart1.png" class="cart1">
                        <img src="../image/cart2.png" class="cart2">
                        <div id="cartCount"></div>
                    </div>
                    <div style="font-size: 12px;">货量充足</div>
                    <div style="font-weight: bold;margin: 5px 0 5px 0 ;">{{{name}}}</div>
                    <div>{{price}}￥</div>
                </div>
                <div style="background-color: #fafafa;">
                    <div class="info" style="border-top: 1px solid #cccccc;border-bottom: none;">
                        <img src="../image/deliver.png">
                        <div style="color: #07379C;">48小时内发货</div>
                    </div>
                    <div class="info" style="margin-top: -10px;">
                        <div style="margin-left:30px;font-size:14px;">浙江杭州 快递:免运费</div>
                    </div>
                    <div class="info">
                        <img src="../image/like.png">
                        <div>7天无理由</div><p>&#10095;</p>
                    </div>
                    <a class="info" href="../chat.html">
                        <img src="../image/cust.png">
                        <div>定制选配</div><p>&#10095;</p>
                    </a>
                </div>
                <div class="detail">
                    <div class="title">商品详情</div>
                    {{#each infoimg}}
                    <img src="{{this}}">
                    {{/each}}
                    <div>{{{info}}}</div>
                </div>
            `;
            const detailTemplate = Handlebars.compile(detailSource);
            const detailRenderedHtml = detailTemplate(selectedProduct);
            // 将生成的 HTML 插入到页面中以显示商品详细信息
            document.querySelector('.goods-detail').innerHTML = detailRenderedHtml;
        });
    });
});