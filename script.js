productos = [
  { nombre: "Natural", precio: 300 },
  { nombre: "Coca de medio", precio: 336 },
  { nombre: "Joya de medio", precio: 336 },
  { nombre: "Coca", precio: 288 },
  { nombre: "Joya", precio: 288 },
  { nombre: "Dieta", precio: 288 },
  { nombre: "Mineral", precio: 350 },
  { nombre: "Mineral 600", precio: 230 },
  { nombre: "Coca 600", precio: 230 },
  { nombre: "Joya 600", precio: 230 },
  { nombre: "Dieta 600", precio: 230 },
  { nombre: "Coca 450", precio: 190 },
  { nombre: "Ciel 600", precio: 120 },
  { nombre: "Ciel lto", precio: 140 },
  { nombre: "Barra", precio: 2.5 },
  { nombre: "Star", precio: 100 },
  { nombre: "Barril 750", precio: 360 },
  { nombre: "Barril 500", precio: 310 },
  { nombre: "Agua lto", precio: 77 },
  { nombre: "Agua medio", precio: 85 },
  { nombre: "Gym lto", precio: 70 },
  { nombre: "Gym litro med", precio: 85 },
  { nombre: "Pepsi", precio: 160 },
  { nombre: "Pepsi sabor", precio: 160 }
];

function generarTabla() {
  const tbody = document.querySelector("#inventario tbody");
  productos.forEach((p, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td><input type="number" id="inicial${i}" value="0" onchange="calcular(${i})"></td>
      <td><input type="number" id="nuevos${i}" value="0" onchange="calcular(${i})"></td>
      <td><input type="number" id="queda${i}" value="0" onchange="calcular(${i})"></td>
      <td id="vendidos${i}">0</td>
      <td id="dinero${i}">$0</td>
    `;
    tbody.appendChild(fila);
  });
}

window.onload = () => {
  generarTabla();
  productos.forEach((_, i) => {
    ["inicial", "nuevos", "queda"].forEach(campo => {
      const input = document.getElementById(`${campo}${i}`);
      const valor = localStorage.getItem(`${campo}${i}`);
      if (valor !== null) input.value = valor;
    });
    calcular(i);
  });
};

function calcular(i) {
  const inicial = parseFloat(document.getElementById(`inicial${i}`).value) || 0;
  const nuevos = parseFloat(document.getElementById(`nuevos${i}`).value) || 0;
  const queda = parseFloat(document.getElementById(`queda${i}`).value) || 0;
  const vendidos = inicial + nuevos - queda;
  const dinero = vendidos * productos[i].precio;

  document.getElementById(`vendidos${i}`).textContent = vendidos;
  document.getElementById(`dinero${i}`).textContent = `$${dinero.toFixed(2)}`;

  ["inicial", "nuevos", "queda"].forEach(campo => {
    const valor = document.getElementById(`${campo}${i}`).value;
    localStorage.setItem(`${campo}${i}`, valor);
  });

  calcularFinal();
}

function calcularFinal() {
  let total = 0;
  productos.forEach((_, i) => {
    const dinero = parseFloat(document.getElementById(`dinero${i}`).textContent.replace("$", "")) || 0;
    total += dinero;
  });

  const desechable = parseFloat(document.getElementById("desechable").value) || 0;
  const fiados = parseFloat(document.getElementById("fiados").value) || 0;
  const gastos = parseFloat(document.getElementById("gastos").value) || 0;

  const totalAjustado = total + desechable + fiados - gastos;

  document.getElementById("totalFinal").textContent = `$${total.toFixed(2)}`;
  document.getElementById("totalFinalAjustado").textContent = `$${totalAjustado.toFixed(2)}`;
}

function guardarCaptura() {
  const ocultar = document.getElementById("noCaptura");
  ocultar.style.display = "none";

  html2canvas(document.getElementById("capturable")).then(canvas => {
    const link = document.createElement("a");
    link.download = "captura.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    ocultar.style.display = "block";
  });
}

function calcularBarras() {
  const barras = parseFloat(document.getElementById("barrasRecibidas").value) || 0;
  const bloques10 = parseFloat(document.getElementById("bloques10").value) || 0;
  const bloques20 = parseFloat(document.getElementById("bloques20").value) || 0;
  const bloques40 = parseFloat(document.getElementById("bloques40").value) || 0;

  const totalKilos = barras * 160 + bloques10 * 10 + bloques20 * 20 + bloques40 * 40;
  document.getElementById("totalKilos").textContent = `${totalKilos} kg`;

  const destino = document.getElementById("destinoBarra").value;
  const indexBarra = productos.findIndex(p => p.nombre === "Barra");
  if (indexBarra !== -1) {
    const campo = document.getElementById(`${destino}${indexBarra}`);
    if (campo) {
      campo.value = parseFloat(campo.value || 0) + totalKilos;
      calcular(indexBarra);
    }
  }
}

function cerrarDia() {
  productos.forEach((_, i) => {
    const queda = parseFloat(document.getElementById(`queda${i}`).value) || 0;
    document.getElementById(`inicial${i}`).value = queda;
    document.getElementById(`nuevos${i}`).value = 0;
    document.getElementById(`queda${i}`).value = 0;
    document.getElementById(`vendidos${i}`).textContent = "0";
    document.getElementById(`dinero${i}`).textContent = "$0.00";
    calcular(i);
  });

  document.getElementById("desechable").value = 0;
  document.getElementById("fiados").value = 0;
  document.getElementById("gastos").value = 0;
  calcularFinal();
}
