#!/bin/bash

echo "🔍 Validando inventario táctil..."

# Archivos esenciales
archivos=(index.html style.css script.js manifest.json README.md html2canvas.min.js)
echo "📄 Validando archivos esenciales..."
for f in "${archivos[@]}"; do
  if [ -f "$f" ]; then
    echo "✅ $f"
  else
    echo "❌ Falta: $f"
  fi
done

# Array de productos
echo "🧠 Validando array de productos..."
if grep -q "productos = \[" script.js; then
  echo "✅ Array detectado"
  grep -q "Coca 450" script.js && echo "✅ Coca 450 presente" || echo "⚠️ Coca 450 no detectada"
else
  echo "❌ Array no detectado"
fi

# Generación de tabla
echo "🧮 Validando ejecución de generarTabla()..."
if grep -q "function generarTabla()" script.js && grep -q "generarTabla();" script.js; then
  echo "✅ generarTabla() presente y ejecutada"
else
  echo "❌ No se genera tabla"
fi

# Ajustes del día
echo "📦 Validando ajustes finales..."
ajustes=(desechable fiados gastos)
faltan=0
for a in "${ajustes[@]}"; do
  grep -q "id=\"$a\"" index.html || { echo "❌ Falta ajuste: $a"; faltan=1; }
done
[ "$faltan" -eq 0 ] && echo "✅ Ajustes completos"

# Calculadora de barras
echo "🧊 Validando calculadora de barras..."
if grep -q "id=\"barrasRecibidas\"" index.html && grep -q "function calcularBarras()" script.js; then
  echo "✅ Calculadora presente"
else
  echo "❌ Falta calculadora"
fi

# Botón de captura
echo "📸 Validando botón de captura..."
grep -q "guardarCaptura()" index.html && echo "✅ Botón de captura presente" || echo "❌ Falta botón"

echo "✅ Validación completa. Si todo está en verde, el dashboard está listo."
