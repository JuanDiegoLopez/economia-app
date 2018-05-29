<template lang="pug">
  .container.center
    h4 GASTOS GENERALES
    button(type='button',
          @click='nuevoItem',
          :class='{disabled: gastos.blockItems}').btn.blue.darken-1.waves-effect.waves-light Nuevo gasto
    .row
      .col.s6(v-for='(item, index) in gastos.items[0]', :key='index')
        ec-gasto(:index='index', :block='gastos.blockItems')
    ec-year(v-for='(i, index) in 5', :key='index', :year='index',
            v-if='ventasContado[index] && gastos.items[index]',
            @blockItems='blockItems')

</template>

<script>
import { mapGetters } from 'vuex'
import EcGasto from '@/components/gastosGenerales/gasto'
import EcYear from '@/components/gastosGenerales/year'

export default {
  components: { EcGasto, EcYear },
  computed: {
    ...mapGetters(['gastos', 'ventasContado'])
  },
  methods: {
    nuevoItem () {
      const item = {
        denominacion: '',
        valor: null
      }
      this.$store.commit('addItemGastos', item)
    },
    blockItems () {
      this.$store.commit('blockItemsGastos')
    }
  }
}
</script>

<style lang="scss" scoped>
  h4 {
    display: inline-block;
  }
  .btn {
    margin: 0px 10px;
  }
</style>
