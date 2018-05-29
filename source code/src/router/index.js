import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Presupuestos from '@/components/presupuestos/presupuesto'
import Nominas from '@/components/nominas/nomina'
import Gastos from '@/components/gastosGenerales/gastosGenerales'
import Depreciaciones from '@/components/depreciaciones/depreciaciones'
import Resultados from '@/components/resultados/resultados'
import FlujoDeCaja from '@/components/flujos/flujoDeCaja'
import Balance from '@/components/balanceGeneral/balance'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/presupuestos', name: 'presupuestos', component: Presupuestos },
    { path: '/nominas', name: 'nominas', component: Nominas },
    { path: '/gastos', name: 'gastos', component: Gastos },
    { path: '/depreciaciones', name: 'depreciaciones', component: Depreciaciones },
    { path: '/resultados', name: 'resultados', component: Resultados },
    { path: '/flujos', name: 'flujos', component: FlujoDeCaja },
    { path: '/balance', name: 'balance', component: Balance }
  ]
})
