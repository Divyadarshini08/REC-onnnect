// Available times for specific dates
const availableTimes = {
  "2024-11-27": ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "06:30 PM", "08:00 PM"],
  "2024-11-28": ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"],
  "2024-11-29": ["08:30 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"],
  "2024-11-30": ["09:30 AM", "11:00 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM"]
};

// Initialize Flatpickr
flatpickr("#meeting-date", {
  minDate: "today",
  dateFormat: "Y-m-d",
  onChange: function (selectedDates, dateStr) {
    displayAvailableTimes(dateStr);
  }
});

// Display available times for the selected date
function displayAvailableTimes(date) {
  const timeSlotsContainer = document.getElementById("time-slots");
  timeSlotsContainer.innerHTML = ""; // Clear previous slots

  // Check if times are available
  if (availableTimes[date]) {
    availableTimes[date].forEach(time => {
      const timeButton = document.createElement("button");
      timeButton.classList.add("time-slot");
      timeButton.textContent = time;
      timeButton.addEventListener("click", () => selectTimeSlot(timeButton));
      timeSlotsContainer.appendChild(timeButton);
    });
  } else {
    const noSlots = document.createElement("p");
    noSlots.textContent = "No available time slots for this date.";
    timeSlotsContainer.appendChild(noSlots);
  }
}

// Handle time slot selection
let selectedTimeSlot = null;
function selectTimeSlot(button) {
  if (selectedTimeSlot) {
    selectedTimeSlot.classList.remove("active");
  }
  button.classList.add("active");
  selectedTimeSlot = button;
}

// Handle the "Continue" button click

document.getElementById('continue-button').addEventListener('click', () => {
  alert("Mail sent successfully");
  fetch('/send-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          to: '221401021@rajalakshmi.edu.in', // Replace with recipient's email
          subject: 'Booking confirmation',
          text: 'Dear user, Your schedule has been confirmed with Anitha S. Thank you for booking a session.  Google Meet Link: To join the video meeting, click this link: https://meet.google.com/kke-emnm-pijOtherwise, to join by phone, dial +1 512-813-9204 and enter this PIN: 779 717 999#To view more phone numbers, click this link: https://tel.meet/kke-emnm-pij?hs=5 Get in touch with RECONNECT Looking forward to seeing you!',
      }),
      
  });
});