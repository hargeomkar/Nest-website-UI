
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1. CHECK GSAP
  // =========================
  if (typeof gsap === "undefined") {
    console.error("GSAP not loaded. Check your internet connection.");
    return;
  }

 gsap.registerPlugin(ScrollTrigger);

  // =========================
  // 2. SELECT ELEMENTS
  // =========================
  const hero = document.querySelector(".team-section");
  const content = document.querySelector(".team-content");
  const visual = document.querySelector(".team-visual");
  const core = document.querySelector(".core");
  const cards = document.querySelectorAll(".floating-card");
  const orbits = document.querySelectorAll(".orbit");

  // =========================
  // 3. HERO TEXT ANIMATION
  // =========================
  if (content) {
    gsap.from(content.children, {
      opacity: 0,
      y: 35,
      duration: 0.9,
      stagger: 0.16,
      ease: "power3.out",
      delay: 0.15
    });
  }

  // =========================
  // 4. FLOATING 3D OBJECT
  // =========================
  if (core) {
    gsap.to(core, {
      y: -10,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // =========================
  // 5. FLOATING CARDS
  // =========================
  cards.forEach((card, index) => {
    gsap.to(card, {
      y: index % 2 === 0 ? -9 : 9,
      duration: 2 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2
    });
  });

  // =========================
  // 6. ORBIT ANIMATION
  // =========================
  orbits.forEach((orbit, index) => {
    gsap.to(orbit, {
      rotation: index % 2 === 0 ? 360 : -360,
      duration: 30 + index * 10,
      repeat: -1,
      ease: "none"
    });
  });

  // =========================
  // 7. MOUSE-BASED 3D EFFECT
  // =========================
  if (hero && visual && core) {
    hero.addEventListener("mousemove", (event) => {
      // Disable mouse movement on narrow screens
      if (window.innerWidth <= 760) return;

      const rect = visual.getBoundingClientRect();

      const x =
        (event.clientX - (rect.left + rect.width / 2)) /
        (rect.width / 2);

      const y =
        (event.clientY - (rect.top + rect.height / 2)) /
        (rect.height / 2);

      const mouseX = Math.max(-1, Math.min(1, x));
      const mouseY = Math.max(-1, Math.min(1, y));

      gsap.to(core, {
        rotationY: mouseX * 25,
        rotationX: -mouseY * 25,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });

      cards.forEach((card, index) => {
        const depth = (index + 1) * 8;

        gsap.to(card, {
          x: mouseX * depth,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    });

    // Reset 3D position when the mouse leaves
    hero.addEventListener("mouseleave", () => {
      gsap.to(core, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto"
      });

      cards.forEach((card) => {
        gsap.to(card, {
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }

  // =========================
 
/* =================================
   NEST MAGNETIC INTERACTIONS
================================= */

const finePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  typeof gsap !== "undefined" &&
  finePointer &&
  !reducedMotion
) {
  // MAGNETIC BUTTONS
  const magneticButtons = document.querySelectorAll(
    ".team-button, .nav-button, .contact-cta, .contact-submit"
  );

  magneticButtons.forEach((button) => {
    const moveX = gsap.quickTo(button, "x", {
      duration: 0.35,
      ease: "power3.out"
    });

    const moveY = gsap.quickTo(button, "y", {
      duration: 0.35,
      ease: "power3.out"
    });

    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();

      const offsetX =
        event.clientX - (rect.left + rect.width / 2);

      const offsetY =
        event.clientY - (rect.top + rect.height / 2);

      // Small movement keeps the effect professional
      moveX(offsetX * 0.18);
      moveY(offsetY * 0.18);
    });

    button.addEventListener("pointerleave", () => {
      moveX(0);
      moveY(0);
    });
  });

  // MAGNETIC LIFT FOR SOLUTION CARDS
  const solutionCards = document.querySelectorAll(
    ".solution-card"
  );

  solutionCards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      gsap.to(card, {
        y: -7,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    card.addEventListener("pointerleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  });

  console.log("NEST magnetic interactions initialized.");
}


  // =========================
  // 9. REVEAL CONTENT SECTIONS
  // =========================
  const sections = document.querySelectorAll(".info-section");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          gsap.fromTo(
            entry.target.children,
            {
              opacity: 0,
              y: 25
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out"
            }
          );

          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // =========================
  // 10. FINISHED
  // =========================
  console.log("NEST animations initialized successfully.");
  
  // =========================
  // 11. SWIPER INITIALIZATION
  // =========================
  const solutionsElement = document.querySelector(".solutionsSwiper");

  if (solutionsElement && typeof Swiper !== "undefined") {
    const solutionsSwiper = new Swiper(".solutionsSwiper", {
      slidesPerView: "auto",
      spaceBetween: 25,
      grabCursor: true,
      speed: 900,
      watchSlidesProgress: true,
      breakpoints: {
        768: {
          spaceBetween: 30
        }
      }
    });

    // =========================
    // 12. SCROLL-DRIVEN EFFECT
    // =========================
    gsap.fromTo(
      ".solutions-section .solution-card",
      {
        y: 70,
        opacity: 0.4,
        rotateX: 8
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".solutions-section",
          start: "top 75%",
          end: "top 25%",
          scrub: 1
        }
      }
    );
  }

});

  // =========================
  // 13. COMPANY 3D ANIMATION
  // =========================

  const companySection = document.querySelector(".company-3d-section");
  const companyCube = document.querySelector(".company-cube");
  const companyOrbits = document.querySelectorAll(".company-orbit");
  const techOrbs = document.querySelectorAll(".tech-orb");
  const companyContent = document.querySelector(".company-3d-content");

  if (companySection && companyCube) {

    // Rotate the 3D cube continuously
    gsap.to(companyCube, {
      rotationY: 360,
      rotationX: 360,
      duration: 12,
      repeat: -1,
      ease: "none"
    });

    // Rotate the orbit rings
    companyOrbits.forEach((orbit, index) => {
      gsap.to(orbit, {
        rotation: index % 2 === 0 ? "+=360" : "-=360",
        duration: 20 + index * 8,
        repeat: -1,
        ease: "none"
      });
    });

    // Floating technology orbs
    techOrbs.forEach((orb, index) => {
      gsap.to(orb, {
        y: index % 2 === 0 ? -20 : 20,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Reveal content when scrolling into the section
    if (typeof ScrollTrigger !== "undefined") {
      gsap.from(companyContent.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: companySection,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Scale the cube as the section enters view
      gsap.fromTo(
        companyCube,
        { scale: 0.65 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: companySection,
            start: "top 85%",
            end: "center center",
            scrub: 1
          }
        }
      );
    }
  }

/* THREE.JS TECHNOLOGY UNIVERSE */
const canvas = document.querySelector("#tech-canvas");

if (canvas && typeof THREE !== "undefined") {
  const wrap = canvas.parentElement;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080811, 0.035);

  const camera = new THREE.PerspectiveCamera(
    45,
    wrap.clientWidth / wrap.clientHeight,
    0.1,
    100
  );

  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);

  scene.add(new THREE.AmbientLight(0xffffff, 1.2));

  const purpleLight = new THREE.PointLight(0x9d4dff, 35, 30);
  purpleLight.position.set(2, 2, 5);
  scene.add(purpleLight);

  const blueLight = new THREE.PointLight(0x463dff, 20, 25);
  blueLight.position.set(-4, -2, 2);
  scene.add(blueLight);

  const universe = new THREE.Group();
  scene.add(universe);

  // Central 3D sphere
  const sphereGeometry = new THREE.IcosahedronGeometry(1.65, 2);

  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x28104b,
    emissive: 0x4d168d,
    emissiveIntensity: 0.7,
    wireframe: true,
    roughness: 0.3,
    metalness: 0.7
  });

  const sphere = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
  );

  universe.add(sphere);

  // Inner glowing core
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.85, 1),
    new THREE.MeshBasicMaterial({
      color: 0xb66cff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    })
  );

  universe.add(core);

  // Orbiting rings
  const rings = [];

  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.3 + i * 0.25, 0.008, 8, 160),
      new THREE.MeshBasicMaterial({
        color: i === 1 ? 0x7650ff : 0xc38aff,
        transparent: true,
        opacity: 0.65
      })
    );

    ring.rotation.x = 0.8 + i * 0.6;
    ring.rotation.y = i * 0.7;

    universe.add(ring);
    rings.push(ring);
  }

  // Floating geometric objects
  const objects = [];
  const geometries = [
    new THREE.IcosahedronGeometry(0.18, 0),
    new THREE.OctahedronGeometry(0.2),
    new THREE.BoxGeometry(0.22, 0.22, 0.22)
  ];

  for (let i = 0; i < 18; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: i % 2 ? 0xb66cff : 0x7464ff,
      emissive: 0x35105e,
      metalness: 0.7,
      roughness: 0.3
    });

    const object = new THREE.Mesh(
      geometries[i % geometries.length],
      material
    );

    const angle = (i / 18) * Math.PI * 2;
    const radius = 2.8 + Math.random() * 1.7;

    object.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.65,
      (Math.random() - 0.5) * 3
    );

    object.userData.baseY = object.position.y;
    object.userData.phase = Math.random() * Math.PI * 2;

    universe.add(object);
    objects.push(object);
  }

  // Particle field
  const particleCount = 900;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0xc38aff,
      size: 0.025,
      transparent: true,
      opacity: 0.75
    })
  );

  scene.add(particles);

  // Mouse interaction
  let targetX = 0;
  let targetY = 0;
  let dragX = 0;
  let dragY = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();

    if (dragging) {
      dragY += (event.clientX - lastX) * 0.008;
      dragX += (event.clientY - lastY) * 0.008;
      lastX = event.clientX;
      lastY = event.clientY;
    } else {
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.4;
    }
  });

  canvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointerup", () => {
    dragging = false;
  });

  canvas.addEventListener("pointercancel", () => {
    dragging = false;
  });

  // Animate scene
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    sphere.rotation.y += 0.002;
    sphere.rotation.x += 0.0008;

    core.rotation.y -= 0.003;
    core.rotation.x += 0.002;

    rings.forEach((ring, i) => {
      ring.rotation.z += i % 2 ? -0.002 : 0.0015;
    });

    objects.forEach((object) => {
      object.rotation.x += 0.008;
      object.rotation.y += 0.006;

      object.position.y =
        object.userData.baseY +
        Math.sin(time * 1.3 + object.userData.phase) * 0.12;
    });

    universe.rotation.y += (targetX + dragY - universe.rotation.y) * 0.035;
    universe.rotation.x += (targetY + dragX - universe.rotation.x) * 0.035;

    particles.rotation.y = time * 0.012;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive canvas
  const resizeObserver = new ResizeObserver(() => {
    const width = wrap.clientWidth;
    const height = wrap.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.position.x = width < 500 ? 0 : 0;
    camera.position.z = width < 500 ? 12 : 10;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  });

  resizeObserver.observe(wrap);

  // Update text when a technology is selected
  const techDescriptions = {
    HTML5: "Semantic structure for modern web experiences.",
    CSS3: "Responsive layouts, visual systems and advanced styling.",
    JavaScript: "Interactive experiences powered by JavaScript.",
    React: "Reusable components for dynamic user interfaces.",
    GSAP: "Precise motion design and scroll-triggered animation.",
    "Three.js": "Immersive real-time 3D experiences for the web."
  };

  const title = document.querySelector("#tech-title");
  const copy = document.querySelector("#tech-copy");
  const buttons = document.querySelectorAll(".tech-pills button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tech = button.dataset.tech;

      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      title.textContent = tech;
      copy.textContent = techDescriptions[tech];

      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          [title, copy],
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            overwrite: true
          }
        );
      }

      purpleLight.intensity = 45;
    });
  });
}


