const slider = document.getElementById("animationSlider");
const scaleSlider = document.getElementById('scaleSlider');
const dateInput = document.getElementById("dueDate");
function handleScaleChangeScale(val) {
	const percentage = (val / 252);
	const animations = document.querySelectorAll("#babyProgression animate");
	document.querySelector('.days').textContent = parseInt(parseInt(val) + 28);
	animations.forEach((animation) => {
		const duration = parseFloat(animation.getAttribute("dur")) || 50;
		let targetTime = duration * percentage;
		if (targetTime <= 0){targetTime = 0.01};
		if (targetTime >= 100){targetTime = 99.9};
		animation.ownerSVGElement.setCurrentTime(targetTime);
		animation.ownerSVGElement.pauseAnimations();
	});
}

function setProgress(num) {
	scaleSlider.value = num;
	handleScaleChangeScale(num);
}
scaleSlider.addEventListener('input', (event) => {
	event.preventDefault();
  handleScaleChangeScale(event.target.value);
});

function daysUntil(date) {
	let targetDate;
	if (typeof date === "string") {
		const [year, month, day] = date.split("-").map(Number);
		targetDate = new Date(year, month - 1, day);
	} else if (date instanceof Date) {
		targetDate = date;
	} else {
		throw new Error("Invalid date format. Please provide a Date object or a string in YYYY-MM-DD format.");
	}
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const timeDiff = targetDate - today;
	const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
	return daysDiff;
}

function calculateDays() {
	const dateInputValue = dateInput.value;
	localStorage.setItem("savedDueDate", dateInputValue);
	const days = daysUntil(dateInputValue);
	if ((252 - days) >= 0) {
		setProgress(252 - days);
	}
}
function loadSavedDate() {
	const savedDate = localStorage.getItem("savedDueDate");
	if (savedDate) {
		dateInput.value = savedDate;
	}
}

dateInput.addEventListener("input", calculateDays);
loadSavedDate();
calculateDays();
