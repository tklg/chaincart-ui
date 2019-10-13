function throttle (f, d) {
  let now = window.performance.now()
  return function (...params) {
    if (window.performance.now() - now < d) return
    now = window.performance.now()
    f(...params)
  }
}

function debounce (f, d) {
  let timer
  return function (...params) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f(...params)
    }, d)
  }
}

export default {
  throttle,
  debounce
}
