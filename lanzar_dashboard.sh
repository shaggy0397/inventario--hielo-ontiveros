#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Lanzando dashboard táctil INVENTARIO HIELO ONTIVEROS..."

# Validar carpeta
cd ~/inventario--hielo-ontiveros || {
  echo "❌ Carpeta no encontrada: ~/inventario--hielo-ontiveros"
  exit 1
}

# Validar archivos clave
for file in index.html script.js style.css manifest.json html2canvas.min.js; do
  [ -f "$file" ] && echo "✅ $file listo" || echo "❌ Falta: $file"
done

# Lanzar servidor con Python
echo "🌐 Iniciando servidor local en http://localhost:8080"
python3 -m http.server 8080

# Instrucción visual
echo "📲 Abre tu navegador y visita: http://localhost:8080"
echo "✅ Si ves el dashboard, la instalación local está blindada"
