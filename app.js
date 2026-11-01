const trains = [
  {number:'701', name:'Subarna Express', type:'Intercity', from:'Dhaka', to:'Chattogram', stops:['Dhaka','Airport','Chattogram']},
  {number:'705', name:'Ekota Express', type:'Intercity', from:'Dhaka', to:'Panchagarh', stops:['Dhaka','Joydebpur','Tangail','Santahar','Parbatipur','Panchagarh']},
  {number:'739', name:'Upaban Express', type:'Intercity', from:'Dhaka', to:'Sylhet', stops:['Dhaka','Bhairab Bazar','Brahmanbaria','Kulaura','Sylhet']},
  {number:null, name:'Silk City Express', type:'Intercity', from:'Dhaka', to:'Rajshahi', stops:['Dhaka','Airport','Tangail','Ishwardi','Rajshahi']},
  {number:null, name:'Sundarban Express', type:'Express', from:'Dhaka', to:'Khulna', stops:['Dhaka','Faridpur','Rajbari','Jashore','Khulna']},
  {number:null, name:'Turna Express', type:'Express', from:'Dhaka', to:'Chattogram', stops:['Dhaka','Bhairab Bazar','Brahmanbaria','Cumilla','Chattogram']}
];
// Some sample entries have no train number; they are keyed by name instead of inventing one.
trains.forEach(t => { t.key = t.number || t.name; });

// Bangla names for stations and trains (English names stay the data keys).
const BN_STATIONS = {
  Dhaka:'ঢাকা', Airport:'বিমানবন্দর', Chattogram:'চট্টগ্রাম', Joydebpur:'জয়দেবপুর', Tangail:'টাঙ্গাইল',
  Santahar:'সন্তাহার', Parbatipur:'পার্বতীপুর', Panchagarh:'পঞ্চগড়', 'Bhairab Bazar':'ভৈরব বাজার',
  Brahmanbaria:'ব্রাহ্মণবাড়িয়া', Kulaura:'কুলাউড়া', Sylhet:'সিলেট', Ishwardi:'ঈশ্বরদী', Rajshahi:'রাজশাহী',
  Faridpur:'ফরিদপুর', Rajbari:'রাজবাড়ী', Jashore:'যশোর', Khulna:'খুলনা', Cumilla:'কুমিল্লা'
};
const BN_TRAINS = {
  'Subarna Express':'সুবর্ণা এক্সপ্রেস', 'Ekota Express':'একতা এক্সপ্রেস', 'Upaban Express':'উপবন এক্সপ্রেস',
  'Silk City Express':'সিল্ক সিটি এক্সপ্রেস', 'Sundarban Express':'সুন্দরবন এক্সপ্রেস', 'Turna Express':'তূর্ণা এক্সপ্রেস'
};
const BN_TYPE = { Intercity:'ইন্টারসিটি', Express:'এক্সপ্রেস' };