/* INTERACTIVE PROJECT GALLERY */
const projectItems = document.querySelectorAll(".project-item");
const projectPreview = document.querySelector("#project-preview");
const previewArt = document.querySelector("#preview-art");
const previewTitle = document.querySelector("#preview-title");
const projectNumber = document.querySelector("#project-number");
const previewCaption = document.querySelector("#preview-caption");

const projectData = [
  {
    title: "Digital<br>Experiences.",
    caption: "WEB DESIGN · DEVELOPMENT",
    color: "art-purple",
    number: "PROJECT / 01"
  },
  {
    title: "Identity<br>With Purpose.",
    caption: "BRANDING · ART DIRECTION",
    color: "art-blue",
    number: "PROJECT / 02"
  },
  {
    title: "Commerce<br>Reimagined.",
    caption: "UI/UX · E-COMMERCE",
    color: "art-orange",
    number: "PROJECT / 03"
  },
  {
    title: "Motion<br>In Action.",
    caption: "MOTION · INTERACTION",
    color: "art-green",
    number: "PROJECT / 04"
  }
];

projectItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const data = projectData[index];

    projectItems.forEach((button) =>
      button.classList.remove("active")
    );
    item.classList.add("active");

    previewTitle.innerHTML = data.title;
    previewCaption.textContent = data.caption;
    projectNumber.textContent = data.number;

    previewArt.classList.remove(
      "art-purple", "art-blue", "art-orange", "art-green"
    );
    previewArt.classList.add(data.color);

    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        previewArt,
        { opacity: 0, scale: 0.92, rotateY: -8 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.55,
          ease: "power3.out"
        }
      );
    }
  });
});

