<script setup>
import { onMounted, ref, watch } from 'vue';
import imgNuevoGasto from './assets/img/nuevo-gasto.svg'
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue'
import Modal from './components/Modal.vue';

const presupuesto = ref(0)
const disponible = ref(0)
const isOpenModal = ref(false)

const definirPresupuesto = (nuevoPresupuesto) => {
    presupuesto.value = nuevoPresupuesto
    disponible.value = nuevoPresupuesto
}

const setModalState = (value) => isOpenModal.value = value

watch(presupuesto, () => window.localStorage.setItem('presupuesto', JSON.stringify(presupuesto.value)))
watch(disponible, () => window.localStorage.setItem('disponible', JSON.stringify(disponible.value)))

onMounted(() => {
    presupuesto.value = Number(window.localStorage.getItem('presupuesto'))
    disponible.value = Number(window.localStorage.getItem('disponible'))
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
            />
        </div>
    </header>

    <main v-if="presupuesto">
        <div class="crear-gasto">
            <img
            alt="Icono nuevo gasto"
            :src="imgNuevoGasto"
            @click="setModalState(true)"
            >
        </div>
    </main>

    <Modal
    v-if="isOpenModal"
    @close-modal="setModalState"
    />
</template>

<style >
    :root{
        --azul: #3b82f6;
        --blanco: #fff;
        --girs-claro: #f5f5f5;
        --gris: #94a3b8;
        --gris-oscuro: #64748b;
        --negro: #000;
    }
    html{
        font-size: 62.5%;
        box-sizing: border-box;
    }
    *,
    *::before,
    *::after{
        box-sizing: inherit;
    }
    body{
        font-size: 1.6rem;
        font-family: "Lato", sans-serif;
        background-color: var(--girs-claro);
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

    .crear-gasto{
        position: fixed;
        bottom: 5rem;
        right: 5rem;
    }

    .crear-gasto img{
        width: 5rem;
        cursor: pointer;
        opacity: 0.8;
    }

    .crear-gasto img:hover{
        opacity: 1;
        transition: opacity 300ms ease;
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

    
</style>
