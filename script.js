const productos = [
  { nombre: "Natural", precio: 300 },
  { nombre: "Coca de medio", precio: 336 },
  { nombre: "Joya de medio", precio: 336 },
  { nombre: "Coca", precio: 288 },
  { nombre: "Joya", precio: 288 },
  { nombre: "Dieta", precio: 288 },
  { nombre: "Dieta 600", precio: 230 },
  { nombre: "Coca 450", precio: 190 },
  { nombre: "Mineral", precio: 350 },
  { nombre: "Mineral 600", precio: 230 },
  { nombre: "Coca 600", precio: 230 },
  { nombre: "Joya 600", precio: 230 },
  { nombre: "Ciel 600", precio: 120 },
  { nombre: "Ciel de litro", precio: 140 },
  { nombre: "Barra", precio: 400 },
  { nombre: "Star", precio: 100 },
  { nombre: "B750", precio: 360 },
  { nombre: "B500", precio: 310 },
  { nombre: "Agua", precio: 77 },
  { nombre: "agua medio", precio: 85 },
  { nombre: "gym lto", precio: 70 },
  { nombre: "gym lto med", precio: 85 },
  { nombre: "pepsi", precio: 160 },
  { nombre: "pepsi sabor", precio: 160 }
];

function generarTabla() {
  const tabla = document.getElementById("tablaInventario");
  productos.forEach((item, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
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
  const precio = productos[index].precio;
  fila.children[4].textContent = vendido;
  fila.children[5].textContent = `$${vendido * precio}`;
}

document.getElementById("btnCaptura").addEventListener("click", () => {
  const originalBg = document.body.style.backgroundColor;
  const originalColor = document.body.style.color;

  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";

  html2canvas(document.querySelector("#dashboard")).then(canvas => {
    document.body.style.backgroundColor = originalBg;
    document.body.style.color = originalColor;

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
    const nombre = filas[i].children[0].textContent.trim().toLowerCase();
    if (nombre === "barra") {
      const ingresoInput = filas[i].children[2].querySelector("input");
      const ingresoActual = parseFloat(ingresoInput.value) || 0;
      ingresoInput.value = ingresoActual + kilos;
      ingresoInput.dispatchEvent(new Event("change"));
      break;
    }
  }
  alert(`✅ Se agregaron ${kilos} kg al ingreso de Barra`);
}

function calcularTotalFinal() {
  let totalVendidos = 0;
  const filas = document.querySelectorAll("#tablaInventario tr");
  for (let i = 1; i < filas.length; i++) {
    const dinero = filas[i].children[5].textContent.replace("$", "") || "0";
    totalVendidos += parseFloat(dinero);
  }

  const desechable = parseFloat(document.getElementById("desechable")?.value) || 0;
  const gastos = parseFloat(document.getElementById("gastos")?.value) || 0;
  const fiados = parseFloat(document.getElementById("fiados")?.value) || 0;

  const total = totalVendidos + desechable - gastos + fiados;
  alert(`💰 Total final: $${total.toFixed(2)}`);
}
