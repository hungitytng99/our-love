const texts = "EVERLASTING";
const ballonSpace = 90;

$(".balloon").css(
  "marginLeft",
  `calc( (100vw - ${ballonSpace * texts.length + ballonSpace * 2}px) / 2 )`
);

for (let i = 0; i < texts.length; i++) {
  $(".balloon").append(
    `<div>
          <span class="balloon-character">${texts[i]}</span>
      </div>`
  );
}

function makeRandomColor() {
  for (let i = 0; i < texts.length; i++) {
    const randomColor = getRandomColor();
    $(`.balloon>div:nth-child(${i + 1})`).css("background", `${randomColor}`);
    $(`.balloon>div:nth-child(${i + 1})`).css(
      "left",
      `${(i + 1) * ballonSpace}`
    );
    $(`.balloon>div:nth-child(${i + 1})`).css(
      "box-shadow",
      `inset 10px 10px 10px ${randomColor}`
    );
  }
}

function makeRandomAnimate() {
  for (let i = 0; i < texts.length; i++) {
    const randomAnimate = getRandomArbitrary(1, 6);
    $(`.balloon>div:nth-child(${i + 1})`).css(
      "-webkit-animation",
      `balloon${randomAnimate} 6s ease-in-out infinite`
    );
    $(`.balloon>div:nth-child(${i + 1})`).css(
      "-moz-animation",
      `balloon${randomAnimate} 6s ease-in-out infinite`
    );
    $(`.balloon>div:nth-child(${i + 1})`).css(
      "-o-animation",
      `balloon${randomAnimate} 6s ease-in-out infinite`
    );
    $(`.balloon>div:nth-child(${i + 1})`).css(
      "animation",
      `balloon${randomAnimate} 6s ease-in-out infinite`
    );
  }
}
makeRandomColor();
makeRandomAnimate();

setInterval(() => {
  makeRandomColor();
}, 3000);
