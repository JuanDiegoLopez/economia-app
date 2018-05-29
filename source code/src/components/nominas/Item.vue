<template lang="pug">
  tr
    td {{ cargo }}
    td {{ salarioConAumento | formatNumber }}
    td {{ salarioComision | formatNumber }}
    td {{ subsidoTrasporte | formatNumber }}
    td {{ salarioMensual | formatNumber }}
    td {{ salarioAnual | formatNumber }}
    td {{ salarioPrestaciones | formatNumber }}
</template>

<script>
export default {
  props: [
    'cargo',
    'salarioBase',
    'comision',
    'porcentajeVentas',
    'aumentoSalarial',
    'ventaContado',
    'subTransporteBase',
    'maxSalario',
    'prestaciones',
    'year',
    'index'
  ],
  computed: {
    salarioConAumento () {
      if (!this.aumentoSalarial) return this.salarioBase
      return this.salarioBase * this.aumentoSalarial
    },
    salarioComision () {
      if (!this.porcentajeVentas) return (this.ventaContado * this.comision) / 12
      return (this.ventaContado * this.comision * this.porcentajeVentas) / 12
    },
    subsidoTrasporte () {
      if ((this.salarioConAumento + this.salarioComision) < this.maxSalario) return this.subTransporteBase
      return 0
    },
    salarioMensual () {
      return this.salarioConAumento + this.salarioComision + this.subsidoTrasporte
    },
    salarioAnual () {
      return this.salarioMensual * 12
    },
    salarioPrestaciones () {
      if (!this.prestaciones) return this.salarioConAumento
      return this.salarioAnual * this.prestaciones
    }
  },
  created () {
    const data = {
      cargo: this.cargo,
      salario: this.salarioConAumento,
      comision: this.salarioComision,
      porcentajeVentas: this.porcentajeVentas,
      subTransporte: this.subsidoTrasporte,
      salarioMensual: this.salarioMensual,
      salarioAnual: this.salarioAnual,
      salarioPrestaciones: this.salarioPrestaciones
    }
    this.$emit('calcularTotal', data)
  }
}
</script>
