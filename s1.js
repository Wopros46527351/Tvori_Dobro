// Проверяем, была ли страница обновлена
/*
if (localStorage.getItem("pageReloaded") !== "true") {
    // Страница загружена впервые, устанавливаем флаг в localStorage
    localStorage.setItem("pageReloaded", "true");
} else {
    // Страница была обновлена, не показываем анимацию
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

    // Отображаем сообщение
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
}
*/

// Ждем 5 секунд
document.addEventListener("DOMContentLoaded", function() {
    // Подождем 5 секунд и затем скроем анимацию загрузки и покажем элементы
    setTimeout(function() {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".content").classList.remove("hidden");
    }, 5000);
});
function go_on_1() {
    window.location.href = "index.html";
  }