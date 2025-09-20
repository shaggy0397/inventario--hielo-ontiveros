const productos = ["Hielo - Barra", "Hielo - Bloque"];
const precios = [400, 400]; // puedes ajustar según tu precio por kg

function generarTabla() {
  const tabla = document.getElementById("tablaInventario");
  productos.forEach((nombre, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${nombre}</td>
      <td><input type="number" placeholder="Inicial" /></td>
      <td><input type="number" placeholder="Ingreso" /></td>
      <td><input type="number" placeholder="Contado" onchange="actualizarQueda(${i}, this.value)" /></td>
      <td><span class="vendido">0</span></td>
      <td><span class="dinero">0</span></td>
    `;
    tabla.appendChild(fila);
  });
}
generarTabla();

function actualizarQueda(index, valorContado) {
  const fila = document.querySelectorAll("#tablaInventario tr")[index + 1];
  const inicial = parseFloat(fila.children[1].querySelector("input").value) || 0;
  const ingreso = parseFloat(fila.children[2].querySelector("input").value) || 0;
  const total = inicial + ingreso;
  const queda = parseFloat(valorContado) || 0;
  const vendido = total - queda;
  const precio = precios[index];
  fila.children[4].textContent = vendido;
  fila.children[5].textContent = `$${vendido * precio}`;
}

document.getElementById("capturaBtn").addEventListener("click", () => {
  html2canvas(document.querySelector("#dashboard")).then(canvas => {
    const link = document.createElement("a");
    link.download = "inventario_hielo_ontiveros.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

function cerrarDia() {
  alert("✅ Cierre sintomático guardado. Listo para mañana.");
}

function convertirBarrasAKilos() {
  const cantidad = parseFloat(document.getElementById("barrasInput").value) || 0;
  const kilos = cantidad * 160;
  const filas = document.querySelectorAll("#tablaInventario tr");
  for (let i = 1; i < filas.length; i++) {
    const nombre = filas[i].children[0].textContent.trim();
    if (nombre === "Hielo - Barra") {
      const ingresoInput = filas[i].children[2].querySelector("input");
      const ingresoActual = parseFloat(ingresoInput.value) || 0;
      ingresoInput.value = ingresoActual + kilos;
      ingresoInput.dispatchEvent(new Event("change"));
      break;
    }
  }
  alert(`✅ Se agregaron ${kilos} kg al ingreso de Hielo - Barra`);
}
