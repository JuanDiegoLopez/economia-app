<template lang="pug">
    tr
      td {{ item.denominacion }}
      td {{ nuevoValor | formatNumber }}
      td {{ nuevoValor * 12 | formatNumber }}
</template>

<script>
export default {
  props: ['item', 'incrementoAnual'],
  created () {
    const data = {
      denominacion: this.item.denominacion,
      valor: this.nuevoValor
    }
    this.$emit('nuevoValor', data)
  },
  computed: {
    nuevoValor () {
      if (!this.incrementoAnual) return this.item.valor
      return this.item.valor * this.incrementoAnual
    }
  }
}
</script>
