/* =========================================================
   获取元素
========================================================= */

const startButton =
  document.getElementById("start-btn");

const startScreen =
  document.getElementById("start-screen");

const scene =
  document.getElementById("birthday-scene");

const music =
  document.getElementById("birthday-music");

const fuButton =
  document.getElementById("fu-btn");

const shouButton =
  document.getElementById("shou-btn");

const cakeButton =
  document.getElementById("cake-btn");

const blessingPopup =
  document.getElementById("blessing-popup");

const popupSymbol =
  document.getElementById("popup-symbol");

const popupTitle =
  document.getElementById("popup-title");

const popupText =
  document.getElementById("popup-text");

const wishPanel =
  document.getElementById("wish-panel");

const particleContainer =
  document.getElementById("particles");

const effectLayer =
  document.getElementById("effect-layer");

const canvas =
  document.getElementById("fireworks");

const ctx =
  canvas.getContext("2d");



/* =========================================================
   状态
========================================================= */

let particlesStarted = false;

let popupTimer = null;

let musicFadeTimer = null;

let fireworks = [];



/* =========================================================
   开启寿宴
========================================================= */

startButton.addEventListener(
  "click",
  async () => {

    startButton.disabled = true;

    scene.classList.add("active");

    setTimeout(
      () => {

        startScreen.classList.add(
          "hide"
        );

      },
      150
    );


    try {

      music.volume = 0;

      await music.play();

      fadeMusicTo(
        0.6,
        1600
      );

    }

    catch (error) {

      console.log(
        "音乐播放失败：",
        error
      );

    }


    if (!particlesStarted) {

      startParticles();

      particlesStarted = true;

    }

  }
);



/* =========================================================
   音乐渐变
========================================================= */

function fadeMusicTo(
  target,
  duration = 1000
) {

  clearInterval(
    musicFadeTimer
  );


  const startVolume =
    music.volume;


  const difference =
    target -
    startVolume;


  const steps = 30;

  let step = 0;


  musicFadeTimer =
    setInterval(
      () => {

        step++;


        const progress =
          step / steps;


        const value =
          startVolume +
          difference *
          progress;


        music.volume =
          Math.max(
            0,
            Math.min(
              1,
              value
            )
          );


        if (step >= steps) {

          music.volume =
            target;


          clearInterval(
            musicFadeTimer
          );

        }

      },
      duration / steps
    );

}



/* =========================================================
   普通粒子
========================================================= */

function startParticles() {

  setInterval(
    () => {

      const particle =
        document.createElement(
          "div"
        );


      particle.className =
        "particle";


      particle.style.left =
        Math.random()
        * 100
        + "%";


      particle.style.top =
        "105%";


      const size =
        Math.random()
        * 4
        + 2;


      particle.style.width =
        size + "px";


      particle.style.height =
        size + "px";


      particleContainer.appendChild(
        particle
      );


      const duration =
        Math.random()
        * 4500
        + 4500;


      const drift =
        Math.random()
        * 90
        - 45;


      particle.animate(

        [

          {
            transform:
              "translate3d(0,0,0)",

            opacity: 0
          },

          {
            opacity: 1,

            offset: 0.2
          },

          {
            transform:
              `translate3d(
                ${drift}px,
                -${window.innerHeight + 180}px,
                0
              )`,

            opacity: 0
          }

        ],

        {
          duration,

          easing:
            "linear"
        }

      );


      setTimeout(
        () => {

          particle.remove();

        },
        duration
      );

    },
    160
  );

}



/* =========================================================
   福按钮
========================================================= */

fuButton.addEventListener(
  "click",
  () => {

    flashGodButton(
      fuButton
    );


    createFuRain();


    showBlessing({
      type: "fu",

      symbol: "福",

      title:
        "福星降临",

      text:
        "愿奶奶福气满满，平安喜乐，\n好运常伴，万事如意。"
    });


    launchMiniFireworks(
      3
    );


    fadeMusicTo(
      0.75,
      500
    );

  }
);



