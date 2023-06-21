<script setup>
    import { ref } from 'vue';
import imgBotonCerrar from '../assets/img/cerrar.svg'
    const emit = defineEmits(['close-modal'])
</script>

<template>
    <div class="modal">
        <div class="boton-cerrar">
            <img 
            :src="imgBotonCerrar" alt="Boton cerrar modal"
            @click="$emit('close-modal', false)"
            >
        </div>

        <form class="form-modal sombra" :class="animar">
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
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(3px);
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
    }

    .form-modal.mostrar{
        opacity: 1;
    }

    label{
        font-size: 2.4rem;
    }
</style>