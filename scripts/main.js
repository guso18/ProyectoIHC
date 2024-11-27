// main.js
const { createApp } = Vue;

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
              initDragAndDrop(); // Inicializa el juego de reciclaje
            } else if (this.selectedActivity === 'juego2') {
              initDragAndDrop(); // Inicializa el juego de regadera
            }
            this.startTimer(); // Iniciar temporizador
          });
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;
        document.getElementById('timer').textContent = `Tiempo: ${this.timeLeft}`;
        if (this.timeLeft === 0) {
          clearInterval(this.timer);
          alert('¡Tiempo terminado!');
        }
      }, 1000);
    }
  }
}).mount('#app');
