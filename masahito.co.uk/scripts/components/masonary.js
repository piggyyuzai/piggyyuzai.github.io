// console.log('masonary')

import { col, portfolio, transitionCover } from "./elements.js"
import images from './database.js'

const currentUrl = () =>{
  const urlArray = window.location.href.split('/')
  const current = urlArray[urlArray.length - 1].split('#')
  return current.length === 2 ?
    current[current.length - 1]
    :
    urlArray[urlArray.length - 1].replace('.html','')
}

const decideColNo = () =>{
  if (window.innerWidth > 0) col.current = 1
  if (window.innerWidth > 400) col.current = 2
  if (window.innerWidth > 600) col.current = 3
  if (window.innerWidth > 800) col.current = 4
  if (window.innerWidth > 1000) col.current = 5
}
  
const loadImage = classToAdd => {
  const cols = Array(col.current).fill('')
  portfolio.innerHTML = cols.map(()=>{
    return `
        <div class="col" style="width:${100 / col.current}%;" >
        </div>
      `
  }).join('')
    
  let count = 0
  const colDivs = document.querySelectorAll('.col')
  colDivs.forEach((colDiv, i)=>{
    colDiv.innerHTML = images.filter(img=> img.url !== currentUrl()).map((img,x)=>{   
      if ((x - count) % col.current !== 0) return  //ensures correct image appear in each col
      return `
        <div class="box ${classToAdd}" style="animation-delay: ${(i + 1) * 0.1}s;">
          <a href="/pages/${img.url}.html">
            <img class="link" data-url="${img.url}" ${img.color ? 'data-color=' + img.color : '' } src="/img/th/${img.thumb}" alt="${img.alt}" />
          </a>  
        </div> 
        `
    }).join('')
    count++
  })
}

const transition = color =>{
  const blockNo = Math.ceil(transitionCover.offsetHeight / 150)
  for (let i = 0; i < blockNo; i++){
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.backgroundColor = `${color}`
    block.style.animationDelay = `${i * 0.05}s`
    transitionCover.appendChild(block)
  }
}

const resize = () =>{
  decideColNo()
  if (col.prev === col.current) return
  portfolio.innerHTML = ''
  loadImage('animate') 
  col.prev = col.current
}



export {
  currentUrl,
  decideColNo,
  resize,
  loadImage,
  transition,
}

