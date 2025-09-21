#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Validando manifest.json..."
grep -q '"start_url": "."' manifest.json && echo "✅ start_url correcto" || echo "❌ start_url incorrecto"
grep -q '"display": "standalone"' manifest.json && echo "✅ display correcto" || echo "❌ display incorrecto"
grep -q '"icons":' manifest.json && echo "✅ Íconos definidos" || echo "❌ Faltan íconos"

echo "🔗 Validando enlace en index.html..."
grep -q 'rel="manifest"' index.html && echo "✅ Manifest enlazado" || echo "❌ Falta enlace al manifest"

echo "🧠 Validando registro de service worker..."
grep -q 'serviceWorker.register' index.html && echo "✅ Service worker registrado" || echo "❌ Falta registro de service worker"

echo "📦 Validando íconos en carpeta raíz..."
for icon in icon-192.png icon-512.png; do
  [ -f "$icon" ] && echo "✅ $icon presente" || echo "❌ Falta: $icon"
done

echo "✅ Validación PWA completa. Si todo está en verde, debería aparecer 'Agregar a pantalla de inicio'."
