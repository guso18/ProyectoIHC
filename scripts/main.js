const { createApp } = Vue;

createApp({
  data() {
    return {
      selectedActivity: '',
      correctCount: 0,
      incorrectCount: 0,
      timeLeft: 60,
      timer: null
    };
  },
  methods: {
    selectActivity(event) {
      this.selectedActivity = event.target.value;
      if (this.selectedActivity === 'juego1') {
        fetch('JuegoReciclaje.html')
          .then(response => response.text())
          .then(data => {
            document.getElementById('contenido-principal').innerHTML = data;
            // Vuelve a inicializar el script de arrastrar y soltar después de cargar el contenido
            initDragAndDrop();
            // Iniciar temporizador
            this.startTimer();
          });
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;
        document.getElementById('timer').textContent = `Tiempo: ${this.timeLeft}`;
        if (this.timeLeft === 0) {
          clearInterval(this.timer);
          alert(`¡Tiempo terminado! Correctas: ${this.correctCount}, Incorrectas: ${this.incorrectCount}`);
        }
      }, 1000);
    }
  }
}).mount('#app');
