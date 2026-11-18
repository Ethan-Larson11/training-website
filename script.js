// ****************
// Caldendar Script
// ****************
const monthYear = document.getElementById('month-year');
const grid = document.getElementById('calendar-grid');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Set header
  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
  monthYear.innerText = `${months[month]} ${year}`;

  // Clear grid
  grid.innerHTML = '';

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add blank spaces for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    grid.appendChild(blank);
  }

  // Add day numbers
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.innerText = i;
    
    // Highlight available dates
    if (isAvailableDate(year, month, i)) {
        day.classList.add('available');
    }

    // Highlight today
    if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      day.classList.add('today');
    }
    grid.appendChild(day);
  }
}

// Navigation
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});



// **********************
// Available Dates Script
// **********************
const defaultDays = [2, 4]; // Tuesday & Thursday
const startDate = new Date(2027, 4, 18); // Zero indexed month
const endDate = new Date(2027, 8, 20);

const excluded = [
    "2027-05-25",
];

const added = [

];

function isAvailableDate(year, month, day) {

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (added.includes(dateStr)) return true;

    const thisDay = new Date(year, month, day);
    if (thisDay < startDate || thisDay > endDate) return false;

    if (excluded.includes(dateStr)) return false;

    const dow = new Date(year, month, day).getDay();
    return defaultDays.includes(dow);
}



// ***************
// Calendar Render
// ***************
renderCalendar(currentDate);