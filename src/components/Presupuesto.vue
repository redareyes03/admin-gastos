<script setup>
    import {onMounted, ref, watch} from 'vue'
    import Alerta from './Alerta.vue'

    const emit = defineEmits(['definir-presupuesto'])
    const alerta = ref('')
    const presupuesto = ref(0)
    
    const definirPresupuesto = () => {
        if(presupuesto.value <= 0){
            alerta.value = 'Hay campos vacíos'
            return
        }
        alerta.value = ''
        emit('definir-presupuesto', presupuesto.value)
    }


</script>

<template>
    <form 
        class="presupuesto"
        @submit.prevent="definirPresupuesto">

        <Alerta v-if="alerta">
            <p>{{ alerta }}</p>
        </Alerta>

        <div class="campo">
            <label for="">Define tu presupuesto</label>
            <input 
                id="nuevo-presupuesto"
                class="nuevo-presupuesto"
                placeholder="Añade tu presupuesto"
                type="number"
                min="0"
                v-model="presupuesto"
            >
        </div>
        <input type="submit" value="Definir presupuesto">
    </form>
</template>

<style scoped>
    .presupuesto{
        width: 100%;
    }
    .campo{
        display: grid;
        gap: 2rem;
    }

    .presupuesto input[type="number"]{
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: 1px solid var(--gris-oscuro);
        outline: none;
        font-size: 2.2rem;
        text-align: center;
    }

    .presupuesto input[type="submit"]{
        background-color: var(--azul);
        border: none;
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        margin-top: 2rem;
        color: var(--blanco);
        font-weight: 900;
        width: 100%;
        cursor: pointer;
    }

    .presupuesto input[type="submit"]:hover{
        background-color: #1048A4;
        transition: background-color 300ms ease;
    }

    .presupuesto label{
        font-size: 2.2rem;
        text-align: center;
        color: var(--azul);
}
</style>