<template lang="pug">
  .row
    .input-field.col.s4
      input.validate(:id='ids[0]', type='text',
                    :class='{disabled: block}',
                    :disabled='block',
                    v-model='nominas.cargos[0][index].cargo')
      label.active(:for='ids[0]') Cargo
    .input-field.col.s3
      input.validate(:id='ids[1]', type='number',
                    :class='{disabled: block}',
                    :disabled='block'
                    v-model.number='nominas.cargos[0][index].salario')
      label.active(:for='ids[1]') Salario
    .input-field.col.s3
      input.validate(:id='ids[2]', type='text',
                    :class='{disabled: block}',
                    :disabled='block'
                    v-model.number='nominas.cargos[0][index].porcentajeVentas')
      label.active(:for='ids[2]') % de ventas
    .col.s2
      button(type='button',
            @click='deleteCargo',
            :class='{disabled: block}').btn-floating.red.darken-1
       i.material-icons delete
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['index', 'block'],
  computed: {
    ...mapGetters(['nominas']),
    ids () {
      return [`cargo${this.index}`, `salario${this.index}`, `porcentajeVentas${this.index}`]
    }
  },
  methods: {
    deleteCargo () {
      this.$store.commit('deleteCargoNominas', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 10px;
}
</style>
