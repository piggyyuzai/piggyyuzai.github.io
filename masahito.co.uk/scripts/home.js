import {
  renderText,
  createMainLetterClones,
  createOtherLetterClones,
  animateLetterClones,
  swapLastWord,
  repositionLetterClones,
  triggerTextAnimation,
  changeWord,
} from './components/heroIntro.js'

import { toggleHamburger, toggleMenu } from './components/hamburger.js'
import { handleScroll, scrollToLocation } from './components/scroll.js'
import { decideColNo, resize, loadImage } from './components/masonary.js'
import { portfolio, col, hamburger } from './components/elements.js'

function init() {
  
  //* hero text animation
  window.addEventListener('scroll', triggerTextAnimation)

  renderText()
  createMainLetterClones()
  createOtherLetterClones()

  window.addEventListener('resize',()=>{
    repositionLetterClones('letter', 'main_sentence')
  })

  // only trigger text animation when on top of page
  setTimeout(()=>{
    if (window.scrollY > 50) return
    window.removeEventListener('scroll',triggerTextAnimation)
    changeWord()
    animateLetterClones('main_sentence', 'letter', true)

    setInterval(()=>{
      swapLastWord()
    },1000 * 7)

  },100)


  //* setup
  col.prev = col.current
  decideColNo()
  portfolio.innerHTML = ''
  loadImage('animate') 
  
  //* scroll
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('load', ()=>{
    scrollToLocation()
  })
  
  //* resize
  window.addEventListener('resize', resize)

  //* hamburger
  hamburger.addEventListener('click', toggleMenu)
  hamburger.addEventListener('mouseover', toggleHamburger)
  hamburger.addEventListener('mouseleave', toggleHamburger)

}

window.addEventListener('DOMContentLoaded', init)



