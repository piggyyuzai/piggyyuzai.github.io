document.addEventListener('DOMContentLoaded', function () {
    const productData = {
        goods: [{
            id: 1,
            image: "./goods/image/a1.jpg",
            href: "./goods/goods.html",
            name: "粽横四海礼盒",
            price: 158,
            count: 0,
            infoimg: ["./goods/image/a1.jpg", "./goods/image/a1.jpg", "./goods/image/a1.jpg"],
            info: "粽横四海礼盒，精选优质原料，用心制作，品质保证，让您满意，欢迎来电咨询。",
        }, {
            id: 2,
            image: "./goods/image/a2.jpg",
            href: "./goods/a2.html",
            name: "开门见喜礼盒",
            price: 98,
            count: 0,
            infoimg: ["./image/goods/a1.jpg", "./image/goods/a1.jpg", "./image/goods/a1.jpg"],
            info: "开门见喜礼盒，精选优质原料，用心制作，品质保证，让您满意，欢迎来电咨询。",
        }, {
            id: 3,
            image: "./goods/image/a3.jpg",
            href: "./goods/a3.html",
            name: "西湖礼物礼盒",
            price: 198,
            count: 0,
            infoimg: ["./image/goods/a1.jpg", "./image/goods/a1.jpg", "./image/goods/a1.jpg"],
            info: "西湖礼物礼盒，精选优质原料，用心制作，品质保证，让您满意，欢迎来电咨询。",
        }, {
            id: 4,
            image: "./goods/image/b1.jpg",
            href: "./goods/b1.html",
            name: "一点心意月饼礼盒",
            price: 128,
            count: 0,
            infoimg: ["./image/goods/a1.jpg", "./image/goods/a1.jpg", "./image/goods/a1.jpg"],
            info: "一点心意月饼礼盒，精选优质原料，用心制作，品质保证，让您满意，欢迎来电咨询。",
        }, {
            id: 5,
            image: "./goods/image/b2.jpg",
            href: "./goods/b2.html",
            name: "生日快乐礼盒",
            price: 108,
            count: 0,
            infoimg: ["./image/goods/a1.jpg", "./image/goods/a1.jpg", "./image/goods/a1.jpg"],
            info: "生日快乐礼盒，精选优质原料，用心制作，品质保证，让您满意，欢迎来电咨询。",
        }, {
            id: 6,
            image: "./goods/image/b3.jpg",
            href: "./goods/b3.html",
            name: "一本上海礼盒",
            price: 198,
            count: 0,
            infoimg: ["./image/goods/a1.jpg", "./image/goods/a1.jpg", "./image/goods/a1.jpg"],
            info: "一本上海礼盒，精选优质原料，用心制作，品质保证，让您满意，欢迎来电咨询。",
        }, {
            id: 7,
            image: "./goods/image/g5.jpg",
            href: "./goods/g5.html",
            name: "百業興旺礼盒",
            price: 188,
            count: 0,
            infoimg: ["./image/goods/a1.jpg", "./image/goods/a1.jpg", "./image/goods/a1.jpg"],
            info: "百業興旺礼盒，精选优质原料，用心制作，品质保证，让您满意，欢迎来电咨询。",
        }, {
            id: 8,
            image: "./image/zhuliji.jpg",
            href: "./chat.html",
            name: "联系我们<br>专属定制",
            price: null,
            count: null,
            infoimg: [],
            info: "专属定制",
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
        `;
    const template = Handlebars.compile(source);
    const renderedHtml = template(productData);
    document.querySelector('.goods-list').innerHTML = renderedHtml;

    // 添加点击获取商品id
    document.querySelectorAll('.goods a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 获取被点击商品的 ID
            const id = link.getAttribute('data-id');
            // 根据商品 ID 查找对应的商品信息
            const selectedProduct = productData.goods.find(product => product.id.toString() === id);

            const detailimg=`
                    <img src="{{image}}" style="width: 60%;">
            `;
            const detailImg = Handlebars.compile(detailimg);
            const detailImgRenderedHtml = detailImg(selectedProduct);
            document.querySelector('.goods-img').innerHTML = detailImgRenderedHtml;
            const detailSource = `
                    <div>{{{name}}}</div>
                    {{#each infoimg}}
                    <img src="{{this}}" alt="详情图片">
                    {{/each}}
                    <div>{{{info}}}</div>
            `;
            const detailTemplate = Handlebars.compile(detailSource);
            const detailRenderedHtml = detailTemplate(selectedProduct);
            // 将生成的 HTML 插入到页面中以显示商品详细信息
            document.querySelector('.goods-detail').innerHTML = detailRenderedHtml;
        });
    });
});
