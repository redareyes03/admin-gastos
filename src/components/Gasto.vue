<script setup>
import { formatearCantidad } from '../helpers'
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
</script>

<template>
    <div class="gasto sombra">
        <div class="contenido">
            <img :src="diccionarioIconos[gasto.categoria]" :alt="'Icono gasto' + gasto.categoria">
            <div class="detalles">
                <p class="categoria">{{ gasto.categoria }}</p>
                <p class="nombre">{{ gasto.nombre }}</p>
                <p>{{ gasto.fecha }}</p>
                <p class="cantidad">{{ formatearCantidad(gasto.cantidad) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gasto {
    padding: 1.5rem 4rem;
}

.contenido{
    display: flex;
}

.contenido img{
    width: 5rem;
}

</style>