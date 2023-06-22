<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import imgNuevoGasto from './assets/img/nuevo-gasto.svg'
import imgBorrarGastos from './assets/img/delete.png'
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue'
import Modal from './components/Modal.vue';
import Gasto from './components/Gasto.vue'
import {v4 as uid} from 'uuid'

const presupuesto = ref(0)
const disponible = ref(0)
const gastado = ref(0)
const gasto = reactive({
    nombre: "",
    cantidad: "",
    categoria: "",
    fecha: "",
    id: null
}
)
const gastos = ref([])
const modalState = reactive({
    isOpen: false, animar: false
})
// Modos
const edicion = ref(false)
const borrar = ref(false)
const gastosEliminados = ref([])


watch(presupuesto, () => window.localStorage.setItem('presupuesto', JSON.stringify(presupuesto.value)))
watch(disponible, () => window.localStorage.setItem('disponible', JSON.stringify(disponible.value)))
watch(gastos, () =>  {
    window.localStorage.setItem('gastos', JSON.stringify(gastos.value))
    gastado.value = gastos.value.reduce((total, gasto) => total + gasto.cantidad, 0)
    disponible.value = presupuesto.value - gastado.value
}
, {deep: true}
)

const agregarGasto = () => {
    if(gasto.id){
        const idEditar = gastos.value.findIndex(({id}) => id === gasto.id )
        gastos.value[idEditar] = {...gasto}
    }else{
        gastos.value.push({
            ...gasto,
            id: uid(),
            fecha: Date.now()
        })
    }

    closeModal()
}


const openModal = () => {
    modalState.isOpen = true
    setTimeout(() => modalState.animar = true, 100)
}

const closeModal = () => {
    modalState.animar = false
    setTimeout(() => {
        modalState.isOpen = false
        Object.assign(gasto, {
            nombre: "",
            cantidad: "",
            categoria: "",
            fecha: "",
            id: null
        })
        edicion.value = false;

    }, 100)
}

const definirPresupuesto = (nuevoPresupuesto) => {
    presupuesto.value = nuevoPresupuesto
    disponible.value = nuevoPresupuesto
}

const editarGasto = (id) => {
    edicion.value = true
    const gastoEditar = gastos.value.filter(gasto => gasto.id === id)[0]
    Object.assign(gasto, gastoEditar)
    openModal()
}

const activarModoBorrar = () => borrar.value = true
const desactivarModoBorrar = () => {
    borrar.value = false
    gastosEliminados.value = []
}

const borrarGastos = () => {
    gastos.value = gastos.value.filter(gasto => !gastosEliminados.value.some(eliminado => eliminado.id === gasto.id))
    desactivarModoBorrar()
}


const modificarGasto = id => {
    if(!borrar.value){
        editarGasto(id)
    }
    else{
        const gastoEliminar = gastos.value.filter(gasto => gasto.id === id)[0]
        gastosEliminados.value.push(gastoEliminar)
    }
}

onMounted(() => {
    presupuesto.value = Number(window.localStorage.getItem('presupuesto'))
    disponible.value = Number(window.localStorage.getItem('disponible'))
    if(!JSON.parse(window.localStorage.getItem('gastos'))){
        window.localStorage.setItem('gastos', JSON.stringify([]))
    }
    gastos.value = JSON.parse(window.localStorage.getItem('gastos'))
})
</script>

