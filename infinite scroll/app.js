const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");
const filter = document.getElementById("filter");
const shownPosts = [];
let lastScrollTop = document.documentElement.scrollTop;
let limit = 5;
const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=`;
let page = 1;

async function getPosts(page) {
  const resp = await fetch(`${url}${page}`);
  const posts = await resp.json();
  shownPosts.push(...posts);
  return posts;
}

async function showPosts() {
  const posts = await getPosts(page);
  posts.forEach((post) => {
    const newPost = document.createElement("div");
    newPost.className = "post";
    newPost.innerHTML = `
        <div class="id-tag">${post.id}</div>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        `;
    postsContainer.appendChild(newPost);
  });
}

function showNext(doNext) {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    setTimeout(() => {
      page++;
      doNext();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  const search = filter.value;

  const filtered = shownPosts.filter(
    (post) => post.body.includes(search) || post.title.includes(search)
  );

  postsContainer.innerHTML = filtered
    .map(
      (post) =>
        `
        <div class="post">
        <div class="id-tag">${post.id}</div>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `
    )
    .join("");
}

showPosts();

filter.addEventListener("keyup", filterPosts);

window.addEventListener("scroll", () => {
  var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  if (st > lastScrollTop) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (Math.floor(scrollTop + clientHeight) === scrollHeight) {
      showNext(showPosts);
    }
  }
  lastScrollTop = st <= 0 ? 0 : st;
});

//Not using an array as global

/*     const search = filter.value.toUpperCase();
    const shownPosts = document.querySelectorAll('.post');

    showPosts.forEach(post=>{
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText;

        if(title.indexOf(search) > -1 || body.indexOf(search) > -1){
            post.style.display = 'flex'
        }else{
            post.style.display = 'none'

        }
    }); */
