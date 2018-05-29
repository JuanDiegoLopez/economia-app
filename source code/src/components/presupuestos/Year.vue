<template lang="pug">
  div
    h4 Año {{ indice + 1 }}
    .row
      .input-field.col.s3
        input(:id='ids[0]', type='number', v-model='presupuestos.years.incrementosAnuales[indice]', @keyup='isAllowed')
        label.active(:for='ids[0]') Incremento anual de ventas
      .input-field.col.s2
        input(:id='ids[1]', type='number', v-model='presupuestos.years.ganancias[indice]', @keyup='isAllowed')
        label.active(:for='ids[1]') % Ganancia
      .input-field.col.s2
        input(:id='ids[2]', type='number', v-model='presupuestos.years.porcentajesVentas[indice]', @keyup='isAllowed')
        label.active(:for='ids[2]') % Ventas de contado
      .input-field.col.s2
        input(:id='ids[3]', type='number', v-model='presupuestos.years.porcentajesCompras[indice]', @keyup='isAllowed')
        label.active(:for='ids[3]') % Compras de contado
      .input-field.col.s2
        button(type='button',
              @click='showTable',
              :class='{ disabled: !allow }').btn.blue.darken-1.waves-effect.waves-light Generar Tabla
    div(v-if='show')
      h5 PRESUPUESTO DE VENTAS
      table.centered
        thead
          tr
            th Nombre producto
            th Cantidad
            th Precio
            th Total
            th Ventas de contado
            th Ventas a credito
        tbody
          tr
            td {{ nombre }}
            td {{ nuevaCantidadVentas | formatNumber }}
            td {{ precioVentas | formatNumber }}
            td {{ totalVentas | formatNumber }}
            td {{  ventasContado | formatNumber }}
            td {{ ventasCredito | round | formatNumber }}
      h5 PRESUPUESTO DE COMPRAS
      table.centered
        thead
          tr
            th Nombre producto
            th Cantidad
            th Precio
            th Total
            th Compras de contado
            th Compras a credito
        tbody
          tr
            td {{ nombre }}
            td {{ cantidadCompras | formatNumber }}
            td {{ nuevoPrecioCompras | formatNumber }}
            td {{ totalCompras | formatNumber }}
            td {{ comprasContado | formatNumber }}
            td {{ comprasCredito | round | formatNumber }}
      h5 INVENTARIOS
      table.centered
        thead
          tr
            th Nombre
            th % de aumento
            th Cantidad
            th Precio
            th Total
        tbody
          tr
            td {{ nombre }}
            td {{ aumentoCompras - 1 }}
            td {{ nuevaCantidadInventario | formatNumber }}
            td {{ nuevoPrecioCompras | formatNumber }}
            td {{ inventarioTotal | formatNumber }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    indice: { required: true },
    aumentoCompras: { required: true },
    nombre: { required: true },
    cantidadInventario: { required: true },
    cantidadVentas: { required: true },
    precioCompras: { required: true }
  },
  created () {
    if (this.isAllowed()) {
      this.show = true
      this.allow = false
    }
  },
  data () {
    return {
      show: false,
      allow: false
    }
  },
  computed: {
    ...mapState(['presupuestos']),
    nuevaCantidadVentas () {
      if (this.indice === 0) return this.cantidadVentas
      if (!this.presupuestos.years.incrementosAnuales[this.indice]) return this.cantidadVentas
      return this.cantidadVentas * this.presupuestos.years.incrementosAnuales[this.indice]
    },
    cantidadCompras () {
      return this.nuevaCantidadVentas * this.aumentoCompras - this.cantidadInventario
    },
    precioVentas () {
      return this.nuevoPrecioCompras * this.presupuestos.years.ganancias[this.indice]
    },
    nuevoPrecioCompras () {
      if (this.indice === 0) return this.precioCompras
      return this.precioCompras * this.aumentoCompras
    },
    totalVentas () {
      return this.nuevaCantidadVentas * this.precioVentas
    },
    totalCompras () {
      return this.cantidadCompras * this.nuevoPrecioCompras
    },
    nuevaCantidadInventario () {
      return this.cantidadCompras - this.nuevaCantidadVentas
    },
    comprasContado () {
      return this.presupuestos.years.porcentajesCompras[this.indice] * this.totalCompras
    },
    comprasCredito () {
      return (1 - this.presupuestos.years.porcentajesCompras[this.indice]) * this.totalCompras
    },
    ventasContado () {
      return this.presupuestos.years.porcentajesVentas[this.indice] * this.totalVentas
    },
    ventasCredito () {
      return (1 - this.presupuestos.years.porcentajesVentas[this.indice]) * this.totalVentas
    },
    inventarioTotal () {
      return this.nuevaCantidadInventario * this.nuevoPrecioCompras
    },
    ids () {
      return [`incrementoAnual${this.indice}`, `ganancia${this.indice}`, `ventasContado${this.indice}`, `comprasContado${this.indice}`]
    }
  },
  filters: {
    round (value) {
      return Math.round(value)
    }
  },
  methods: {
    showTable () {
      this.show = true
      this.allow = false

      const data = {
        cantidadVentas: {
          index: this.indice,
          value: this.nuevaCantidadVentas
        },
        precioCompras: {
          index: this.indice,
          value: this.nuevoPrecioCompras
        },
        ventasTotales: {
          index: this.indice,
          value: this.totalVentas
        },
        ventasContado: {
          index: this.indice,
          value: this.ventasContado
        },
        ventasCredito: {
          index: this.indice,
          value: this.ventasCredito
        },
        comprasTotales: {
          index: this.indice,
          value: this.totalCompras
        },
        comprasContado: {
          index: this.indice,
          value: this.comprasContado
        },
        comprasCredito: {
          index: this.indice,
          value: this.comprasCredito
        },
        inventarioTotal: {
          index: this.indice,
          value: this.inventarioTotal
        }
      }

      this.$emit('setInventario', this.nuevaCantidadInventario)
      this.$store.commit('setCantidadVentas', data.cantidadVentas)
      this.$store.commit('setPreciosCompras', data.precioCompras)
      this.$store.commit('setVentasTotales', data.ventasTotales)
      this.$store.commit('setVentasContado', data.ventasContado)
      this.$store.commit('setVentasCredito', data.ventasCredito)
      this.$store.commit('setComprasTotales', data.comprasTotales)
      this.$store.commit('setComprasContado', data.comprasContado)
      this.$store.commit('setComprasCredito', data.comprasCredito)
      this.$store.commit('setInventarioTotal', data.inventarioTotal)
    },
    isAllowed () {
      if (this.presupuestos.years.incrementosAnuales[this.indice] != null &&
          this.presupuestos.years.ganancias[this.indice] != null &&
          this.presupuestos.years.porcentajesVentas[this.indice] != null &&
          this.presupuestos.years.porcentajesCompras[this.indice] != null) {
        this.allow = true
        return true
      } else {
        this.allow = false
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h5 {
    text-align: center;
  }
</style>
