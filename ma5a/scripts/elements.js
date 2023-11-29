
  const elements = {
    wrapper: document.querySelector('.wrapper'),
    sparkleWrapper: document.querySelector('.sparkle'),
    name: document.querySelector('.name'),
    indicator: document.querySelector('.data-indicator'),
    navIndicators: document.querySelectorAll('.indicator'),
    nav: document.querySelector('nav'),
    navLink: document.querySelectorAll('.link'),
    windowDivs: document.querySelectorAll('.window'),
    pageTop: document.querySelector('.page-top-nav'),
    skillDivs: document.querySelectorAll('.skill'),
    list: document.querySelector('.list'),
    info: document.querySelector('.info-wrapper'),
    items: null,
  }

  const settings = {
    autoscroll: null,
    navTimer: null,
    activeIndex: 0,
    selectedWorkIndex: null,
  }


  const bunnySvg = color => `<path d="M 117 12 h 2 v 1 h 1 v 2 h -1 v 1 h -1 v 1 h 1 v -1 h 1 v -1 h 4 v 1 h 1 v 2 h -1 v 1 h -2 v 1 h 5 v -1 h 2 v 1 h 1 v 8 h -1 v 3 h -1 v 1 h -2 v -2 h -2 v -1 h -1 v -1 h -2 v -1 h -5 v 1 h -5 v -2 h 1 v -1 h -1 v 1 h -3 v -2 h 1 v -1 h -1 v -5 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1"/> <path d="M 162 12 h 2 v 5 h -1 v 1 h 1 v -1 h 1 v -3 h 1 v -1 h 2 v 1 h 1 v 4 h -1 v 1 h -1 v 1 h 1 v -1 h 2 v -1 h 3 v -1 h 3 v 3 h 1 v 1 h 1 v 3 h 1 v 1 h 1 v 2 h -3 v -1 h -3 v 1 h -7 v 1 h -5 v 1 h -1 v 1 h -3 v 1 h -2 v -2 h 1 v -2 h -1 v -4 h 1 v -3 h 1 v -1 h 1 v -1 h 1 v -3 h 1 v -2 h 1 v -1"/> <path d="M 20 16 h 2 v 1 h 1 v 2 h -1 v 2 h -1 v 1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 2 v 1 h 1 v 4 h -1 v 1 h -1 v 1 h -1 v 1 h 1 v -1 h 5 v -1 h 2 v 1 h 1 v 3 h 1 v 2 h 1 v 2 h -1 v 2 h -1 v 1 h -5 v 1 h -2 v -1 h -1 v -1 h -2 v 1 h -3 v 1 h -2 v -2 h -1 v 1 h -4 v -2 h 1 v -1 h -2 v -1 h -1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 2 v -2 h 1 v -3 h 1 v -1 h 1 v -1"/> <path d="M 261 16 h 2 v 1 h 1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h 1 v -1 h 1 v -1 h 2 v -1 h 3 v 1 h 1 v 2 h -1 v 1 h -2 v 1 h 6 v 1 h 1 v -1 h 2 v 1 h 1 v 3 h -1 v 3 h -1 v 2 h -1 v 1 h -1 v 1 h -7 v -1 h -2 v 1 h -4 v -1 h 1 v -1 h -1 v 1 h -1 v 1 h -4 v -1 h 1 v -1 h 1 v -1 h -1 v -1 h -2 v -1 h -1 v -2 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1"/> <path d="M 70 17 h 2 v 1 h 1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v 1 h 1 v 3 h -1 v 1 h -1 v 1 h -1 v 2 h 5 v -1 h 2 v 1 h 1 v 3 h 1 v 4 h -1 v 2 h -10 v -1 h -3 v 1 h -3 v -1 h -1 v 1 h -3 v -2 h 1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 2 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1"/> <path fill="${color}" d="M 113 20 h 1 v 2 h -1 v -2"/> <path d="M 121 21 h 1 v 1 h -1 v -1"/> <path d="M 213 21 h 2 v 2 h 1 v -1 h 4 v 2 h -1 v 1 h 4 v 1 h 3 v 1 h 1 v 3 h 1 v 3 h -2 v 1 h -5 v 1 h -3 v -1 h -2 v 1 h -6 v -1 h -5 v -1 h -1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1"/> <path fill="${color}" d="M 161 23 h 1 v 2 h -1 v -2"/> <path fill="${color}" d="M 18 27 h 1 v 2 h -1 v -2"/> <path fill="${color}" d="M 67 27 h 1 v 2 h -1 v -2"/> <path fill="${color}" d="M 258 27 h 1 v 2 h -1 v -2"/> <path fill="${color}" d="M 211 29 h 1 v 2 h -1 v -2"/>`


  const blockNo = () => {
    const defaultNo = Math.round((elements.wrapper.clientWidth * elements.wrapper.clientHeight) / (600 * 600))
    return defaultNo < 5 ? 5 : defaultNo
  }

export {
  elements,
  settings,
  bunnySvg,
  blockNo,
}