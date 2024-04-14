function startClock() {
    const clockElement = document.getElementById('time-in-header');
  
    function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  
    updateClock(); 
    setInterval(updateClock, 1000); 
  }
  
  
  window.onload = startClock;