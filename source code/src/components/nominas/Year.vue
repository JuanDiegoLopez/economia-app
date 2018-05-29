<template lang="pug">
  div
    h4 Año {{ year + 1 }}
    .row
      .input-field.col.s2(v-for='(item, index) in nominas.cargos[year]')
        input(:id='idsCargos[index]', type='text', v-model.number='item.comision')
        label.active(:for='idsCargos[index]') Comision {{ item.cargo }}
      .input-field.col.s2
        input(:id='ids[0]', type='text', v-model.number='nominas.years[year].aumentoSalarial')
        label.active(:for='ids[0]') Aumento salarial
      .input-field.col.s2
        input(:id='ids[1]', type='text', v-model.number='nominas.years[year].maxSalarioTransporte')
        label.active(:for='ids[1]') Max salario transporte
      .input-field.col.s2
        input(:id='ids[2]', type='text', v-model.number='nominas.years[year].subTransporteBase')
        label.active(:for='ids[2]') Subsidio transporte
      .input-field.col.s2
        input(:id='ids[3]', type='text', v-model.number='nominas.years[year].prestaciones')
        label.active(:for='ids[3]') % por prestaciones
      .input-field.col.s2
        button(type='button',
              @click='showTable',
              :class='{disabled: !isAllow || show}').btn.blue.darken-1.waves-effect.waves-light Generar Tabla
    table.centered(v-if='show')
      thead
        tr
          th Cargo
          th Salario
          th Comisiones
          th Sub de trasporte
          th Sueldo mensual
          th Total anual
          th Anual + prestaciones
      tbody
        ec-item(v-for='(item, index) in salariosBase',
                :key='index',
                :index='index',
                :year='year',
                :cargo='item.cargo',
                :salarioBase='item.salario',
                :comision='item.comision',
                :porcentajeVentas='item.porcentajeVentas',
                :aumentoSalarial='nominas.years[year].aumentoSalarial',
                :subTransporteBase='nominas.years[year].subTransporteBase',
                :maxSalario='nominas.years[year].maxSalarioTransporte',
                :prestaciones='nominas.years[year].prestaciones',
                :ventaContado='ventaContado',
                @calcularTotal='calcularTotal')
        tr
          th.center TOTAL
          td {{ totalSalarios  | formatNumber }}
          td {{ totalComisiones | formatNumber }}
          td {{ totalSubTransporte | formatNumber }}
          td {{ totalSalarioMensual | formatNumber }}
          td {{ totalSalarioAnual | formatNumber }}
          td {{ totalSalarioPrestaciones | formatNumber }}

    table.centered(v-if='show')
      thead
        tr
          th Pago de contado
          th Pago a credito
      tbody
        tr
          td {{ totalContado | formatNumber }}
          td {{ totalCredito | formatNumber }}
</template>

<script>
import { mapGetters } from 'vuex'
import EcItem from '@/components/nominas/item'

export default {
  components: { EcItem },
  props: ['salariosBase', 'ventaContado', 'year'],
  created () {
    if (this.isAllow) this.show = true
  },
  data () {
    return {
      show: false,
      totalSalarios: 0,
      totalComisiones: 0,
      totalSubTransporte: 0,
      totalSalarioMensual: 0,
      totalSalarioAnual: 0,
      totalSalarioPrestaciones: 0,
      nuevosCargos: []
    }
  },
  computed: {
    ...mapGetters(['nominas']),
    isAllow () {
      let available = false
      if (this.nominas.years[this.year].aumentoSalarial != null &&
          this.nominas.years[this.year].maxSalarioTransporte != null &&
          this.nominas.years[this.year].subTransporteBase != null &&
          this.nominas.years[this.year].prestaciones != null) {
        available = true
      }
      return available
    },
    ids () {
      const ids = [
        `aumentoSalarial-${this.year}`,
        `maxSalarioTransporte-${this.year}`,
        `subTransporteBase-${this.year}`,
        `prestaciones-${this.year}`
      ]
      return ids
    },
    idsCargos () {
      const ids = []
      for (let i = 0; i < this.nominas.cargos[this.year].length; i++) {
        ids.push(`comision-${this.year}-${i}`)
      }
      return ids
    },
    totalContado () {
      return this.nominas.contado * this.totalSalarioPrestaciones
    },
    totalCredito () {
      return this.nominas.credito * this.totalSalarioPrestaciones
    }
  },
  methods: {
    calcularTotal (data) {
      this.totalSalarios += data.salario
      this.totalComisiones += data.comision
      this.totalSubTransporte += data.subTransporte
      this.totalSalarioMensual += data.salarioMensual
      this.totalSalarioAnual += data.salarioAnual
      this.totalSalarioPrestaciones += data.salarioPrestaciones

      const nuevoCargo = {
        cargo: data.cargo,
        salario: data.salario,
        comision: null,
        porcentajeVentas: data.porcentajeVentas
      }
      this.nuevosCargos.push(nuevoCargo)
    },
    showTable () {
      this.show = true
      this.$store.commit('newYearNominas', this.nuevosCargos)
      this.$store.commit('blockCargosNominas')
    }
  },
  beforeDestroy () {
    const payload = {
      totalSalarioPrestaciones: {
        index: this.year,
        value: this.totalSalarioPrestaciones
      },
      totalContado: {
        index: this.year,
        value: this.totalContado
      },
      totalCredito: {
        index: this.year,
        value: this.totalCredito
      }
    }
    this.$store.commit('setTotalesPrestaciones', payload.totalSalarioPrestaciones)
    this.$store.commit('setTotalesContado', payload.totalContado)
    this.$store.commit('setTotalesCredito', payload.totalCredito)
  }
}
</script>
