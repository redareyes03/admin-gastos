<script setup>
import { formatearCantidad, formatearFecha } from '../helpers'
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const props = defineProps({
    gasto: {
        type: Object,
        required: true
    }
})

defineEmits(['editar-gasto'])
</script>

<template>
    <div class="gasto sombra" @click="$emit('editar-gasto', gasto.id)">
        <div class="contenido">
            <img :src="diccionarioIconos[gasto.categoria]" :alt="'Icono gasto' + gasto.categoria">
            <div class="detalles">
                <div>
                    <p class="categoria">{{ gasto.categoria }}</p>
                    <p class="nombre">{{ gasto.nombre }}</p>
                    <p class="fecha"><span>Fecha:</span> {{ formatearFecha(gasto.fecha) }}</p>
                </div>
                <p class="cantidad">{{ formatearCantidad(gasto.cantidad) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gasto {
    padding: 2rem 4rem;
    margin-bottom: 4rem;
    cursor: pointer;
}

.contenido{
    display: flex;
    gap: 3rem;
}

.contenido img{
    width: 4.5rem;
}

.detalles{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.detalles div p{
    margin: 0;
    margin-bottom: 1rem;
}

.detalles .categoria{
    text-transform: uppercase;
    color: var(--gris);
    font-weight: 900;
    font-size: 1.2rem;
}

.detalles .nombre{
    color: var(--gris-oscuro);
    font-size: 2.4rem;
    text-transform: capitalize;
    font-weight: 700;
}

.detalles .fecha{
    color: var(--gris-oscuro);
}

.detalles .fecha span{
    font-weight: 900;
}

.detalles .cantidad{
    font-weight: 900;
    font-size: 2rem;
}

</style>