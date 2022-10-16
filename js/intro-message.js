let TxtType = function (el, toRotate, period, totalLine) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.totalLine = totalLine;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;

    delta = 500;
  }
  if (this.loopNum === this.totalLine) {
    $("#intro-1").css("display", "none");
    $("#intro-2").css("display", "flex");
    setTimeout(( ) => {
      $("#intro-2-question").css("display", "block");
      $("#intro-2-question").css("animation", "appear 1s linear");
    }, 2000);
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

function startTyping() {
  element = document.getElementsByClassName("typewrite");
  for (let i = 0; i < element.length; i++) {
    let toRotate = element[i].getAttribute("data-type");
    let period = element[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(
        element[i],
        JSON.parse(toRotate),
        period,
        JSON.parse(toRotate).length
      );
    }
  }
  // INJECT CSS
  let css = document.createElement("style");
  css.type = "text/css";
  document.body.appendChild(css);
}