document.addEventListener('DOMContentLoaded', function () {
    const productData = {
        goods: [{
            id: 1,
            image: "./image/a1.jpg",
            href: "./goods.html",
            name: "粽横四海礼盒",
            price: 158,
            count: 0,
            infoimg: ["./image/a11.jpg", "./image/a12.jpg", "./image/a13.jpg"],
            info: "龍粽登场 粽横四海｜原创端午文创礼盒<br>端午历处草木繁盛的时节<br>挂艾叶趋吉避凶择箬叶以粽为礼文化为媒<br>层叠交错的绿不规则的植物纹样<br>甄心之赠与重要的人<br>❶粽子<br>❷咸鸭蛋<br>❸黄酒<br>❹艾叶<br>",
        }, {
            id: 2,
            image: "./image/a2.jpg",
            href: "./a2.html",
            name: "开门见喜礼盒",
            price: 98,
            count: 0,
            infoimg: ["./image/a21.jpg", "./image/a22.jpg", "./image/a23.jpg"],
            info: "花好月圆 比翼双飞｜原创婚庆礼盒<br>以浪漫与祝福为设计理念<br>我们推出了这款婚庆礼盒<br>内搭产品<br>❶咸蛋黄麦芽饼<br>❷复古红色信封喜糖盒<br>❸日式珊瑚绒毛巾（红色）<br>❹复古琥珀高脚玻璃杯<br>❺透明礼袋",
        }, {
            id: 3,
            image: "./image/a3.jpg",
            href: "./a3.html",
            name: "西湖礼物礼盒",
            price: 198,
            count: 0,
            infoimg: ["./image/a31.jpg", "./image/a32.jpg", "./image/a33.jpg"],
            info: "湖光山色 西子美景｜原创杭州文创礼盒<br>承载杭州韵味的祝福，陪您度过美好时光<br>我们推出了这款杭州文创礼盒<br>内搭产品<br>❶西湖之水摆件<br>❷西湖藕粉<br>❸明前龙井茶叶<br>❹丝巾<br>",
        }, {
            id: 4,
            image: "./image/b1.jpg",
            href: "./b1.html",
            name: "一点心意月饼礼盒",
            price: 128,
            count: 0,
            infoimg: ["./image/b11.jpg", "./image/b12.jpg"],
            info: "月圆人团圆 情浓意更浓｜原创中秋文创礼盒<br>满满氛围感 记录美好回忆<br>我们推出了这款文创中秋礼盒<br>内搭产品<br>❶50-80g月饼<br>❷手提翻盖立体盒<br>",
        }, {
            id: 5,
            image: "./image/b2.jpg",
            href: "./b2.html",
            name: "生日快乐礼盒",
            price: 108,
            count: 0,
            infoimg: ["./image/b21.jpg", "./image/b22.jpg", "./image/b23.jpg"],
            info: "一切尽意 百事从欢｜原创生日文创礼盒<br>带着对生日的美好祝福<br>我们推出了这款文创生日礼盒<br>内搭产品<br>❶机械八音盒<br>❷香薰蜡烛<br>❸小火柴<br>❹生日贺卡<br>",
        }, {
            id: 6,
            image: "./image/b3.jpg",
            href: "./b3.html",
            name: "一本上海礼盒",
            price: 198,
            count: 0,
            infoimg: ["./image/b31.jpg", "./image/b32.jpg", "./image/b33.jpg"],
            info: "海派文化 中西交会｜原创上海文创礼盒<br>展现上海的城市魅力<br>我们推出了这款文创上海礼盒<br>内搭产品<br>❶茶叶1盒<br>❷上海主题糕点<br>❸上海主题手绘本<br>❹上海市花白玉兰茶宠<br>",
        }, {
            id: 7,
            image: "./image/g5.jpg",
            href: "./g5.html",
            name: "百業興旺礼盒",
            price: 188,
            count: 0,
            infoimg: ["./image/g51.jpg", "./image/g52.jpg", "./image/g53.jpg", "./image/g54.jpg"],
            info: "万物复苏 百业兴旺｜原创新年文创礼盒<br>带着对新一年的憧憬和希望<br>我们推出了这款文创新年礼盒<br>内搭产品<br>❶招财貔恘摆件/香插<br>❷漏斗陶瓷杯<br>❸香盘<br>❹澳洲檀香<br>❺新年红包🧧（在隐藏的盒盖哦）",
        }],
        detail:[{
            image:"",price:"",name:"",infoimg:[],info:""
        }]
    };

    const source = `
        {{#each goods}}
        <div class="goods">
            <a href="{{href}}" data-id="{{id}}">
                <img src="{{image}}" alt="{{name}}">
                <div>{{{name}}}</div>
                <div>{{#if price}}{{price}}￥{{else}}{{price}}{{/if}}</div>
            </a>
        </div>
        {{/each}}
<!--        <div class="goods">-->
<!--            <a href="./chat.html"><img src="./image/zhuliji.jpg"><div>联系我们</div><div>专属定制</div></a>-->
<!--        </div>-->
        `;
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
                    <img src="{{this}}" style="width: 200px;">
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
