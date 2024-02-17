window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none'
    document.addEventListener("keydown", function (event){
        if (event.ctrlKey){
           event.preventDefault();
        }
        if(event.keyCode == 123){
           event.preventDefault();
        }
    });
    document.addEventListener('contextmenu',
        event => event.preventDefault()
        );
});
window.addEventListener('beforeunload', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    document.addEventListener("keydown", function (event){
        if (event.ctrlKey){
           event.preventDefault();
        }
        if(event.keyCode == 123){
           event.preventDefault();
        }
    });
    document.addEventListener('contextmenu',
        event => event.preventDefault()
        );
});