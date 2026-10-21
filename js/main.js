import { translations } from "./translations.js";

const eventStructure = {
    shiftLength: 60,

    days: [
        {
            date: "2026-09-12",
            start: "08:00",
            end: "20:00"
        },
        {
            date: "2026-09-13",
            start: "10:00",
            end: "18:00"
        }
    ]
};

let currentLanguage = "pl";

const availabilityState = {};

let activeDay = eventStructure.days[0].date;

const availability = document.getElementById("availability");

function cycleAvailability(dayDate, time) {
    if (!availabilityState[dayDate]) {
        availabilityState[dayDate] = {};
    }

    if (availabilityState[dayDate][time] === undefined) {
        availabilityState[dayDate][time] = 0;
    }

    const currentValue = availabilityState[dayDate][time];

    const nextValue = {
        0: 1,
        1: 10,
        10: -1,
        "-1": 0
    };

    availabilityState[dayDate][time] = nextValue[currentValue];

    renderAvailabilityTable();
}

function renderAvailabilityTable() {
    availability.innerHTML = "";

    const tabs = document.createElement("div");
    tabs.id = "dayTabs";
    availability.appendChild(tabs);

    for (const day of eventStructure.days) {
        const tab = document.createElement("button");

        tab.type = "button";
        tab.id = `tab-${day.date}`;

        const date = new Date(day.date + "T00:00:00");

        const dayName = new Intl.DateTimeFormat(
            translations[currentLanguage].locale,
            { weekday: "short" }
        ).format(date);

        const formattedDate = new Intl.DateTimeFormat(
            translations[currentLanguage].locale,
            {
                day: "2-digit",
                month: "2-digit"
            }
        ).format(date);

        tab.textContent = `${dayName} ${formattedDate}`;

        tabs.appendChild(tab);

        tab.addEventListener("click", function () {
            activeDay = day.date;
            renderAvailabilityTable();
        });
    }

    const selectedDay = eventStructure.days.find(function (day) {
        return day.date === activeDay;
    });

    const table = document.createElement("table");
    availability.appendChild(table);

    const headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    const timeHeader = document.createElement("th");
    timeHeader.id = "time-header";
    timeHeader.textContent = translations[currentLanguage].time;
    headerRow.appendChild(timeHeader);

    const [startHour, startMinute] = selectedDay.start.split(":").map(Number);
    const [endHour, endMinute] = selectedDay.end.split(":").map(Number);

    let currentMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    while (currentMinutes < endMinutes) {
        const row = document.createElement("tr");
        table.appendChild(row);

        const hourCell = document.createElement("td");

        const hours = Math.floor(currentMinutes / 60);
        const minutes = currentMinutes % 60;

        const formattedTime =
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0");

        hourCell.textContent = formattedTime;
        row.appendChild(hourCell);

        const cell = document.createElement("td");

        const time = formattedTime;

        if (!availabilityState[selectedDay.date]) {
            availabilityState[selectedDay.date] = {};
        }

        const value = availabilityState[selectedDay.date][time] ?? 0;

        const symbols = {
            0: "—",
            1: "✓",
            10: "★",
            "-1": "✕"
        };

        cell.textContent = symbols[value];

        cell.style.cursor = "pointer";

        cell.addEventListener("click", function () {
            cycleAvailability(selectedDay.date, time);
        });

        row.appendChild(cell);

        currentMinutes += eventStructure.shiftLength;
    }
}

function getDayAvailability(dayDate) {
    return availabilityState[dayDate] ?? {};
}

function collectFormData() {
    const firstName = document.getElementById("name").value.trim();
    const lastName = document.getElementById("surname").value.trim();

    const experienceInput = document.querySelector(
        'input[name="experience"]:checked'
    );

    const experience = experienceInput
        ? experienceInput.value
        : "";

    return {
        firstName: firstName,
        lastName: lastName,
        experience: experience,
        availability: availabilityState
    };
}

function updateLanguage() {
    const language = translations[currentLanguage];

    document.getElementById("pageTitle").textContent = language.pageTitle;
    document.getElementById("firstNameLabel").textContent = language.firstName;
    document.getElementById("lastNameLabel").textContent = language.lastName;
    document.getElementById("experienceLabel").textContent = language.experience;
    document.getElementById("noExperience").textContent = language.noExperience;
    document.getElementById("otherEvents").textContent = language.otherEvents;
    document.getElementById("thisEvent").textContent = language.thisEvent;
    document.getElementById("submitButton").textContent = language.submit;

    renderAvailabilityTable();
}

renderAvailabilityTable();
updateLanguage();

document.getElementById("plButton").addEventListener("click", function () {
    currentLanguage = "pl";
    updateLanguage();
});

document.getElementById("enButton").addEventListener("click", function () {
    currentLanguage = "en";
    updateLanguage();
});