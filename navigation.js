const sidebar = document.querySelector(".sidebar");
const toggle = sidebar?.querySelector(".sidebar-toggle");
const menu = sidebar?.querySelector(".sidebar-menu");

if (sidebar && toggle && menu) {
    const mobileLayout = window.matchMedia("(max-width: 700px)");

    function updateMenuForViewport() {
        const isMobile = mobileLayout.matches;
        const isOpen = !isMobile;

        sidebar.classList.toggle("is-mobile", isMobile);
        sidebar.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        menu.setAttribute("aria-hidden", String(!isOpen));
        menu.inert = !isOpen;
    }

    sidebar.classList.add("menu-ready");
    updateMenuForViewport();

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        sidebar.classList.toggle("is-open", !isOpen);
        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.setAttribute("aria-hidden", String(isOpen));
        menu.inert = isOpen;
    });

    menu.addEventListener("click", (event) => {
        if (mobileLayout.matches && event.target.closest("a")) {
            sidebar.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-hidden", "true");
            menu.inert = true;
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileLayout.matches && toggle.getAttribute("aria-expanded") === "true") {
            sidebar.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-hidden", "true");
            menu.inert = true;
            toggle.focus();
        }
    });

    mobileLayout.addEventListener("change", updateMenuForViewport);
}