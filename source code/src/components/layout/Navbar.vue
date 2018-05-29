<template lang="pug">
  div.navbar-fixed
    nav
      .nav-wrapper
        router-link(to='/')
          .brand-logo(@click='activate(0)') Economia Empresarial
        ul#nav-mobile.right.hide-on-med-and-down
          li(:class='{active: activeElement == 1}', @click='activate(1)')
            router-link(to="/presupuestos")  Presupuestos
          li(:class='{active: activeElement == 2}', @click='activate(2)')
            router-link(to="/nominas")  Nominas
          li(:class='{active: activeElement == 3}', @click='activate(3)')
            router-link(to="/gastos") Gastos generales
          li(:class='{active: activeElement == 4}', @click='activate(4)')
            router-link(to="/depreciaciones") Depreciaciones
          li(:class='{active: activeElement == 5}', @click='activate(5)')
            router-link(to="/resultados") Estado de resultados
          li(:class='{active: activeElement == 6}', @click='activate(6)')
            router-link(to="/flujos") Flujos de caja
          li(:class='{active: activeElement == 7}', @click='activate(7)')
            router-link(to="/balance")  Balance general
</template>

<script>
export default {
  data () {
    return {
      activeElement: 0
    }
  },
  methods: {
    activate (el) {
      this.activeElement = el
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/settings';
@import url('https://fonts.googleapis.com/css?family=Pacifico');
nav {
  background-color: $first-color;
}
nav .brand-logo {
  font-family: 'Pacifico', cursive;
}
nav li:hover {
  background-color: $fourth-color;
}
.active {
  background-color: $second-color;
}
.active:hover{
  background-color: $second-color;
}
</style>
