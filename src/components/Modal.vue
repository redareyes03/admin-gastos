<script setup>
import { ref } from 'vue';
import imgBotonCerrar from '../assets/img/cerrar.svg'
import Alerta from './Alerta.vue';
const emit = defineEmits(['close-modal', 'update:nombre', 'update:cantidad', 'update:categoria', 'agregar-gasto'])

const alerta = ref('')

const props = defineProps({
    modalState: {
        type: Object,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    disponible: {
        type: Number,
        required: true
    },
    edicion: {
        type: Boolean,
        required: true
    }
})

const errorModal = ref(false)
const error = () => {
    errorModal.value = true
    setTimeout(() => errorModal.value = false, 300)
}

const cantidadAnterior = props.cantidad

const agregarPresupuesto = () => {
    const { nombre, cantidad, disponible, edicion } = props

    
    if ([nombre, cantidad, cantidad].includes('')) {
        alerta.value = 'Hay campos vacios'
        setTimeout(() => alerta.value = '', 1000)
        return
    }

    if(cantidad<=0){
        alerta.value = 'Cantidad invalida'
        setTimeout(() => alerta.value = '', 1000)
        return
    }
    if(edicion){
        if(cantidad > disponible + cantidadAnterior){
            alerta.value = 'La cantidad excede el limite disponible'
            setTimeout(() => alerta.value = '', 1000)
            return
        }
    }
    else{
        if(cantidad> disponible){
            alerta.value = 'La cantidad excede el limite disponible'
            setTimeout(() => alerta.value = '', 1000)
            return
        }
    }

    
    alerta.value = ''
    emit('agregar-gasto')
}   

</script>

<template>
    <div class="modal">
        <div class="boton-cerrar">
            <img :src="imgBotonCerrar" alt="Boton cerrar modal" @click="$emit('close-modal')">
        </div>

        <div class="background" @click="error" />


        <form class="form-modal contenedor sombra" :class="[modalState.animar ? 'mostrar' : ''],
            [errorModal && 'error']" @submit.prevent="agregarPresupuesto">
            <h2>{{ edicion ? 'Editar' : 'Agregar' }} gasto</h2>
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input id="nombre" type="text" placeholder="Nombre del gasto"
                    @input="$emit('update:nombre', $event.target.value)"
                    :value="nombre">
            </div>

            <div class="campo">
                <label for="cantidad">Cantidad</label>
                <input id="cantidad" type="number" placeholder="Cantidad gastada $"
                    @input="$emit('update:cantidad', +$event.target.value)"
                    :value="cantidad">
            </div>

            <div class="campo">
                <label for="categoria">Categoría</label>
                <select id="categoria" @input="$emit('update:categoria', $event.target.value)" :value="categoria">
                    <option selected disabled>-- Seleccione --</option>
                    <option value="ahorro">ahorro</option>
                    <option value="comida">comida</option>
                    <option value="casa">casa</option>
                    <option value="gastos">gastos varios</option>
                    <option value="ocio">ocio</option>
                    <option value="salud">salud</option>
                    <option value="suscripciones">suscripciones</option>
                </select>
            </div>

            <input type="submit" :value="[edicion ? 'editar' : 'agregar'] + ' gasto'">
            <Alerta v-if="alerta">
                <p>{{ alerta }}</p>
            </Alerta>
        </form>

    </div>
</template>

<style scoped>
.modal {

    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.background {
    width: 100%;
    height: 100%;
}

.boton-cerrar {
    width: 4rem;
}

.boton-cerrar img {
    opacity: 0.8;
    position: absolute;
    right: 5rem;
    top: 5rem;
    width: 4rem;
    transition: opacity 300ms ease;
    cursor: pointer;
}

.boton-cerrar img:hover {
    opacity: 1;
}

.form-modal {
    opacity: 0;
    background-color: var(--blanco);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4rem;
    transition: all 300ms ease-in-out;
    z-index: 1;
}

.form-modal h2{
    margin: 0;
    margin-bottom: 3rem;
    text-transform: uppercase;
}

.form-modal.mostrar {
    opacity: 1;
}

.form-modal.error {
    animation: errorModal 300ms ease;
}

option{
    text-transform: capitalize;
}

label {
    font-size: 2.4rem;
}

@keyframes errorModal {
    0% {
        transform: translate(calc(-50% + 10px), -50%);
    }

    25% {
        transform: translate(calc(-50% - 10px), -50%);
    }

    50% {
        transform: translate(calc(-50% + 10px), -50%);
    }

    75% {
        transform: translate(calc(-50% - 10px), -50%);
    }

    100% {
        transform: translate(calc(-50% + 10px), -50%);
    }
}
</style>