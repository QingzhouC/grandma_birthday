/* =========================================================
   元素
========================================================= */

const startButton =
  document.getElementById("start-btn");

const startScreen =
  document.getElementById("start-screen");

const scene =
  document.getElementById("birthday-scene");

const music =
  document.getElementById("birthday-music");

const cakeButton =
  document.getElementById("cake-btn");

const wishPanel =
  document.getElementById("wish-panel");

const backgroundImage =
  document.getElementById("backgroundImage");

const fuButton =
  document.getElementById("fu-btn");

const shouButton =
  document.getElementById("shou-btn");

const blessingPopup =
  document.getElementById("blessing-popup");

const popupSymbol =
  document.getElementById("popup-symbol");

const popupTitle =
  document.getElementById("popup-title");

const popupText =
  document.getElementById("popup-text");

const effectLayer =
  document.getElementById(
    "blessing-effect-layer"
  );



/* =========================================================
   状态
========================================================= */

let particlesStarted = false;

let popupTimer = null;

let musicFadeTimer = null;



/* =========================================================
   开启寿宴
========================================================= */

startButton.addEventListener(
  "click",
  async () => {

    startButton.disabled = true;


    /* 开启场景 */

    scene.classList.add(
      "active"
    );


    /* 启动音乐 */

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
        "音乐播放被浏览器限制：",
        error
      );

    }


    /* 启动粒子 */

    if (!particlesStarted) {

      createParticles();

      particlesStarted = true;

    }


    /* 稍微晚一点隐藏启动页面 */

    setTimeout(
      () => {

        startScreen.classList.add(
          "hide"
        );

      },
      180
    );

  }
);



/* =========================================================
   音乐淡入淡出
========================================================= */

function fadeMusicTo(
  targetVolume,
  duration = 1000
) {

  clearInterval(
    musicFadeTimer
  );


  const startVolume =
    music.volume;


  const difference =
    targetVolume -
    startVolume;


  const steps = 30;

  let currentStep = 0;


  musicFadeTimer =
    setInterval(
      () => {

        currentStep++;


        const progress =
          currentStep /
          steps;


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


        if (
          currentStep >= steps
        ) {

          music.volume =
            targetVolume;

          clearInterval(
            musicFadeTimer
          );

        }

      },
      duration / steps
    );

}



/* =========================================================
   普通金色粒子
========================================================= */

