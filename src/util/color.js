const hex2rgb = (hex) => {
  hex = hex.replace('#', '')
  if (hex.length !== 6) throw new Error('Invalid hex color')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return { r, g, b }
}

const rgb2hex = ({ r, g, b }) => {
  const c2h = (c) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return '#' + c2h(r) + c2h(g) + c2h(b)
}

const hex2hsl = (hex) => {
  let { r, g, b } = hex2rgb(hex)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h; let s; let l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      default: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return { h, s, l }
}

const hsl2hex = ({ h, s, l }) => {
  let r, g, b
  if (s === 0) {
    r = g = b = Math.round(l * 255)
  } else if (l === 1) {
    r = g = b = 255
  } else if (l === 0) {
    r = g = b = 0
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q

    r = Math.floor(hue2rgb(p, q, h + 1 / 3) * 255)
    g = Math.floor(hue2rgb(p, q, h) * 255)
    b = Math.floor(hue2rgb(p, q, h - 1 / 3) * 255)
  }
  return rgb2hex({ r, g, b })
}

export default {
  hex2rgb,
  rgb2hex,
  hex2hsl,
  hsl2hex
}