// Bangla text for static page elements (keys match data-i18n attributes in index.html).
const BN = {
  'menu':'মেনু', 'nav.explore':'এক্সপ্লোর', 'nav.all':'সব ট্রেন', 'nav.stations':'স্টেশন', 'nav.saved':'সংরক্ষিত ট্রেন',
  'm.trains':'ট্রেন', 'm.saved':'সংরক্ষিত',
  'side.title':'যাত্রার জন্য তৈরি।', 'side.body':'বাংলাদেশের প্রতিটি যাত্রায় একটু বেশি স্বচ্ছতা।', 'side.tag':'ভ্রমণকারীদের জন্য',
  'demo':'ডেমো তথ্য', 'topnote':'বাংলাদেশের জন্য',
  'hero.eyebrow':'আপনার যাত্রা এখান থেকেই শুরু',
  'hero.h1':'আরও দূরে যান,<br><em>আত্মবিশ্বাসে।</em>',
  'hero.p':'ট্রেন খোঁজা, রুট দেখা, আর রেলপথে একটু বেশি স্বস্তি বোধ করার সহজ উপায়।',
  'hero.cta':'ট্রেন দেখুন',
  'search.kicker':'কোথায় যাবেন?', 'search.h2':'আপনার ট্রেন খুঁজুন<span>.</span>',
  'search.p':'ট্রেনের নাম, নম্বর বা স্টেশন দিয়ে খুঁজুন।', 'search.btn':'খুঁজুন', 'search.ph':'‘সুবর্ণা এক্সপ্রেস’ বা ‘ঢাকা’ লিখে দেখুন',
  'notice':'<strong>যাওয়ার আগে একটি নোট:</strong> এটি নমুনা রুট ও সময়সূচির একটি ডেমো, লাইভ রেলওয়ে তথ্য নয়। যাত্রার আগে <a href="https://eticket.railway.gov.bd/" target="_blank" rel="noopener noreferrer">বাংলাদেশ রেলওয়ে ↗</a>-এ যাচাই করুন।',
  'viewAll':'সব ট্রেন দেখুন',
  'filter.all':'সব ট্রেন', 'type.Intercity':'ইন্টারসিটি', 'type.Express':'এক্সপ্রেস',
  'rc.kicker':'একটু অনুপ্রেরণা', 'rc.title':'সারা দেশজুড়ে<span>.</span>', 'rc.p':'অনেক জায়গা, একটাই সুন্দর যাত্রা।', 'rc.link':'স্টেশন দেখুন',
  'com.title':'আরও ভালো যাত্রা, একসাথে।', 'com.p':'ভ্রমণকারীদের কথা মাথায় রেখে, যে জায়গাগুলো আমাদের কাছাকাছি নিয়ে আসে তাদের জন্য।', 'com.btn':'প্রকল্প সম্পর্কে'
};

const $ = s => document.querySelector(s);
const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Language
let lang = 'en';
try { lang = localStorage.getItem('railway-lang') === 'bn' ? 'bn' : 'en'; } catch (_) {}
const isBn = () => lang === 'bn';
const L = (en, bn) => (isBn() ? bn : en);
const sName = s => (isBn() && BN_STATIONS[s]) || s;
const tName = n => (isBn() && BN_TRAINS[n]) || n;
const tType = ty => (isBn() && BN_TYPE[ty]) || ty;
const countTrains = n => (isBn() ? `${n}টি ট্রেন` : `${n} ${n === 1 ? 'train' : 'trains'}`);
const countSample = n => (isBn() ? `${n}টি নমুনা ট্রেন` : `${n} sample trains`);

// Static page text: remember the English original, swap in Bangla when lang is bn.
const staticEls = [...document.querySelectorAll('[data-i18n],[data-i18n-html]')];
const originalText = new Map(staticEls.map(el => [el, { text: el.textContent, html: el.innerHTML }]));
const searchInput = $('#search-input');
const originalPlaceholder = searchInput.placeholder;
function applyStatic() {
  document.documentElement.lang = isBn() ? 'bn' : 'en';
  staticEls.forEach(el => {
    const key = el.dataset.i18n ?? el.dataset.i18nHtml;
    const orig = originalText.get(el);
    const useBn = isBn() && BN[key] !== undefined;
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = useBn ? BN[key] : orig.html;
    else el.textContent = useBn ? BN[key] : orig.text;
  });
  searchInput.placeholder = isBn() ? BN['search.ph'] : originalPlaceholder;
  $('#lang-toggle').textContent = isBn() ? 'English' : 'বাংলা';
}

// State
let saved = [];
try { saved = JSON.parse(localStorage.getItem('railway-saved') || '[]'); if (!Array.isArray(saved)) saved = []; } catch (_) { saved = []; }
let view = 'explore', filter = 'all', query = '';
function save() { try { localStorage.setItem('railway-saved', JSON.stringify(saved)); } catch (_) {} }

function trainCard(t) {
  const isSaved = saved.includes(t.key);
  const name = tName(t.name);
  return `<article class="train-card"><div class="train-icon">${icon('train')}</div><div class="train-info"><div class="train-title"><strong>${escapeHTML(name)}</strong>${t.number ? `<span class="train-number">#${escapeHTML(t.number)}</span>` : ''}</div><div class="train-route">${escapeHTML(sName(t.from))} <span>→</span> ${escapeHTML(sName(t.to))}</div></div><span class="train-type">${escapeHTML(tType(t.type))}</span><button class="icon-button ${isSaved?'saved':''}" data-save="${escapeHTML(t.key)}" aria-label="${isSaved ? L('Remove','সরান') : L('Save','সংরক্ষণ')} ${escapeHTML(name)}" aria-pressed="${isSaved}">${icon('heart')}</button><button class="details-btn" data-detail="${escapeHTML(t.key)}" aria-label="${L('View ' + name + ' route', name + ' রুট দেখুন')}">${icon('chevron')}</button></article>`;
}