function createParticles() {

  const container =
    document.getElementById(
      "particles"
    );


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
        size
        + "px";


      particle.style.height =
        size
        + "px";


      container.appendChild(
        particle
      );


      const duration =
        Math.random()
        * 4500
        + 4500;


      particle.animate(

        [

          {

            transform:
              "translateY(0) translateX(0)",

            opacity: 0

          },

          {

            opacity: 1,

            offset: 0.2

          },

          {

            transform:
              `translateY(-${window.innerHeight + 200}px)
               translateX(${Math.random() * 80 - 40}px)`,

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

    150
  );

}



/* =========================================================
   福按钮
========================================================= */

fuButton.addEventListener(
  "click",
  () => {

    buttonFlash(
      fuButton
    );


    createFuRain();


    showBlessingPopup({

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

    buttonFlash(
      shouButton
    );


    createPeachPetals();


    showBlessingPopup({

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
   按钮闪光
========================================================= */

function buttonFlash(
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

      duration: 550,

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
    i < 28;
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
            * 22
            + 20
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

          duration
          + 200
        );

      },

      i * 75
    );

  }

}



/* =========================================================
   寿：桃花雨
========================================================= */

function createPeachPetals() {

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
    i < 30;
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


        const duration =
          Math.random()
          * 2500
          + 3500;


        petal.style.animationDuration =
          duration
          + "ms";


        petal.style.fontSize =
          (
            Math.random()
            * 12
            + 16
          )
          + "px";


        effectLayer.appendChild(
          petal
        );


        setTimeout(
          () => {

            petal.remove();

          },

          duration
          + 300
        );

      },

      i * 70
    );

  }

}



/* =========================================================
   福寿祝福弹层
========================================================= */

function showBlessingPopup(
  {
    type,
    symbol,
    title,
    text
  }
) {

  clearTimeout(
    popupTimer
  );


  blessingPopup.classList.remove(
    "fu-mode",
    "shou-mode",
    "show"
  );


  if (
    type === "fu"
  ) {

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
      () => {

        hideBlessingPopup();

      },

      4500
    );

}



/* =========================================================
   关闭福寿弹层
========================================================= */

function hideBlessingPopup() {

  blessingPopup.classList.remove(
    "show"
  );


  fadeMusicTo(
    0.6,
    800
  );

}


blessingPopup.addEventListener(
  "click",
  hideBlessingPopup
);



/* =========================================================
   点击蛋糕
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
      900
    );

  }
);



/* =========================================================
   烟花
========================================================= */

const canvas =
  document.getElementById(
    "fireworks"
  );


const ctx =
  canvas.getContext(
    "2d"
  );


let fireworks = [];



function resizeCanvas() {

  const ratio =
    Math.min(
      window.devicePixelRatio
      || 1,
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
          * 0.65
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
  count
) {

  for (
    let i = 0;
    i < count;
    i++
  ) {

    setTimeout(
      () => {

        createExplosion(

          window.innerWidth
          * (
            0.25
            +
            Math.random()
            * 0.5
          ),

          window.innerHeight
          * (
            0.2
            +
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
   创建烟花爆炸
========================================================= */

function createExplosion(
  x,
  y,
  amount = 70
) {

  const particles = [];


  const palettes = [

    [255, 205, 88],

    [255, 235, 170],

    [255, 135, 40],

    [255, 80, 25],

    [255, 180, 75]

  ];


  const palette =
    palettes[
      Math.floor(
        Math.random()
        * palettes.length
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
      + 1.8;


    particles.push({

      x,

      y,

      vx:
        Math.cos(
          angle
        )
        * speed,

      vy:
        Math.sin(
          angle
        )
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
        palette[0],

      g:
        palette[1],

      b:
        palette[2]

    });

  }


  fireworks.push(
    particles
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


          if (
            particle.life <= 0
          ) {

            return;

          }


          ctx.beginPath();


          ctx.arc(

            particle.x,

            particle.y,

            particle.size,

            0,

            Math.PI
            * 2

          );


          ctx.fillStyle =
            `rgba(
              ${particle.r},
              ${particle.g},
              ${particle.b},
              ${particle.life}
            )`;


          ctx.shadowBlur =
            12;


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



/* =========================================================
   手机陀螺仪
========================================================= */

let gyroEnabled = false;



function handleOrientation(
  event
) {

  if (
    !scene.classList.contains(
      "active"
    )
  ) {

    return;

  }


  const gamma =
    event.gamma
    || 0;


  const beta =
    event.beta
    || 0;


  const x =
    Math.max(
      -8,
      Math.min(
        8,
        gamma / 5
      )
    );


  const y =
    Math.max(
      -6,
      Math.min(
        6,
        (
          beta - 45
        )
        / 8
      )
    );


  backgroundImage.style.transform =
    `
      scale(1.10)
      translate(
        ${x}px,
        ${y}px
      )
    `;

}



/* =========================================================
   iPhone 陀螺仪权限
========================================================= */

async function enableGyroscope() {

  if (
    gyroEnabled
  ) {

    return;

  }


  try {

    if (
      typeof DeviceOrientationEvent
      !==
      "undefined"
      &&
      typeof DeviceOrientationEvent
        .requestPermission
      ===
      "function"
    ) {

      const permission =
        await DeviceOrientationEvent
          .requestPermission();


      if (
        permission
        ===
        "granted"
      ) {

        window.addEventListener(
          "deviceorientation",
          handleOrientation
        );


        gyroEnabled = true;

      }

    }

    else {

      window.addEventListener(
        "deviceorientation",
        handleOrientation
      );


      gyroEnabled = true;

    }

  }

  catch (error) {

    console.log(
      "陀螺仪权限未开启：",
      error
    );

  }

}



/* 用户点击开启寿宴时请求权限 */

startButton.addEventListener(
  "click",
  enableGyroscope
);