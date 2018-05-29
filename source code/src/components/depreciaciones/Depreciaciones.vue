<template lang="pug">
  .container.center
    h4 DEPRECIACIONES
    button(type='button',
          @click='nuevoItem',
          :class='{disabled: depreciaciones.block}').btn.blue.darken-1.waves-effect.waves-light Nuevo item
    button(type='button', @click='showTable',
          :class='{disabled: !isAllow || show}').btn.blue.darken-1.waves-effect.waves-light Generar tabla
    .row
      .col.s6(v-for='(item, index) in depreciaciones.items', :key='index')
        ec-item(:index='index', @deleteItem='hideTable', :block='depreciaciones.block')
    table.centered(v-if='show')
      thead
        tr
          th Denominación
          th Valor
          th Años de uso
          th(v-for='i in years', :key='i') Año {{ i }}
      tbody
        ec-item-table(v-for='(item, index) in depreciaciones.items', :key='index'
                      :item='item', :years='years', @valorAnual='calcularTotal')
        tr
          th.center(colspan='3') TOTAL DEPRECIACIONES
          td(v-for='(i, index) in years', :key='i') {{ valoresTotales[index] | formatNumber }}
</template>

<script>
import { mapGetters } from 'vuex'
import EcItem from '@/components/depreciaciones/item'
import EcItemTable from '@/components/depreciaciones/itemTable'

export default {
  components: { EcItem, EcItemTable },
  created () {
    if (this.isAllow) this.show = true
  },
  data () {
    return {
      years: 5,
      valoresTotales: [],
      show: false
    }
  },
  computed: {
    ...mapGetters(['depreciaciones']),
    isAllow () {
      if (!this.depreciaciones.items.length) {
        return false
      }
      let allow = true
      this.depreciaciones.items.forEach(item => {
        if (!item.denominacion || !item.valor || !item.years) allow = false
      })
      return allow
    }
  },
  methods: {
    nuevoItem () {
      this.show = false
      this.valoresTotales = []
      const item = {
        denominacion: '',
        valor: null,
        years: null
      }
      this.$store.commit('addItemDepreciaciones', item)
    },
    calcularTotal (valoresAnuales) {
      if (!this.valoresTotales.length) {
        this.valoresTotales = valoresAnuales
      } else {
        let nuevosValores = []
        for (let i = 0; i < this.valoresTotales.length; i++) {
          nuevosValores[i] = this.valoresTotales[i] + valoresAnuales[i]
        }
        this.valoresTotales = nuevosValores
      }
    },
    showTable () {
      this.show = true
      this.valoresTotales = []
      this.$store.commit('blockItemsDepreciaciones')
    },
    hideTable () {
      this.show = false
    }
  },
  beforeDestroy () {
    this.$store.commit('setDepreciacionesTotales', this.valoresTotales)
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
