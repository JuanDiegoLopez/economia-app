const formatNumber = {}

function toLocaleNumber (value) {
  if (!value) return '-'
  return `$ ${value.toLocaleString()}`
}

formatNumber.install = function (Vue) {
  Vue.filter('formatNumber', (val) => {
    return toLocaleNumber(val)
  })
}

export default formatNumber
