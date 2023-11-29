

  const randomN = (n, offset) => Math.ceil(Math.random() * n) + (offset || 0)
  const randomPos = pos => pos + randomN(40) - 20

  const isNum = x => typeof x === 'number'
  const px = n => n + 'px'
  const nearestN = (n, denom) => n === 0 ? 0 : (n - 1) + Math.abs(((n - 1) % denom) - denom)
  const client = (e, type) => e.type[0] === 'm' ? e[`client${type}`] : e.touches[0][`client${type}`]

  const calcX = (i, n) => i % n
  const calcY = (i, n) => Math.floor(i / n)

  const windowDim = {
    h: () => window.innerHeight || document.documentElement.clientHeight,
    w: () => window.innerWidth || document.documentElement.clientWidth
  }


  const isInViewport = target => {
    const { top, left, bottom, right } = target.getBoundingClientRect()
    return (
      top >= 0 &&
      left >= 0 &&
      bottom <= windowDim.h() &&
      right <= windowDim.w()
    )
  }


  const isInViewportVertically = (target, buffer) => {
    const { top, bottom } = target.getBoundingClientRect()
    return top + buffer < windowDim.h()
    && bottom > buffer
  }

  const isCompletelyOutsideView = (target, buffer = 0) => {
    const { top, left, bottom, right } = target.getBoundingClientRect()
    return  top < -buffer ||
            left < -buffer ||
            bottom - buffer > windowDim.h() ||
            right - buffer > windowDim.w()
  }

  const setStyles = ({ target, x, y, w, h, data }) =>{
    const { style } = target
    if (data) {
      const { x, y, w, h } = data 
      setStyles({ target, x, y, w, h })
    } else {
      if (isNum(w)) style.width = px(w)
      if (isNum(h)) style.height = px(h)
      style.transform = `translate(${x ? px(x) : 0}, ${y ? px(y) : 0})`
    }
  }

  const setProperty = (target, property, value, prefix) => {
    target.style.setProperty(`--${prefix ? `${prefix}-` : ''}${property}`, value)
  }

  const setProperties = ({ target, h, w, x, y, deg, z, prefix, delay }) => {
    if (w) setProperty(target, 'w', w, prefix)
    if (h) setProperty(target, 'h', h, prefix)
    if (x) setProperty(target, 'x', x, prefix)
    if (y) setProperty(target, 'y', y, prefix)
    if (isNum(deg)) setProperty(target, 'deg', `${deg}deg`, prefix)
    if (z) setProperty(target, 'z', z, prefix)
    if (isNum(delay)) setProperty(target, 'delay', `${delay}s`, prefix)
  }

  const timeoutSetStyles = ({ target, x, y, w, h, delay, action, data }) => {
    setTimeout(()=> {
      action && action()
      setStyles({ target, x, y, w, h, data })
    }, delay || 0)
  }


  export {
    randomN,
    randomPos,
    isNum,
    px,
    nearestN,
    client,
    isInViewport,
    setStyles,
    timeoutSetStyles,
    isCompletelyOutsideView,
    isInViewportVertically,
    setProperty,
    setProperties,
    calcX,
    calcY,
    windowDim
  }