/* Mouse-responsive 3D tilt */
if (projectPreview && window.matchMedia("(pointer: fine)").matches) {
  projectPreview.addEventListener("mousemove", (event) => {
    const rect = projectPreview.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (typeof gsap !== "undefined") {
      gsap.to(projectPreview, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  });

  projectPreview.addEventListener("mouseleave", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(projectPreview, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out"
      });
    }
  });
}

/* NEST CUSTOM CURSOR */
const customCursor = document.querySelector(".custom-cursor");

if (customCursor && window.matchMedia("(pointer: fine)").matches) {
  const cursorDot = customCursor.querySelector(".cursor-dot");
  const cursorRing = customCursor.querySelector(".cursor-ring");
  const cursorLabel = customCursor.querySelector(".cursor-label");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Keep cursor elements moving smoothly with GSAP
  if (typeof gsap !== "undefined") {
    gsap.set(customCursor, { x: mouseX, y: mouseY });

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      customCursor.classList.add("is-visible");

      gsap.to(customCursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.18,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  } else {
    window.addEventListener("mousemove", (event) => {
      customCursor.style.left = `${event.clientX}px`;
      customCursor.style.top = `${event.clientY}px`;
      customCursor.classList.add("is-visible");
    });
  }

  document.addEventListener("mouseleave", () => {
    customCursor.classList.remove("is-visible");
  });

  document.addEventListener("mouseenter", () => {
    customCursor.classList.add("is-visible");
  });

  // Interactive hover targets
  const hoverTargets = document.querySelectorAll(
    "a, button, .project-preview, .solution-card"
  );

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      customCursor.classList.add("cursor-hover");

      if (target.classList.contains("project-preview")) {
        cursorLabel.textContent = "EXPLORE";
      } else {
        cursorLabel.textContent = "VIEW";
      }
    });

    target.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-hover");
      cursorLabel.textContent = "VIEW";
    });
  });

  document.addEventListener("mousedown", () => {
    customCursor.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", () => {
    customCursor.classList.remove("cursor-click");
  });
}


