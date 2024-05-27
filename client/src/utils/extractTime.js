export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Hàm trợ giúp để đệm các số có một chữ số bằng số 0 đứng đầu
function padZero(number) {
	return number.toString().padStart(2, "0");
}