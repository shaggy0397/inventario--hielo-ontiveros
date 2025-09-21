#!/bin/bash

echo "📸 Validando módulo de captura..."

# Verificar existencia de html2canvas
if grep -q "html2canvas.min.js" index.html && [ -f "html2canvas.min.js" ]; then
  echo "✅ html2canvas.min.js presente y enlazado"
else
  echo "❌ html2canvas.min.js faltante o no enlazado"
fi

# Verificar función guardarCaptura
if grep -q "function guardarCaptura()" script.js; then
  echo "✅ Función guardarCaptura() detectada"
else
  echo "❌ Falta la función guardarCaptura()"
fi

# Verificar botón en HTML
if grep -q "onclick=\"guardarCaptura()" index.html; then
  echo "✅ Botón de captura presente en HTML"
else
  echo "❌ Falta el botón de captura en HTML"
fi

# Verificar div capturable
if grep -q "id=\"capturable\"" index.html; then
  echo "✅ Div capturable presente"
else
  echo "❌ Falta el div capturable"
fi

# Verificar si se generó captura.png
if [ -f "captura.png" ]; then
  echo "✅ captura.png generada correctamente"
else
  echo "⚠️ No se ha generado captura.png aún"
fi

echo "✅ Validación completa del módulo de captura"
