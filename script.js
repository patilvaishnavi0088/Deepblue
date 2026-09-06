const fishImages = ["fish1.png", "goldenfish.png"];
const fishList = [];


/* =========================
   MOBILE TOUCH SETTINGS
   ========================= */

document.documentElement.style.touchAction = "manipulation";
document.body.style.touchAction = "manipulation";


/* =========================
   CREATE FISH
   ========================= */

function createFish(x, y, forcedDirection) {

  const fish = document.createElement("img");

  fish.classList.add("fish");

  const randomImg =
    fishImages[Math.floor(Math.random() * fishImages.length)];

  fish.src = randomImg;

  const randomSize =
    Math.floor(Math.random() * 40) + 40;

  fish.style.width = randomSize + "px";

  fish.style.left = x + "px";
  fish.style.top = y + "px";

  document.body.appendChild(fish);

  const direction =
    forcedDirection !== undefined
      ? forcedDirection
      : Math.random() < 0.5
      ? -1
      : 1;

  const speed =
    Math.random() * 2 + 1.5;

  /* Fish image faces RIGHT by default */
  fish.style.transform =
    direction === 1
      ? "translate(-50%, -50%) scaleX(-1)"
      : "translate(-50%, -50%)";

  const fishData = {
    el: fish,
    x: x,
    direction: direction,
    speed: speed
  };

  fishList.push(fishData);

  const lifespan =
    Math.random() * 5000 + 4000;

  setTimeout(() => {

    fish.remove();

    const index =
      fishList.indexOf(fishData);

    if (index !== -1) {
      fishList.splice(index, 1);
    }

  }, lifespan);
}


/* =========================
   FISH INTERACTION
   ========================= */

let tapTimer = null;
let lastTouchTime = 0;


/* MOBILE TOUCH */

document.body.addEventListener(
  "touchstart",
  function (e) {

    e.preventDefault();

  },
  { passive: false }
);


document.body.addEventListener(
  "touchend",
  function (e) {

    e.preventDefault();

    const touch =
      e.changedTouches[0];

    const x = touch.clientX;
    const y = touch.clientY;

    const currentTime =
      Date.now();

    const timeBetweenTaps =
      currentTime - lastTouchTime;


    /* DOUBLE TAP */

    if (
      timeBetweenTaps > 0 &&
      timeBetweenTaps < 350
    ) {

      clearTimeout(tapTimer);

      tapTimer = null;

      const groupDirection =
        Math.random() < 0.5
          ? -1
          : 1;

      const groupSize =
        Math.floor(Math.random() * 3) + 5;


      for (let i = 0; i < groupSize; i++) {

        const offsetX =
          x + (Math.random() * 100 - 50);

        const offsetY =
          y + (Math.random() * 60 - 30);

        createFish(
          offsetX,
          offsetY,
          groupDirection
        );
      }

      lastTouchTime = 0;

      return;
    }


    /* SINGLE TAP */

    tapTimer = setTimeout(() => {

      createFish(x, y);

      tapTimer = null;

    }, 300);


    lastTouchTime =
      currentTime;

  },
  { passive: false }
);


/* =========================
   DESKTOP CLICK
   ========================= */

document.body.addEventListener(
  "click",
  function (e) {

    /*
      Mobile browsers can create
      a click after touch.
      Ignore those clicks.
    */

    if (
      "ontouchstart" in window
    ) {
      return;
    }

    createFish(
      e.clientX,
      e.clientY
    );

  }
);


/* =========================
   ANIMATE ALL FISH
   ========================= */

function animateAllFish() {

  fishList.forEach(
    function (fishData) {

      fishData.x +=
        fishData.direction *
        fishData.speed;


      if (
        fishData.direction === 1 &&
        fishData.x >
          window.innerWidth + 50
      ) {

        fishData.x = -50;

      }


      if (
        fishData.direction === -1 &&
        fishData.x < -50
      ) {

        fishData.x =
          window.innerWidth + 50;

      }


      fishData.el.style.left =
        fishData.x + "px";

    }
  );

  requestAnimationFrame(
    animateAllFish
  );
}

animateAllFish();


/* =========================
   OCTOPUS
   ========================= */

function createOctopus() {

  const octopus =
    document.createElement("img");

  octopus.classList.add(
    "octopus"
  );

  octopus.src =
    "octopus.png";

  octopus.style.bottom =
    "70px";

  document.body.appendChild(
    octopus
  );


  setTimeout(() => {

    octopus.remove();

  }, 25000);
}


setInterval(
  createOctopus,
  15000
);

createOctopus();


/* =========================
   SHARK
   ========================= */

function createShark() {

  const shark =
    document.createElement("img");

  shark.classList.add(
    "shark"
  );

  shark.src =
    "shark.png";


  const randomY =
    Math.random() *
      (window.innerHeight - 300) +
    100;

  shark.style.top =
    randomY + "px";


  const direction =
    Math.random() < 0.5
      ? -1
      : 1;


  let x =
    direction === 1
      ? -220
      : window.innerWidth + 220;


  shark.style.left =
    x + "px";


  shark.style.transform =
    direction === -1
      ? "scaleX(-1)"
      : "scaleX(1)";


  document.body.appendChild(
    shark
  );


  const speed = 6;


  function moveShark() {

    x +=
      direction * speed;

    shark.style.left =
      x + "px";


    if (
      (direction === 1 &&
        x < window.innerWidth + 220) ||

      (direction === -1 &&
        x > -220)
    ) {

      requestAnimationFrame(
        moveShark
      );

    } else {

      shark.remove();

    }
  }


  moveShark();
}


setInterval(
  createShark,
  6500
);


/* =========================
   JELLYFISH
   ========================= */

function createJellyfish() {

  const jelly =
    document.createElement("img");

  jelly.classList.add(
    "jellyfish"
  );

  jelly.src =
    "jellyfish.png";


  const randomX =
    Math.random() *
      (window.innerWidth - 100) +
    50;


  jelly.style.left =
    randomX + "px";


  document.body.appendChild(
    jelly
  );


  setTimeout(() => {

    jelly.remove();

  }, 12000);
}


setInterval(
  createJellyfish,
  10000
);

createJellyfish();