/* =========================================================
   寿按钮
========================================================= */

shouButton.addEventListener(
  "click",
  () => {

    flashGodButton(
      shouButton
    );


    createPetalRain();


    showBlessing({
      type: "shou",

      symbol: "寿",

      title:
        "寿星降临",

      text:
        "愿奶奶身体健康，笑口常开，\n福如东海，寿比南山。"
    });


    launchMiniFireworks(
      3
    );


    fadeMusicTo(
      0.75,
      500
    );

  }
);



/* =========================================================
   福寿按钮闪光
========================================================= */

function flashGodButton(
  button
) {

  const symbol =
    button.querySelector(
      ".god-symbol"
    );


  symbol.animate(

    [

      {
        transform:
          "scale(1)"
      },

      {
        transform:
          "scale(1.45)",

        filter:
          "brightness(1.8)"
      },

      {
        transform:
          "scale(1)"
      }

    ],

    {
      duration: 520,

      easing:
        "ease-out"
    }

  );

}



/* =========================================================
   福字雨
========================================================= */

function createFuRain() {

  for (
    let i = 0;
    i < 32;
    i++
  ) {

    setTimeout(
      () => {

        const fu =
          document.createElement(
            "div"
          );


        fu.className =
          "fu-rain";


        fu.textContent =
          "福";


        fu.style.left =
          Math.random()
          * 94
          + "%";


        fu.style.fontSize =
          (
            Math.random()
            * 24
            + 22
          )
          + "px";


        const duration =
          Math.random()
          * 1800
          + 3000;


        fu.style.animationDuration =
          duration
          + "ms";


        effectLayer.appendChild(
          fu
        );


        setTimeout(
          () => {

            fu.remove();

          },
          duration + 200
        );

      },
      i * 65
    );

  }

}



/* =========================================================
   桃花雨
========================================================= */

function createPetalRain() {

  const petals =
    [
      "🌸",
      "🌸",
      "🌸",
      "✨",
      "🌸"
    ];


  for (
    let i = 0;
    i < 34;
    i++
  ) {

    setTimeout(
      () => {

        const petal =
          document.createElement(
            "div"
          );


        petal.className =
          "peach-petal";


        petal.textContent =
          petals[
            Math.floor(
              Math.random()
              * petals.length
            )
          ];


        petal.style.left =
          Math.random()
          * 95
          + "%";


        petal.style.fontSize =
          (
            Math.random()
            * 13
            + 16
          )
          + "px";


        const duration =
          Math.random()
          * 2400
          + 3400;


        petal.style.animationDuration =
          duration
          + "ms";


        effectLayer.appendChild(
          petal
        );


        setTimeout(
          () => {

            petal.remove();

          },
          duration + 200
        );

      },
      i * 65
    );

  }

}



/* =========================================================
   显示福寿弹窗
========================================================= */

function showBlessing({
  type,
  symbol,
  title,
  text
}) {

  clearTimeout(
    popupTimer
  );


  blessingPopup.classList.remove(
    "show",
    "fu-mode",
    "shou-mode"
  );


  if (type === "fu") {

    blessingPopup.classList.add(
      "fu-mode"
    );

  }

  else {

    blessingPopup.classList.add(
      "shou-mode"
    );

  }


  popupSymbol.textContent =
    symbol;


  popupTitle.textContent =
    title;


  popupText.innerHTML =
    text.replace(
      "\n",
      "<br>"
    );


  requestAnimationFrame(
    () => {

      blessingPopup.classList.add(
        "show"
      );

    }
  );


  popupTimer =
    setTimeout(
      hideBlessing,
      4300
    );

}



/* =========================================================
   关闭福寿弹窗
========================================================= */

function hideBlessing() {

  blessingPopup.classList.remove(
    "show"
  );


  fadeMusicTo(
    0.6,
    700
  );

}


blessingPopup.addEventListener(
  "click",
  hideBlessing
);



/* =========================================================
   蛋糕许愿
========================================================= */

