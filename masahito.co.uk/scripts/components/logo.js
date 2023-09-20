
const m = document.querySelector('.m')
const main = document.querySelector('.main')
const dot = document.querySelector('.dot')
const line = document.querySelector('.line')
const signTwo = document.querySelector('.sign_two')

const animateLogo = () =>{
  const timing = 200
  setTimeout(()=>{
    m.classList.add('animate')
  },timing)
  setTimeout(()=>{
    main.classList.add('animate')
  },timing + 200)
  setTimeout(()=>{
    dot.classList.add('animate')
  },timing + 500)
  setTimeout(()=>{
    line.classList.add('animate')
  },timing + 600)
  setTimeout(()=>{
    m.classList.add('color')
    main.classList.add('color')
    dot.classList.add('color')
    line.classList.add('color')
  }, timing + 700)
  setTimeout(()=>{
    signTwo.classList.add('animate')
  }, timing + 900)
}

export default animateLogo

