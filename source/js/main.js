import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  let settingsList = document.querySelectorAll('[data-time-settings]');
  let contentList = document.querySelectorAll('[data-list]');

  function removeClass(array) {
    array.forEach((element) => {
      element.classList.remove('is-active');
    });
  }

  settingsList.forEach((setting) => {
    setting.addEventListener('click', function (e) {
      e.preventDefault();
      if (!setting.classList.contains('is-active')) {
        removeClass(settingsList);
        removeClass(contentList);
        let chooseSetting = e.target;
        let chooseSettingValue = chooseSetting.dataset.timeSettings;
        let choosenContent = document.querySelector('[data-list="' + chooseSettingValue + '"]');
        choosenContent.classList.add('is-active');
        chooseSetting.classList.add('is-active');
      }
    });
  });

  // -----------------slider---------------

  let btnRight = document.querySelector('.slider__button--next');
  let btnLeft = document.querySelector('.slider__button--previous');
  btnLeft.disabled = true;
  let slides = document.querySelectorAll('.slider__item');

  btnRight.addEventListener('click', function () {
    let index = Array.from(slides).findIndex((slide) => {
      return slide.classList.contains('is-active');
    });
    if (index === slides.length - 2) {
      btnRight.disabled = true;
    }
    slides[index].classList.remove('is-active');
    slides[index + 1].classList.add('is-active');
    btnLeft.disabled = false;
  });

  btnLeft.addEventListener('click', function () {
    let index = Array.from(slides).findIndex((slide) => {
      return slide.classList.contains('is-active');
    });
    if (index === 1) {
      btnLeft.disabled = true;
    }
    slides[index].classList.remove('is-active');
    slides[index - 1].classList.add('is-active');
    btnRight.disabled = false;
  });

  // ---------------carousel---------------
  const carousel = document.querySelector('.trainers__list');
  const carouselElement = document.getElementsByClassName('trainers__item');

  const nextItem = document.querySelector('.trainers__button--next');
  const prvItem = document.querySelector('.trainers__button--previous');

  nextItem.addEventListener('click', function () {
    if (innerWidth > 1999 && carouselElement.length > 4) {
      let elment = carouselElement[0];
      elment.remove();
      carousel.appendChild(elment);
    }
    if (innerWidth > 767 && innerWidth <= 1999 && carouselElement.length > 2) {
      let elment = carouselElement[0];
      elment.remove();
      carousel.appendChild(elment);
    }
    if (innerWidth <= 767 && carouselElement.length > 1) {
      let elment = carouselElement[0];
      elment.remove();
      carousel.appendChild(elment);
    }
  });

  prvItem.addEventListener('click', function () {
    if (innerWidth > 1999 && carouselElement.length > 4) {
      let elment = carouselElement[carouselElement.length - 1];
      elment.remove();
      carousel.insertAdjacentElement('afterbegin', elment);
    }
    if (innerWidth > 767 && innerWidth <= 1999 && carouselElement.length > 2) {
      let elment = carouselElement[carouselElement.length - 1];
      elment.remove();
      carousel.insertAdjacentElement('afterbegin', elment);
    }
    if (innerWidth <= 767 && carouselElement.length > 1) {
      let elment = carouselElement[carouselElement.length - 1];
      elment.remove();
      carousel.insertAdjacentElement('afterbegin', elment);
    }
  });

  // --------- form check -----------
  const form = document.querySelector('form');
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', function () {
    if (phoneInput.validity.patternMismatch) {
      phoneInput.setCustomValidity('Пожалуйста, введитие цифры номера');
    } else {
      phoneInput.setCustomValidity('');
    }
    phoneInput.reportValidity();
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (phoneInput.value.length < 10) {
      phoneInput.setCustomValidity('Пожалуйста, введитие от 10 цифр');
      phoneInput.reportValidity();
    } else {
      phoneInput.setCustomValidity('');
      form.submit();
    }
  });

  // ---------------video--------------
  const videoContainer = document.querySelector('.description__youtube-frame');
  const videoButton = document.querySelector('.description__video-button');

  videoButton.addEventListener('click', function () {
    videoContainer.innerHTML = '<iframe width="364" height="228" src="https://www.youtube.com/embed/9TZXsZItgdw?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    videoButton.style.display = 'none';
  });

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
