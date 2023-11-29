
const random = '*&%!1234567ABC'
const scrambleData = {
  timer: null
}

const scrambleLetter = ( target, scrambledLetters, shuffle, text, speed ) => {
  const shuffleCount = 4
  if (target.textContent.length < text.length) {  
    if (shuffle < shuffleCount){
      const output = text.slice(0, scrambledLetters) 
      target.innerText = output + random[Math.floor(Math.random() * random.length)] 
      scrambleData.timer = setTimeout(() => {
        scrambleLetter(target, scrambledLetters, shuffle + 1, text)
      }, speed)
    } else { 
      scrambleLetter(target, scrambledLetters + 1, 0, text) 
    }   
  } 
  if (target.textContent.length >= text.length){
    target.innerHTML = text 
    clearTimeout(scrambleData.timer)
  }
}  

const triggerShuffle = ({ target, text, speed }) => {
  target.innerHTML = ''
  scrambleLetter(target, 0, 0, text, speed)
}

export {
  triggerShuffle
}