function render() {
  document.querySelectorAll('[data-view]').forEach(el => el.classList.toggle('active', el.dataset.view === view));
  $('#breadcrumb').textContent = ({
    explore: L('EXPLORE','এক্সপ্লোর'), trains: L('ALL TRAINS','সব ট্রেন'), stations: L('STATIONS','স্টেশন'), saved: L('SAVED TRAINS','সংরক্ষিত ট্রেন')
  })[view];
  const labels = {
    explore: [L('EXPLORE THE RAILS','রেলপথ ঘুরে দেখুন'), L('Popular trains','জনপ্রিয় ট্রেন'), L('A few journeys to get you started','শুরু করার জন্য কয়েকটি যাত্রা')],
    trains: [L('FIND YOUR JOURNEY','আপনার যাত্রা খুঁজুন'), L('All trains','সব ট্রেন'), L('Browse our sample train collection','আমাদের নমুনা ট্রেনের তালিকা দেখুন')],
    stations: [L('EXPLORE BY PLACE','স্টেশন অনুযায়ী দেখুন'), L('Stations','স্টেশন'), L('Tap a station to see which sample trains stop there','কোন নমুনা ট্রেন কোথায় থামে দেখতে স্টেশনে ট্যাপ করুন')],
    saved: [L('YOUR COLLECTION','আপনার সংগ্রহ'), L('Saved trains','সংরক্ষিত ট্রেন'), L('Your favorite journeys, kept close','আপনার পছন্দের যাত্রাগুলো হাতের কাছে')]
  };
  const [k, title, d] = labels[view];
  $('#list-kicker').textContent = k;
  $('#list-title').innerHTML = `${title}<span>.</span>`;
  $('#list-description').textContent = d;
  $('#view-all').style.display = view === 'explore' ? 'flex' : 'none';
  $('#filters').style.display = view === 'stations' ? 'none' : 'flex';
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  const q = query.trim().toLowerCase();

  if (view === 'stations') {
    $('#result-count').textContent = '';
    const stations = [...new Set(trains.flatMap(x => x.stops))].sort()
      .filter(s => !q || [s, BN_STATIONS[s] || ''].some(x => x.toLowerCase().includes(q)));
    $('#train-list').innerHTML = stations.length
      ? stations.map(s => `<button class="train-card station-card" data-station="${escapeHTML(s)}"><div class="train-icon">${icon('pin')}</div><div class="train-info"><strong>${escapeHTML(sName(s))}</strong><p>${countSample(trains.filter(t => t.stops.includes(s)).length)}</p></div>${icon('chevron')}</button>`).join('')
      : `<div class="empty">${L('No stations found. Try another search.','কোনো স্টেশন পাওয়া যায়নি। অন্যভাবে খুঁজুন।')}</div>`;
    return;
  }

  const matches = t => [t.name, BN_TRAINS[t.name] || '', t.number || '', ...t.stops, ...t.stops.map(s => BN_STATIONS[s] || '')]
    .some(x => x.toLowerCase().includes(q));
  let results = trains.filter(t => (view !== 'saved' || saved.includes(t.key)) && (filter === 'all' || t.type === filter) && (!q || matches(t)));
  if (view === 'explore' && !q && filter === 'all') results = results.slice(0, 3);
  $('#result-count').textContent = countTrains(results.length);
  $('#train-list').innerHTML = results.length
    ? results.map(trainCard).join('')
    : `<div class="empty">${view === 'saved' && !q
        ? L('No saved trains yet. Tap the heart on a train to keep it here.','এখনো কোনো ট্রেন সংরক্ষিত নেই। ট্রেনের হার্ট চিহ্নে ট্যাপ করে এখানে রাখুন।')
        : L('No trains found. Try a different name, number, or station.','কোনো ট্রেন পাওয়া যায়নি। অন্য নাম, নম্বর বা স্টেশন দিয়ে চেষ্টা করুন।')}</div>`;
}

