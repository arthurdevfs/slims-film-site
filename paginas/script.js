
document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // 1. MENU MOBILE
    // ========================================
    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            });
        });

        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                navLinks.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ========================================
    // 2. ANO AUTOMÁTICO NO RODAPÉ
    // ========================================
    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // ========================================
    // 3. MÁSCARA PARA TELEFONE
    // ========================================
    const phoneInput = document.querySelector(
        'input[name="telefone"], input[name="phone"], input[type="tel"]'
    );

    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            let numbers = phoneInput.value.replace(/\D/g, "");

            if (numbers.length > 11) {
                numbers = numbers.slice(0, 11);
            }

            if (numbers.length > 10) {
                numbers = numbers.replace(
                    /^(\d{2})(\d{5})(\d{4})$/,
                    "($1) $2-$3"
                );
            } else if (numbers.length > 6) {
                numbers = numbers.replace(
                    /^(\d{2})(\d{4})(\d{0,4})$/,
                    "($1) $2-$3"
                );
            } else if (numbers.length > 2) {
                numbers = numbers.replace(
                    /^(\d{2})(\d{0,5})$/,
                    "($1) $2"
                );
            } else if (numbers.length > 0) {
                numbers = numbers.replace(/^(\d{0,2})$/, "($1");
            }

            phoneInput.value = numbers;
        });
    }

    // ========================================
    // 4. VALIDAÇÃO DO FORMULÁRIO
    // ========================================
    const contactForm = document.querySelector(
        "#contact-form, .contact-form, form"
    );

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            const name = contactForm.querySelector(
                '[name="nome"], [name="name"]'
            );
            const email = contactForm.querySelector('[type="email"]');
            const message = contactForm.querySelector(
                '[name="mensagem"], [name="message"]'
            );

            if (name && name.value.trim().length < 2) {
                event.preventDefault();
                alert("Por favor, informe seu nome completo.");
                name.focus();
                return;
            }

            if (email && !email.checkValidity()) {
                event.preventDefault();
                alert("Por favor, informe um e-mail válido.");
                email.focus();
                return;
            }

            if (message && message.value.trim().length < 5) {
                event.preventDefault();
                alert("Por favor, escreva uma mensagem com mais detalhes.");
                message.focus();
            }
        });
    }

    // ========================================
    // 5. ANIMAÇÃO AO ROLAR A PÁGINA
    // ========================================
    const animatedElements = document.querySelectorAll(
        ".contact-card, .address-card, .hours-card, .form-section"
    );

    if ("IntersectionObserver" in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        animatedElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }

    // ========================================
    // 6. LINKS EXTERNOS
    // ========================================
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });

    console.log("Slim's Film Wrap: site carregado com sucesso!");
});
