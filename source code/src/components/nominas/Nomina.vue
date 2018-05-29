<template lang="pug">
  .container.center
    h4 NOMINA
    .row
      .input-field.col.s2.offset-s3
        input#contado(type='number', v-model.number='nominas.contado')
        label.active(for='contado') % Pago de contado
      .input-field.col.s2
        input#credito(type='number', v-model.number='nominas.credito')
        label.active(for='credito') % Pago a credito
      .input-field.col.s2
        button(type='button',
              @click='nuevoCargo',
              :class='{disabled: nominas.block}').btn.blue.darken-1.waves-effect.waves-light Nuevo cargo
    .row
      .col.s6(v-for='(item, index) in nominas.cargos[0]', :key='index')
        ec-cargo(:index='index', :block='nominas.block')
    ec-year(v-for='(i, index) in years', :key='index',
            :salariosBase='nominas.cargos[index]',
            :year='index',
            :ventaContado='ventasContado[index]',
            v-if='ventasContado[index] && isAllow && nominas.years[index]')
</template>

<script>
import {mapGetters} from 'vuex'
import EcCargo from '@/components/nominas/cargo'
import EcYear from '@/components/nominas/year'

export default {
  components: { EcYear, EcCargo },
  data () {
    return {
      years: 5
    }
  },
  computed: {
    ...mapGetters(['ventasContado', 'nominas']),
    isAllow () {
      let allow = true
      if (!this.nominas.cargos[0].length) {
        allow = false
      } else {
        for (let i = 0; i < this.nominas.cargos[0].length; i++) {
          let cargo = this.nominas.cargos[0][i].cargo
          let salario = this.nominas.cargos[0][i].salario
          let porcentaje = this.nominas.cargos[0][i].porcentajeVentas
          if (!cargo || !salario || porcentaje == null) allow = false
        }
      }
      return allow
    }
  },
  methods: {
    nuevoCargo () {
      const cargo = {
        cargo: '',
        salario: null,
        comision: null,
        porcentajeVentas: null
      }
      this.$store.commit('addCargoNominas', cargo)
    },
    blockItems () {
      this.$store.commit('blockCargosNominas')
    }
  }
}
</script>
