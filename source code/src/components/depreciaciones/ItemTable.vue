<template lang="pug">
  tr
    td {{ item.denominacion }}
    td {{ item.valor | formatNumber }}
    td {{ item.years }}
    td(v-for='(i, index) in years', :key='i') {{ valoresAnuales[index] | formatNumber }}

</template>

<script>
export default {
  props: ['item', 'years'],
  created () {
    for (let i = 1; i <= this.years; i++) {
      if (i <= this.item.years) {
        this.valoresAnuales.push(this.item.valor / this.item.years)
      } else {
        this.valoresAnuales.push(0)
      }
    }
    this.$emit('valorAnual', this.valoresAnuales)
  },
  data () {
    return {
      valoresAnuales: []
    }
  }
}
</script>
