document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre").forEach((block) => {
        const btn = document.createElement("button");
        btn.className = "copy-icon";
        btn.innerText = "📋";

        const wrapper = document.createElement("div");
        wrapper.className = "copy-wrapper"; // nowa klasa do ustawienia pozycji
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(btn);

        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(block.innerText).then(() => {
                btn.innerText = "✅";
                setTimeout(() => btn.innerText = "📋", 2000);
            });
        });
    });
});