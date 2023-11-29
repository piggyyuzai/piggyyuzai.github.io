import { elements, bunnySvg, blockNo } from './elements.js'
import { px, setStyles, randomN, isCompletelyOutsideView, isInViewport } from './utils.js'

const svgWrapper = ({ color, frameNo, content, size }) => {
  return `
  <div class="svg-wrapper" style="width:${100 * (frameNo || 1)}%;">
    <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ${size * (frameNo || 1)} ${size}" fill="${color || 'black'}">${content}</svg>
  </div>
`
}

const canCreateBunnies = () => {
  return isInViewport(elements.name, 200) && elements.wrapper.childNodes.length - 4 < blockNo()
}

const animateCell = ({ target, frameSize, start, end, data, speed }) => {
  const startFrame = start || 0
  let i = startFrame

  clearInterval(data.interval)
  data.interval = setInterval(()=> {
    if (isCompletelyOutsideView(data.bunny, data.size * 1.5)) { 
      elements.wrapper.removeChild(data.bunny)
      clearInterval(data.interval)
      if (canCreateBunnies()) createBunny()
    } else if (data.count === data?.end)  {
      clearInterval(data.interval)
      
      const hopNumber = randomN(5) 
      data.end = (hopNumber * 5) + 1
      data.count = 0
      data.direction = null
      animateBunny({ data, hopNumber, delay: randomN(6) * 500})
      return
    }
    data.count++
    target.style.transform = data?.direction === 'left'
      ? `translateX(-${px((data.count === data?.end ? data.finalFrame : i ) * frameSize)})`
      : `translateX(-${px((data.count === data?.end + 1 ? data.finalFrame : i ) * frameSize)})`
    i = i >= end
      ? startFrame
      : i + 1
  }, speed || 200)
}

const animateBunny = ({ data, hopNumber, delay }) => {
  const { bunny, x, y, sizeFactor } = data 
  if (!data.direction) data.direction = randomN(2) > 1 ? 'left' : 'right'

  setTimeout(()=> {
    bunny.style.transition = `${((90 * (hopNumber * 5))) / 900}s`

    bunny.childNodes[1].childNodes[1].classList[data.direction === 'right' ? 'add' : 'remove']('flip') // adding class to svg
    // how much the bunny moves
    const nextX = x + (50 * sizeFactor) * hopNumber * (data.direction === 'left' ? -1 : 1)

    setStyles({
      target: bunny,
      x: nextX, y,
    })
    data.x = nextX


    animateCell({
      target: bunny.childNodes[1],
      end: 4, 
      data,
      frameSize: data.size,
      speed: 90,
    })
  }, delay)
}

const createBunny = () => {
  const { innerHeight, innerWidth } = window
  const bunny = document.createElement('div')
  const sizeFactor = randomN(2, 1)
  const size = 48 * sizeFactor
  const direction = randomN(2) > 1 ? 'left' : 'right'
  const x = direction === 'left' ? innerWidth : -size
  const y = 100 + randomN(innerHeight - 100) - size // 100 prevents overlap with nav
  bunny.classList.add('bunny')
  bunny.innerHTML = svgWrapper({
    content: bunnySvg('#f5f5f5'),
    frameNo: 6, size: 48, // this is the actual frame no
    color: 'black',
  })
  const hopNumber = randomN(5) 
  const bunnyData = {
    interval: null,
    count: 0,
    end: (hopNumber * 5) + 1,
    finalFrame: 5,
    x, y,
    sizeFactor,
    size,
    direction,
    bunny,
  }
  // bunny.style.setProperty('--bunny-x', x)

  setStyles({
    target: bunny,
    w: size, h: size,
    x, y
  })
  bunny.style.zIndex = y + size
  animateBunny({ data: bunnyData, hopNumber, delay: 100})
  elements.wrapper.appendChild(bunny)
}

const createBunnies = () => new Array(blockNo()).fill('').forEach(_a => createBunny())



export {
  svgWrapper,
  animateCell,
  animateBunny,
  createBunny,
  createBunnies,
  canCreateBunnies
}