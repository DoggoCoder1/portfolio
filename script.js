document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts-container');
  const loadingMessage = document.getElementById('loading-message');

  fetch('posts.json')
    .then(res => res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`))
    .then(({ posts }) => {
      loadingMessage.style.display = 'none';
      if (!Array.isArray(posts)) {
        postsContainer.innerHTML = '<p>No posts found.</p>';
        return;
      }

      posts.forEach(({ title, description, body, important }) => {
        const formattedBody = body.replace(/\|c\|(.*?)\|c\|/g, '<code>$1</code>');
        if (!description) {
          description = "";
        }
        postsContainer.innerHTML += `
          <div class="post ${important ? "important" : ""}">
            <h2>${title}</h2>
            <h4>${description}</h4>
            <p>${formattedBody}</p>
          </div>`;
    });
      
    })
    
});
