// document.addEventListener('DOMContentLoaded', function() {
window.onload = function() {
    const idol = JSON.parse(localStorage.getItem('idol'));
    console.log(idol);
    if (!idol) {
        console.error("idol is not found");
        return;
    }

    document.getElementById('idol-name').innerText = idol.name || "name";
    document.getElementById('idol-profile').innerText = idol.profile || "profile";
    document.getElementById('idol-prompt').textContent = idol.prompt || "prompt";
    document.getElementById('idol-image').src = idol.image || "https://firebasestorage.googleapis.com/v0/b/ai-idol-election.appspot.com/o/images%2Fai-1.jpg?alt=media&token=8a162f82-b7f5-4fc5-a24c-22fc82f9a7de";
    document.getElementById('idol-tokenId').textContent = idol.tokenId || "tokenId";
}
