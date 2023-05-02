/**
 * @file navbar.front.js
 * @brief Navbar Frontend Script
 * @author Diego Sandoval
 * @version 1.0
 * @date 2023-04-30
 * 
 * @copyright Copyright (c) - MIT License
 */

/**
 * @brief
 * Handles the event when the profile picture is clicked,
 * the dropdown menu is shown
 * @returns {void}
 */
const showDropdown = () => {
    const profilePicture = document.querySelector(".dropdownImg");
    const dropdown = document.querySelector(".drop__logout");

    profilePicture.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown.parentElement.classList.toggle("is-active");
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target) && event.target !== profilePicture) {
            dropdown.parentElement.classList.remove("is-active");
        }
    });
};

document.addEventListener("DOMContentLoaded", showDropdown);




/**
 * @brief
 * Log out the user and delete the tokens. 
 * Redirect to the login page
 * @returns {void}
 */
logOut = () => {
    deleteTokens()
    window.location.href = "/auth"
}