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
document.getElementById("minus-btn").addEventListener("click", decrementCounter);

document.getElementById("collapse-1").addEventListener("show.bs.collapse", function() {
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
homeworkItems.forEach(function(item) {
    item.addEventListener("click", handleClickOnHomework);
});



var button = document.getElementById('myButton');

        // Добавляем обработчик события "click" к кнопке
button.addEventListener('click', function() {
            // Здесь вы можете указать ссылку, куда нужно перейти
            // Например:
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
});








        
        













