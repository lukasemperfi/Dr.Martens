var cart = {}; // корзина
$('document').ready(function() {
    loadSliderGoods();
    loadCart();
    loadIconCount();
    init();
});

function loadSliderGoods() {
    //загружаю  фото товаров на страницу
    var hash = window.location.hash.substring(1);

    $.getJSON('goods.json', function(data) {
        var out = '';
        var outB = '';
        var outSmallImage = '';
        var outColor = '';
        //Добавляю слайды в маленький слайдер
        out += `<div class="sliderMin__item"><img src="${data[hash].image}" alt=""></div>`;
        out += `<div class="sliderMin__item"><img src="${data[hash].image1}" alt=""></div>`;
        out += `<div class="sliderMin__item"><img src="${data[hash].image2}" alt=""></div>`;
        out += `<div class="sliderMin__item"><img src="${data[hash].image3}" alt=""></div>`;
        out += `<div class="sliderMin__item"><img src="${data[hash].image4}" alt=""></div>`;
        //Добавляю слайды в большой слайдер
        outB += `<div class="sliderBig__item"><img src="${data[hash].image}" alt=""></div>`;
        outB += `<div class="sliderBig__item"><img src="${data[hash].image1}" alt=""></div>`;
        outB += `<div class="sliderBig__item"><img src="${data[hash].image2}" alt=""></div>`;
        outB += `<div class="sliderBig__item"><img src="${data[hash].image3}" alt=""></div>`;
        outB += `<div class="sliderBig__item"><img src="${data[hash].image4}" alt=""></div>`;

        // Добавляю маленькую картинку в характеристики товара
        outSmallImage += `<img src="${data[hash].image}" alt="">`;

        // Добавляю цвет в характеристики товара
        outColor += `Цвет: <span>${data[hash].color}</span>`;

        $('.sliderMin').html(out); //Вывожу слайды в маленький слайдер
        $('.sliderBig').html(outB); //Вывожу слайды в большой слайдер
        $('.product-info__image').html(outSmallImage); //Вывожу изображение в характеристики товара
        $('.product-info__color').html(outColor); //Вывожу цвет в характеристики товара

        //Подключаю слайдеры
        $('.sliderBig').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: ".sliderMin",
            responsive: [{
                breakpoint: 690,
                settings: {
                    arrows: false,
                    dots: true,
                }
            }, ]
        });
        $('.sliderMin').slick({
            slidesToShow: 4,
            vertical: true,
            verticalSwiping: true,
            asNavFor: ".sliderBig",
            focusOnSelect: true,
        });
        $('.add-cart').on('click', addToCart);
    })

    function addToCart() {
        //добавляем товар в корзину
        var id = hash;
        if (cart[id] == undefined) {
            cart[id] = 1; //если в корзине нет товара - делаем равным 1
        } else {
            cart[id]++; //если такой товар есть - увеличиваю на единицу
        }
        showMiniCart();
        addIconCount();
        showCart();
        saveCart();
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        var out = '<div class="cart__product-title">Корзина пуста</div>';
        $('.cart__body-modal').html(out);

    } else {
        $.getJSON('goods.json', function(data) {
            var goods = data;
            var outM = '';
            for (var id in cart) {
                var price = cart[id] * goods[id].cost;
                var sumPrice = price.toLocaleString();

                // Вывожу разметку в корзину модального окна
                outM += `<div class="cart__row-modal">`;
                outM += `<div class="cart__col">`;
                outM += `<div class="cart__delete" data-id="${id}">`;
                outM += `<img src="img/icons/cart/trash.svg" alt="">`;
                outM += `</div>`;
                outM += `</div>`;
                outM += `<div class="cart__col">`;
                outM += `<div class="cart__image">`;
                outM += `<img src="${goods[id].image}">`;
                outM += `</div>`;
                outM += `</div>`;
                outM += `<div class="cart__col">`;
                outM += `<div class="cart__details">`;
                outM += `<div class="cart__product-title">${goods[id].name}</div>`;
                outM += `<p class="cart__product-color">Размер: 41</p>`;
                outM += `<p class="cart__product-size">Цвет: Black</p>`;
                outM += `</div>`;
                outM += `</div>`;
                outM += `<div class="cart__col">`;
                outM += `<div class="cart__quantity quantity">`;
                outM += `<button class="quantity__btn minus" data-id="${id}" type="button" name="quantity-button"></button>`;
                outM += `<input type="text" class="total inputM" name="name" value="${cart[id]}" data-price="${goods[id].cost}" autocomplete="chrome-off">`;
                outM += `<button class="quantity__btn plus" data-id="${id}" type="button" name="quantity-button"></button>`;
                outM += `</div>`;
                outM += `</div>`;
                outM += `<div class="cart__col">`;
                outM += `<div class="cart__price" >${sumPrice} грн</div>`;
                outM += `</div>`;
                outM += `</div>`;

            }
            $('.cart__body-modal').html(outM);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.cart__delete').on('click', delGoods);
            init();


            function plusGoods() {
                var articul = $(this).attr('data-id');
                cart[articul]++;
                saveCart(); //сохраняю корзину в localStorage
                plusIconCount();
                showCart();
                showMiniCart();
            }

            function minusGoods() {
                var articul = $(this).attr('data-id');
                if (cart[articul] > 1) {
                    cart[articul]--;
                } else {
                    delete cart[articul];
                }
                saveCart(); //сохраняю корзину в localStorage
                minusIconCount();
                showCart();
                showMiniCart();
                init();
            }

            function delGoods() {
                //удаляем товар из корзины
                var articul = $(this).attr('data-id');
                // удаляем колл из иконки
                var countValue = localStorage.getItem('iconCount');
                var minusCartValue = countValue - cart[articul];
                localStorage.setItem('iconCount', minusCartValue);
                var iconCount = document.querySelector('.header-cart__count');
                iconCount.textContent = minusCartValue;
                // удаляем колл из иконки
                delete cart[articul];
                saveCart(); //сохраняю корзину в localStorage
                showCart();
                showMiniCart();
                init();
            }

        });
    }
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function showMiniCart() {
    //показываю мини корзину
    if (!isEmpty(cart)) {
        $('.header-cart__count').removeClass('show');
    } else {
        $('.header-cart__count').addClass('show');
    }
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
        showMiniCart();
    } else {
        var out = '<div class="cart__product-title">Корзина пуста</div>';
        $('.cart__body-modal').html(out);
    }
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}

