<template lang="pug">
  .container.center
    h4 FLUJOS DE CAJA
    button(type='button',
          @click='nuevoItem',
          :class='{disabled: flujos.block}').btn.blue.darken-1.waves-effect.waves-light Nuevo item
    .row
      .col.s6(v-for='(item, index) in flujos.items', :key='index')
        ec-item(:index='index', :block='flujos.block')
    .row
      .input-field.col.s2.offset-s3
        input#caja(type='text', v-model.number='flujos.caja')
        label.active(for='caja') Caja
      .input-field.col.s2
        input#bancos(type='text', v-model.number='flujos.bancos')
        label.active(for='bancos') Bancos
      .input-field.col.s2
        button(type='btn', @click='showTable', :class='{disabled: !isAllow || show}').btn.blue.darken-1.waves-effect.waves-light Generar tabla
    div(v-if='show')
      h5 FLUJO DE CAJA INGRESOS
      table.centered
        thead
          tr
            th Denominación
            th(v-for='(i, index) in years', :key='i', v-if='ventasContado[index]') Año {{ i }}
        tbody
          tr
            td Ventas
            td(v-for='(item, index) in ventasContado', :key='index')
              | {{ item | formatNumber }}
          tr
            td Recuperación de cartera
            td -
            td(v-for='(i, index) in ventasCredito.length - 1', :key='index')
              | {{ ventasCredito[index] | formatNumber }}
          tr(v-for='(item, index) in flujos.items', :key='index')
            td {{ item.denominacion }}
            td(v-for='(i, index) in years', :key='i', v-if='ventasContado[index] && i <= item.years')
              | {{ item.valor | formatNumber }}
            td(v-else-if='ventasContado[index]') -
          tr
            th.center Total ingresos
            td(v-for='(item, index) in totalIngresos', :key='index')
              | {{ item | formatNumber }}

      h5 FLUJO DE CAJA EGRESOS
      table.centered
        thead
          tr
            th Denominación
            th(v-for='(i, index) in years', :key='i', v-if='ventasContado[index]') Año {{ i }}
        tbody
          tr
            td Compras
            td(v-for='(item, index) in comprasContado', :key='index')
              | {{ item | formatNumber }}
          tr
            td Pago a proveedores
            td -
            td(v-for='(item, index) in comprasCredito.length - 1', :key='index')
              | {{ comprasCredito[index] | formatNumber }}
          tr
            td Nomina
            td(v-for='(item, index) in pagosContado', :key='index', v-if='comprasCredito[index]')
              | {{ item | formatNumber }}
          tr
            td Acreedores
            td -
            td(v-for='(i, index) in pagosCredito.length - 1', :key='index', v-if='comprasCredito[i]')
              | {{ pagosCredito[index] | formatNumber }}
          tr
            td Gastos generales
            td(v-for='(item, index) in gastosAnuales', :key='index')
              | {{ item | formatNumber }}
          tr
            td Impuestos
            td(v-for='(item, index) in resultados.impuestos', :key='index')
              | {{ item | formatNumber }}
          tr
            th.center Total Egresos
            td(v-for='(item, index) in totalEgresos', :key='index')
              | {{ item | formatNumber }}

      h5 FLUJO DE CAJA NETO
      table.centered
        thead
          tr
            th Denomiación
            th(v-for='(i, index) in years', :key='i', v-if='ventasContado[index]') Año {{ i }}
        tbody
          tr
            td Neto
            td(v-for='(item, index) in flujoCajaNeto', :key='index')
              | {{ item | formatNumber }}
          tr
            td Salado anterior
            td(v-for='(item, index) in cajaBancos', :key='index', v-if='flujoCajaNeto[index]')
              | {{ item | formatNumber }}
          tr
            th.center Salado que pasa
            td(v-for='(item, index) in saldoQuePasa', :key='index')
              | {{ item | formatNumber }}

      h5 FLUJO DE CAJA LIBRE
      p(v-if='!balance.variacionCapitalTrabajo.length') Para generar la tabla, primero genera el Balance General.
      table.centered(v-else)
        thead
          tr
            th Denominación
            th(v-for='(i, index) in years', :key='i', v-if='ventasContado[index]') Año {{ i }}
        tbody
          tr
            td Utilidad a distribuir
            td(v-for='(i, index) in resultados.utilidades', :key='index')
              | {{ i | formatNumber }}
          tr
            td Depreciación
            td(v-for='(i, index) in depreciacionesAnuales', :key='index', v-if='ventasContado[index]')
              | {{ i | formatNumber }}
          tr
            td Variación en capital de trabajo
            td(v-for='(i, index) in balance.variacionCapitalTrabajo', :key='index', v-if='ventasContado[index]')
              | {{ i | formatNumber }}
          tr
            td Variación en activos fijos
            td(v-for='(i, index) in balance.variacionActivosFijos', :key='index', v-if='ventasContado[index]')
              | {{ i | formatNumber }}
          tr
            th.center TOTAL
            td(v-for='(i, index) in totalLibre', :key='index', v-if='ventasContado[index]')
              | {{ i | formatNumber }}
