document.addEventListener("DOMContentLoaded", function () {
  //tabs
  const tabs = document.querySelectorAll(".nav-link");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Skip if the tab is disabled
      if (
        this.classList.contains("disabled") ||
        this.getAttribute("aria-disabled") === "true"
      ) {
        return;
      }

      // Remove active/show classes from all tabs and panes
      tabs.forEach((t) => t.classList.remove("active"));
      panes.forEach((p) => p.classList.remove("active", "show"));

      // Add active/show to clicked tab and its content
      this.classList.add("active");
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.classList.add("active", "show");
      }
    });
  });

  //accordion
  document.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", function () {
      const target = document.querySelector(this.getAttribute("data-target"));
      const parent = document.querySelector(target.getAttribute("data-parent"));
      const isOpening = !target.classList.contains("show");

      // Close all panels and reset aria-expanded
      parent.querySelectorAll(".collapse").forEach((panel) => {
        if (panel !== target) {
          panel.style.height = "0";
          panel.style.opacity = "0";
          panel.classList.remove("show");
        }
      });

      parent.querySelectorAll("[data-target]").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
      });

      // Toggle panel
      if (isOpening) {
        target.classList.add("show");
        const fullHeight = target.scrollHeight + "px";
        target.style.height = fullHeight;
        target.style.opacity = "1";
        setTimeout(() => (target.style.height = "auto"), 300);
        this.setAttribute("aria-expanded", "true");
      } else {
        target.style.height = target.scrollHeight + "px";
        void target.offsetHeight;
        target.style.height = "0";
        target.style.opacity = "0";
        setTimeout(() => target.classList.remove("show"), 300);
      }
    });
  });

  // Set initial state on page load
  document.querySelectorAll(".collapse.show").forEach((panel) => {
    panel.style.height = "auto";
    panel.style.opacity = "1";
  });

  //file upload
  const fileInput = document.getElementById("father-id-upload");
  const previewContainer = document.getElementById("file-preview");

  fileInput.addEventListener("change", function () {
    previewContainer.innerHTML = "";

    const file = this.files[0];
    if (!file) return;

    // Optional: Show image preview
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "200px";
        img.style.marginTop = "10px";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      // If not an image, show file name
      const fileName = document.createElement("p");
      fileName.textContent = file.name;
      previewContainer.appendChild(fileName);
    }
  });

  // Handle tab navigation (Next & Previous)
  document.addEventListener("click", (e) => {
    const nextBtn = e.target.closest(".next-step");
    const prevBtn = e.target.closest(".prev-step");

    if (!nextBtn && !prevBtn) return; // Exit if not a navigation button
    e.preventDefault();

    const currentTab = document.querySelector(".nav-tabs .nav-link.active");
    if (!currentTab) return;

    // Determine direction (next or previous)
    const direction = nextBtn ? "next" : "prev";
    const siblingMethod =
      direction === "next" ? "nextElementSibling" : "previousElementSibling";
    const targetTab = currentTab
      .closest(".nav-item")
      [siblingMethod]?.querySelector(".nav-link");
    if (!targetTab) return;

    // Update current tab
    currentTab.classList.toggle("active", false);
    currentTab.classList.toggle("completed", direction === "next");

    // Update current tab content
    document
      .querySelector(".tab-pane.active")
      ?.classList.remove("show", "active");

    // Activate target tab
    targetTab.classList.add("active");
    if (direction === "prev") targetTab.classList.remove("completed");

    // Show target tab content
    document
      .querySelector(targetTab.getAttribute("href"))
      ?.classList.add("show", "active");
  });
});
