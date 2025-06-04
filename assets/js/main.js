document.addEventListener("DOMContentLoaded", function () {
  // Toggle sub-navigation (child items)
  document.querySelectorAll(".parent-nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (e.target.closest(".child-nav-item")) return;

      const child = this.querySelector(".child-nav-item");
      const isOpen = child && getComputedStyle(child).display !== "none";

      // Close other child menus, but keep this one open if it was already
      document.querySelectorAll(".child-nav-item").forEach((c) => {
        if (c !== child) c.style.display = "none";
      });

      if (child && !isOpen) {
        child.style.display = "flex";
      }

      e.stopPropagation(); // Prevent closing from global click
    });
  });

  // Close nav when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".parent-nav-item")) {
      document.querySelectorAll(".child-nav-item").forEach((c) => {
        c.style.display = "none";
      });
    }
  });

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const resultList = document.getElementById("searchResults");

  if (searchInput && resultList) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase().trim();
      const listItems = document.querySelectorAll("aside li");

      resultList.innerHTML = "";
      if (filter === "") return;

      listItems.forEach((item) => {
        const text = item.innerText.toLowerCase();

        if (text.includes(filter)) {
          const exists = Array.from(resultList.children).some(
            (li) =>
              li.textContent.trim().toLowerCase() ===
              item.innerText.trim().toLowerCase()
          );

          if (!exists) {
            const li = document.createElement("li");
            li.classList.add("dropdown-item");

            const textEl = document.createElement("h6");
            textEl.classList.add("third-color");
            textEl.textContent = item.innerText;

            const img = document.createElement("img");
            img.src = "../assets/images/icons/close-circle.svg";
            img.style.filter = "grayscale(1)";
            img.style.cursor = "pointer";

            li.appendChild(textEl);
            li.appendChild(img);
            resultList.appendChild(li);

            img.addEventListener("click", function (e) {
              e.stopPropagation();
              this.closest("li")?.remove();
            });
          }
        }
      });
    });
  }

  // File upload preview
  const fileInput = document.getElementById("father-id-upload");
  const previewContainer = document.getElementById("file-preview");

  if (fileInput && previewContainer) {
    fileInput.addEventListener("change", function () {
      previewContainer.innerHTML = "";

      const file = this.files[0];
      if (!file) return;

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
        const fileName = document.createElement("p");
        fileName.textContent = file.name;
        previewContainer.appendChild(fileName);
      }
    });
  }

  // Tab navigation (next/previous)
  document.addEventListener("click", (e) => {
    const nextBtn = e.target.closest(".next-step");
    const prevBtn = e.target.closest(".prev-step");

    if (!nextBtn && !prevBtn) return;
    e.preventDefault();

    const currentTab = document.querySelector(".nav-tabs .nav-link.active");
    if (!currentTab) return;

    const direction = nextBtn ? "next" : "prev";
    const siblingMethod =
      direction === "next" ? "nextElementSibling" : "previousElementSibling";

    const navItem = currentTab.closest(".nav-item");
    const targetTab = navItem?.[siblingMethod]?.querySelector(".nav-link");
    if (!targetTab) return;

    currentTab.classList.remove("active");
    if (direction === "next") currentTab.classList.add("completed");
    if (direction === "prev") targetTab.classList.remove("completed");

    const currentContent = document.querySelector(".tab-pane.active");
    currentContent?.classList.remove("show", "active");

    targetTab.classList.add("active");

    const targetSelector = targetTab.getAttribute("href");
    if (targetSelector) {
      document.querySelector(targetSelector)?.classList.add("show", "active");
    }
  });

  let aside_open_icon = document.querySelector(".aside_open_icon");
  let aside = document.querySelector("aside");

  aside_open_icon.addEventListener("click", function() {
    aside.classList.toggle("open");
    aside_open_icon.classList.toggle("open");
  });
});
