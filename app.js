const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let price = +movieSelect.value;
const selectMovieIndex = localStorage.getItem('movieIndex');

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelected();
    }
});

movieSelect.addEventListener('change', e => {
    price = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelected();
});

function updateSelected() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const countSeat = selectedSeats.length;
    
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
    count.innerText = countSeat;
    total.innerText = countSeat * price;
}

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("movieIndex", movieIndex);
    localStorage.setItem("moviePrice", moviePrice);
}

function showDataUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const selectMovieIndex = localStorage.getItem('movieIndex');

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    if (selectMovieIndex != null) {
        movieSelect.selectedIndex = selectMovieIndex;
    }
}

showDataUI();
updateSelected();
