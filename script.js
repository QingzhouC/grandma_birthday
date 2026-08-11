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



/* =========================
   开启生日场景
========================= */

startButton.addEventListener(
  "click",
  async () => {

    startScreen.classList.add("hide");

    scene.classList.add("active");


    try {

      music.volume = 0.6;

      await music.play();

    }

    catch (error) {

      console.log(
        "音乐播放被浏览器限制",
        error
      );

    }


    createParticles();

  }
);



/* =========================
   点击蛋糕
========================= */

cakeButton.addEventListener(
  "click",
  () => {

    wishPanel.classList.add("show");

    launchFireworks();

  }
);



wishPanel.addEventListener(
  "click",
  () => {

    wishPanel.classList.remove("show");

  }
);



/* =========================
   发光粒子
========================= */

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


      particle.classList.add(
        "particle"
      );


      particle.style.left =
        Math.random() * 100 + "%";


      particle.style.top =
        "105%";


      const size =
        Math.random() * 4 + 2;


      particle.style.width =
        size + "px";


      particle.style.height =
        size + "px";


      container.appendChild(
        particle
      );


      const duration =
        Math.random() * 5000 +
        4000;


      particle.animate(

        [

          {

            transform:
              "translateY(0)",

            opacity: 0

          },

          {

            opacity: 1

          },

          {

            transform:
              `translateY(-${window.innerHeight + 200}px)`,

            opacity: 0

          }

        ],

        {

          duration,

          easing: "linear"

        }

      );


      setTimeout(
        () => {

          particle.remove();

        },

        duration

      );

    },

    120

  );

}



/* =========================
   烟花
========================= */

const canvas =
  document.getElementById(
    "fireworks"
  );


const ctx =
  canvas.getContext("2d");


function resizeCanvas() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

}


resizeCanvas();


window.addEventListener(
  "resize",
  resizeCanvas
);



let fireworks = [];


function launchFireworks() {

  for (
    let j = 0;
    j < 6;
    j++
  ) {

    setTimeout(
      () => {

        createExplosion(

          Math.random()
          * canvas.width,

          Math.random()
          * canvas.height
          * 0.65

        );

      },

      j * 350

    );

  }

}



function createExplosion(x, y) {

  const particles = [];


  for (
    let i = 0;
    i < 70;
    i++
  ) {

    const angle =
      Math.random()
      * Math.PI
      * 2;


    const speed =
      Math.random()
      * 5
      + 2;


    particles.push({

      x,

      y,

      vx:

        Math.cos(angle)
        * speed,

      vy:

        Math.sin(angle)
        * speed,

      life: 1

    });

  }


  fireworks.push(
    particles
  );

}



function animateFireworks() {

  ctx.clearRect(

    0,
    0,
    canvas.width,
    canvas.height

  );


  fireworks.forEach(

    (explosion) => {

      explosion.forEach(

        (p) => {

          p.x += p.vx;

          p.y += p.vy;


          p.vy += 0.04;


          p.life -= 0.012;


          ctx.beginPath();


          ctx.arc(

            p.x,
            p.y,
            2,
            0,
            Math.PI * 2

          );


          ctx.fillStyle =

            `rgba(
              255,
              ${150 + Math.random() * 100},
              60,
              ${p.life}
            )`;


          ctx.fill();

        }

      );

    }

  );


  fireworks =
    fireworks.filter(

      explosion =>

        explosion.some(

          p =>
            p.life > 0

        )

    );


  requestAnimationFrame(
    animateFireworks
  );

}


animateFireworks();