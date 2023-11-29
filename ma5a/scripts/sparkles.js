
import { elements } from './elements.js'
import { randomPos, client, px, randomN } from './utils.js'


const blockClasses = ['frame','fadeout','frame','fadeout','fadeout','fadeout_green'] // TODO change class name

const sparkle = e =>{
  if (e.targetTouches || Math.random() > 1 / 4) return  // making the sparkle appear one in three times
  const newDiv = document.createElement('div')
  ;['block', blockClasses[Math.floor(Math.random() * blockClasses.length)]].forEach(className => {
    newDiv.classList.add(className)
  })
  newDiv.style.left = px(randomPos(client(e, 'X')))
  newDiv.style.top = px(randomPos(client(e, 'Y')))
  newDiv.style.opacity = randomN(50) * 0.03
  elements.sparkleWrapper.appendChild(newDiv)

  setTimeout(() => {
    elements.sparkleWrapper.removeChild(newDiv)
  }, randomN(500))
}

export {
  sparkle
}