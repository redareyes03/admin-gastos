<script setup>
    import { formatearCantidad } from '../helpers';

    const props = defineProps({
        presupuesto : {
            type: Number,
            required: true
        },
        disponible : {
            type: Number,
            required: true
        }
    })
</script>

<template>
    <div class="col-2">
        <div class="contenedor-grafico">
            imagen
        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app">Resetear app</button>

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
                 $0
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