export default {
  fmt (num, cur = 'usd') {
    return `$${(num / 100).toFixed(2)}`
  }
}
