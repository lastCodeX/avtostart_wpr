//добавление класса для анимации бургера
const headerMnu = document.querySelector('.header__burger-mnu')
const headerNav = document.querySelector('.header__nav')
const bodyFixed = document.querySelector('body')
headerMnu.onclick = () => {
  if(headerMnu.classList.contains('open-mnu')) {
    headerMnu.classList.remove('open-mnu')
    headerNav.classList.remove('open-mnu')
    bodyFixed.classList.remove('fixed-page')
  } else {
    headerMnu.classList.toggle('open-mnu')
    headerNav.classList.toggle('open-mnu')
    bodyFixed.classList.toggle('fixed-page')
  }
}