function resetCheckboxes() {
    var now = new Date();
    var hours = now.getHours();
    
    if (hours >= 3) {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
            localStorage.removeItem(checkbox.id); // Rimuovi il valore dalla localStorage
        });
    }
}

function saveCheckboxState(checkboxId, isChecked) {
    localStorage.setItem(checkboxId, isChecked); // Salva lo stato della checkbox nella localStorage
}

function loadCheckboxStates() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox) {
        var isChecked = localStorage.getItem(checkbox.id) === 'true';
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