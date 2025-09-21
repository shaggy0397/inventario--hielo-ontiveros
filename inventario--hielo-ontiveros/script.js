const productos = [
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
  { nombre: "Ciel de litro", precio: 140 },
  { nombre: "Barra", precio: 400 },
  { nombre: "Star", precio: 100 },
  { nombre: "B750", precio: 360 },
  { nombre: "B500", precio: 310 },
  { nombre: "Agua", precio: 77 },
  { nombre: "Agua medio", precio: 85 },
  { nombre: "Gym litro", precio: 70 },
  { nombre: "Gym litro med", precio: 85 },
  { nombre: "Pepsi", precio: 160 },
  { nombre: "Pepsi sabor", precio: 160 }
];

const tbody = document.querySelector("#inventario tbody");

productos.forEach((p, i) => {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${p.nombre}</td>
    <td>$${p.precio}</td>
    <td><input type="number" min="0" value="0" onchange="calcularTotal(${i})" id="cantidad${i}"></td>
    <td id="total${i}">$0</td>
  `;
  tbody.appendChild(fila);
});

function calcularTotal(i) {
  const cantidad = parseInt(document.getElementById(`cantidad${i}`).value) || 0;
  const precio = productos[i].precio;
  const total = cantidad * precio;
  document.getElementById(`total${i}`).textContent = `$${total}`;
  calcularTotalGeneral();
}

function calcularTotalGeneral() {
  let suma = 0;
  productos.forEach((_, i) => {
    const total = parseInt(document.getElementById(`total${i}`).textContent.replace("$", "")) || 0;
    suma += total;
  });
  document.getElementById("totalGeneral").textContent = `$${suma}`;
}
