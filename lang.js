/**
 * Language Switcher Script for Nextcoding
 * Handles setting, saving, and applying the chosen language (EN/ES)
 */

document.addEventListener('DOMContentLoaded', () => {
    const langSwitchers = document.querySelectorAll('.lang-switcher button');
    const defaultLang = 'en';

    // Function to apply translations across the entire page
    function applyLanguage(lang) {
        // 1. Update text content
        document.querySelectorAll('[data-lang-en]').forEach(element => {
            const enText = element.getAttribute('data-lang-en');
            const esText = element.getAttribute('data-lang-es');
            element.textContent = lang === 'es' ? esText : enText;
        });

        // 2. Update placeholder text for the AI input
        const businessDescriptionInput = document.getElementById('business-description');
        if (businessDescriptionInput) {
            const placeHolderEN = businessDescriptionInput.getAttribute('data-lang-placeholder-en');
            const placeHolderES = businessDescriptionInput.getAttribute('data-lang-placeholder-es');
            businessDescriptionInput.placeholder = lang === 'es' ? placeHolderES : placeHolderEN;
        }

        // 3. Update active button styles
        langSwitchers.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // 4. Set page language attribute
        document.documentElement.lang = lang;
        
        // 5. Save preference to local storage
        localStorage.setItem('lang', lang);
    }

    // Event listener for language buttons
    langSwitchers.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            applyLanguage(lang);
        });
    });

    // Load saved language or use default
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        applyLanguage(savedLang);
    } else {
        applyLanguage(defaultLang);
    }
});