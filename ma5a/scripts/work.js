import { elements, settings } from './elements.js'
import { works } from './data.js'
import { windowDim } from './utils.js'


const populateWorkInfo = i => {
  if (!works[i]) {
    elements.info.childNodes[1].innerHTML = ''
    return
  }

  elements.info.childNodes[1].innerHTML = `
    <div class="thumb">
      <img src="assets/works/${works[i].img}" alt="${works[i].img.replaceAll('_',' ').replace('.png','')}">
    </div>
    <div class="info-text">
      ${works[i]?.info ? `<p>${works[i].info}</p>` : ''}
      <p><a href="${works[i].url}" target="_blank">project link</a> ${works[i]?.readme ? `| <a href="${works[i].readme}" target="_blank">readme</a>` : ''}</p>
    </div>
    `
}

const scrollToItemPos = (target, i) => {
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - (windowDim.h() / 3) - (target.getBoundingClientRect().height / 2),
    behavior: "smooth",
  })
}

const mapList = target => {
  target.innerHTML = works.map(work => `<div class="item">${work.img.replaceAll('_',' ').replace('.png','')}</div>`).join('')

  elements.items = document.querySelectorAll('.item')
  elements.items.forEach((item, i) => {
    item.addEventListener('click', ()=> scrollToItemPos(item, i))
  })
}

const hightlightListItem = () => {
  const pageBoundaries = () => [...elements.items].map(ele => ele.getBoundingClientRect().top + window.scrollY)

  let activeIndex = 0
  while ((window.scrollY + (windowDim.h() / 3)) > pageBoundaries()[activeIndex]) activeIndex++
  if (settings.selectedWorkIndex !== activeIndex) {
    elements.info.classList.add('display')
    settings.selectedWorkIndex = activeIndex
    pageBoundaries().forEach((_, i) => {
      elements.items[i].classList[activeIndex === i  ? 'add' : 'remove']('selected')  
    })
    populateWorkInfo(activeIndex)
  }
}


export {
  mapList,
  populateWorkInfo,
  hightlightListItem,
}
