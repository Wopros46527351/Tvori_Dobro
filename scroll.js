//lazy scroll
//загрузка внизу
//json на русском

/*if ((page-1) * perPage >= posts.length) {
                loadMoreButton.text("Больше постов нет");
                loadMoreButton.prop("disabled", true);  
} */

document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("posts-container");
  const loadingAnimation = document.getElementById("loading-animation");
  const endOfPosts = document.getElementById("end-of-posts");
  const apiUrl =
    "https://raw.githubusercontent.com/Wopros46527351/Tvori_Dobro/main/scroll.json";
  let page = 1;

  let perPage = 10;
  let loading = false;
  let loading2 = false;
  let endOfPostsReached = false;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.99,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadPosts();
      }
    });
  }, options);

  const buttons = document.querySelectorAll("button");

  // Функция для блокировки кнопок
  function disableButtons() {
    buttons.forEach((button) => {
      button.disabled = true; // Отключаем каждую кнопку
    });
  }

  // Функция для разблокировки кнопок
  function enableButtons() {
    buttons.forEach((button) => {
      button.disabled = false; // Включаем каждую кнопку
    });
  }

  function loadPosts() {
    if (loading || endOfPostsReached) return;

    loading = true;
    loadingAnimation.style.display = "flex";

    fetch(apiUrl + "?page=" + page + "&per_page=" + perPage)
      .then((response) => response.json())
      .then((data) => {
        loading = false;
        const posts = data;

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const currentPosts = posts.slice(startIndex, endIndex);

        currentPosts.forEach(function (post, index) {
          const postElement = document.createElement("div");
          postElement.classList.add("post");
          postElement.dataset.postId = post.id;

          const avatarElement = document.createElement("div");
          avatarElement.classList.add("avatar");
          avatarElement.title = `Номер записи: ${post.id} \nНомер пользователя: ${post.userId}`;
          avatarElement.innerHTML = `<img src="${post.avatar}" alt="Аватар">`;

          const contentElement = document.createElement("div");
          contentElement.classList.add("post-content");
          contentElement.innerHTML = `
                  
                      <h2>${post.title}</h2>
                      <p class="post-body">${post.body}</p>
                      
                  `;

          const contentElement2 = document.createElement("div");
          contentElement2.classList.add("button-container");
          contentElement2.innerHTML = `<button  class="hide-button">Скрыть пост</button>`;
          postElement.appendChild(avatarElement);
          postElement.appendChild(contentElement);
          postElement.appendChild(contentElement2);
          postsContainer.appendChild(postElement);

          // Если это последний загруженный пост, привяжем Intersection Observer
          if (index === currentPosts.length - 1) {
            observer.observe(document.querySelector(".post:last-child"));
          }

          // Добавим обработчик события для кнопки "Скрыть пост"
          const hideButton = postElement.querySelector(".hide-button");
          hideButton.addEventListener("click", () => hidePost(postElement));
        });

        page++;
        if ((page - 1) * perPage >= posts.length) {
          endOfPosts.style.display = "block";
          loadingAnimation.style.display = "none";
          endOfPostsReached = true;
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }

  function hidePost(postElement) {
    if (loading2) return;
    loading2 = true;
    disableButtons();
    postElement.style.transition = "transform 0.5s ease, opacity 0.5s";
    postElement.style.transform = "translateY(-100%)";
    postElement.style.opacity = "0";

    const animationDuration = 1000;
    const height1 = postElement.offsetHeight;
    let animationsCount = 0;
    const allPosts = Array.from(document.querySelectorAll(".post"));
    const index = allPosts.indexOf(postElement);

    for (let i = index + 1; i < allPosts.length; i++) {
      if (allPosts[i].style.display != "none") {
        allPosts[i].style.transition = `transform 0.5s ease ${i * 0.1}s`;
        allPosts[i].style.transform = `translateY(-${height1 + 10}px)`;
        animationsCount++;

        // Добавляем событие окончания анимации для каждого элемента
        allPosts[i].addEventListener("transitionend", () => {
          animationsCount--;

          // Проверяем, все ли анимации завершились
          if (animationsCount === 0) {
            // Все анимации завершены
            postElement.style.display = "none";

            for (let i1 = index + 1; i1 < allPosts.length; i1++) {
              if (allPosts[i1].style.display != "none") {
                allPosts[i1].style.transition = `transform 0s ease 0s`;
                allPosts[i1].style.transform = "translateY(0)";
              }
            }
            enableButtons();
            loading2 = false;
            console.log("Все анимации завершены.");
            // Здесь вы можете запустить любой код, который должен выполниться после завершения всех анимаций
          }
        });
      }
    }
  }

  loadPosts(); // Загрузка первых 10 постов
});
