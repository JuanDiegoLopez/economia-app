<template lang="pug">
  .row
    .input-field.col.s4
      input.validate(:id='ids[0]', type='text',
                    :class='{disabled: block}',
                    :disabled='block',
                    v-model='flujos.items[index].denominacion')
      label.active(:for='ids[0]') Denominación
    .input-field.col.s3
      input.validate(:id='ids[1]', type='number',
                    :class='{disabled: block}',
                    :disabled='block'
                    v-model.number='flujos.items[index].valor')
      label.active(:for='ids[1]') Valor anual
    .input-field.col.s3
      input.validate(:id='ids[2]', type='number',
                    :class='{disabled: block}',
                    :disabled='block'
                    v-model.number='flujos.items[index].years')
      label.active(:for='ids[2]') Años
    .col.s2
      button(type='button',
            @click='deleteItem',
            :class='{disabled: block}').btn-floating.red.darken-1
       i.material-icons delete
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['index', 'block'],
  computed: {
    ...mapGetters(['flujos']),
    ids () {
      return [`deno${this.index}`, `valor${this.index}`, `year${this.index}`]
    }
  },
  methods: {
    deleteItem () {
      this.$store.commit('deleteItemFlujos', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 10px;
}
</style>
