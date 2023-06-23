<script setup>
    import { formatearCantidad } from '../helpers';
    import "vue3-circle-progress/dist/circle-progress.css";
    import CircleProgress from "vue3-circle-progress";
    import { computed } from 'vue';
    const props = defineProps({
        presupuesto : {
            type: Number,
            required: true
        },
        disponible : {
            type: Number,
            required: true
        },
        gastado : {
            type: Number,
            required: true
        }
    })

    defineEmits(['resetear-app'])

    const calculoGastado = computed(() => Number.parseInt(props.disponible * 100 / props.presupuesto))
</script>

<template>
    <div class="col-2">
        <div class="contenedor-grafico">
            <p class="porcentaje">{{ calculoGastado }}%</p>
            <CircleProgress 
                :percent="calculoGastado"
                :fill-color="'#3b82fa'"
                :empty-color="'#f5f5f5'" />
        </div>
        <div class="contenedor-presupuesto">
            <button 
                class="reset-app"
                @click="$emit('resetear-app')"
            >Resetear app</button>

            <p>
                <span>Presupuesto:</span>
                {{ formatearCantidad(presupuesto) }}
            </p>
            <p>
                <span>Disponible:</span>
                {{ formatearCantidad(disponible) }}
            </p>
            <p>
                <span>Gastado:</span>
                 {{ formatearCantidad(gastado) }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.col-2 {
    display: flex;
    flex-direction: column;
}

.col-2> :first-child {
    margin-bottom: 3rem;
}

@media (min-width: 768px) {
    .col-2 {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }

    .col-2> :first-child {
        margin-bottom: 0;
    }
}

.contenedor-presupuesto{
    width: 100%;
}

.contenedor-presupuesto p{
    font-size: 2.4rem;
    text-align: center;
    color: var(--gris-oscuro);
}
.contenedor-grafico{
    position: relative;
}
.porcentaje{
    font-weight: 900;
    color: var(--gris-oscuro);
    font-size: 4rem;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

@media (min-width: 768px){
    .contenedor-presupuesto p{
        text-align: left;
    }
}

.contenedor-presupuesto span{
    font-weight: 900;
    color: var(--azul);
}


.reset-app{
    background-color: #DB2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--blanco);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition: background-color 300ms ease;
}

.reset-app:hover{
    cursor: pointer;
    background-color: #c9246e;
}
</style>