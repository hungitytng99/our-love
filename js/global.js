const VIEW_MODES = {
  DARK: "DARK",
  LIGHT: "LIGHT",
};

const LIST_PAGES = {
  INTRO: "INTRO",
  UTILS: "UTILS",
};

const VIEW_TIME_MODES = {
  DAY: "DAY",
  FULL: "FULL",
};

const SHOW_INTRO_STATUS = {
  SHOW: "SHOW",
  UNSHOW: "UNSHOW",
};

const LIST_RANDOM_MODES = ["Yes", "No"];
const startLoveDay = new Date(2022, 7, 21);
// helpers
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Change styles base on view mode
let currentViewMode = localStorage.getItem("viewMode") ?? VIEW_MODES.LIGHT;
let currentPageMode = localStorage.getItem("pageMode") ?? LIST_PAGES.INTRO;
let currentViewTimeMode =
  localStorage.getItem("viewTimeMode") ?? VIEW_TIME_MODES.DAY;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function changeToStyleDarkMode(initial = false) {
  $(".card").css("background-color", "#fff");
  $(".card .name").css("color", "#000");
  $(".ds-info p").css("color", "#000");
  $(".card .avatar-holder").css(
    "box-shadow",
    "0 0 0 5px #151515, inset 0 0 0 5px #000, inset 0 0 0 5px #000, inset 0 0 0 5px #000, inset 0 0 0 5px #000"
  );
  $(".card .ds-top.right").css("background-color", "#C21010");
  $(".card .ds-top.left").css("background-color", "#146356");

  $("#move-next").attr("src", "./images/icons/next-white.svg");

  $(".toggle-switch__box .slider").css("background-color", "var(--dark)");
  $(".toggle-switch__box .slider").css("border-color", "#fff");

  // Handle weather
  $(".sun-wrapper").css("animation", "sunDisappearYAxis 2.5s linear");
  $(".sun-wrapper").css("animation-fill-mode", "forwards");
  $("#sun").css("animation", "sunDisappearXAxis 2.5s ease-in-out");
  $("#sun").css("animation-fill-mode", "forwards");
  $("#moon").css("transform", "translate(0px, 0px)");

  $(".moon-wrapper").css("animation", "moonAppearYAxis 2.5s linear");
  $(".moon-wrapper").css("animation-fill-mode", "forwards");
  $("#moon").css("animation", "moonAppearXAxis 2.5s ease-in-out");
  $("#moon").css("animation-fill-mode", "forwards");
  $("#moon").css("transform", "translate(-50px, 50px)");

  setTimeout(() => {
    $("#moon").css("animation", "buzz 5.5s infinite ease-in-out");
  }, 3000);
}

function changeToStyleLightMode() {
  $(".card").css("background-color", "#151515");
  $(".card .name").css("color", "#fff");
  $(".ds-info p").css("color", "#fff");
  $(".card .avatar-holder").css(
    "box-shadow",
    "0 0 0 5px #fff, inset 0 0 0 5px #fff, inset 0 0 0 5px #fff, inset 0 0 0 5px #fff, inset 0 0 0 5px #fff"
  );
  $(".card .ds-top.left").css("background-color", "#146356");
  $(".card .ds-top.right").css("background-color", "#C21010");

  $("#move-next").attr("src", "./images/icons/next-black.svg");

  $(".toggle-switch__box .slider").css("background-color", "var(--light)");
  $(".toggle-switch__box .slider").css("border-color", "#000");

  // Handle weather
  $(".sun-wrapper").css("animation", "sunAppearYAxis 2.5s linear");
  $(".sun-wrapper").css("animation-fill-mode", "forwards");
  $("#sun").css("animation", "sunAppearXAxis 2.5s ease-in-out");
  $("#sun").css("animation-fill-mode", "forwards");
  $("#sun").css("transform", "translate(50px, 50px)");

  $(".moon-wrapper").css("animation", "moonDisappearYAxis 2.5s linear");
  $(".moon-wrapper").css("animation-fill-mode", "forwards");
  $("#moon").css("animation", "moonDisappearXAxis 2.5s ease-in-out");
  $("#moon").css("animation-fill-mode", "forwards");
  $("#moon").css("transform", "translate(0px, 0px)");
}

