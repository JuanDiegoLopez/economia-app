<template lang="pug">
  .row
    .input-field.col.s4
      input.validate(:id='ids[0]', type='text', :disabled='block',
                    v-model='depreciaciones.items[index].denominacion')
      label.active(:for='ids[0]') Denominación
    .input-field.col.s3
      input.validate(:id='ids[1]', type='number', :disabled='block',
                    v-model.number='depreciaciones.items[index].valor')
      label.active(:for='ids[1]') Valor
    .input-field.col.s3
      input.validate(:id='ids[2]', type='number', :disabled='block',
                    v-model.number='depreciaciones.items[index].years')
      label.active(:for='ids[2]') Años de uso
    .col.s2
      button(type='button', @click='deleteItem', :class='{disabled: block}').btn-floating.red.darken-1
       i.material-icons delete
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: ['index', 'block'],
  computed: {
    ...mapGetters(['depreciaciones']),
    ids () {
      return [`deno${this.index}`, `valor${this.index}`, `years${this.index}`]
    }
  },
  methods: {
    deleteItem () {
      this.$store.commit('deleteItemDepreciaciones', this.index)
      this.$emit('deleteItem')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 10px;
}
</style>
