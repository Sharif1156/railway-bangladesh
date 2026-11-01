// Live train reports backed by Supabase. Does nothing unless config.js has real values.
(function () {
  const cfg = window.RAILWAY_CONFIG || {};
  const configured = Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey);
  const SEND_EVERY_MS = 30000;

  let clientPromise = null;
  let watchId = null;
  let activeKey = null;
  let lastSent = 0;
  let notify = () => {};

  // Load the Supabase client only when live reports are actually used.
  function getClient() {
    if (!configured) return Promise.reject(new Error('not configured'));
    if (!clientPromise) {
      clientPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.0/dist/umd/supabase.js';
        s.onload = () => resolve(window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey));
        s.onerror = () => { clientPromise = null; reject(new Error('load failed')); };
        document.head.appendChild(s);
      });
    }
    return clientPromise;
  }

  function stopSharing() {
    if (watchId !== null && navigator.geolocation) navigator.geolocation.clearWatch(watchId);
    watchId = null;
    activeKey = null;
  }

  // Aggregate only: { report_count, last_seen, avg_speed_kmh }. No positions are returned.
  async function fetchStatus(trainKey) {
    const c = await getClient();
    const { data, error } = await c.rpc('train_status', { p_key: trainKey });
    if (error) throw error;
    return (data && data[0]) || { report_count: 0 };
  }

  async function startSharing(trainKey, onEvent) {
    const c = await getClient();
    if (!navigator.geolocation) throw new Error('no geolocation');
    stopSharing();
    activeKey = trainKey;
    notify = onEvent;
    lastSent = 0;
    watchId = navigator.geolocation.watchPosition(async pos => {
      if (Date.now() - lastSent < SEND_EVERY_MS) return;
      lastSent = Date.now();
      const { error } = await c.from('train_pings').insert({
        train_key: trainKey,
        // 4 decimals is about 11 m: enough for "which part of the route", not a precise address
        lat: Number(pos.coords.latitude.toFixed(4)),
        lng: Number(pos.coords.longitude.toFixed(4)),
        speed_kmh: pos.coords.speed != null ? Math.round(pos.coords.speed * 3.6) : null
      });
      notify({ status: error ? 'error' : 'sent' });
    }, err => {
      stopSharing();
      notify({ status: 'denied', message: err.message });
    }, { enableHighAccuracy: false, maximumAge: 15000, timeout: 30000 });
  }

  window.LiveTrains = {
    configured,
    fetchStatus,
    startSharing,
    stopSharing,
    isSharing: () => activeKey
  };
  // Stop sharing when the page is closed or hidden for good.
  window.addEventListener('pagehide', stopSharing);
})();