// Handle click
$("#toggle-dark-mode").click(function () {
  makeRandomColor();
  if (!this.checked) {
    currentViewMode = VIEW_MODES.DARK;
    changeToStyleDarkMode();
  } else {
    currentViewMode = VIEW_MODES.LIGHT;
    changeToStyleLightMode();
  }
  localStorage.setItem("viewMode", currentViewMode);
});

$("#heart").click(function () {
  updateViewTimeMode({ hasChangedStatus: true });
});

function updateViewTimeMode({ hasChangedStatus }) {
  
  if (currentViewTimeMode === VIEW_TIME_MODES.DAY) {
    $("#time").html(`${DateDiff.inDays(startLoveDay, new Date())} ngày`);
    $("#time").css("top", "50%");

    currentViewTimeMode = VIEW_TIME_MODES.FULL;

    localStorage.setItem("viewTimeMode", VIEW_TIME_MODES.DAY);
    return;
  }

  if (currentViewTimeMode === VIEW_TIME_MODES.FULL) {
    var bDt = moment("8/21/2022", "M/DD/YYYY");
    var eDt = moment(
      `${
        new Date().getMonth() + 1
      }/${new Date().getDate()}/${new Date().getFullYear()}`,
      "M/DD/YYYY"
    );
    var dtDiff = moment.preciseDiff(bDt, eDt);

    $("#time").html(`${dtDiff}`);
    $("#time").css("top", dtDiff.length > 18 ? "65%" : "60%");

    currentViewTimeMode = VIEW_TIME_MODES.DAY;
    localStorage.setItem("viewTimeMode", VIEW_TIME_MODES.FULL);

    return;
  }
}

function initApp() {
  if (currentViewMode === VIEW_MODES.LIGHT) {
    $("#toggle-dark-mode").prop("checked", true);
    changeToStyleLightMode(true);
  }

  if (currentViewMode === VIEW_MODES.DARK) {
    $("#toggle-dark-mode").prop("checked", false);
    changeToStyleDarkMode(true);
  }

  $("#male_age").html(`${new Date().getFullYear() - 1999}`);
  $("#female_age").html(`${new Date().getFullYear() - 2002}`);
  $("#canvas").css("display", "block");

  // TODO
  updateViewTimeMode({ hasChangedStatus: false });

  setTimeout(() => {
    document.title = "I miss you <3";
  }, 60000);

  setTimeout(() => {
    document.title = "Inbox if you remember me !!!";
  }, 62000);

  setTimeout(() => {
    document.title = "Our story";
  }, 70000);
}

setTimeout(() => {
  $("#intro-loading").css("animation", "disappear 1s forwards");

  if (localStorage.getItem("SHOW_INTRO_STATUS") === SHOW_INTRO_STATUS.SHOW) {
    $("#intro-1").css("display", "none");
    $("#intro-2").css("display", "none");
    $("#main").css("display", "block");
    initApp();
  } else {
    $("#intro-1").css("display", "flex");
  }
}, 4000);

if (localStorage.getItem("SHOW_INTRO_STATUS") !== SHOW_INTRO_STATUS.SHOW) {
  setTimeout(() => {
    startTyping();
  }, 5200);
}

setTimeout(() => {
  $("#intro-loading").css("display", "none");
}, 5000);

// Init
$(".intro-2-button").hover(() => {
  $(".button-52").css("display", "none");
});

$(".button-53").click(() => {
  $("#main").css("display", "block");
  $("#canvas").css("display", "block");
  $("#intro-2").css("display", "none");
  localStorage.setItem("SHOW_INTRO_STATUS", SHOW_INTRO_STATUS.SHOW);
  initApp();
});
