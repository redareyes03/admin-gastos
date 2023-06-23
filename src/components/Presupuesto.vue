<script setup>
    import {onMounted, ref, watch} from 'vue'
    import Alerta from './Alerta.vue'

    const emit = defineEmits(['definir-presupuesto'])
    const alerta = ref('')
    const presupuesto = ref(0)
    
    const definirPresupuesto = () => {
        if(presupuesto.value <= 0){
            alerta.value = 'Presupuesto inválido'
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

    label{
        font-size: 2.2rem;
        text-align: center;
        color: var(--azul);
    }

    input{
        text-align: center;
    }
</style>