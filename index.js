import {
	format,
	startOfWeek,
	startOfMonth,
	addDays,
	addMonths,
} from "date-fns";
const button = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const currentMonthText = document.querySelector(".current-month");
const gridDates = document.querySelector(".date-picker-grid-dates");
const buttons = document.querySelectorAll(".date");
const prevMonthBtn = document.querySelector(".prev-month-button");
const nextMonthBtn = document.querySelector(".next-month-button");

let currentDate = new Date();
let currentDateBtn = "";
setCurrentDate(currentDate);
setCurrentMonth(currentDate);
setDateOnGrid(currentDate);
displayGridMonth(currentDate);

// Handle main date button
button.addEventListener("click", () => {
	datePicker.classList.toggle("show");
});

prevMonthBtn.addEventListener("click", () => {
	displayPreviousMonth(currentDate);
	setCurrentMonth(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
	displayNextMonth(currentDate);
	setCurrentMonth(currentDate);
});

gridDates.addEventListener("click", (e) => {
	if (!e.target.matches(".date")) return;
	currentDateBtn.classList.remove("selected");
	currentDateBtn = e.target;
	setCurrentDate(e.target.dataset.day);
	currentDateBtn.classList.add("selected");
});

// Set main button to correct date
function setCurrentDate(date) {
	const currentDate = format(date, "PPP");
	button.textContent = currentDate;
}

// Set month and year to text
function setCurrentMonth(date) {
	const currentMonth = format(date, "MMMM - y");
	currentMonthText.textContent = currentMonth;
}

// Display correct date for grid
function displayGridMonth(date) {
	const firstDayOfMonth = getFirstDayMonth(date);
	const firstWeekOfMonth = getFirstWeekOfMonth(firstDayOfMonth);
	buttons.forEach((button, i) => {
		const day = addDays(firstWeekOfMonth, i);
		if (setDateOnGrid(day)) {
			if (currentDateBtn) currentDateBtn.classList.remove("selected");
			button.classList.add("selected");
			currentDateBtn = button;
		}
		button.dataset.day = day;
		button.textContent = format(day, "d");
	});
}

// Set current day "blue dot" on grid
function setDateOnGrid(day) {
	const todayDate = format(new Date(), "PPP");
	const dayCalendar = format(day, "PPP");
	return todayDate === dayCalendar;
}

// Helper functions

function displayPreviousMonth(date) {
	const previousMonth = addMonths(date, -1);
	currentDate = previousMonth;
	displayGridMonth(previousMonth);
}

function displayNextMonth(date) {
	const nextMonth = addMonths(date, 1);
	currentDate = nextMonth;
	displayGridMonth(nextMonth);
}

function getFirstDayMonth(date) {
	return startOfMonth(date, "PPP");
}

function getFirstWeekOfMonth(date) {
	return startOfWeek(date);
}