/* CONTACT FORM — EMAIL DRAFT */
const contactForm = document.querySelector("#nest-contact-form");
const contactNote = document.querySelector("#contact-form-note");

if (contactForm && contactNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const service = formData.get("service");
    const message = formData.get("message");

    const subject = encodeURIComponent(
      `Project enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`
    );

    contactNote.textContent =
      "Opening your email app to send this enquiry…";

    window.location.href =
      `mailto:hello@yourdomain.com?subject=${subject}&body=${body}`;
  });
}


/* CUTE CHARACTER MOUSE REACTION */
const cuteCharacters = document.querySelectorAll(".cute-character");

if (typeof gsap !== "undefined") {
  cuteCharacters.forEach((character, index) => {
    character.addEventListener("mouseenter", () => {
      gsap.to(character, {
        scale: 1.5,
        rotation: index % 2 === 0 ? 20 : -20,
        duration: 0.3,
        ease: "back.out(2)"
      });
    });

    character.addEventListener("mouseleave", () => {
      gsap.to(character, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });
}

/* ========================================
   NEST COMPANY SCROLL STORY
======================================== */

const companyStory = document.querySelector(".company-story");

if (
  companyStory &&
  typeof gsap !== "undefined" &&
  typeof ScrollTrigger !== "undefined"
) {
  gsap.registerPlugin(ScrollTrigger);

  const steps = gsap.utils.toArray(".story-step");
  const fragments = gsap.utils.toArray(".story-fragments i");
  const core = document.querySelector(".story-core");
  const rings = gsap.utils.toArray(".story-ring");
  const progressFill = document.querySelector(".story-progress-fill");
  const storyNumber = document.querySelector("#story-number");

  const mobileStory = window.matchMedia("(max-width: 760px)");

  // Desktop: pinned scroll storytelling
  if (!mobileStory.matches) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: companyStory,
        start: "top top",
        end: "+=3000",
        pin: ".company-pin",
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    steps.forEach((step, index) => {
      if (index === 0) {
        gsap.set(step, { display: "block", autoAlpha: 1 });
      } else {
        gsap.set(step, { display: "none", autoAlpha: 0 });
      }
    });

    timeline.to({}, { duration: 0.5 });

    for (let index = 1; index < steps.length; index++) {
      timeline.addLabel(`stage-${index}`);

      timeline.to(steps[index - 1], {
        autoAlpha: 0,
        y: -25,
        duration: 0.25,
        onComplete: () => {
          gsap.set(steps[index - 1], { display: "none" });
        },
        onReverseComplete: () => {
          gsap.set(steps[index - 1], { display: "block" });
        }
      });

      timeline.set(steps[index], {
        display: "block",
        y: 25
      });

      timeline.to(steps[index], {
        autoAlpha: 1,
        y: 0,
        duration: 0.3
      });

      timeline.to(core, {
        rotationY: index % 2 ? 180 : 0,
        rotationX: index * 8,
        scale: index === 3 ? 1.12 : 1,
        duration: 0.45
      }, "<");

      timeline.to(fragments, {
        x: () => gsap.utils.random(-35, 35),
        y: () => gsap.utils.random(-35, 35),
        rotation: () => gsap.utils.random(-90, 90),
        opacity: index === 1 ? 0.9 : 0.5,
        stagger: 0.015,
        duration: 0.35
      }, "<");

      timeline.to(storyNumber, {
        innerText: index + 1,
        snap: { innerText: 1 },
        duration: 0.2
      }, "<");

      timeline.to(progressFill, {
        scaleX: (index + 1) / steps.length,
        duration: 0.3
      }, "<");
    }

    timeline.to({}, { duration: 0.5 });
  }

  // Ambient motion that runs on both desktop and mobile
  gsap.to(core, {
    y: -8,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(rings, {
    rotation: "+=360",
    duration: 35,
    repeat: -1,
    ease: "none",
    stagger: 3
  });

  // Mobile: reveal each story block naturally
  if (mobileStory.matches) {
    steps.forEach((step, index) => {
      gsap.set(step, {
        display: "block",
        autoAlpha: 1,
        clearProps: "transform"
      });
    });

    gsap.set(storyNumber, { innerText: "01" });
    gsap.set(progressFill, { scaleX: 1 });
  }

  ScrollTrigger.refresh();
}
