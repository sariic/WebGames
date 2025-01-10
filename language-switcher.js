document.addEventListener("DOMContentLoaded", () => {
    const translations = {
        en: {
            languages: "Languages:",
            welcome: "Welcome to Saric Games",
            playBestGames: "Play the best online games for free!",
            exploreGames: "Explore Games",
            aboutUs: "About Us",
            aboutContent: "Saric Games is dedicated to providing fun, engaging, and free online games for players of all ages. Our mission is to create a platform where everyone can enjoy classic and modern games, whether playing solo or with friends. We constantly strive to add new games and improve your gaming experience. Some games are the product of our studio, while some games are links to already successful and well-known games.",
            contactUs: "Contact Us",
            contactContent: "If you have any questions, suggestions, or feedback, feel free to reach out to us:",
            privacyPolicy: "Privacy Policy",
            privacyContent: "We value your privacy and are committed to protecting your personal information. Our Privacy Policy outlines how we collect, use, and safeguard your data. By using our website, you agree to the terms outlined in this policy.",
        },
        hr: {
            languages: "Jezici:",
            welcome: "Dobrodošli u Saric Games",
            playBestGames: "Igrajte najbolje online igre besplatno!",
            exploreGames: "Istraži igre",
            aboutUs: "O nama",
            aboutContent: "Saric Games je posvećen pružanju zabavnih, zanimljivih i besplatnih online igara za igrače svih uzrasta. Naša misija je stvoriti platformu na kojoj svatko može uživati u klasičnim i modernim igrama, bilo da igra sam ili s prijateljima. Stalno se trudimo dodavati nove igre i poboljšati vaše iskustvo igranja. Neke igre su proizvod našeg studija, dok su neke igre poveznice na već uspješne i poznate igre.",
            contactUs: "Kontaktirajte nas",
            contactContent: "Ako imate bilo kakva pitanja, prijedloge ili povratne informacije, slobodno nas kontaktirajte:",
            privacyPolicy: "Politika privatnosti",
            privacyContent: "Cijenimo vašu privatnost i predani smo zaštiti vaših osobnih podataka. Naša Politika privatnosti opisuje kako prikupljamo, koristimo i štitimo vaše podatke. Korištenjem naše web stranice pristajete na uvjete navedene u ovoj politici.",
        }
    };

    const elements = document.querySelectorAll("[data-key]");

    const switchLanguage = (lang) => {
        elements.forEach((el) => {
            const key = el.getAttribute("data-key");
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    };

    document.getElementById("en-btn").addEventListener("click", () => switchLanguage("en"));
    document.getElementById("hr-btn").addEventListener("click", () => switchLanguage("hr"));

    // Set default language to English
    switchLanguage("en");
});
