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

        currentPosts.forEach(function (post) {
          const postElement = `
                <div class="post">
                <div class="avatar" title="Номер записи: ${post.id} \nНомер пользователя: ${post.userId}">
                    <img src="${post.avatar}" alt="Аватар">
                </div>
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                </div>
                </div>
            `;
          postsContainer.innerHTML += postElement;
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

  function checkScroll() {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 100
    ) {
      loadPosts();
    }
  }

  window.addEventListener("scroll", checkScroll);
  loadPosts();
});
