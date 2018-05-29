import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    presupuestos: {
      nombreProducto: '',
      aumentoCompraBase: null,
      cantidadVentas: [],
      preciosCompra: [],
      cantidadInventario: [0],
      years: {
        incrementosAnuales: [null, null, null, null, null],
        ganancias: [null, null, null, null, null],
        porcentajesVentas: [null, null, null, null, null],
        porcentajesCompras: [null, null, null, null, null],
        ventasTotales: [],
        ventasContado: [],
        ventasCredito: [],
        comprasTotales: [],
        comprasContado: [],
        comprasCredito: [],
        inventarioTotal: []
      }
    },
    nominas: {
      block: false,
      contado: null,
      credito: null,
      totalesPrestaciones: [],
      totalesContado: [],
      totalesCredito: [],
      cargos: [
        []
      ],
      years: [
        {
          aumentoSalarial: null,
          maxSalarioTransporte: null,
          subTransporteBase: null,
          prestaciones: null
        }
      ]
    },
    gastos: {
      blockItems: false,
      gastosTotales: [],
      items: [
        []
      ],
      years: [
        {
          incrementoAnual: null,
          porcentajeImprevistos: null
        }
      ]
    },
    depreciaciones: {
      block: false,
      items: [],
      depreciacionesTotales: []
    },
    resultados: {
      porcentajeImpuestos: null,
      impuestos: [],
      utilidades: []
    },
    flujos: {
      block: false,
      caja: null,
      bancos: null,
      saldoQuePasa: [],
      items: []
    },
    balance: {
      capitalIncial: null,
      porcentajeVariacion: null,
      variacionCapitalTrabajo: [],
      variacionActivosFijos: []
    }
  },
  getters: {
    cantidadInventario (state) {
      return state.presupuestos.cantidadInventario
    },
    ventasTotales (state) {
      return state.presupuestos.years.ventasTotales
    },
    comprasTotales (state) {
      return state.presupuestos.years.comprasTotales
    },
    ventasContado (state) {
      return state.presupuestos.years.ventasContado
    },
    ventasCredito (state) {
      return state.presupuestos.years.ventasCredito
    },
    comprasContado (state) {
      return state.presupuestos.years.comprasContado
    },
    comprasCredito (state) {
      return state.presupuestos.years.comprasCredito
    },
    inventarioTotal (state) {
      return state.presupuestos.years.inventarioTotal
    },
    nominas (state) {
      return state.nominas
    },
    prestacionesAnuales (state) {
      return state.nominas.totalesPrestaciones
    },
    pagosContado (state) {
      return state.nominas.totalesContado
    },
    pagosCredito (state) {
      return state.nominas.totalesCredito
    },
    gastos (state) {
      return state.gastos
    },
    gastosAnuales (state) {
      return state.gastos.gastosTotales
    },
    depreciaciones (state) {
      return state.depreciaciones
    },
    depreciacionesAnuales (state) {
      return state.depreciaciones.depreciacionesTotales
    },
    resultados (state) {
      return state.resultados
    },
    impuestos (state) {
      return state.resultados.impuestos
    },
    utilidades (state) {
      return state.resultados.utilidades
    },
    flujos (state) {
      return state.flujos
    },
    cajasBancos (state) {
      return state.flujos.cajasBancos
    },
    saldoQuePasa (state) {
      return state.flujos.saldoQuePasa
    },
    balance (state) {
      return state.balance
    },
    valorCaja (state) {
      return state.flujos.caja
    },
    valorBancos (state) {
      return state.flujos.bancos
    }
  },
  mutations: {
    setCantidadVentas (state, payload) {
      state.presupuestos.cantidadVentas[payload.index] = payload.value
    },
    setPreciosCompras (state, payload) {
      if (!state.presupuestos.preciosCompra[payload.index]) {
        state.presupuestos.preciosCompra.push(0)
      }
      state.presupuestos.preciosCompra[payload.index] = payload.value
    },
    setVentasTotales (state, payload) {
      if (!state.presupuestos.years.ventasTotales[payload.index]) {
        state.presupuestos.years.ventasTotales.push(0)
      }
      state.presupuestos.years.ventasTotales[payload.index] = payload.value
    },
    setVentasContado (state, payload) {
      if (!state.presupuestos.years.ventasContado[payload.index]) {
        state.presupuestos.years.ventasContado.push(0)
      }
      state.presupuestos.years.ventasContado[payload.index] = payload.value
    },
    setVentasCredito (state, payload) {
      if (!state.presupuestos.years.ventasCredito[payload.index]) {
        state.presupuestos.years.ventasCredito.push(0)
      }
      state.presupuestos.years.ventasCredito[payload.index] = payload.value
    },
    setComprasTotales (state, payload) {
      if (!state.presupuestos.years.comprasTotales[payload.index]) {
        state.presupuestos.years.comprasTotales.push(0)
      }
      state.presupuestos.years.comprasTotales[payload.index] = payload.value
    },
    setComprasContado (state, payload) {
      if (!state.presupuestos.years.comprasContado[payload.index]) {
        state.presupuestos.years.comprasContado.push(0)
      }
      state.presupuestos.years.comprasContado[payload.index] = payload.value
    },
    setComprasCredito (state, payload) {
      if (!state.presupuestos.years.comprasCredito[payload.index]) {
        state.presupuestos.years.comprasCredito.push(0)
      }
      state.presupuestos.years.comprasCredito[payload.index] = payload.value
    },
    setInventarioTotal (state, payload) {
      if (!state.presupuestos.years.inventarioTotal[payload.index]) {
        state.presupuestos.years.inventarioTotal.push(0)
      }
      state.presupuestos.years.inventarioTotal[payload.index] = payload.value
    },
    blockCargosNominas (state) {
      state.nominas.block = true
    },
    addCargoNominas (state, cargo) {
      state.nominas.cargos[0].push(cargo)
    },
    deleteCargoNominas (state, index) {
      state.nominas.cargos.forEach(array => {
        array.splice(index, 1)
      })
    },
    newYearNominas (state, cargos) {
      const newYear = {
        aumentoSalarial: null,
        maxSalarioTransporte: null,
        subTransporteBase: null,
        prestaciones: null
      }
      state.nominas.cargos.push(cargos)
      state.nominas.years.push(newYear)
    },
    setTotalesPrestaciones (state, payload) {
      if (!state.nominas.totalesPrestaciones[payload.index]) {
        state.nominas.totalesPrestaciones.push(0)
      }
      state.nominas.totalesPrestaciones[payload.index] = payload.value
    },
    setTotalesContado (state, payload) {
      if (!state.nominas.totalesContado[payload.index]) {
        state.nominas.totalesContado.push(0)
      }
      state.nominas.totalesContado[payload.index] = payload.value
    },
    setTotalesCredito (state, payload) {
      if (!state.nominas.totalesCredito[payload.index]) {
        state.nominas.totalesCredito.push(0)
      }
      state.nominas.totalesCredito[payload.index] = payload.value
    },
    addItemGastos (state, item) {
      state.gastos.items[0].push(item)
    },
    deleteItemGastos (state, index) {
      state.gastos.items.forEach(array => {
        array.splice(index, 1)
      })
    },
    newYearGastos (state, nuevosItems) {
      const newYear = {
        incrementoAnual: null,
        porcentajeImprevistos: null
      }
      state.gastos.years.push(newYear)
      state.gastos.items.push(nuevosItems)
    },
    blockItemsGastos (state) {
      state.gastos.blockItems = true
    },
    setTotalGastos (state, gasto) {
      state.gastos.gastosTotales.push(gasto)
    },
    addItemDepreciaciones (state, item) {
      state.depreciaciones.items.push(item)
    },
    deleteItemDepreciaciones (state, index) {
      state.depreciaciones.items.splice(index, 1)
    },
    setDepreciacionesTotales (state, payload) {
      state.depreciaciones.depreciacionesTotales = payload
    },
    blockItemsDepreciaciones (state) {
      state.depreciaciones.block = true
    },
    setUtilidadImpuestos (state, payload) {
      state.resultados.impuestos = payload
    },
    setUtilidadesDistribuir (state, payload) {
      state.resultados.utilidades = payload
    },
    setSaldoQuePasa (state, payload) {
      state.flujos.saldoQuePasa = payload
    },
    setVariacionCapitalTrabajo (state, payload) {
      state.balance.variacionCapitalTrabajo = payload
    },
    setVariacionActivosFijos (state, payload) {
      state.balance.variacionActivosFijos = payload
    },
    addItemFlujos (state, item) {
      state.flujos.items.push(item)
    },
    deleteItemFlujos (state, index) {
      state.flujos.items.splice(index, 1)
    },
    blockItemsFlujos (state) {
      state.flujos.block = true
    }
  }
})

export default store
