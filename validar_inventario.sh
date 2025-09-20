#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Validando carpeta raíz..."
cd ~/inventario--hielo-ontiveros || { echo "❌ Carpeta no encontrada"; exit 1; }

echo "📄 Validando archivos esenciales..."
for file in index.html style.css script.js manifest.json README.md html2canvas.min.js favicon.ico; do
  if [ ! -f "$file" ]; then
    echo "❌ Falta: $file"
  else
    echo "✅ Presente: $file"
  fi
done

echo "🧠 Validando contenido mínimo..."
grep -q "INVENTARIO HIELO ONTIVEROS" index.html && echo "✅ index.html contiene título" || echo "❌ Título no encontrado"
grep -q "html2canvas" index.html && echo "✅ index.html incluye captura" || echo "❌ Falta html2canvas"
grep -q "display.*standalone" manifest.json && echo "✅ manifest.json modo standalone" || echo "❌ Falta display standalone"
grep -q "favicon.ico" index.html && echo "✅ index.html incluye favicon" || echo "❌ Falta favicon en index.html"

echo "🚀 Validando servidor local..."
lsof -i :3000 | grep LISTEN && echo "✅ Puerto 3000 activo" || echo "❌ Servidor no detectado en puerto 3000"

echo "🔐 Validando estado Git..."
git status
git branch | grep gh-pages && echo "✅ Rama gh-pages presente" || echo "❌ Falta rama gh-pages"

echo "📲 Validación completa. Revisa los ❌ y corrige antes de publicar."