</template>

<script>
import {mapGetters} from 'vuex'
import EcItem from '@/components/flujos/item'

export default {
  components: {
    EcItem
  },
  created () {
    if (this.isAllow) {
      this.cajaBancos[0] = this.flujos.caja + this.flujos.bancos
      this.show = true
    }
  },
  data () {
    return {
      years: 5,
      cajaBancos: [],
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'flujos',
      'ventasContado',
      'ventasCredito',
      'comprasContado',
      'comprasCredito',
      'gastosAnuales',
      'pagosContado',
      'pagosCredito',
      'resultados',
      'depreciacionesAnuales',
      'balance']),
    isAllow () {
      if (this.flujos.caja != null && this.flujos.bancos != null) return true
      return false
    },
    totalItems () {
      let totalYears = []
      for (let i = 0; i < this.years; i++) {
        let total = 0
        this.flujos.items.forEach(item => {
          if (i < item.years) {
            total += item.valor
          }
        })
        totalYears.push(total)
      }
      return totalYears
    },
    totalIngresos () {
      let totalIngresos = []
      totalIngresos[0] = this.ventasContado[0] + this.totalItems[0]
      for (let i = 1; i < this.ventasContado.length; i++) {
        totalIngresos[i] = this.ventasContado[i] + this.ventasCredito[i - 1] + this.totalItems[i]
      }
      return totalIngresos
    },
    totalEgresos () {
      let totalEgresos = []
      totalEgresos[0] = this.comprasContado[0] + this.gastosAnuales[0] + this.pagosContado[0] + this.resultados.impuestos[0]
      for (let i = 1; i < this.comprasContado.length; i++) {
        totalEgresos[i] = this.comprasContado[i] + this.gastosAnuales[i] + this.comprasCredito[i - 1] + this.pagosContado[i] + this.pagosCredito[i - 1] + this.resultados.impuestos[i]
      }
      return totalEgresos
    },
    flujoCajaNeto () {
      const values = []
      for (let i = 0; i < this.totalIngresos.length; i++) {
        values.push(this.totalIngresos[i] - this.totalEgresos[i])
      }
      return values
    },
    saldoQuePasa () {
      const values = []
      for (let i = 0; i < this.flujoCajaNeto.length; i++) {
        const value = this.flujoCajaNeto[i] + this.cajaBancos[i]
        values.push(value)
        this.cajaBancos.push(value)
      }
      return values
    },
    totalLibre () {
      let total = []
      for (let i = 0; i < this.resultados.utilidades.length; i++) {
        total.push(this.resultados.utilidades[i] + this.depreciacionesAnuales[i] - this.balance.variacionCapitalTrabajo[i] - this.balance.variacionActivosFijos[i])
      }
      return total
    }
  },
  methods: {
    showTable () {
      this.cajaBancos[0] = this.flujos.caja + this.flujos.bancos
      this.$store.commit('blockItemsFlujos')
      this.show = true
    },
    nuevoItem () {
      const item = {
        denominacion: '',
        valor: null,
        years: null
      }
      this.$store.commit('addItemFlujos', item)
    }
  },
  beforeDestroy () {
    this.$store.commit('setSaldoQuePasa', this.saldoQuePasa)
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
