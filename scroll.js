
//lazy scroll
//загрузка внизу
//json на русском


/*if ((page-1) * perPage >= posts.length) {
                loadMoreButton.text("Больше постов нет");
                loadMoreButton.prop("disabled", true);  
} */



$(document).ready(function() {
    const postsContainer = $("#posts-container");
    const loadingAnimation = $("#loading-animation");
    const endOfPosts = $("#end-of-posts");
    const apiUrl = "https://raw.githubusercontent.com/Wopros46527351/Tvori_Dobro/main/scroll.json";
    let page = 1;
    let perPage = 10;
    let loading = false;
    let endOfPostsReached = false;

    function loadPosts() {
        if (loading || endOfPostsReached) return;
        loading = true;
        loadingAnimation.css("display", "flex");

        $.get(apiUrl + '?page=' + page + '&per_page=' + perPage, function(data) {
            loading = false;
            let posts;
            try {
                posts = JSON.parse(data);
            } catch (error) {
                console.error("Ошибка при разборе данных:", error);
                return;
            }

            
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const currentPosts = posts.slice(startIndex, endIndex);

            currentPosts.forEach(function(post) {
                const postElement = `
                    <div class="post">
                        <div class="avatar">
                            <img src="${post.avatar}" alt="Аватар">
                        </div>
                        <div class="post-content">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </div>
                    </div>
                `;
                postsContainer.append(postElement);
            });

            page++;
            if (((page-1) * perPage >= posts.length)) {
                endOfPosts.css("display", "block");
                loadingAnimation.css("display", "none");
                endOfPostsReached = true;
                
                
                return;
            }
        });
        
    }

    function checkScroll() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            loadPosts();
        }
    }

    $(window).on("scroll", checkScroll);
    loadPosts();});







