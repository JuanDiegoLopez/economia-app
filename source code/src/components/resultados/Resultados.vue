<template lang="pug">
  .container.center
    h4 ESTADO DE RESULTADOS
    .row
      .input-field.col.s2.offset-s4
        input#impuestos(type='number', v-model='resultados.porcentajeImpuestos')
        label.active(for='impuestos') % de impuestos
      .input-field.col.s2
        button(type='button',
              @click='showTable',
              :class='{disabled: !isAllow || show}' ).btn.blue.darken-1.waves-effect.waves-light Generar Tabla
    table.centered(v-if='show')
      thead
        tr
          th Denominación
          th(v-for='(i, index) in years', :key='i', v-if='ventasTotales[index]') Año {{ i }}
      tbody
        tr
          td Ventas
          td(v-for='(item, index) in ventasTotales', :key='index')
            | {{ item | formatNumber }}
        tr
          td Compras
          td(v-for='(item, index) in comprasTotales', :key='index')
            | {{ item | formatNumber }}
        tr
          td Inventario inicial
          td -
          td(v-for='(item, index) in inventarioTotal.length - 1', :key='index')
            | {{ inventarioTotal[index] | formatNumber }}
        tr
          td Inventario Final
          td(v-for='(item, index) in inventarioTotal', :key='index')
            | {{ item | formatNumber }}
        tr
          td Costo mercancia vendida
          td(v-for='(item, index) in costoMercanciaVen', :key='index')
            | {{ item | formatNumber }}
        tr
          th.center Margen bruto de ganancia
          td(v-for='(item, index) in margenBruto', :key='index')
            | {{ item | formatNumber }}
        tr
          td Nomina
          td(v-for='(item, index) in prestacionesAnuales', :key='index', v-if='ventasTotales[index]')
            | {{ item | formatNumber }}
        tr
          td Gastos generales
          td(v-for='(item, index) in gastosAnuales', :key='index')
            | {{ item | formatNumber }}
        tr
          td Depreciación
          td(v-for='(item, index) in depreciacionesAnuales', :key='index', v-if='ventasTotales[index]')
            | {{ item | formatNumber }}
        tr
          th.center Total gastos generales
          td(v-for='(item, index) in totalGastosGenerales', :key='index', v-if='ventasTotales[index]')
            | {{ item | formatNumber }}
        tr
          th.center Utilidad operativa
          td(v-for='(item, index) in utilidadOperativa', :key='index')
            | {{ item | formatNumber }}
        tr
          td Utilidad con impuestos
          td(v-for='(item, index) in utilidadConImpuestos', :key='index')
            | {{ item | formatNumber }}
        tr
          th.center Utilidad a distribuir
          td(v-for='(item, index) in utilidadDistribuir', :key='index')
            | {{ item | formatNumber }}
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  created () {
    if (this.isAllow) this.show = true
  },
  data () {
    return {
      show: false,
      years: 5
    }
  },
  computed: {
    ...mapGetters([
      'resultados',
      'ventasTotales',
      'comprasTotales',
      'inventarioTotal',
      'prestacionesAnuales',
      'gastosAnuales',
      'depreciacionesAnuales'
    ]),
    isAllow () {
      if (!this.resultados.porcentajeImpuestos) return false
      return true
    },
    costoMercanciaVen () {
      let totales = []
      totales[0] = this.comprasTotales[0] - this.inventarioTotal[0]
      for (let i = 1; i < this.comprasTotales.length; i++) {
        const total = this.comprasTotales[i] + this.inventarioTotal[i - 1] - this.inventarioTotal[i]
        totales.push(total)
      }
      return totales
    },
    margenBruto () {
      let margen = []
      for (let i = 0; i < this.ventasTotales.length; i++) {
        margen.push(this.ventasTotales[i] - this.costoMercanciaVen[i])
      }
      return margen
    },
    totalGastosGenerales () {
      let totales = []
      for (let i = 0; i < this.prestacionesAnuales.length; i++) {
        const total = this.prestacionesAnuales[i] + this.gastosAnuales[i] + this.depreciacionesAnuales[i]
        totales.push(total)
      }
      return totales
    },
    utilidadOperativa () {
      let utilidades = []
      for (let i = 0; i < this.margenBruto.length; i++) {
        utilidades.push(this.margenBruto[i] - this.totalGastosGenerales[i])
      }
      return utilidades
    },
    utilidadConImpuestos () {
      let utilidades = []
      for (let i = 0; i < this.utilidadOperativa.length; i++) {
        utilidades.push(this.utilidadOperativa[i] * this.resultados.porcentajeImpuestos)
      }
      return utilidades
    },
    utilidadDistribuir () {
      let utilidades = []
      for (let i = 0; i < this.utilidadOperativa.length; i++) {
        utilidades.push(this.utilidadOperativa[i] - this.utilidadConImpuestos[i])
      }
      return utilidades
    }
  },
  methods: {
    showTable () {
      this.show = true
    }
  },
  beforeDestroy () {
    this.$store.commit('setUtilidadImpuestos', this.utilidadConImpuestos)
    this.$store.commit('setUtilidadesDistribuir', this.utilidadDistribuir)
  }
}
</script>
