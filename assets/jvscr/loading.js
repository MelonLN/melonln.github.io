window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none'
});
window.addEventListener('beforeunload', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
});