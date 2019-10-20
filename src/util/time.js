export default {
  fmt (n, locale) {
    return (new Date(n)).toLocaleDateString(locale || 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}
