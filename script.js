document.addEventListener('DOMContentLoaded', () => {
    // Select ALL menu buttons now, as they are all intended to be visible triggers
    const menuButtons = document.querySelectorAll('.menu-button');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');

    // --- Dropdown Menu Logic ---

    // Function to close all open dropdowns
    function closeAllDropdowns() {
        dropdownMenus.forEach(menu => {
            menu.style.display = 'none';
        });
        menuButtons.forEach(btn => {
            btn.classList.remove('active');
        });
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent window click from closing immediately

            const menuId = button.getAttribute('data-menu');
            const targetMenu = document.getElementById(menuId);

            if (!targetMenu) return; // Safety check

            const isAlreadyOpen = targetMenu.style.display === 'block';

            // Close all menus first
            closeAllDropdowns();

            // If this menu wasn't the one open, open it
            if (!isAlreadyOpen) {
                // Position the menu below the button
                const rect = button.getBoundingClientRect();
                targetMenu.style.top = `${rect.bottom + window.scrollY}px`; // Account for page scroll
                targetMenu.style.left = `${rect.left + window.scrollX}px`;  // Account for page scroll
                targetMenu.style.display = 'block';
                button.classList.add('active');
            }
        });
    });

    // Close dropdowns if clicking outside
    window.addEventListener('click', () => {
        closeAllDropdowns();
    });

    // Prevent dropdowns from closing if clicking inside them (basic version)
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', (event) => {
             // Stop propagation to prevent window listener from closing the menu,
             // unless the click was specifically on a direct link within the menu
             // (allowing the default action + menu close).
            if (event.target.tagName !== 'A' || event.target.closest('ul.submenu')) {
               event.stopPropagation();
            }
             // If a direct link *was* clicked, we let the event bubble up
             // so the window listener *can* close it.
        });
    });


    // --- Toolbar Button Placeholders ---
    const toolbarButtons = document.querySelectorAll('.toolbar-button');
    toolbarButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(`${button.textContent} clicked`);
            // Add actual formatting logic here later if needed
        });
    });

}); // End DOMContentLoaded