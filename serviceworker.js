if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
self.addEventListener('fetch', (event) => {
    
});
