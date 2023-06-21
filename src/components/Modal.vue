<script setup>
    import { ref } from 'vue';
import imgBotonCerrar from '../assets/img/cerrar.svg'
    const emit = defineEmits(['close-modal'])

    const props = defineProps({
        modalState: {
            type: Object,
            required: true
        }
    })

    const errorModal = ref(false)
    const error = () => errorModal.value = true

</script>

<template>
    <div class="modal">
        <div class="boton-cerrar">
            <img 
            :src="imgBotonCerrar" alt="Boton cerrar modal"
            @click="$emit('close-modal')"
            >
        </div>

        <div class="background" @click="error" />


        <form class="form-modal sombra" 
        :class="
        [modalState.animar ? 'mostrar' : '']">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input id="nombre" type="text" placeholder="Nombre del gasto">
            </div>
            
            <div class="campo">
                <label for="cantidad">Cantidad</label>
                <input id="cantidad" type="number" placeholder="Cantidad gastada $">
            </div>
            
            <div class="campo">
                <label for="categoria">Categoría</label>
                <select id="categoria">
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

            <input type="submit" value="agregar presupuesto">
        </form>

    </div>
</template>

<style scoped>
    .modal{
        
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(3px);
    }
    .modal{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .background{
        width: 100%;
        height: 100%;
    }

    .boton-cerrar{
        width: 4rem;
    }

    .boton-cerrar img{
        opacity: 0.8;
        position: absolute;
        right: 5rem;
        top: 5rem;
        width: 4rem;
        transition: opacity 300ms ease;
        cursor: pointer;
    }

    .boton-cerrar img:hover{
        opacity: 1;
    }

    .form-modal{
        opacity: 0;
        background-color: var(--blanco);
        width: 120rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 4rem;
        transition: all 300ms ease-in-out;
        z-index: 1;
    }

    .form-modal.mostrar{
        opacity: 1;
    }

    label{
        font-size: 2.4rem;
    }

    @keyframes errorModal{
        25% {
            transform: translateX(5px);
        }
        50%{
            transform: translateX(-5px);
        }
        75%{
            transform: translateX(5px);
        }
        100%{
            transform: translateX(-5px);
        }
    }
</style>