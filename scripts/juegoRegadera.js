// juegoRegadera.js

function initDragAndDrop() {
    const draggable = document.getElementById('can');
    const pots = document.querySelectorAll('.pot');
  
    draggable.addEventListener('dragstart', (e) => {
      console.log('Drag start:', e.target.id);
      e.dataTransfer.setData('text', e.target.id);
    });
  
    pots.forEach(pot => {
      pot.addEventListener('dragover', (e) => {
        console.log('Drag over:', pot.id);
        e.preventDefault();
      });
  
      pot.addEventListener('drop', (e) => {
        e.preventDefault();
        console.log('Drop event:', pot.id);
        const data = e.dataTransfer.getData('text');
        const element = document.getElementById(data);
  
        if (validateDrop(pot, element)) {
          pot.querySelector('img').src = '/imagenes/planta-buena'; // Cambiar la imagen de la planta
          alert('¡Bien hecho!');
        } else {
          alert('Intenta de nuevo.');
        }
      });
    });
  
    function validateDrop(pot, element) {
      const potRect = pot.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
  
      // Comprobar si el centro de la regadera está dentro de la maceta
      const isInside =
        elementRect.left < potRect.right &&
        elementRect.right > potRect.left &&
        elementRect.top < potRect.bottom &&
        elementRect.bottom > potRect.top;
  
      return isInside; // Para este juego, siempre será verdadero si está dentro de la maceta
    }
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    initDragAndDrop();
  });
  