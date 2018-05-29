<template lang="pug">
  #app
    ec-navbar
    main
      router-view
    ec-footer
</template>

<script>
import EcNavbar from '@/components/layout/navbar'
import EcFooter from '@/components/layout/footer'

export default {
  name: 'App',
  components: { EcNavbar, EcFooter }
}
</script>

<style lang="scss">
@import '~styles/settings';
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
main {
  flex: 1 0 auto;
}
.container{
  padding-top: 10px;
  padding-bottom: 40px
}
table{
  border: 1px solid rgb(165, 163, 163);
}
table tr {
  border-bottom: 1px solid rgb(165, 163, 163);
}
table > thead > tr {
  background-color: $fourth-color;
  color: #fff;
}
h4 {
  color: $third-color;
  font-weight: bold;
}
h5 {
  font-weight: bold;
}
@media only screen and (min-width: 993px){
  .container {
      width: 80%;
  }
}
</style>
