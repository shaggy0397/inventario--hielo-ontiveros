#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Validando carpeta raíz..."
cd ~/inventario--hielo-ontiveros || { echo "❌ Carpeta no encontrada"; exit 1; }

echo "📄 Validando archivos esenciales..."
for file in index.html style.css script.js manifest.json README.md html2canvas.min.js; do
  [ -f "$file" ] && echo "✅ $file" || echo "❌ Falta: $file"
done

echo "🧠 Validando array de productos..."
grep -q '"Coca 450"' script.js && echo "✅ Coca 450 presente" || echo "❌ Falta Coca 450"
grep -q 'const productos = \[' script.js && echo "✅ Array detectado" || echo "❌ Array no encontrado"

echo "🔗 Validando enlace de script.js en index.html..."
grep -q 'script.js' index.html && echo "✅ script.js enlazado" || echo "❌ Falta enlace a script.js"

echo "🧮 Validando ejecución de generarTabla()..."
grep -q 'generarTabla();' script.js && echo "✅ Tabla se genera" || echo "❌ Falta llamada a generarTabla()"

echo "📦 Validando ajustes finales..."
grep -q 'id="ajustesFinales"' index.html && echo "✅ Ajustes finales presentes" || echo "❌ Falta sección ajustesFinales"

echo "🧊 Validando calculadora de barras..."
grep -q 'id="calculadoraBarras"' index.html && echo "✅ Calculadora presente" || echo "❌ Falta calculadora de barras"

echo "📸 Validando botón de captura..."
grep -q 'id="capturaBtn"' index.html && echo "✅ Botón de captura presente" || echo "❌ Falta botón de captura"

echo "✅ Validación completa. Si todo está en verde, el dashboard está listo."
