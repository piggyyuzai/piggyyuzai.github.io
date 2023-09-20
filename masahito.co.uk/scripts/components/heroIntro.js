
const intro = document.querySelector('.intro')
const heroCover = document.querySelector('.hero_cover')
const bio = document.querySelector('.bio')
const letter = {
  color: 'white',
  brightness: 100,
  opacity: 1,
}

const text = {
  intro: 'Hi, I\'m piggyyuzai. I',
  otherTexts: [
    'I code.',
    'I illustrate.',
    'I animate.',
    'I dream.',
    'I experiment.'
  ],
  index: 0,
  current: 'I code.'
}

const colors = [
  '#ff4fa1',
  'rgb(106, 241, 235)',
  'rgb(247, 221, 78)',
  // 'rgb(135, 241, 106)',
  // 'rgb(167,106,241)'
]

const timers = {
  one: null,
  two: null,
  three: null,
  four: null,
}

const adjustedRandomNumbers = Array(100).fill('').map((_num,i)=>i + 1).filter(num => num < 40 || num > 50)
const adjustedRandomY = () =>{
  return adjustedRandomNumbers[Math.floor(Math.random() * adjustedRandomNumbers.length)]
}

const mapLetters = (word,className) =>{
  return word.split('').map(letter=>{
    return `
      <div class='letter_all ${className} ${letter === ' ' ? 'blank' : ''}'>
        ${letter}
      </div>
    `
  }).join('')
}

const recordPos = target =>{
  const targets = document.querySelectorAll(`.${target}`)
  return [...targets].map(ele=>{
    const pos = ele.getBoundingClientRect()
    const buffer = window.scrollY ? window.scrollY : 0
    return {
      x: pos.x,
      y: pos.y + buffer,
      height: pos.height,
      width: pos.width
    }
  })
}

const reformatToClassName = text =>{
  return text.replace('.','text').replace(' ','')
}

const renderText = () =>{
  const words = text.intro.split(' ').map((word,i)=>{
    const className = i < (text.intro.split(' ').length - 1) ?
      'letter'
      :
      'letter_last'
    return `
      <div class="word">
        ${mapLetters(word,className)}
      </div>
    `
  }).join('')
  intro.innerHTML = words
}

const clonedLetters = (letters, className) =>{
  return letters.map((clone, i)=>{
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const occurence = letters.map((ele, i)=> ele === clone ? i : null).filter(ele => ele || ele === 0)
    return `
      <div class="small ${className} ${clone === ' ' ? 'blank' : ''}"
        id="${clone}_${occurence.indexOf(i) + 1}"
        style="
        left:${Math.ceil(Math.random() * 100)}%; 
        top:${adjustedRandomY()}%;
        color:${randomColor};
        filter: brightness(${letter.brightness}%);
        opacity:${letter.opacity} 
        "
      >
        ${clone}
      </div>
    `
  }).join('')
}

const createMainLetterClones = () =>{
  const finalWordRemoved = text.intro.split(' ').filter((_word,i)=>{
    return i !== (text.intro.split(' ').length - 1)
  }).join(' ')
  const textBlankRemoved = finalWordRemoved.split('').filter(letter => letter !== ' ')
  heroCover.innerHTML = clonedLetters(textBlankRemoved,'clone main_sentence')
}

const createOtherLetterClones = () =>{
  const clone = text.otherTexts.reduce((acc, text) =>{
    return acc + clonedLetters(text.split(''),`${reformatToClassName(text)} clone`)
  },heroCover.innerHTML)
  heroCover.innerHTML = clone
}

const changeColor = (target,index) =>{
  target[index].style.color = letter.color
  if (index >= (target.length - 1)) return
  setTimeout(()=>{
    changeColor(target, index + 1)
  },30)
}

const clearTimers = ()=>{
  clearTimeout(timers.one)
  clearTimeout(timers.two)
  clearTimeout(timers.three)  
  clearTimeout(timers.four)
}