function setView(next) { view = next; filter = 'all'; query = ''; $('#search-input').value = ''; render(); if (next !== 'explore') document.querySelector('.search-section').scrollIntoView({behavior:'smooth', block:'start'}); }
function openDialog(html) { $('#dialog-content').innerHTML = `<div class="dialog-inner">${html}</div>`; $('#detail-dialog').showModal(); }

function detail(t) {
  openDialog(`<div class="dialog-head"><div><div class="section-kicker">${L('SAMPLE TRAIN ROUTE','নমুনা ট্রেনের রুট')}</div><h2>${escapeHTML(tName(t.name))}</h2><div class="dialog-sub">${escapeHTML(tType(t.type))}${t.number ? ' · #' + escapeHTML(t.number) : ''} &nbsp; • &nbsp; ${escapeHTML(sName(t.from))} → ${escapeHTML(sName(t.to))}</div></div><button class="dialog-close" aria-label="${L('Close','বন্ধ করুন')}">${icon('close')}</button></div><div class="route-timeline">${t.stops.map((s, i) => `<div class="stop"><i></i><div>${escapeHTML(sName(s))}<small>${i === 0 ? L('Starting station','শুরুর স্টেশন') : i === t.stops.length - 1 ? L('Destination','গন্তব্য') : L('Sample stop','নমুনা স্টপ')}</small></div></div>`).join('')}</div><div class="dialog-notice">${L('This route is illustrative and may be incomplete or outdated. Live locations and schedules are not connected. Verify details with Bangladesh Railway before traveling.','এই রুটটি উদাহরণমূলক এবং অসম্পূর্ণ বা পুরোনো হতে পারে। লাইভ অবস্থান ও সময়সূচি যুক্ত নেই। যাত্রার আগে বাংলাদেশ রেলওয়ের সাথে যাচাই করুন।')}</div>${liveBlock(t.key)}`);
  refreshLive(t.key);
}

// Station board: which sample trains stop here, and where they go next (no times in this demo).
function stationBoard(s) {
  const list = trains.filter(t => t.stops.includes(s));
  const rows = list.map(t => {
    const i = t.stops.indexOf(s);
    const role = i === 0 ? L('Starts here','এখান থেকে শুরু') : i === t.stops.length - 1 ? L('Terminal','শেষ স্টেশন') : L('Stops here','এখানে থামে');
    const next = t.stops.slice(i + 1).map(sName).join(' → ');
    return `<div class="board-row"><div><strong>${escapeHTML(tName(t.name))}</strong>${t.number ? ` <span class="train-number">#${escapeHTML(t.number)}</span>` : ''}<div class="board-meta">${escapeHTML(sName(t.from))} → ${escapeHTML(sName(t.to))}</div>${next ? `<div class="board-next">${L('Next stops','পরবর্তী স্টপ')}: ${escapeHTML(next)}</div>` : ''}</div><span class="train-type">${escapeHTML(role)}</span></div>`;
  }).join('');
  openDialog(`<div class="dialog-head"><div><div class="section-kicker">${L('STATION BOARD','স্টেশন বোর্ড')}</div><h2>${escapeHTML(sName(s))}</h2><div class="dialog-sub">${countSample(list.length)}</div></div><button class="dialog-close" aria-label="${L('Close','বন্ধ করুন')}">${icon('close')}</button></div>${rows}<div class="dialog-notice">${L('This demo does not include times. Check official schedules before you travel.','এই ডেমোতে সময় দেওয়া নেই। যাওয়ার আগে সরকারি সময়সূচি দেখে নিন।')}</div>`);
}

