#!/bin/bash

# Script para calcular el interés simple sobre tokens

# Función para calcular el interés simple en tokens
calculate_simple_interest() {
    principal=$1   # Monto de tokens iniciales
    rate=$2        # Tasa de interés (en porcentaje)
    time=$3        # Tiempo (en años)
    interest=$(echo "scale=2; $principal * $rate * $time / 100" | bc)
    total_tokens=$(echo "$principal + $interest" | bc)
    echo "Tokens iniciales: $principal"
    echo "Interés simple: $interest"
    echo "Total de tokens después de $time años: $total_tokens"
}

# Comprobar si se proporcionan los argumentos necesarios
if [ "$#" -ne 3 ]; then
    echo "Uso: $0 <tokens iniciales> <tasa de interés> <tiempo en años>"
    exit 1
fi

# Llamar a la función con los argumentos
calculate_simple_interest $1 $2 $3
