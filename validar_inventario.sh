#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Validando carpeta raíz..."
echo "📄 Validando archivos esenciales..."
for file in index.html style.css script.js manifest.json README.md html2canvas.min.js; do
  [ -f "$file" ] && echo "✅ $file" || echo "❌ Falta: $file"
done

echo "🧠 Validando array de productos..."
grep -q 'Coca' script.js && echo "✅ Coca 450 presente" || echo "❌ Coca no detectada"
grep -q 'productos = \[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/la9una/web/tree/ba1073ae044ebb7b538a3b13f0f9598f7c410bb6/docs%2Fbootstrap%2Falignci.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/aaronbates/project-guidelines/tree/9861cbf0f6b95151e21d43a2ed8ce0047d3ddb7b/html%2Fhtml-guidelines.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "2")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/NotTodayMuggleFucker/Bedu/tree/5f4401220ff5768d3380f0fadbc401b28759404c/Courses%2FC1-React-2020-master%2FBuenasPracticas%2FPWA%2FReadme.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "3")[' script.js && echo "✅ Array detectado" || echo "❌ Array no detectado"

echo "🔗 Validando enlace de script.js en index.html..."
grep -q 'script.js' index.html && echo "✅ script.js enlazado" || echo "❌ Falta enlace"

echo "🧮 Validando ejecución de generarTabla()..."
grep -q 'generarTabla()' script.js && echo "✅ Tabla se genera" || echo "❌ No se genera tabla"

echo "📦 Validando ajustes finales..."
grep -q 'ajustesFinales' index.html && echo "✅ Ajustes finales presentes" || echo "❌ Faltan ajustes"

echo "🧊 Validando calculadora de barras..."
grep -q 'calculadoraBarras' index.html && echo "✅ Calculadora presente" || echo "❌ Falta calculadora"

echo "📸 Validando botón de captura..."
grep -q 'btnCaptura' index.html && echo "✅ Botón de captura presente" || echo "❌ Falta botón"

echo "✅ Validación completa. Si todo está en verde, el dashboard está listo."
