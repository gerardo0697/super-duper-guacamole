document.getElementById('calculateBtn').addEventListener('click', () => {
    const investment = parseFloat(document.getElementById('investment').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const timeInput = parseFloat(document.getElementById('timeInput').value);
    const timeUnit = document.getElementById('timeUnit').value;

    // Validación de los datos ingresados
    if (isNaN(investment) || isNaN(rate) || investment <= 0 || rate <= 0 || isNaN(timeInput) || timeInput <= 0) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    // Cálculo del interés simple
    const earnedValue = (investment * rate * 1) / 100;
    const totalInvestment = investment + earnedValue;

    // Cálculo del interés compuesto
    let earnedCompoundValue, totalCompoundInvestment;

    if (timeUnit === "years") {
        earnedCompoundValue = investment * (Math.pow(1 + rate / 100, timeInput) - 1);
        totalCompoundInvestment = investment + earnedCompoundValue;
    } else {
        earnedCompoundValue = investment * (Math.pow(1 + rate / 100 / 12, timeInput) - 1);
        totalCompoundInvestment = investment + earnedCompoundValue;
    }

    // Mostrar los resultados
    document.getElementById('earnedValue').textContent = `$${earnedValue.toFixed(2)}`;
    document.getElementById('totalInvestment').textContent = `$${totalInvestment.toFixed(2)}`;
    document.getElementById('earnedCompoundValue').textContent = `$${earnedCompoundValue.toFixed(2)}`;
    document.getElementById('totalCompoundInvestment').textContent = `$${totalCompoundInvestment.toFixed(2)}`;

    // Actualizar tooltips con información única
   // Calculando el interés y el total (suponiendo que ya tienes las variables necesarias)
document.querySelector('#earnedValue + .tooltip').textContent = 
`Interés simple: Con una inversión de $${investment.toFixed(2)} al ${rate}% durante 1 año, ganarías $${earnedValue.toFixed(2)}.`;

document.querySelector('#totalInvestment + .tooltip').textContent = 
`Total simple: La inversión inicial ($${investment.toFixed(2)}) más el interés ganado ($${earnedValue.toFixed(2)}) da un total de $${totalInvestment.toFixed(2)}.`;


    document.querySelector('#earnedCompoundValue + .tooltip').textContent = 
        `Interés compuesto: Con una inversión de $${investment.toFixed(2)} al ${rate}% durante ${timeInput} ${timeUnit === 'years' ? 'año(s)' : 'mes(es)'}, ganarías $${earnedCompoundValue.toFixed(2)}.`;

    document.querySelector('#totalCompoundInvestment + .tooltip').textContent = 
        `Total compuesto: La inversión inicial ($${investment.toFixed(2)}) más el interés compuesto ($${earnedCompoundValue.toFixed(2)}) da un total de $${totalCompoundInvestment.toFixed(2)}.`;
});

// Función para cambiar el campo según la selección (Años o Meses)
document.getElementById('timeUnit').addEventListener('change', function() {
    const timeUnit = this.value;
    const timeInput = document.getElementById('timeInput');
    const timeLabel = document.getElementById('timeLabel');
    const timeUnitLabel = document.getElementById('timeUnitLabel');
    
    if (timeUnit === "years") {
        timeInput.placeholder = "Ingrese el tiempo en años";
        timeLabel.textContent = "Años:";
        timeUnitLabel.textContent = "Años";
    } else {
        timeInput.placeholder = "Ingrese el tiempo en meses";
        timeLabel.textContent = "Meses:";
        timeUnitLabel.textContent = "Meses";
    }
});

// Verificar si html2canvas está cargado correctamente
if (typeof html2canvas === 'undefined') {
    alert('html2canvas no está disponible. Asegúrate de que el CDN esté correctamente cargado.');
}

document.getElementById("downloadImageBtn").addEventListener("click", function() {
    const captureSection = document.getElementById("capture-section");

    // Usar html2canvas con el método onrendered (para la versión 0.4.1)
    html2canvas(captureSection, {
        onrendered: function(canvas) {
            // Convertir el canvas a una imagen en formato base64
            const imgData = canvas.toDataURL("image/png");

            // Crear un enlace temporal para descargar la imagen
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'seccion_calculadora.png'; // Nombre del archivo
            link.click();
        }
    });
});

// Función para generar un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Obtener el botón
  const button = document.getElementById('downloadImageBtn');
  
  // Cambiar el borde de colores aleatorios cuando el ratón pasa sobre el botón
  button.addEventListener('mouseenter', () => {
    const gradient = `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
    button.style.setProperty('--serpent-gradient', gradient);
  });
  