cakeButton.addEventListener(
  "click",
  () => {

    wishPanel.classList.add(
      "show"
    );


    launchFireworks();


    fadeMusicTo(
      0.9,
      650
    );

  }
);



/* =========================================================
   关闭最终祝福
========================================================= */

wishPanel.addEventListener(
  "click",
  () => {

    wishPanel.classList.remove(
      "show"
    );


    fadeMusicTo(
      0.6,
      850
    );

  }
);



/* =========================================================
   Canvas
========================================================= */

function resizeCanvas() {

  const ratio =
    Math.min(
      window.devicePixelRatio ||
      1,
      2
    );


  canvas.width =
    window.innerWidth
    * ratio;


  canvas.height =
    window.innerHeight
    * ratio;


  canvas.style.width =
    window.innerWidth
    + "px";


  canvas.style.height =
    window.innerHeight
    + "px";


  ctx.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );

}


resizeCanvas();


window.addEventListener(
  "resize",
  resizeCanvas
);



/* =========================================================
   大烟花
========================================================= */

function launchFireworks() {

  for (
    let i = 0;
    i < 10;
    i++
  ) {

    setTimeout(
      () => {

        createExplosion(

          Math.random()
          * window.innerWidth,

          Math.random()
          * window.innerHeight
          * 0.62
          + 40,

          90

        );

      },
      i * 280
    );

  }

}



/* =========================================================
   小烟花
========================================================= */

function launchMiniFireworks(
  amount
) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    setTimeout(
      () => {

        createExplosion(

          window.innerWidth
          *
          (
            0.2 +
            Math.random()
            * 0.6
          ),

          window.innerHeight
          *
          (
            0.18 +
            Math.random()
            * 0.35
          ),

          50

        );

      },
      i * 300
    );

  }

}



/* =========================================================
   创建烟花
========================================================= */

function createExplosion(
  x,
  y,
  amount = 70
) {

  const explosion = [];


  const colors = [

    [255, 213, 95],

    [255, 240, 185],

    [255, 145, 45],

    [255, 91, 25],

    [255, 181, 74]

  ];


  const selectedColor =
    colors[
      Math.floor(
        Math.random()
        * colors.length
      )
    ];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const angle =
      Math.random()
      * Math.PI
      * 2;


    const speed =
      Math.random()
      * 5.5
      + 1.7;


    explosion.push({

      x,

      y,

      vx:
        Math.cos(angle)
        * speed,

      vy:
        Math.sin(angle)
        * speed,

      life: 1,

      decay:
        Math.random()
        * 0.006
        + 0.009,

      size:
        Math.random()
        * 2
        + 1,

      r:
        selectedColor[0],

      g:
        selectedColor[1],

      b:
        selectedColor[2]

    });

  }


  fireworks.push(
    explosion
  );

}



/* =========================================================
   烟花动画
========================================================= */

function animateFireworks() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );


  fireworks.forEach(
    explosion => {

      explosion.forEach(
        particle => {

          if (
            particle.life <= 0
          ) {
            return;
          }


          particle.x +=
            particle.vx;


          particle.y +=
            particle.vy;


          particle.vx *=
            0.985;


          particle.vy *=
            0.985;


          particle.vy +=
            0.035;


          particle.life -=
            particle.decay;


          ctx.beginPath();


          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );


          ctx.fillStyle =
            `rgba(
              ${particle.r},
              ${particle.g},
              ${particle.b},
              ${particle.life}
            )`;


          ctx.shadowBlur =
            10;


          ctx.shadowColor =
            `rgba(
              ${particle.r},
              ${particle.g},
              ${particle.b},
              ${particle.life}
            )`;


          ctx.fill();

        }
      );

    }
  );


  ctx.shadowBlur = 0;


  fireworks =
    fireworks.filter(
      explosion =>

        explosion.some(
          particle =>
            particle.life > 0
        )
    );


  requestAnimationFrame(
    animateFireworks
  );

}


animateFireworks();