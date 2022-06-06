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
  let slides = document.querySelectorAll('.slider__item');
  let index = 0;

  btnRight.addEventListener('click', function () {
    ++index;
    if (index >= slides.length) {
      slides[index - 1].classList.remove('is-active');
      index = 0;
      slides[index].classList.add('is-active');
    } else {
      slides[index - 1].classList.remove('is-active');
      slides[index].classList.add('is-active');
    }
  });

  btnLeft.addEventListener('click', function () {
    --index;
    if (index < 0) {
      index = 0;
      slides[index].classList.remove('is-active');
      index = slides.length - 1;
      slides[index].classList.add('is-active');
    } else {
      slides[index + 1].classList.remove('is-active');
      slides[index].classList.add('is-active');
    }
  });

  // ---------------carousel---------------



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
