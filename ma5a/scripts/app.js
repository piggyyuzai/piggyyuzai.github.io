import { elements, settings } from './elements.js'
import { triggerShuffle } from './scramble.js'
import { handleScroll, navigateTo, linkNames } from './nav.js'
import { sparkle } from './sparkles.js'
import { createBunnies, canCreateBunnies } from './animation.js'
import { skills } from './data.js'
import { isInViewport, windowDim } from './utils.js'
import { mapList, hightlightListItem } from './work.js'


function init() {

  setTimeout(()=> {
    const shuffleName = () => triggerShuffle({
      target: elements.name,
      text: 'masahito leo takeuchi',
      speed: 10
    })
    shuffleName()
    
    document.querySelectorAll('.name').forEach(ele => ele.classList.remove('hidden'))
    elements.name.classList.add('display')
    elements.name.addEventListener('mouseenter', shuffleName)
    createBunnies()
  }, 2500)
  

  elements.navLink.forEach((link, i) => link.addEventListener('click', () => navigateTo(i)))

  elements.navLink.forEach((link, i)=>{
    triggerShuffle({ 
      target: link, 
      text: linkNames[i], 
      speed: 7 
    })
  }) 
  elements.navLink[0].classList.add('selected')

  elements.pageTop.addEventListener('click', ()=>{
    navigateTo(0)
    setTimeout(()=>{
      if (canCreateBunnies()) createBunnies()
    }, 1000)
  })

  const mapSkills = ({ target, skills }) =>{
    target.innerHTML = skills.map((skill, i) =>{
      return `
      <div class="skill-div anim" style="animation-delay: ${0.1 + (i * 0.03)}s">
        <img src="./assets/icons/${skill.replace('.','').replace(' ','').toLowerCase()}.svg" alt="${skill}}" />
        <p>${skill}</p>
      </div>  
    `
    }).join('')
  }
  
  mapSkills({
    target: elements.skillDivs[0],
    skills: skills.developmentSkills, 
  })
  
  const scrollAnimationElements = document.querySelectorAll('.anim')
  const scrollAnimationSwitchElements = document.querySelectorAll('.anim_switch')


  const scrollAnimateLoad = () => {
    const switchMargin = 100
    scrollAnimationElements.forEach(ele =>{
      if (windowDim.h() > ele.getBoundingClientRect().top + switchMargin) ele.classList.add('animate')
    })

    scrollAnimationSwitchElements.forEach(ele =>{
      ele.classList[isInViewport(ele) ? 'add' : 'remove']('animate')
    })
    
    if (elements.items && ((window.scrollY + windowDim.h() / 2) > elements.list.getBoundingClientRect().top + window.scrollY)) {
      hightlightListItem()
    } else {
      elements.info.classList.remove('display')
      elements.items.forEach(item => item.classList.remove('selected'))
      settings.selectedWorkIndex = null
    }
    
    elements.pageTop.classList[window.scrollY > windowDim.h() ? 'remove' : 'add']('hide')
    
  }

  mapList(elements.list)

  window.addEventListener('scroll', scrollAnimateLoad)
  window.addEventListener('scroll', handleScroll)
  ;['mousemove', 'touchmove'].forEach(event => elements.sparkleWrapper.addEventListener(event, sparkle))
  
}

window.addEventListener('DOMContentLoaded', init)


