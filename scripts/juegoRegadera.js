// juegoRegar.js

let selectedCan = false;

function selectWateringCan() {
  selectedCan = true;
  alert('Regadera seleccionada. Ahora haz clic en una planta para regarla.');
}
/*
function waterPlant(potId) {
  if (selectedCan) {
    const pot = document.getElementById(potId);
    pot.querySelector('img').src = '/imagenes/planta-buena.jpg'; // Cambiar la imagen de la planta
    selectedCan = false; // Deseleccionar la regadera
    alert('¡Bien hecho! Has regado la planta.');
  } else {
    alert('Primero selecciona la regadera.');
  }
}
*/

function initDragAndDropRegar() {
  document.getElementById('can').addEventListener('click', selectWateringCan);

  const pots = document.querySelectorAll('.pot');
  pots.forEach(pot => {
    pot.addEventListener('click', () => waterPlant(pot.id));
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  initDragAndDropRegar();
});
