// Restrict future dates in input
const today = new Date().toISOString().split("T")[0];
document.getElementById("birthdate").setAttribute("max", today);

document.getElementById('generate').addEventListener('click', () => {
  const birthdate = document.getElementById('birthdate').value;
  if (!birthdate) return alert('Please enter your birthdate!');

  const birth = new Date(birthdate);
  const now = new Date();

  if (birth > now) {
    alert("Oops! You haven't been born yet 😉");
    return;
  }

  const resultsContainer = document.getElementById('results');
  const historyContainer = document.getElementById('history');
  resultsContainer.innerHTML = '';
  historyContainer.innerHTML = '';

  const diff = now - birth;
  const daysAlive = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = now.getFullYear() - birth.getFullYear();
  const monthsAlive = years * 12 + (now.getMonth() - birth.getMonth());

  const heartbeats = daysAlive * 100000;
  const blinks = daysAlive * 20 * 60 * 16;
  const dreams = Math.floor(daysAlive * 1.5);
  const dogYears = (daysAlive / 365.25) * 7;
  const pizzas = Math.floor(daysAlive / 3);
  const steps = daysAlive * 7000;
  const breaths = daysAlive * 23000;
  const haircuts = Math.floor(years * 6);
  const hugs = Math.floor(years * 50);
  const teaCups = Math.floor(daysAlive / 2);

  const funStats = [
    { label: "Days Alive", value: daysAlive.toLocaleString() },
    { label: "Months Alive", value: monthsAlive.toLocaleString() },
    { label: "Heartbeats", value: heartbeats.toLocaleString() },
    { label: "Blinks", value: blinks.toLocaleString() },
    { label: "Dreams", value: dreams.toLocaleString() },
    { label: "Dog Years", value: dogYears.toFixed(1) },
    { label: "Pizzas Eaten", value: pizzas.toLocaleString() },
    { label: "Breaths Taken", value: breaths.toLocaleString() },
    { label: "Steps Walked", value: steps.toLocaleString() },
    { label: "Haircuts", value: haircuts.toLocaleString() },
    { label: "Hugs Given", value: hugs.toLocaleString() },
    { label: "Cups of Tea", value: teaCups.toLocaleString() }
  ];

  funStats.forEach(stat => {
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `<strong>${stat.label}:</strong> ${stat.value}`;
    resultsContainer.appendChild(div);
  });

  // History API
  const [year, month, day] = birthdate.split("-");
  fetch(`https://history.muffinlabs.com/date/${month}/${day}`)
    .then(res => res.json())
    .then(data => {
      const events = data.data.Events;
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const eventText = `${randomEvent.year}: ${randomEvent.text}`;
      historyContainer.innerHTML = `<h3>Fun Fact from Your Birthday</h3><p>${eventText}</p>`;
    })
    .catch(() => {
      historyContainer.innerHTML = "<p>Could not load history fact. Try again later.</p>";
    });

  document.getElementById('download').style.display = 'inline-block';
});

document.getElementById('download').addEventListener('click', () => {
    // Under construction – coming soon!
    
    // const element = document.getElementById('results');
    // html2canvas(element, {
    //   scale: 2,
    //   backgroundColor: '#fdf6e3',
    //   width: 1920,
    //   height: 1080
    // }).then(canvas => {
    //   const link = document.createElement('a');
    //   link.download = 'your-life-stats.png';
    //   link.href = canvas.toDataURL();
    //   link.click();
    // });
  });  

