document.addEventListener("DOMContentLoaded", () => {
    // Simulated User Login
    const userName = "John Doe"; // Change this dynamically
    document.getElementById("user-name").textContent = userName || "Guest";

    // SLIDER FUNCTIONALITY
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;

        document.querySelector(".slides").style.transform = `translateX(-${slideIndex * 100}%)`;

        // Update active dot
        dots.forEach(dot => dot.classList.remove("active"));
        dots[slideIndex].classList.add("active");
    }

    function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex--;
        showSlide(slideIndex);
    }

    function goToSlide(index) {
        slideIndex = index;
        showSlide(slideIndex);
    }

    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", prevSlide);
    dots.forEach((dot, index) => dot.addEventListener("click", () => goToSlide(index)));

    // Auto Slide
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // DROPDOWN FUNCTIONALITY
    document.querySelectorAll(".dropdown, .currency-dropdown").forEach(dropdown => {
        const input = dropdown.querySelector("input");
        const menu = dropdown.querySelector("ul");

        input.addEventListener("focus", () => {
            menu.style.display = "block";
        });

        input.addEventListener("blur", () => {
            setTimeout(() => (menu.style.display = "none"), 200);
        });

        menu.querySelectorAll("li").forEach(item => {
            item.addEventListener("click", () => {
                input.value = item.textContent;
                menu.style.display = "none";
            });
        });
    });

    // SEARCH FUNCTIONALITY (Basic Filtering)
    const searchInput = document.querySelector(".search");
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const items = document.querySelectorAll(".dropdown-menu li");

        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    let indexMap = { "b-2-l-u": 0, "b-2-l-l": 0, "b-2-r": 0 };
    let autoScrollIntervals = {};

    function showSlides(containerId) {
        let container = document.querySelector(`.${containerId}-container`);
        let totalSlides = container.children.length;
        let dots = document.querySelectorAll(`.${containerId}-dots .dot`);

        container.style.transform = `translateX(${-indexMap[containerId] * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === indexMap[containerId]);
        });
    }

    function nextSlide(containerId) {
        let totalSlides = document.querySelector(`.${containerId}-container`).children.length;
        indexMap[containerId] = (indexMap[containerId] + 1) % totalSlides;
        showSlides(containerId);
        resetAutoScroll(containerId);
    }

    function prevSlide(containerId) {
        let totalSlides = document.querySelector(`.${containerId}-container`).children.length;
        indexMap[containerId] = (indexMap[containerId] - 1 + totalSlides) % totalSlides;
        showSlides(containerId);
        resetAutoScroll(containerId);
    }

    function createDots(containerId) {
        let totalSlides = document.querySelector(`.${containerId}-container`).children.length;
        let dotsContainer = document.querySelector(`.${containerId}-dots`);
        dotsContainer.innerHTML = "";

        for (let i = 0; i < totalSlides; i++) {
            let dot = document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
                indexMap[containerId] = i;
                showSlides(containerId);
                resetAutoScroll(containerId);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function startAutoScroll(containerId) {
        stopAutoScroll(containerId);
        autoScrollIntervals[containerId] = setInterval(() => {
            nextSlide(containerId);
        }, 5000);
    }

    function stopAutoScroll(containerId) {
        clearInterval(autoScrollIntervals[containerId]);
    }

    function resetAutoScroll(containerId) {
        stopAutoScroll(containerId);
        startAutoScroll(containerId);
    }

    ["b-2-l-u", "b-2-l-l", "b-2-r"].forEach(containerId => {
        createDots(containerId);
        showSlides(containerId);
        startAutoScroll(containerId);

        document.querySelector(`.${containerId}-next`).addEventListener("click", () => nextSlide(containerId));
        document.querySelector(`.${containerId}-prev`).addEventListener("click", () => prevSlide(containerId));
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const imageContainers = document.querySelectorAll(".image-container");
    let currentIndex = 0;
    let autoScrollInterval;

    function showTab(index) {
        // Remove active class from all
        tabs.forEach(tab => tab.classList.remove("active"));
        imageContainers.forEach(container => {
            container.classList.remove("active");
            container.style.display = "none";
        });

        // Set active class for the selected tab
        tabs[index].classList.add("active");
        imageContainers[index].style.display = "grid";

        // Trigger animation
        setTimeout(() => {
            imageContainers[index].classList.add("active");
        }, 50);
    }

    function autoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabs.length;
            showTab(currentIndex);
        }, 10000);
    }

    // Click event for manual selection
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            clearInterval(autoScrollInterval);
            showTab(index);
            currentIndex = index;
            autoScroll();
        });
    });

    // Initialize first tab and auto-scroll
    showTab(currentIndex);
    autoScroll();
});
