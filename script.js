// -----------------------------
// Default Events
// -----------------------------

let events = JSON.parse(localStorage.getItem("events")) || [

    {
        id: 1,
        name: "Hackathon 2026",
        category: "Technical",
        date: "2026-10-15",
        time: "10:00",
        venue: "Computer Lab",
        seats: 50,
        booked: 0,
        description: "A 24-hour coding and innovation challenge."
    },

    {
        id: 2,
        name: "College Cultural Fest",
        category: "Cultural",
        date: "2026-10-20",
        time: "09:00",
        venue: "Main Auditorium",
        seats: 200,
        booked: 0,
        description: "Enjoy music, dance and cultural performances."
    },

    {
        id: 3,
        name: "Cricket Tournament",
        category: "Sports",
        date: "2026-10-25",
        time: "08:00",
        venue: "College Ground",
        seats: 100,
        booked: 0,
        description: "Inter-department cricket tournament."
    },

    {
        id: 4,
        name: "Web Development Workshop",
        category: "Workshop",
        date: "2026-11-02",
        time: "11:00",
        venue: "Seminar Hall",
        seats: 60,
        booked: 0,
        description: "Learn modern web development technologies."
    }

];


// -----------------------------
// Bookings
// -----------------------------

let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];


// -----------------------------
// Save Data
// -----------------------------

function saveData() {

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );
}


// -----------------------------
// Display Events
// -----------------------------

function displayEvents() {

    const container =
        document.getElementById("eventContainer");

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const category =
        document
        .getElementById("categoryFilter")
        .value;


    container.innerHTML = "";


    const filteredEvents = events.filter(event => {

        const matchesSearch =
            event.name
            .toLowerCase()
            .includes(search);

        const matchesCategory =
            category === "all" ||
            event.category === category;

        return matchesSearch && matchesCategory;

    });


    if (filteredEvents.length === 0) {

        container.innerHTML =
            "<p>No events found.</p>";

        return;
    }


    filteredEvents.forEach(event => {

        const availableSeats =
            event.seats - event.booked;


        const card =
            document.createElement("div");

        card.className = "event-card";


        card.innerHTML = `

            <span class="category">
                ${event.category}
            </span>

            <h3>${event.name}</h3>

            <p class="event-info">
                📅 ${event.date}
            </p>

            <p class="event-info">
                ⏰ ${event.time}
            </p>

            <p class="event-info">
                📍 ${event.venue}
            </p>

            <p class="event-info">
                👥 Available Seats:
                ${availableSeats}
            </p>

            <p>
                ${event.description}
            </p>

            <button
                onclick="bookEvent(${event.id})"
                ${availableSeats === 0 ? "disabled" : ""}
            >
                ${availableSeats === 0
                    ? "Fully Booked"
                    : "Book Now"}
            </button>

        `;


        container.appendChild(card);

    });

}


// -----------------------------
// Book Event
// -----------------------------

function bookEvent(eventId) {

    const event =
        events.find(e => e.id === eventId);


    if (!event) {
        return;
    }


    if (event.booked >= event.seats) {

        alert("Sorry! This event is fully booked.");

        return;
    }


    const studentName =
        prompt("Enter your name:");


    if (!studentName) {
        return;
    }


    event.booked++;


    const booking = {

        id: Date.now(),

        eventId: event.id,

        eventName: event.name,

        studentName: studentName,

        date: event.date,

        venue: event.venue

    };


    bookings.push(booking);


    saveData();

    displayEvents();

    displayBookings();


    alert(
        "Booking successful! 🎉"
    );

}


// -----------------------------
// Display Bookings
// -----------------------------

function displayBookings() {

    const container =
        document.getElementById(
            "bookingContainer"
        );


    container.innerHTML = "";


    if (bookings.length === 0) {

        container.innerHTML =
            "<p>No bookings yet.</p>";

        return;
    }


    bookings.forEach(booking => {

        const card =
            document.createElement("div");

        card.className =
            "booking-card";


        card.innerHTML = `

            <h3>
                🎟️ ${booking.eventName}
            </h3>

            <p>
                Student:
                ${booking.studentName}
            </p>

            <p>
                📅 ${booking.date}
            </p>

            <p>
                📍 ${booking.venue}
            </p>

            <button
                class="cancel-btn"
                onclick="cancelBooking(${booking.id})"
            >
                Cancel Booking
            </button>

        `;


        container.appendChild(card);

    });

}


// -----------------------------
// Cancel Booking
// -----------------------------

function cancelBooking(bookingId) {

    const booking =
        bookings.find(
            b => b.id === bookingId
        );


    if (!booking) {
        return;
    }


    const event =
        events.find(
            e => e.id === booking.eventId
        );


    if (event && event.booked > 0) {
        event.booked--;
    }


    bookings =
        bookings.filter(
            b => b.id !== bookingId
        );


    saveData();

    displayEvents();

    displayBookings();


    alert(
        "Booking cancelled successfully."
    );

}


// -----------------------------
// Add New Event
// -----------------------------

document
.getElementById("eventForm")
.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const newEvent = {

            id: Date.now(),

            name:
                document
                .getElementById("eventName")
                .value,

            category:
                document
                .getElementById("eventCategory")
                .value,

            date:
                document
                .getElementById("eventDate")
                .value,

            time:
                document
                .getElementById("eventTime")
                .value,

            venue:
                document
                .getElementById("eventVenue")
                .value,

            seats:
                Number(
                    document
                    .getElementById("eventSeats")
                    .value
                ),

            booked: 0,

            description:
                document
                .getElementById("eventDescription")
                .value

        };


        events.push(newEvent);


        saveData();

        displayEvents();


        this.reset();


        alert(
            "Event added successfully! 🎉"
        );

    }
);


// -----------------------------
// Search & Filter
// -----------------------------

document
.getElementById("searchInput")
.addEventListener(
    "input",
    displayEvents
);


document
.getElementById("categoryFilter")
.addEventListener(
    "change",
    displayEvents
);


// -----------------------------
// Start Application
// -----------------------------

displayEvents();

displayBookings();
