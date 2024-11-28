// juegoReciclaje.js

let selectedDraggable = null;
let correctCount = 0;
let incorrectCount = 0;
let totalItems = 6; // Total de elementos a reciclar

function initClickAndDropReciclaje() {
  const draggables = document.querySelectorAll('.draggable');
  const bins = document.querySelectorAll('.trash-bin');

  draggables.forEach(draggable => {
    draggable.addEventListener('click', () => {
      selectDraggable(draggable.id);
    });
  });

  bins.forEach(bin => {
    bin.addEventListener('click', () => {
      selectTrashBin(bin.id);
    });
  });
}

function selectDraggable(draggableId) {
  selectedDraggable = draggableId;
  let message = '';
  switch(draggableId) {
    case 'plastic1':
    case 'plastic2':
      message = 'Esto es una botella de plástico.';
      break;
    case 'cans1':
    case 'cans2':
      message = 'Esto es una lata de aluminio.';
      break;
    case 'paper1':
    case 'paper2':
      message = 'Esto es papel.';
      break;
    default:
      message = 'Objeto desconocido.';
  }
  alert(message + ' Ahora haz clic en el contenedor correcto.');
}

function selectTrashBin(binId) {
  if (selectedDraggable) {
    const element = document.getElementById(selectedDraggable);
    const bin = document.getElementById(binId);

    if (validateDrop(bin, element)) {
      bin.appendChild(element);
      correctCount++;
    } else {
      incorrectCount++;
    }
    selectedDraggable = null; // Deseleccionar el elemento arrastrable
    updateScore();
  } else {
    alert('Primero selecciona un objeto para reciclar.');
  }
}

function validateDrop(bin, element) {
  const binId = bin.id;
  const elementId = element.id;
  if (binId === 'bin-yellow' && elementId.startsWith('plastic')) return true;
  if (binId === 'bin-green' && elementId.startsWith('cans')) return true;
  if (binId === 'bin-blue' && elementId.startsWith('paper')) return true;
  return false;
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  if (scoreElement) {
    scoreElement.textContent = `Correctas: ${correctCount}, Incorrectas: ${incorrectCount}`;
    if (correctCount + incorrectCount === totalItems) {
      alert(`¡Juego terminado! Correctas: ${correctCount}, Incorrectas: ${incorrectCount}`);
    }
  } else {
    console.error('Elemento score no encontrado');
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  initClickAndDropReciclaje();
});
