// juegoReciclaje.js

function initDragAndDrop() {
  const draggables = document.querySelectorAll('.draggable');
  const bins = document.querySelectorAll('.trash-bin');
  let correctCount = 0;
  let incorrectCount = 0;

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      console.log('Drag start:', e.target.id);
      e.dataTransfer.setData('text', e.target.id);
    });
  });

  bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => {
      console.log('Drag over:', bin.id);
      e.preventDefault();
    });

    bin.addEventListener('drop', (e) => {
      e.preventDefault();
      console.log('Drop event:', bin.id);
      const data = e.dataTransfer.getData('text');
      const element = document.getElementById(data);
      const binRect = bin.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const isInside =
        elementRect.left < binRect.right &&
        elementRect.right > binRect.left &&
        elementRect.top < binRect.bottom &&
        elementRect.bottom > binRect.top;

      if (isInside && validateDrop(bin, element)) {
        bin.appendChild(element);
        correctCount++;
        document.getElementById('score').textContent = `Correctas: ${correctCount}, Incorrectas: ${incorrectCount}`;
        alert('¡Bien hecho!');
      } else {
        incorrectCount++;
        document.getElementById('score').textContent = `Correctas: ${correctCount}, Incorrectas: ${incorrectCount}`;
        alert('Intenta de nuevo.');
      }
    });
  });

  function validateDrop(bin, element) {
    const binId = bin.id;
    const elementId = element.id;
    if (binId === 'bin-yellow' && elementId.startsWith('plastic')) return true;
    if (binId === 'bin-green' && elementId.startsWith('cans')) return true;
    if (binId === 'bin-blue' && elementId.startsWith('paper')) return true;
    return false;
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  initDragAndDrop();
});
