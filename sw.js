const STATIC = 'staticv2'
const INMUTABLE = 'inmutablev1'
const DYNAMIC = 'dynamicv1'

const APP_SHELL = [
    '/',
    '/index.html',
    'js/app.js',
    'img/killua.jpg',
    'css/styles.css',
    'pages/offline.html',
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
];

self.addEventListener('install', (e) => {
    console.log('Instalando');
    const staticCache = caches.open(STATIC).then((cache) => {
        cache.addAll(APP_SHELL);
    });
    const inmutableCache = caches.open(INMUTABLE).then((cache) => {
        cache.addAll(APP_SHELL_INMUTABLE)
    });
    e.waitUntil(Promise.all([staticCache, inmutableCache]));
    //e.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.log('Activado');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch(() => {
                return caches.match('pages/offline.html');
            })
    );
});