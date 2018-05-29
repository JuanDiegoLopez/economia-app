<template lang="pug">
  .container
    h4.center PRESUPUESTOS
    .row
      .input-field.col.s3
        input#nombre.validate(type='text', v-model.number='presupuestos.nombreProducto')
        label.active(for='nombre') Nombre del producto
      .input-field.col.s3
        input#cant.validate(type='number', v-model.number='presupuestos.cantidadVentas[0]')
        label.active(for='cant') Cantidad a vender
      .input-field.col.s3
        input#coste.validate(type='number', v-model.number='presupuestos.preciosCompra[0]')
        label.active(for='coste') Precio de compra
      .input-field.col.s3
        input#aumentoCompra.validate(type='text', v-model.number='presupuestos.aumentoCompraBase')
        label.active(for='aumentoCompra') % Aumento de compra

    year(:indice='n',
        :nombre='presupuestos.nombreProducto',
        :aumentoCompras='presupuestos.aumentoCompraBase',
        :cantidadVentas='presupuestos.cantidadVentas[0]',
        :precioCompras='presupuestos.preciosCompra[0]',
        :cantidadInventario='0', @setInventario='setInventario',
        v-if='isAllow')
    year(v-for='i in 4', :key='i', :indice='i',
        :nombre='presupuestos.nombreProducto',
        :aumentoCompras='presupuestos.aumentoCompraBase',
        :cantidadVentas='presupuestos.cantidadVentas[i-1]',
        :precioCompras='presupuestos.preciosCompra[i-1]',
        :cantidadInventario='tempCantidadInventario[i]',
         @setInventario='setInventario',
         v-if='tempCantidadInventario[i]')
</template>

<script>
import Year from '@/components/presupuestos/year'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { Year },
  created () {
    if (this.cantidadInventario) this.tempCantidadInventario = this.cantidadInventario
  },
  data () {
    return {
      n: 0,
      tempCantidadInventario: []
    }
  },
  computed: {
    ...mapState(['presupuestos']),
    ...mapGetters(['cantidadInventario']),
    isAllow () {
      let allow = true
      if (!this.presupuestos.nombreProducto ||
          !this.presupuestos.cantidadVentas[0] ||
          !this.presupuestos.preciosCompra[0] ||
          !this.presupuestos.aumentoCompraBase) { allow = false }
      return allow
    }
  },
  methods: {
    setInventario (value) {
      this.tempCantidadInventario.push(value)
    }
  }
}
</script>
