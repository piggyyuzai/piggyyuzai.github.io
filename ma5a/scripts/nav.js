import { createBunnies, canCreateBunnies } from './animation.js'
import { elements, settings } from './elements.js'
import { linkNames } from './data.js'



const triggerIndicatorChange = () => {

  pageBoundaries().forEach((ele, i) => {
    const buffer = 200
    const activateCondition = !elements.windowDivs[i + 1] 
      ? window.scrollY >= ele 
      : window.scrollY >= (ele - buffer) && window.scrollY < (pageBoundaries()[i + 1] - buffer)
    
    activateCondition 
      ? activate(i)
      : deactivate(i)
  })


  if (canCreateBunnies()) createBunnies()
}

const handleScroll = () => !settings.autoscroll && triggerIndicatorChange()

const activate = index =>{
  if (index === settings.activeIndex) return

  settings.activeIndex = index
  elements.navLink[index].classList.add('selected')
  // triggerShuffle({
  //   target: elements.navLink[index], 
  //   text: linkNames[index], 
  //   speed:7 
  // })
}

const deactivate = index => {
  elements.navLink[index].classList.remove('selected')
}

const navigateTo = index => {
  clearTimeout(settings.navTimer)
  settings.autoscroll = true
  if (index === 2) {
    elements.items[0].click()
  } else {
    window.scrollTo({
      top: pageBoundaries()[index],
      behavior: 'smooth'
    })
  }
  deactivate(settings.activeIndex)
  activate(index)
  settings.navTimer = setTimeout(() => {
    settings.autoscroll = false
  }, 1000)
}

const pageBoundaries = () => [...elements.windowDivs].map(ele => ele.getBoundingClientRect().top + window.scrollY)

export {
  handleScroll,
  navigateTo,
  linkNames
}
