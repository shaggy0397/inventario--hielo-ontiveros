const productos = [
  "Natural", "Purificada", "Coca", "Pepsi", "Fanta", "Sprite"
];

function generarTabla() {
  const tbody = document.querySelector("#tablaInventario tbody");
  productos.forEach(producto => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto}</td>
      <td><input type="number"></td>
      <td><input type="number"></td>
      <td><input type="number"></td>
      <td><span>0</span></td>
      <td><span>$0</span></td>
    `;
    tbody.appendChild(fila);
  });
}

function calcularTotalFinal() {
  document.getElementById("totalFinal").textContent = "123"; // demo
}

function cerrarDia() {
  alert("Día cerrado. Datos guardados.");
}

function convertirAKilos() {
  const dinero = parseFloat(document.getElementById("cantidadDinero").value);
  const kilos = dinero / 10;
  document.getElementById("resultadoKilos").textContent = kilos.toFixed(2);
}

document.getElementById("btnCaptura").addEventListener("click", () => {
  html2canvas(document.body, {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "inventario_hielo_ontiveros.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

generarTabla();
