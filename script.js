document.addEventListener("DOMContentLoaded", () => {
    // 1. Canvas Stars Animation
    const canvas = document.getElementById("void-canvas");
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.5 + 0.1
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";

        stars.forEach((star) => {
            star.y += star.speed;
            if (star.y > height) star.y = 0;

            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();

    // 2. Tracking Logic (localStorage)
    const VISIT_KEY = "endless_void_visits";
    let visitCount = parseInt(localStorage.getItem(VISIT_KEY) || "0", 10);
    visitCount += 1;
    localStorage.setItem(VISIT_KEY, visitCount.toString());

    const visitCountEl = document.getElementById("visit-count");
    if (visitCountEl) {
        visitCountEl.textContent = visitCount.toString();
    }

    // 3. Time Elapsed Counter
    let secondsElapsed = 0;
    const timeElapsedEl = document.getElementById("time-elapsed");
    setInterval(() => {
        secondsElapsed += 1;
        if (timeElapsedEl) {
            timeElapsedEl.textContent = secondsElapsed.toString();
        }
    }, 1000);

    // 4. CTA Button Behavior
    const enterBtn = document.getElementById("enter-btn");
    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            alert(`Entering the Void... Total visits logged: ${visitCount}`);
        });
    }
});
