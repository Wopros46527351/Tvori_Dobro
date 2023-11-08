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

document.addEventListener("DOMContentLoaded", function () {
  // Проверяем, авторизован ли пользователь
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn || loggedIn !== "true") {
    // Если пользователь не авторизован, показываем алерт и перенаправляем его на страницу login.html
    alert("Пользователь не авторизован.");
    window.location.href = "vvod.html";
  }
  setTimeout(function () {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".content").classList.remove("hidden");
  }, 5000);
});

function go_on_1() {
  window.location.href = "index.html";
}
