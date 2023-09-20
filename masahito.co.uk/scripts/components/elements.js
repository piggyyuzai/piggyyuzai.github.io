const logo = document.querySelectorAll('.logo')
const transitionCover = document.querySelector('.transition_cover')
const innerMenu = document.querySelector('.inner_menu')
const windowDivs = document.querySelectorAll('.window')

const pageBoundaries = () =>{
  const buffer = window.scrollY ? window.scrollY : 0
  return Array.from(windowDivs).map(window=>{
    return window.getBoundingClientRect().top + buffer - 60
  })
}

const portfolio = document.querySelector('.portfolio_wrapper')
const col = {
  current: null,
  prev: null,
}

const menu = {
  isOpen: false
}
const hamburger = document.querySelector('.hamburger')
const bars = document.querySelectorAll('.bar')
const menuCover = document.querySelector('.menu_cover')

export {
  logo,
  transitionCover,
  innerMenu,
  windowDivs,
  pageBoundaries,
  portfolio,
  hamburger,
  bars,
  menuCover,
  col,
  menu,
}


// todo debug
// console.log('pageBoundaries', pageBoundaries())

// const indicator = document.querySelector('.indicator')
// window.addEventListener('scroll',()=>{
//   indicator.innerHTML = window.scrollY
// })