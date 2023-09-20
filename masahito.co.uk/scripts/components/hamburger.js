
import { transition } from './masonary.js'
import { transitionCover, bars, menuCover, menu } from "./elements.js"


const triggerColorChange = bar =>{
  bar.classList.add('color_change')
  setTimeout(()=>{
    bar.classList.remove('color_change')
  },400)
}

const toggleHamburger = ()=>{
  bars.forEach(bar=>{
    bar.classList.toggle('animate')
    triggerColorChange(bar)
  })
}

const toggleHamburgerAndCross = () =>{
  bars.forEach(bar=>{
    !menu.isOpen ?
      bar.classList.add('cross')
      :
      bar.classList.remove('cross')
    triggerColorChange(bar)
  })
}

const removeBlocks = ()=>{
  const blocks = document.querySelectorAll('.block')
  blocks.forEach((block,i)=>{
    block.classList.remove('block')
    block.classList.add('block_close')
    block.style.animationDelay = `${i * 0.05}s`
    setTimeout(()=>{
      transitionCover.removeChild(block)
    },(i * 50) + 400)
  })
}

const toggleMenu = () =>{
  !menu.isOpen ?
    transition('rgb(0, 216, 216)') //! needs to take color from individual page
    :
    removeBlocks()
  toggleHamburgerAndCross()
  menuCover.classList.toggle('open')
  menu.isOpen = !menu.isOpen
}

export {
  toggleHamburger,
  toggleMenu,
}
