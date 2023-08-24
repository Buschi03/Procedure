// Controlla se l'API wakeLock è supportata dal browser
if ('wakeLock' in navigator) {
    // Richiedi il wake lock
    navigator.wakeLock.request('screen')
        .then(function(wakeLock) {
            console.log('Wake Lock attivato');
            // Puoi rilasciare il wake lock quando non ne hai più bisogno
            // wakeLock.release();
        })
        .catch(function(err) {
            console.error('Impossibile attivare il Wake Lock:', err);
        });
} else {
    console.log('API Wake Lock non supportata dal browser');
}
