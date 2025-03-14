/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    const studentLinks = document.querySelectorAll(".student-card a");
    
    studentLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetUrl = this.getAttribute("href");
            window.location.href = targetUrl;
        });
    });
});