<template>
    <header>
        <h1>Planificador de Gastos</h1>
        <div class="contenedor-header contenedor sombra">
            <Presupuesto
            v-if="!presupuesto"
            @definir-presupuesto="definirPresupuesto"
            />
            <ControlPresupuesto v-else
            :presupuesto="presupuesto"
            :disponible="disponible"
            :gastado="gastado"
            />
        </div>
    </header>

    <main v-if="presupuesto">
        <div class="listado-gastos contenedor">
            <h2>{{ gastos.length ? 'Gastos' : 'No hay gastos' }}</h2>

            <Gasto 
                v-for="gasto in gastos"
                :key="gasto.id"
                :gasto="gasto"
                :borrar="borrar"
                @modificar-gasto="modificarGasto"/>
        </div>


        <div class="crear-gasto">
            <img
            alt="Icono nuevo gasto"
            :src="imgNuevoGasto"
            @click="openModal"
            >
        </div>

        <div class="borrar-gastos">
            <img 
            alt="Icono borrar gastos"
            :src="imgBorrarGastos"
            @click="activarModoBorrar" 
            >
        </div>

        <button 
            v-if="borrar" 
            class="boton-borrar"
            @click="borrarGastos"
        >Borrar</button>
        <button 
            v-if="borrar" 
            class="desactivar-borrar"
            @click="desactivarModoBorrar"
        >Desactivar modo borrar</button>
    </main>

    <Modal
    v-if="modalState.isOpen"
    :modalState="modalState"
    :disponible="disponible"
    :edicion="edicion"
    @close-modal="closeModal"
    @agregar-gasto="agregarGasto"
    v-model:nombre="gasto.nombre"
    v-model:cantidad="gasto.cantidad"
    v-model:categoria="gasto.categoria"
    />
</template>

<style >
    :root{
        --azul: #3b82f6;
        --blanco: #fff;
        --gris-claro: #f5f5f5;
        --gris: #94a3b8;
        --gris-oscuro: #64748b;
        --negro: #000;
    }
    html{
        font-size: 62.5%;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }
    *,
    *::before,
    *::after{
        box-sizing: inherit;
    }
    body{
        font-size: 1.6rem;
        font-family: "Lato", sans-serif;
        background-color: var(--gris-claro);
    }
    h1{
        font-size: 4rem;
    }
    h2{
        font-size: 3rem;
    }
    header{
        background-color: var(--azul);
    }
    header h1{
        padding: 3rem 0;
        margin: 0;
        color: var(--blanco);
        text-align: center;
    }

    .contenedor{
        width: 90%;
        max-width: 80rem;
        margin: 0 auto;
    }

    .contenedor-header{
        margin-top: -5rem;
        transform: translateY(5rem);
        padding: 5rem;
    }

    .sombra{
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        background-color: var(--blanco);
        border-radius: 1.2rem;
    }

    .crear-gasto, .borrar-gastos{
        position: fixed;
        right: 5rem;
    }
    
    .crear-gasto{
        bottom: 5rem;
    }

    .borrar-gastos{
        bottom: 12rem;
    }

    :is(.crear-gasto, .borrar-gastos) img{
        width: 5rem;
        cursor: pointer;
        opacity: 0.7;
    }

    :is(.crear-gasto, .borrar-gastos) img:hover{
        opacity: 1;
        transition: opacity 300ms ease;
    }

    .desactivar-borrar, .boton-borrar{
        border: none;
        border-radius: 1rem;
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        color: var(--blanco);
        font-weight: 900;
        cursor: pointer;
        text-transform: uppercase;
        position: fixed;
        bottom: 4rem;
    }

    .boton-borrar{
        background-color: #f83232;
        left: 40%;
        transform: translateX(-50%);
    }
    
    .desactivar-borrar{
        background-color: var(--azul);
        left: 60%;
        transform: translateX(-50%);
    }

    .campo{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2.5rem;
    }

    input[type="submit"]{
        background-color: var(--azul);
        border: none;
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        color: var(--blanco);
        font-weight: 900;
        width: 100%;
        cursor: pointer;
        text-transform: uppercase;
        margin-bottom: 2rem;
    }

    input, select{
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: 1px solid var(--gris-oscuro);
        outline: none;
        font-size: 2.2rem;
    }

    input[type="submit"]:hover{
        background-color: #1048A4;
        transition: background-color 300ms ease;
    }

    .listado-gastos{
        margin-top: 10rem;
    }
</style>
