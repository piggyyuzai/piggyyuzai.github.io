import { pageBoundaries, portfolio } from './elements.js'
import { toggleHamburger, toggleMenu } from './hamburger.js'
import { currentUrl } from './masonary.js'
import animateLogo from './logo.js'


const navigateTo = e => {
  const index = Number(e.target.dataset.link)
  window.scrollTo({
    top: pageBoundaries()[index],
    left: 0,
    behavior: 'smooth'
  })
  // console.log('navigate to', pageBoundaries()[index])
  toggleMenu()
}

const scrollTrigger = (target,buffer) => {
  const rect = target.getBoundingClientRect()
  return (
    window.scrollY > (rect.top + buffer)
  )
}

const handleScroll = () =>{
  if(!scrollTrigger(portfolio,-500)) return
  animateLogo()
  window.removeEventListener('scroll', handleScroll)
}

//automatically scrolls to subsections of the page
const pageLinks = document.querySelectorAll('.page_link')
pageLinks.forEach(link=>{
  link.addEventListener('click',(e)=>navigateTo(e))
})

const scrollToLocation = () =>{
  const index = Array.from(pageLinks).map(link=>{
    return link.innerHTML
  })
  const location = index.indexOf(currentUrl()) + 1
  if (location !== 0) {
    window.scrollTo({
      top: pageBoundaries()[location],
      left: 0,
      behavior: 'smooth'
    })
  }
}

export {
  handleScroll,
  toggleMenu,
  toggleHamburger,
  scrollToLocation,
}