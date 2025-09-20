const productos = [
  "Natural", "Coca de medio", "Joya de medio", "Coca", "Joya", "Dieta", "Mineral",
  "Mineral 600", "Coca 600", "Joya 600", "Dieta 600", "Coca 450", "Ciel de 600",
  "Ciel de litro", "Barra", "Star", "B750", "B500", "Agua litro", "Agua medio",
  "Gym de litro", "Gym de litro y medio", "Pepsi", "Pepsi sabor"
];

const precios = [
  300, 336, 336, 288, 288, 288, 350, 230, 230, 230, 230, 190, 120,
  140, 400, 100, 360, 310, 77, 85, 70, 85, 160, 160
];

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
