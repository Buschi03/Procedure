function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function resetCheckboxes() {
    var now = new Date();
    var hours = now.getHours();
    
    if (hours >= 3) {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
            setCookie(checkbox.id, 'false', 365); // Imposta il cookie con stato "false"
        });
    }
}

function saveCheckboxState(checkboxId, isChecked) {
    setCookie(checkboxId, isChecked.toString(), 365); // Imposta il cookie con lo stato della checkbox
}

function loadCheckboxStates() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox) {
        var isChecked = getCookie(checkbox.id) === 'true';
        checkbox.checked = isChecked;
    });
}

// Chiama la funzione per caricare gli stati delle checkbox al caricamento della pagina
window.addEventListener('load', loadCheckboxStates);

// Chiama la funzione per salvare lo stato della checkbox ogni volta che viene modificato
document.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        saveCheckboxState(event.target.id, event.target.checked);
    }
});

// Chiama la funzione per svuotare le checkbox ogni minuto
setInterval(resetCheckboxes, 60000);
