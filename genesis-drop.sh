#!/data/data/com.termux/files/usr/bin/bash

echo "🧱 Creando carpeta del proyecto..."
mkdir -p ~/inventario--hielo-ontiveros
cd ~/inventario--hielo-ontiveros

echo "📄 Generando archivos base..."
# (Aquí irían los mismos cat > index.html, style.css, script.js, manifest.json, README.md que ya te entregué)

echo "📸 Descargando html2canvas..."
curl -O https://html2canvas.hertzen.com/dist/html2canvas.min.js

echo "🔐 Verificando Git..."
if ! command -v git &> /dev/null; then
  pkg install git -y
fi

echo "🧠 Inicializando repositorio Git..."
git init
git remote add origin https://github.com/shaggy0397/inventario--hielo-ontiveros.git
git add .
git commit -m "Genesis Drop: Inventario Hielo Ontiveros"
git branch -M main
git push -u origin main

echo "🚀 Lanzando servidor local..."
npx serve .

echo "📲 Detectando IP local..."
ip a | grep 'inet ' | grep -v '127.0.0.1' | awk '{print "🔗 Abre en navegador: http://" $2}' | cut -d/ -f1
