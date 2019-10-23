export default {
  classes (...arr) {
    return arr.filter(x => x).join(' ')
  },
  cssNamespace (str, ns) {
    if (!str) return ''
    return str.replace(/(^|\n)([.#]?-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?:\s+.+)?)(\s*[,{])/g, `$1${ns} $2$3`)
  }
}
