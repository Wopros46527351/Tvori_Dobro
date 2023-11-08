function go_on_1() {
  window.location.href = "index.html";
}

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// Обработчик события при отправке формы регистрации
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = signupForm.elements.txt.value;
  const email = signupForm.elements.email.value;
  const password = signupForm.elements.pswd.value;
  const storedUserName = localStorage.getItem("email");

  // Проверим, не был ли пользователь ранее зарегистрирован
  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const userExists = registeredUsers.some((user) => user.email === email);

  if (userExists) {
    alert("Пользователь с таким именем уже существует");
  } else {
    // Добавим нового пользователя в список зарегистрированных
    registeredUsers.push({ userName, email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    // Сохраните информацию о входе пользователя в localStorage
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", userName);

    alert("Регистрация успешно завершена!");
    signupForm.reset();
    window.location.href = "suc_rega.html"; // Перенаправляем на другую страницу
  }
});

// Обработчик события при отправке формы входа
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const email = loginForm.elements.email.value;
  const password = loginForm.elements.pswd.value;

  const userExists = registeredUsers.some(
    (user) => user.email === email && user.password === password
  );

  if (userExists) {
    alert("Вход выполнен успешно!");
    loginForm.reset();
    window.location.href = "suc_vhod.html"; // Перенаправляем на другую страницу
  } else {
    alert("Неверный email или пароль");
  }
});
