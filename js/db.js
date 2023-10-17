//Crea la db

let req = window.indexedDB.open('pwadb', 1);

//Si se necesita actualizar
req.onupgradeneeded = (e) => {
    console.log('DB - Updated');
    let db = e.target.result;
    db.createObjectStore('users', {
        keyPath: 'id',
    });
};

req.onerror = (e) => {
    console.log('DB - Error -> ', e.target.error);
}

req.onsuccess = (e) => {
    let db = e.target.result;
    let transaction = db.transaction('users', 'readwrite');
    transaction.onerror = (e) => {
        console.log('TR - Error -> ', e.target.error);
    };

    transaction.oncomplete = (e) => {
        console.log('TR - Done -> ', e);
    };

    let stored = transaction.objectStore('users');

    stored.add({
        id: new Date().toISOString(),
        username: 'Javi',
        fullname: 'Javier García'
    });

    stored.onsuccess = (e) =>{
        console.log('ST - SUCCESS -> ', 'Agregado correctamente');
    }
};

