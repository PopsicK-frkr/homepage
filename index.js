//██████╗  ██████╗ ██████╗ ███████╗██╗ ██████╗██╗  ██╗
//██╔══██╗██╔═══██╗██╔══██╗██╔════╝██║██╔════╝██║ ██╔╝
//██████╔╝██║   ██║██████╔╝███████╗██║██║     █████╔╝
//██╔═══╝ ██║   ██║██╔═══╝ ╚════██║██║██║     ██╔═██╗
//██║     ╚██████╔╝██║     ███████║██║╚██████╗██║  ██╗
//╚═╝      ╚═════╝ ╚═╝     ╚══════╝╚═╝ ╚═════╝╚═╝  ╚═╝

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=cat"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  })
  .catch((err) => {
    // backup background
    document.main.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
  });

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});

document.querySelector("#push").onclick = function () {
  if (document.querySelector("#newtask input").value.length == 0) {
  } else {
    document.querySelector("#tasks").innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector("#newtask input").value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }
  }
};

// click quando premo enter

let btn = document.getElementById("push");

document.addEventListener("keypress", (event) => {
  let keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode === 13) {
    btn.click();
    document.getElementById("stocazzo").value = "";
  }
});
