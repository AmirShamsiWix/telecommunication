var form = document.getElementById("my-form");
var loaderOverlay = document.getElementById("loader-overlay");
var loader = document.getElementById("loader");
var submissionMessage = document.getElementById("submission-message");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    loaderOverlay.style.display = 'block'; // Display overlay
    loader.style.display = 'block'; // Display loader
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        loaderOverlay.style.display = 'none';
        loader.style.display = 'none';
        status.style.display = 'block';
        form.style.display = 'none';
        submissionMessage.style.display = 'block'; // Show submission message
    }).catch(error => {
        status.style.display = 'block';
        form.style.display = 'none';
        status.innerHTML = "Oops! Something went wrong.";
    });
}
form.addEventListener("submit", handleSubmit);