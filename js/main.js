var cart = {}; // корзина
$('document').ready(function() {
    loadGoods();
    loadCart();
    loadIconCount();
    init();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function(data) {
        var out = '';
        for (var key in data) {
            out += `<div class="card">`;
            out += `<a class="card__link-image" href="product-card.html#${key}">`;
            out += `<div class="card__image">`;
            out += `<img class="card__picture" data-imgId="${key}" src="${data[key].image}" alt="">`;
            out += `</div>`;
            out += `</a>`;
            out += `<a class="card__link-title" href="product-card.html#${key}">`;
            out += `<div class="card__title">${data[key].name}</div>`;
            out += `</a>`;
            out += `<div class="card__price">${data[key].cost} грн</div>`;
            out += `<button type="button" class="card__add-cart" data-id="${key}"></button>`;
            out += `</div>`;
        }
        $('.cards__row').html(out);
        loadMore();
        PictureAdd();
        // addFilterClass();
        $('.card__add-cart').on('click', addToCart);

        // Ховэр товара
        function PictureAdd() {
            let imgId;
            let img1;
            let img2;

            $(".card__picture").hover(function() {
                imgId = $(this).attr('data-imgId');
                img2 = data[imgId].image1;
                $(this).attr("src", img2);
            }, function() {
                imgId = $(this).attr('data-imgId');
                img1 = data[imgId].image;
                $(this).attr("src", img1);
            });

        }


    })
}

function addToCart() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
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

//Спойлер фильтр
$(document).ready(function() {
    $('.filter__title').click(function(event) {
        $(this).toggleClass('active').next().slideToggle(300);
    });
});

// Кнопка показать еще
function loadMore() {
    $(".card").slice(0, 9).show();
    $("#loadMore").on("click", function(e) {
        $(".card:hidden").slice(0, 3).slideDown();
        if ($(".card:hidden").length == 0) {
            $("#loadMore").addClass('hide');
        }
    });
};