function addIconCount() {
    //Добавляю счетчик на иконки корзины
    let iconCount = document.querySelector('.header-cart__count');
    let countValue;
    iconCount.textContent++;
    countValue = iconCount.textContent;
    localStorage.setItem('iconCount', countValue);
}

function loadIconCount() {
    //проверяю есть ли в localStorage запись iconCount(числа в счетчике)
    if (localStorage.getItem('iconCount')) {
        // если есть - расширфровываю и записываю в переменную cart
        let iconCount = document.querySelector('.header-cart__count');
        var countValue = localStorage.getItem('iconCount');
        iconCount.textContent = countValue;
        // $('.header-cart__count').text(countValue);
    }
}

function plusIconCount() {
    //Добавляю счетчик плюс на иконку корзины
    let iconCount = document.querySelector('.header-cart__count');
    let numberCount;
    iconCount.textContent++;
    numberCount = iconCount.textContent;
    localStorage.setItem('iconCount', numberCount);
}

function minusIconCount() {
    //Добавляю счетчик минус на иконку корзины
    let iconCount = document.querySelector('.header-cart__count');
    let numberCount;
    iconCount.textContent--;
    numberCount = iconCount.textContent;
    localStorage.setItem('iconCount', numberCount);
}

const init = () => {
    // Считаю итоговую сумму
    let totalCostModal = 0;

    document.getElementById('total-price-modal').textContent = totalCostModal;

    // Итоговая сумма для корзины модального окна
    [...document.querySelectorAll('.cart__row-modal')].forEach((cartRowModal) => {
        totalCostModal += Number(cartRowModal.querySelector('.inputM').value) * Number(cartRowModal.querySelector('.inputM').dataset.price);
    });

    document.getElementById('total-price-modal').textContent = totalCostModal.toLocaleString() + ' грн';

};

// Табы карты продукта
const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if (!currentBtn.classList.contains('active')) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });

            tabsItems.forEach(function(item) {
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    });
}
document.querySelector('.tabs__nav-btn').click();



//Выбор размера обуви
$('document').ready(function() {
    var sizeOption = $('.size__option');
    sizeOption.on('click', function() {
        sizeOption.removeClass('active');
        $(this).addClass('active');
    });
});