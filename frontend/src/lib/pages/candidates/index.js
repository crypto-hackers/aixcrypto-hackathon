const gridElement = document.querySelector('.grid');
gridElement.addEventListener('click', function(event) {
    const parentDiv = event.target.parentElement;

    let name = event.target.querySelector('.grid---item-text');
    if (!name) {
        name = parentDiv.querySelector('.grid---item-text');
    }

    let profile = event.target.querySelector('.grid---item-text-copy');
    if (!profile) {
        profile = parentDiv.querySelector('.grid---item-text-copy');
    }

    let prompt = event.target.querySelector('.grid---item-text-copy-copy');
    if (!prompt) {
        prompt = parentDiv.querySelector('.grid---item-text-copy-copy');
    }

    let image;
    if (event.target.querySelector('.grid---image')) {
        image = event.target.querySelector('.grid---image').src;
    }
    if (!image && parentDiv.querySelector('.grid---image')) {
        image = parentDiv.querySelector('.grid---image').src;
    }

    const idol = {
        name: name.textContent,
        profile: profile.textContent,
        prompt: prompt.textContent,
        image: image,
        tokenId: "",
    }
    console.log(idol)

    localStorage.setItem('idol', JSON.stringify(idol));
});
