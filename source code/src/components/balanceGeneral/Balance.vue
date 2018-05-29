<template lang="pug">
  .container.center
    h4 BALANCE GENERAL
    .row
      .input-field.col.s2.offset-s4
        input#capital(type='text', v-model.number='balance.capitalInicial')
        label.active(for='capital') Capital inicial
      .input-field.col.s2
        button(type='button',
              @click='showTable',
              :class='{disabled: !isAllow || show}').btn.blue.darken-1.waves-effect.waves-light Generar tabla
    div(v-if='show')
      h5.center ACTIVOS CORRIENTES
      table.centered
        thead
          tr
            th Denominación
            th(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]') Año {{ i }}
        tbody
          tr
            td Caja y Bancos
            td(v-for='(i, index) in saldoQuePasa.length', :key='index', v-if='ventasCredito[index]')
              | {{ saldoQuePasa[index] | formatNumber }}
          tr
            td Cuentas por cobrar
            td(v-for='(item, index) in ventasCredito', :key='index')
              | {{ item | formatNumber }}
          tr
            td Inventarios
            td(v-for='(item, index) in inventarioTotal', :key='index')
              | {{ item | formatNumber }}
          tr
            th.center Total activos corrientes
            td(v-for='(item, index) in totalActivosCorrientes', :key='index')
              | {{ item | formatNumber }}
          tr
            th.center Variación activos corrientes
            td(v-for='(item, index) in variacionActivosCorrientes', :key='index', v-if='ventasCredito[index]')
              | {{ item | formatNumber }}
      h5.center ACTIVOS FIJOS
      table.centered
        thead
          tr
            th Denominación
            th(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]') Año {{ i }}
        tbody
          tr
            td Valor total depreciaciones
            td(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]')
              | {{ valorTotalDepre | formatNumber }}
          tr
            td Depreciación acumulada
            td(v-for='(item, index) in depreciaciones.depreciacionesTotales', :key='index', v-if='ventasCredito[index]')
              | {{ item | formatNumber }}
          tr
            th.center Total activos fijos
            td(v-for='(i, index) in totalActivosFijos.length', :key='index', v-if='ventasCredito[index]')
              | {{ totalActivosFijos[index] | formatNumber }}
          tr
            th.center Variación activos fijos
            td(v-for='(item, index) in variacionActivosFijos', :key='index', v-if='ventasCredito[index]')
              | {{ item | formatNumber }}
      h5.center TOTAL ACTIVOS
      table.centered
        thead
          tr
            th.center -
            th.center(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]') Año {{ i }}
        tbody
          tr
            th.center TOTAL ACTIVOS
            td(v-for='(item, index) in totalActivos', :key='index')
              | {{ item | formatNumber }}
      h5.center PASIVOS CORRIENTES
      table.centered
        thead
          tr
            th Denominación
            th(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]') Año {{ i }}
        tbody
          tr
            td Proveedores
            td(v-for='(item, index) in comprasCredito', :key='index')
              | {{ item | formatNumber }}
          tr
            td Empleados
            td(v-for='(item, index) in pagosCredito', :key='index', v-if='ventasCredito[index]')
              | {{ item | formatNumber }}
          tr
            td Gobierno
            td(v-for='(item, index) in impuestos', :key='index')
              | {{ item | formatNumber }}
          tr
            th.center TOTAL PASIVOS
            td(v-for='(item, index) in totalPasivos', :key='index')
              | {{ item | formatNumber }}
      h5.center VARIACIÓN DE CAPITAL DE TRABAJO
      table.centered
        thead
          tr
            th Denominación
            th(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]') Año {{ i }}
        tbody
          tr
            td  Cajas y bancos
            td(v-for='(item, index) in variacion.saldoQuePasa', :key='index')
              | {{ item | formatNumber }}
          tr
            td Cuentas por cobrar
            td(v-for='(item, index) in variacion.cuentasPorCobrar', :key='index')
              | {{ item | formatNumber }}
          tr
            td Proveedores
            td(v-for='(item, index) in variacion.proveedores', :key='index')
              | {{ item | formatNumber }}
          tr
            th.center TOTAL
            td(v-for='(item, index) in totalVariacion', :key='index')
              | {{ item | formatNumber }}
      h5.center PATRIMONIO
      table.centered
        thead
          tr
            th.center Denominación
            th.center(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]') Año {{ i }}
        tbody
          tr
            td Capital inicial
            td(v-for='(i, index) in years', :key='index', v-if='ventasCredito[index]')
              | {{ balance.capitalInicial | formatNumber }}
          tr
            td Utilidades
            td(v-for='(item, index) in utilidades', :key='index', v-if='ventasCredito[index]')
              | {{ item | formatNumber }}
          tr
            td Utilidades retenidas
            td(v-for='(item, index) in utilidadesRetenidas', :key='index', v-if='ventasCredito[index]')
              | {{ item | formatNumber }}
          tr
            th.center TOTAL PATRIMONIO
            td(v-for='(item, index) in totalPatrimonio', :key='index')
              | {{ item | formatNumber }}
          tr
            th.center TOTAL PASIVO + PATRIMONIO
            td(v-for='(item, index) in totalPasivosPatrimonio', :key='index')
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
      years: 5,
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'balance',
      'saldoQuePasa',
      'ventasCredito',
      'comprasCredito',
      'inventarioTotal',
      'depreciaciones',
      'pagosCredito',
      'impuestos',
      'utilidades',
      'valorCaja',
      'valorBancos'
    ]),
    isAllow () {
      if (this.balance.capitalInicial != null) return true
      return false
    },
    totalActivosCorrientes () {
      let total = []
      for (let i = 0; i < this.ventasCredito.length; i++) {
        total.push(this.saldoQuePasa[i] + this.ventasCredito[i] + this.inventarioTotal[i])
      }
      return total
    },
    valorTotalDepre () {
      let total = 0
      this.depreciaciones.items.forEach(item => {
        total += item.valor
      })
      return total
    },
    totalActivosFijos () {
      let total = []
      for (let i = 0; i < this.depreciaciones.depreciacionesTotales.length; i++) {
        total.push(this.valorTotalDepre - this.depreciaciones.depreciacionesTotales[i])
      }
      return total
    },
    variacionActivosCorrientes () {
      let variacion = []
      variacion[0] = this.totalActivosCorrientes[0] - (this.valorCaja + this.valorBancos)
      for (let i = 1; i < this.totalActivosCorrientes.length; i++) {
        variacion.push(this.totalActivosCorrientes[i] - this.totalActivosCorrientes[i - 1])
      }
      return variacion
    },
    variacionActivosFijos () {
      let variacion = []
      variacion[0] = this.totalActivosFijos[0] - this.valorTotalDepre
      for (let i = 1; i < this.totalActivosFijos.length; i++) {
        variacion.push(this.totalActivosFijos[i] - this.totalActivosFijos[i - 1])
      }
      return variacion
    },
    totalActivos () {
      let total = []
      for (let i = 0; i < this.totalActivosCorrientes.length; i++) {
        total.push(this.totalActivosCorrientes[i] + this.totalActivosFijos[i])
      }
      return total
    },
    totalPasivos () {
      let total = []
      for (let i = 0; i < this.comprasCredito.length; i++) {
        total.push(this.comprasCredito[i] + this.pagosCredito[i] + this.impuestos[i])
      }
      return total
    },
    utilidadesRetenidas () {
      let utilidades = []
      utilidades[0] = 0
      for (let i = 0; i < this.utilidades.length; i++) {
        utilidades.push(this.utilidades[i] - utilidades[i])
      }
      return utilidades
    },
    totalPatrimonio () {
      let total = []
      for (let i = 0; i < this.utilidades.length; i++) {
        total.push(this.balance.capitalInicial + this.utilidades[i] + this.utilidadesRetenidas[i])
      }
      return total
    },
    totalPasivosPatrimonio () {
      let total = []
      for (let i = 0; i < this.totalPasivos.length; i++) {
        total.push(this.totalPasivos[i] + this.totalPatrimonio[i])
      }
      return total
    },
    variacion () {
      let variacion = {
        saldoQuePasa: [0],
        cuentasPorCobrar: [0],
        proveedores: [0]
      }
      for (let i = 1; i < this.saldoQuePasa.length; i++) {
        variacion.saldoQuePasa.push(this.saldoQuePasa[i] - this.saldoQuePasa[i - 1])
        variacion.cuentasPorCobrar.push(this.ventasCredito[i] - this.ventasCredito[i - 1])
        variacion.proveedores.push(this.comprasCredito[i] - this.comprasCredito[i - 1])
      }
      return variacion
    },
    totalVariacion () {
      let total = []
      for (let i = 0; i < this.variacion.saldoQuePasa.length; i++) {
        const valor = this.variacion.saldoQuePasa[i] + this.variacion.cuentasPorCobrar[i] - this.variacion.proveedores[i]
        total.push(valor * -1)
      }
      return total
    }
  },
  methods: {
    showTable () {
      this.show = true
    }
  },
  beforeDestroy () {
    this.$store.commit('setVariacionCapitalTrabajo', this.totalVariacion)
    this.$store.commit('setVariacionActivosFijos', this.variacionActivosFijos)
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/settings';
.title {
  background-color: $fourth-color;
  color: #fff;
}
</style>
