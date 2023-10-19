const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const maxHeightSpan = document.getElementById('maxHeight');

let animationId = null;

function startAnimation() {
    // clear previous animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    

    // get inputs
    const angle = document.getElementById('angle').value;
    const velocity = document.getElementById('velocity').value;

    // calculate maximum height
    const maxHeight = Math.pow(velocity * Math.sin(angle * Math.PI / 180), 2) / (2 * 9.8);
    maxHeightSpan.textContent = maxHeight.toFixed(2);
    // const totalTime = 2 * velocity * Math.sin(angle * Math.PI / 180) / 9.8;
    // totalTimeSpan.textContent = totalTime.toFixed(2);

    // initial values
    let x = 0;
    let y = canvas.height;
    let t = 0;

    // start animation
    animationId = requestAnimationFrame(draw);

    function draw() {
        // clear canvas
        ctx.clearRect(0, 0, 800, 400);

        // draw path
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let i = 0; i <= t; i += 0.1) {
            const px = velocity * i * Math.cos(angle * Math.PI / 180);
            const py = canvas.height - (velocity * i * Math.sin(angle * Math.PI / 180) - 0.5 * 9.8 * Math.pow(i, 2));
            ctx.lineTo(px, py);
        }
        ctx.stroke();

        // draw projectile
        x = velocity * t * Math.cos(angle * Math.PI / 180);
        y = canvas.height - (velocity * t * Math.sin(angle * Math.PI / 180) - 0.5 * 9.8 * Math.pow(t, 2));
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // increment time
        t += 0.1;

        // continue animation
        if (y <= canvas.height) {
            animationId = requestAnimationFrame(draw);
        }

    }
}

// calculate total time taken
document.getElementById("startBtn").addEventListener("click", calculateTime);
        
function calculateTime() {
  // Get input values
  var angle = document.getElementById("angle").value;
  var velocity = document.getElementById("velocity").value;

  // Convert angle to radians
  var angleRad = angle * Math.PI / 180;

  // Calculate total time of flight
  var totalTime = 2 * velocity * Math.sin(angleRad) / 9.81;

  // fixing decimal
  totalTime = totalTime.toFixed(2);

  // Display result
  document.getElementById("output").innerHTML = "Time taken: " + totalTime + "seconds";
}

// Graph
function plotGraph() {
    var velocity = document.getElementById('velocity1').value;
    var angle = document.getElementById('angle1').value;

    var timeOfFlight = 2 * velocity * Math.sin(angle * Math.PI / 180) / 9.8;
    var maxHeight = Math.pow(velocity, 2) * Math.pow(Math.sin(angle * Math.PI / 180), 2) / (2 * 9.8);
    var range = Math.pow(velocity, 2) * Math.sin(2 * angle * Math.PI / 180) / 9.8;

    var x = [], y = [];
    for (var t = 0; t <= timeOfFlight; t += 0.01) {
        x.push(t * range / timeOfFlight);
        y.push(velocity * t * Math.sin(angle * Math.PI / 180) - 0.5 * 9.8 * Math.pow(t, 2));
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'Projectile Motion',
                data: y,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Distance (m)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Height (m)'
                    }
                }
            }
        }
    });
}