// Live reports: opt-in only. Each report is a rounded position; the public can only see counts.
function liveBlock(key) {
  return `<div class="live-panel" data-live-panel="${escapeHTML(key)}"><div class="section-kicker">${L('LIVE REPORTS','লাইভ রিপোর্ট')}</div><p class="live-status">${L('Checking…','দেখা হচ্ছে…')}</p><div class="live-body"></div></div>`;
}
async function refreshLive(key) {
  const panel = document.querySelector(`[data-live-panel="${CSS.escape(key)}"]`);
  if (!panel) return;
  const status = panel.querySelector('.live-status');
  const body = panel.querySelector('.live-body');
  const live = window.LiveTrains;
  if (!live || !live.configured) {
    status.textContent = L('Live reports are not set up in this copy of the app.', 'এই কপিতে লাইভ রিপোর্ট চালু করা নেই।');
    body.innerHTML = '';
    return;
  }
  body.innerHTML = live.isSharing() === key
    ? `<p class="live-note">${L('You are sharing a rounded position about every 30 seconds. Sharing stops when you close this panel.','আপনি প্রতি ৩০ সেকেন্ডে একটি মোটামুটি অবস্থান পাঠাচ্ছেন। এই প্যানেল বন্ধ করলে শেয়ারিং থেমে যাবে।')}</p><button class="live-btn" data-live-stop="${escapeHTML(key)}">${L('Stop sharing','শেয়ারিং বন্ধ করুন')}</button>`
    : `<button class="live-btn" data-live-share="${escapeHTML(key)}">${L("I'm on this train",'আমি এই ট্রেনে আছি')}</button>`;
  try {
    const s = await live.fetchStatus(key);
    if (!s.report_count) {
      status.textContent = L('No live reports in the last 10 minutes.', 'গত ১০ মিনিটে কোনো লাইভ রিপোর্ট নেই।');
    } else {
      const mins = Math.max(0, Math.round((Date.now() - new Date(s.last_seen)) / 60000));
      const speed = s.avg_speed_kmh ? Math.round(s.avg_speed_kmh) : null;
      status.textContent = isBn()
        ? `${s.report_count}টি রিপোর্ট · ${mins} মিনিট আগে সর্বশেষ${speed ? ` · গড় গতি প্রায় ${speed} কিমি/ঘণ্টা` : ''}`
        : `${s.report_count} report(s) · last ${mins} min ago${speed ? ` · avg about ${speed} km/h` : ''}`;
    }
  } catch (_) {
    status.textContent = L('Could not load live reports right now.', 'এখন লাইভ রিপোর্ট আনা যাচ্ছে না।');
  }
}
function showConsent(key) {
  const panel = document.querySelector(`[data-live-panel="${CSS.escape(key)}"]`);
  if (!panel) return;
  panel.querySelector('.live-body').innerHTML = `<p class="live-note">${L('Your location is sent as a rounded position (about 11 m) about every 30 seconds. No name or account is used. Each report expires after 10 minutes. Sharing stops when you close this panel. Only share if you are really on this train.','আপনার অবস্থান প্রায় ১১ মিটার নির্ভুলতায়, প্রতি ৩০ সেকেন্ডে পাঠানো হবে। নাম বা অ্যাকাউন্ট ব্যবহার হয় না। প্রতিটি রিপোর্ট ১০ মিনিট পরে মেয়াদ শেষ হয়। এই প্যানেল বন্ধ করলে শেয়ারিং থামে। সত্যিই এই ট্রেনে থাকলেই শেয়ার করুন।')}</p><button class="live-btn" data-live-consent="${escapeHTML(key)}">${L('Start sharing','শেয়ার শুরু করুন')}</button> <button class="live-btn ghost" data-live-cancel="${escapeHTML(key)}">${L('Cancel','বাতিল')}</button>`;
}
async function startLive(key) {
  const panel = document.querySelector(`[data-live-panel="${CSS.escape(key)}"]`);
  try {
    await window.LiveTrains.startSharing(key, evt => {
      if (evt.status === 'denied' && panel) panel.querySelector('.live-status').textContent = L('Location access was not allowed, so nothing was shared.', 'অবস্থান অনুমতি দেওয়া হয়নি, তাই কিছু শেয়ার হয়নি।');
      if (evt.status === 'error' && panel) panel.querySelector('.live-status').textContent = L('A report could not be sent. Check your connection.', 'রিপোর্ট পাঠানো যায়নি। ইন্টারনেট সংযোগ দেখুন।');
      refreshLive(key);
    });
    refreshLive(key);
  } catch (_) {
    if (panel) panel.querySelector('.live-status').textContent = L('Live sharing could not start on this device.', 'এই ডিভাইসে লাইভ শেয়ারিং শুরু করা যায়নি।');
  }
}