const animateLetterClones = (targets, posClass, carryOn) =>{
  const clones = document.querySelectorAll(`.${targets}`)
  const targetPos = recordPos(posClass)
  const delay = 50

  clones.forEach(clone=> {
    clone.style.transition = '2.5s'
    clone.classList.add('current')
  })
  clones.forEach((clone,i)=>{
    timers.one = setTimeout(()=>{
      clone.classList.add('hop')
      clone.style.filter = 'brightness(100%)'
      // clone.style.fontSize = '40px'
      clone.classList.remove('small')
      clone.style.opacity = 1
      clone.style.left = `${targetPos[i].x}px`
      clone.style.top = `${targetPos[i].y}px`
    },i * delay)  

    timers.two = setTimeout(()=>{
      clone.classList.remove('hop')
      clone.classList.add('stop_hop')
      clone.style.transition = '0.5s'
    },(i * delay) + 2000)

    timers.three = setTimeout(()=>{
      clone.classList.remove('stop_hop')
    },(i * delay) + 2300)
  })
  
  timers.four = setTimeout(()=>{
    changeColor(clones,0)
    if (carryOn) animateLetterClones(reformatToClassName(text.current), 'letter_last', false)
  },(clones.length * delay) + 2300)
  
}

const swapLastWord = () =>{
  const currentLastLetters = document.querySelectorAll(`.${reformatToClassName(text.current)}`)
  currentLastLetters.forEach(letter=>{
    letter.classList.remove('current')
    letter.classList.add('hop')
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    Object.assign(letter.style, {
      left:`${Math.ceil(Math.random() * 100)}%`,
      top:`${adjustedRandomY()}%`,
      color: randomColor,
      opacity: letter.opacity,
      transition: '2.5s',
      filter: `brightness(${letter.brightness}%)`,
    })
    // letter.style.fontSize = '20px'
    letter.classList.add('small')

    setTimeout(()=>{
      letter.classList.remove('hop')
      letter.classList.add('stop_hop') 
    },1500)

    setTimeout(()=>{
      letter.classList.remove('stop_hop')
    },1800)
  })

  setTimeout(()=>{
    changeWord()  
  },1500)

  setTimeout(()=>{
    animateLetterClones('main_sentence', 'letter', false) //* this bit animates the 'Hi I'm Masahito bit
    animateLetterClones(reformatToClassName(text.current), 'letter_last', false)
  },1800)
}


const repositionLetterClones = (posTarget, target) =>{
  clearTimers()
  const targetPos = recordPos(posTarget)
  const clones = document.querySelectorAll(`.${target}`)
  clones.forEach(clone=>{
    clone.classList.remove('hop')
    clone.style.transition = '2s'
  })

  timers.one = setTimeout(()=>{
    clones.forEach((clone,i)=>{
      clone.classList.add('hop')
      clone.style.left = `${targetPos[i].x}px`
      clone.style.top = `${targetPos[i].y}px`
    })
  },100)

  timers.two = setTimeout(()=>{
    clones.forEach(clone=>{
      clone.classList.remove('hop')
      clone.classList.add('stop_hop')
    })
  },1500)

  timers.three = setTimeout(()=>{
    clones.forEach(clone=>{
      clone.classList.remove('stop_hop')
    })
    changeColor(clones,0)
  },1800)
}


const changeWord = () => {
  text.index = text.index === (text.otherTexts.length - 1) ? 0 : text.index + 1
  text.current = text.otherTexts[text.index]
  const words = document.querySelectorAll('.word')
  words[3].innerHTML = text.current.split('').map((word)=>{
    return `
        ${mapLetters(word,'letter_last')}
    `
  }).join('')
  
  // repositioning bio
  const letters = document.querySelectorAll('.letter_last') 
  bio.style.top = `${letters[letters.length - 1].offsetTop + letters[0].offsetHeight - 10}px`
}


const triggerTextAnimation = () =>{
  if (window.scrollY > 50) return
  window.removeEventListener('scroll', triggerTextAnimation)
  changeWord()
  animateLetterClones('main_sentence', 'letter', true)

  setInterval(()=>{
    swapLastWord()
  },1000 * 7)
}

export {
  renderText,
  createMainLetterClones,
  createOtherLetterClones,
  animateLetterClones,
  swapLastWord,
  repositionLetterClones,
  triggerTextAnimation,
  changeWord,
}
