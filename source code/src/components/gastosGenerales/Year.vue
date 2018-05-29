<template lang="pug">
  div
    h4.left-align Año {{ year + 1}}
    .row
      .input-field.col.s2
          input(:id='ids[0]', type='text', v-model.number='gastos.years[year].incrementoAnual')
          label.active(:for='ids[0]') Incremento Anual
      .input-field.col.s2
          input(:id='ids[1]', type='text', v-model.number='gastos.years[year].porcentajeImprevistos')
          label.active(:for='ids[1]') % de imprevistos
      .input-field.col.s2
        button(type='button',
              @click='showTable',
              :class='{disabled: !isAllow || show}').btn.blue.darken-1.waves-effect.waves-light Generar Tabla
    table.centered(v-if='show')
      thead
        tr
          th Denominación
          th Valor mensual
          th Total anual
      tbody
        ec-item-table(v-for='(item, index) in gastos.items[year]', :key='index',
          :item='item', :incrementoAnual='incrementoAnual',
          v-if='item && item.denominacion && item.valor',
          @nuevoValor='nuevoValor')
        tr
          td Imprevistos
          td {{ imprevistos | formatNumber }}
          td {{ imprevistos * 12 | formatNumber }}
        tr
          th.center Total
          td {{ totalMensual | formatNumber }}
          td {{ totalAnual | formatNumber }}
</template>

<script>
import { mapGetters } from 'vuex'
import EcItemTable from '@/components/gastosGenerales/itemTable'

export default {
  props: ['year'],
  components: { EcItemTable },
  created () {
    if (this.isAllow) this.show = true
  },
  data () {
    return {
      show: false,
      valoresNuevos: []
    }
  },
  computed: {
    ...mapGetters(['gastos', 'ventasContado']),
    ids () {
      return [`incremento${this.year}`, `imprevistos${this.year}`]
    },
    isAllow () {
      if (this.gastos.years[this.year].incrementoAnual == null || !this.gastos.years[this.year].porcentajeImprevistos) {
        return false
      }
      return true
    },
    incrementoAnual () {
      return this.gastos.years[this.year].incrementoAnual
    },
    imprevistos () {
      return this.ventasContado[this.year] * this.gastos.years[this.year].porcentajeImprevistos
    },
    totalMensual () {
      let total = 0
      this.gastos.items[this.year].forEach(item => {
        total += item.valor
      })
      total += this.imprevistos
      return total
    },
    totalAnual () {
      let total = 0
      this.gastos.items[this.year].forEach(item => {
        total += item.valor * 12
      })
      total += this.imprevistos * 12
      return total
    }
  },
  methods: {
    showTable () {
      this.show = true
      this.$emit('blockItems')
      this.$store.commit('newYearGastos', this.valoresNuevos)
      this.$store.commit('setTotalGastos', this.totalAnual)
    },
    nuevoValor (item) {
      this.valoresNuevos.push(item)
    }
  }
}
</script>
