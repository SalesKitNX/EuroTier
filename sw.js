// Novatex EuroTier: works offline in the halls
const C='nvx-et26-v9-5';
const CORE=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./favicon-64.png','./three.module.min.js','./gsap.min.js','./espositori.json','./fb.js','./firebase-config.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin&&(r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('firebase-config.js'))){
    // pages: network first so updates arrive, cache when offline
    const key=u.pathname.endsWith('firebase-config.js')?'./firebase-config.js':'./index.html';
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(key,cp));return res}).catch(()=>caches.match(key)));
    return;
  }
  if(u.origin===location.origin||/(fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)$/.test(u.hostname)){
    e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})));
  }
});
