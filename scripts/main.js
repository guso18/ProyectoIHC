const { createApp } = Vue;

// Definir la función de inicialización para el juego de reciclaje
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

// Definir la función de inicialización para el juego de regar
function initDragAndDropRegar() {
  document.getElementById('can').addEventListener('click', selectWateringCan);

  const pots = document.querySelectorAll('.pot');
  pots.forEach(pot => {
    pot.addEventListener('click', () => waterPlant(pot.id));
  });
}

// Definir las funciones adicionales necesarias para el juego de reciclaje
let selectedDraggable = null;
let correctCount = 0;
let incorrectCount = 0;
let totalItems = 6; // Total de elementos a reciclar

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

// Definir las funciones adicionales necesarias para el juego de regar
let selectedCan = false;

function selectWateringCan() {
  selectedCan = true;
  alert('Regadera seleccionada. Ahora haz clic en una planta para regarla.');
}

function waterPlant(potId) {
  if (selectedCan) {
    const pot = document.getElementById(potId);
    pot.querySelector('img').src = '../imagenes/planta-viva.png'; // Cambiar la imagen de la planta
    selectedCan = false; // Deseleccionar la regadera
    alert('¡Bien hecho! Has regado la planta.');
  } else {
    alert('Primero selecciona la regadera.');
  }
}

// Crear la aplicación Vue
createApp({
  data() {
    return {
      selectedActivity: '',
      timeLeft: 60,
      timer: null
    };
  },
  methods: {
    selectActivity(event) {
      this.selectedActivity = event.target.value;
      let gameUrl = '';
      if (this.selectedActivity === 'juego1') {
        gameUrl = 'juegos/juegoReciclaje.html';
      } else if (this.selectedActivity === 'juego2') {
        gameUrl = 'juegos/juegoRegar.html';
      }
      if (gameUrl) {
        fetch(gameUrl)
          .then(response => response.text())
          .then(data => {
            document.getElementById('contenido-principal').innerHTML = data;
            if (this.selectedActivity === 'juego1') {
              initClickAndDropReciclaje(); // Inicializa el juego de reciclaje
            } else if (this.selectedActivity === 'juego2') {
              initDragAndDropRegar(); // Inicializa el juego de regadera
            }
          });
      }
    }
  }
}).mount('#app');
