console.log("JS connected!");

let events = JSON.parse(localStorage.getItem("events")) || [];

const form = document.getElementById('eventForm');
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const desc = document.getElementById("desc").value;

    const event = {
        title: title,
        date: date,
        desc: desc,
        completed: false
    };

    events.push(event);

    renderEvents();
});

function renderEvents() {
    const list = document.getElementById("eventList");
    const completedList = document.getElementById("completedList");

    list.innerHTML = "";
    completedList.innerHTML = "";

    events.forEach(function(ev, index) {
        const li = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = ev.completed;

        checkbox.addEventListener("change", function() {
            ev.completed = !ev.checked;
            renderEvents();
        });

        const text =document.createElement("span");
        text.textContent = ev.title + ' - ' + ev.date + " - " + ev.desc;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.addEventListener("click", function() {
            events.splice(index, 1);
            renderEvents();
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(delBtn);

        if (ev.completed) {
            completedList.appendChild(li);
        }
        else {
            list.appendChild(li);
        }
});

    localStorage.setItem("events", JSON.stringify(events));
}

renderEvents();