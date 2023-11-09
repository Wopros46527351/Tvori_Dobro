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
          contentElement2.innerHTML = `<button class="hide-button">Скрыть пост</button>`;
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
    // Удалите пост из DOM
    postsContainer.removeChild(postElement);
  }

  loadPosts(); // Загрузка первых 10 постов
});
