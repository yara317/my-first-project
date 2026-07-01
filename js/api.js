/**
 * @deprecated Use assets/js/config.js instead
 */
if (typeof AppConfig === "undefined") {
    const script = document.createElement("script");
    script.src = "../assets/js/config.js";
    document.head.appendChild(script);
}
