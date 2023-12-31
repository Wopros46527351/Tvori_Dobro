// Получаем элемент с id "counter"
const counterElement = document.getElementById("counter");

// Инициализируем переменную count
let count = 0;

// Функция для обновления значения счетчика на странице
function updateCounter() {
  counterElement.textContent = count;
}

// Функция для увеличения значения счетчика
function incrementCounter() {
  count++;
  updateCounter();
}

// Функция для уменьшения значения счетчика
function decrementCounter() {
  count--;
  updateCounter();
}

// Добавляем обработчик клика на кнопку "+"
document.getElementById("plus-btn").addEventListener("click", incrementCounter);

// Добавляем обработчик клика на кнопку "-"
document
  .getElementById("minus-btn")
  .addEventListener("click", decrementCounter);

document
  .getElementById("collapse-1")
  .addEventListener("show.bs.collapse", function () {
    alert("Вы кликнули на hw-1 в хедере");
  });

// Получаем элемент с id "homework-list"
const homeworkList = document.getElementById("homework-list");

// Функция для обработки клика на элементе homework
function handleClickOnHomework() {
  alert("Вы кликнули на элемент homework");
}

// Получаем все элементы с классом "homework"
const homeworkItems = document.querySelectorAll(".homework");

// Добавляем обработчик клика для каждого элемента homework
homeworkItems.forEach(function (item) {
  item.addEventListener("click", handleClickOnHomework);
});

var button = document.getElementById("myButton");

// Добавляем обработчик события "click" к кнопке
button.addEventListener("click", function () {
  // Здесь вы можете указать ссылку, куда нужно перейти
  // Например:
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
});

let counter = 0;

const counterValue = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const resetBtn = document.querySelector("#reset");

// To increment the value of counter
incrementBtn.addEventListener("click", () => {
  counter++;
  counterValue.innerHTML = counter;
});

// To decrement the value of counter
decrementBtn.addEventListener("click", () => {
  counter--;
  counterValue.innerHTML = counter;
});

// To reset the counter to zero
resetBtn.addEventListener("click", reset);

function reset() {
  counter = 0;
  counterValue.innerHTML = counter;
}

function go_on_2() {
  window.location.href = "vvod.html";
}

function go_on_3() {
  window.location.href = "scroll.html";
}