document.addEventListener('click', e => {
  const nav = e.target.closest('[data-view]'); if (nav) { e.preventDefault(); setView(nav.dataset.view); return; }
  const f = e.target.closest('[data-filter]'); if (f) { filter = f.dataset.filter; render(); return; }
  const sv = e.target.closest('[data-save]'); if (sv) { const key = sv.dataset.save; saved = saved.includes(key) ? saved.filter(x => x !== key) : [...saved, key]; save(); render(); return; }
  const dt = e.target.closest('[data-detail]'); if (dt) { const t = trains.find(x => x.key === dt.dataset.detail); if (t) detail(t); return; }
  const st = e.target.closest('[data-station]'); if (st) { stationBoard(st.dataset.station); return; }
  const ls = e.target.closest('[data-live-share]'); if (ls) { showConsent(ls.dataset.liveShare); return; }
  const lc = e.target.closest('[data-live-consent]'); if (lc) { startLive(lc.dataset.liveConsent); return; }
  const lx = e.target.closest('[data-live-stop]'); if (lx) { window.LiveTrains.stopSharing(); refreshLive(lx.dataset.liveStop); return; }
  const lk = e.target.closest('[data-live-cancel]'); if (lk) { refreshLive(lk.dataset.liveCancel); return; }
  if (e.target.closest('.dialog-close')) $('#detail-dialog').close();
});
$('#search-form').addEventListener('submit', e => { e.preventDefault(); query = $('#search-input').value; if (view === 'explore') view = 'trains'; render(); document.querySelector('.dashboard').scrollIntoView({behavior:'smooth', block:'start'}); });
$('#search-input').addEventListener('input', e => { query = e.target.value; render(); });
$('#view-all').addEventListener('click', () => setView('trains'));
$('#stations-button').addEventListener('click', () => setView('stations'));
$('#explore-button').addEventListener('click', () => { document.querySelector('.search-section').scrollIntoView({behavior:'smooth'}); $('#search-input').focus({preventScroll: true}); });
$('#about-button').addEventListener('click', () => openDialog(`<div class="dialog-head"><div><div class="section-kicker">${L('ABOUT THE PROJECT','প্রকল্প সম্পর্কে')}</div><h2>${L('Made for the journey.','যাত্রার জন্য তৈরি।')}</h2></div><button class="dialog-close" aria-label="${L('Close','বন্ধ করুন')}">${icon('close')}</button></div><p class="dialog-sub">${L('Railway is an independent, open-source concept for a better Bangladesh rail companion. This early version uses sample route data and works on mobile and desktop.','রেলওয়ে একটি স্বাধীন, ওপেন-সোর্স ধারণা, যার লক্ষ্য বাংলাদেশের জন্য একটি ভালো রেল সহায়ক অ্যাপ। এই প্রাথমিক সংস্করণে নমুনা রুট তথ্য ব্যবহৃত হয় এবং এটি মোবাইল ও ডেস্কটপে কাজ করে।')}</p><p class="dialog-sub">${L('It does not provide live tracking, official schedules, ticketing, or location sharing yet. Always check with Bangladesh Railway before traveling.','এটি এখনো লাইভ ট্র্যাকিং, সরকারি সময়সূচি, টিকিট বা অবস্থান শেয়ারিং দেয় না। যাওয়ার আগে সবসময় বাংলাদেশ রেলওয়ের সাথে যাচাই করুন।')}</p><div class="dialog-notice">${L('Not affiliated with or endorsed by Bangladesh Railway.','বাংলাদেশ রেলওয়ের সাথে সংশ্লিষ্ট বা তাদের দ্বারা অনুমোদিত নয়।')}</div>`));
$('#detail-dialog').addEventListener('click', e => { if (e.target.id === 'detail-dialog') e.target.close(); });
// Closing any dialog ends live sharing, so nobody keeps sending by accident.
$('#detail-dialog').addEventListener('close', () => { if (window.LiveTrains) window.LiveTrains.stopSharing(); });
$('#lang-toggle').addEventListener('click', () => {
  lang = isBn() ? 'en' : 'bn';
  try { localStorage.setItem('railway-lang', lang); } catch (_) {}
  applyStatic();
  render();
});

applyStatic();
render();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
