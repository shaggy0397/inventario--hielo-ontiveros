#!/bin/bash

echo "🔐 Cerrando el día táctil..."

# Abrir el dashboard en navegador local
xdg-open index.html &

# Esperar 5 segundos para que cargue
sleep 5

# Validar inventario
./validar_inventario.sh

# Avisar al usuario
echo "🧮 Calcula el total final desde el botón 'Calcular total final'"
echo "📸 Luego toca 'Guardar captura' para generar captura.png"
echo "🔁 Finalmente toca 'Cerrar día' para reiniciar inventario"

echo "✅ Día cerrado. Captura lista para archivar o compartir."
