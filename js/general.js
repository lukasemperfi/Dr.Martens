document.body.onload = function() {
    setTimeout(function(){
        var preloader = document.querySelector('.preloader');
        if (!preloader.classList.contains('done')) {
            preloader.classList.add('done');
        }
    }, 1000);
}

//Выезжающий поиск
let headerSearch = document.querySelector('.header-search.b');
let searchForm = document.querySelector('.search__form.b');

headerSearch.onclick = function() {
    searchForm.classList.toggle('active');
    document.getElementById("myTextFieldB").focus();
};
//Мобильный поиск
let formMobileIcon = document.querySelector('.form-mobile__search-icon');
let formMobile = document.querySelector('.form-mobile__body');
let btnCancel = document.querySelector('.mobile-search__btn-cancel');

formMobileIcon.onclick = function() {
    formMobile.classList.add('active');
    bodyL.classList.add('lock');
};
btnCancel.onclick = function() {
    formMobile.classList.remove('active');
    bodyL.classList.remove('lock');
};

//Бургер
let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.menu');
let bodyL = document.querySelector('body');
burger.onclick = function() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    bodyL.classList.toggle('lock');
};

//Мобильный фильтр
let btnClick = document.querySelectorAll('.btn-click');
let filterOverlay = document.querySelector('.filter__overlay');
let filterSide = document.querySelector('.filter__side');

for (let i = 0; i < btnClick.length; i++) {
    btnClick[i].onclick = function() {
        filterOverlay.classList.toggle('active');
        filterSide.classList.toggle('active');
        bodyL.classList.toggle('lock');
    };
};

//Модальное окно user-sign-in
var userSignIn = document.querySelector('.user-sign-in');
var headerUser = document.querySelector('.header-user');
var userClose = document.querySelector('.user-sign-in__close');

headerUser.onclick = function() {
    userSignIn.style.display = "flex";
    bodyL.classList.toggle('lock');

    userClose.onclick = function() {
        userSignIn.style.display = "none";
        bodyL.classList.toggle('lock');
    }

    window.onclick = function(event) {
        if (event.target == userSignIn) {
            userSignIn.style.display = "none";
            bodyL.classList.toggle('lock');
        }
    }
}

//Показать пароль в форме user-sign-in
let passwordIcon = document.querySelector('.password__icon');
let password = document.querySelector('.password__sign');
let passwordImg = document.querySelector('.password__img');
passwordIcon.onclick = function() {
    if (password.type === 'password') {
        password.type = 'text';
        passwordImg.setAttribute("src", "img/icons/form-user-sign in/view.svg");
    } else {
        password.type = 'password';
        passwordImg.setAttribute("src", "img/icons/form-user-sign in/eye.svg");
    }
}

//Модальное окно корзина
var cartModal = document.querySelector('.cart');
var headerCart = document.querySelector('.header-cart');
var cartClose = document.querySelector('.cart__close');

headerCart.onclick = function() {
    cartModal.style.display = "flex";
    bodyL.classList.toggle('lock');

    cartClose.onclick = function() {
        cartModal.style.display = "none";
        bodyL.classList.toggle('lock');
    }

    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = "none";
            bodyL.classList.toggle('lock');
        }
    }
}

//Переключатель Мужчинам Женщинам
$(document).ready(function() {
    var switchLinks = $('.switch__link');
    switchLinks.on('click', function() {
        switchLinks.removeClass('active');
        $(this).addClass('active');
    });
});

//sub-menu
$(document).ready(function() {
    var menuLinks = $('.menu__link');
    var menuList = $('.menu__list');
    menuLinks.on('click', function() {
        menuLinks.removeClass('active');
        $(this).addClass('active');
        menuList.addClass('active');
    });
});

//sub-sub-menu
$(document).ready(function() {
    var subMenuLinks = $('.sub-menu__link');
    var subMenu = $('.sub-menu');
    subMenuLinks.on('click', function() {
        subMenuLinks.removeClass('active');
        $(this).addClass('active');
        subMenu.addClass('active');
    });
});

//Кнопка меню назад
$(document).ready(function() {
    var btnback = $('.btnback');
    var menuLinks = $('.menu__link');
    var menuList = $('.menu__list');
    var subMenuLinks = $('.sub-menu__link');
    var subMenu = $('.sub-menu');
    btnback.on('click', function() {
        if ($(".menu__list").hasClass("active") && $(".sub-menu").hasClass("active")) {
            subMenuLinks.removeClass('active');
            subMenu.removeClass('active');
        } else {
            menuLinks.removeClass('active');
            menuList.removeClass('active');
        }
    });
});


// Кнопка прокрутки вверх
let upButton = $('.up-button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 200) {
        upButton.addClass('show');
    } else {
        upButton.removeClass('show');
    }
});

upButton.on('click', function(e) {
    $('html, body').animate({ scrollTop: 0 }, '300');
});


//Спойлер футер
$(document).ready(function() {
    $('.info__title').click(function(event) {
        if ($('.info').hasClass('one')) {
            $('.info__title').not($(this)).removeClass('active');
            $('.info__content').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    });
});