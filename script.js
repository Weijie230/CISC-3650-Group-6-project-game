const ADJS = ['Sneaky','Fluffy','Grumpy','Happy','Brave','Clever','Mighty','Swift',
  'Gentle','Bold','Calm','Witty','Jolly','Zesty','Quirky','Fuzzy','Sassy','Dapper','Peppy','Plucky'];

const ANIMALS = ['Otter','Penguin','Badger','Capybara','Hedgehog','Narwhal','Platypus',
  'Axolotl','Quokka','Wombat','Lemur','Pangolin','Tapir','Marmot','Puffin',
  'Chinchilla','Armadillo','Kinkajou','Numbat','Bison'];

const FRIENDS = [
  { name:'Alex M.',   bg:'#78c490', icon:'😊' },
  { name:'Jordan K.', bg:'#88b4e0', icon:'🙂' },
  { name:'Sam R.',    bg:'#e8a88c', icon:'😄' },
  { name:'Casey T.',  bg:'#c888e0', icon:'😀' },
  { name:'Riley B.',  bg:'#e8d888', icon:'🙃' },
];

const AD_MSGS = [
  '🎊 Congratulations! You won nothing. Your subscription auto-renewed though!',
  '🎁 You clicked! We\'ve upgraded you to Platinum — only $500 more/month!',
  '👀 So close to canceling. Crisis averted for us!',
];

let G = { name: '', generated: '', points: 0, step: 0 };

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

function addPts(n) {
  G.points += n;
  document.getElementById('hdr-pts').textContent = G.points;
  const el = document.createElement('div');
  el.className = 'pts-toast ' + (n > 0 ? 'pts-pos' : 'pts-neg');
  el.textContent = (n > 0 ? '+' : '') + n + ' pts';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1700);
}

function flashFail() {
  const el = document.createElement('div');
  el.className = 'fail-flash';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

function openModal(html) {
  document.getElementById('modal').innerHTML = html;
  document.getElementById('overlay').classList.add('active');
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
}

function popBubble(msg) {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:#ffe082;border-radius:12px;padding:20px 28px;
    font-family:'Special Elite',cursive;font-size:14px;max-width:300px;
    text-align:center;z-index:900;box-shadow:0 4px 20px rgba(0,0,0,0.3);
    border:2px solid #ffc107;line-height:1.5;`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

// Navigation
function goToName() { randName(); showScreen('name'); }

function randName() {
  G.generated = pick(ADJS) + ' ' + pick(ANIMALS);
  document.getElementById('name-badge').textContent = G.generated;
}

function pickName() {
  G.name = G.generated;
  G.points = 0;
  G.step = 0;
  document.getElementById('hdr-name').textContent = G.name;
  document.getElementById('hdr-pts').textContent = '0';
  showScreen('home');
}

function resetGame() {
  G.points = 0;
  G.step = 0;
  showScreen('start');
}

// Cancel flow
function beginCancel() {
  G.step = 1;
  renderPopup();
}

function fail() {
  closeModal();
  addPts(-5);
  flashFail();
  G.step = 0;
  showScreen('home');
}

function outsideClick(e) {
  if (e.target === document.getElementById('overlay')) fail();
}

function proceed() {
  addPts(10);
  closeModal();
  G.step++;
  setTimeout(() => {
    if (G.step <= 6) renderPopup();
    else showSurvey();
  }, 220);
}

function staySubscribed() { fail(); }

function renderPopup() {
  [null, popup1, popup2, popup3, popup4, popup5, popup6][G.step]();
}

function stepInd() {
  return `<div class="step-indicator">Step ${G.step} of 7</div>`;
}

function stayBtn(label) {
  return `<button class="btn-stay" onclick="staySubscribed()">${label}</button>`;
}

function proceedBtn(label) {
  return `<button class="btn-proceed" onclick="proceed()">${label}</button>`;
}

function popup1() {
  openModal(`
    ${stepInd()}
    <div class="modal-title">Did You Mean To Cancel?</div>
    <div class="modal-sub">Once you cancel, you'll forever lose access to:</div>
    <div class="modal-body">
      <ul>
        <li>Your Data with us</li>
        <li>New promotion updates</li>
        <li>Exclusive Discounts</li>
        <li>and more...</li>
      </ul>
    </div>
    ${stayBtn('Stay Subscribed and Save My Data')}
    ${proceedBtn('Proceed to Cancel')}
  `);
}

function popup2() {
  openModal(`
    ${stepInd()}
    <div class="modal-title">Are You Sure?</div>
    <div class="modal-sub">This action cannot be undone</div>
    <div class="modal-body">
      Canceling your subscription means you will immediately lose access to all premium features, and your saved preferences will be permanently deleted.
    </div>
    ${stayBtn('No, Keep My Subscription')}
    ${proceedBtn("Yes, I'm sure")}
  `);
}

function popup3() {
  const friends = [...FRIENDS].sort(() => Math.random() - 0.5).slice(0, 3);
  const fHtml = friends.map(f =>
    `<div class="friend">
      <div class="friend-av" style="background:${f.bg}">${f.icon}</div>
      <div class="friend-nm">${f.name}</div>
    </div>`
  ).join('');
  openModal(`
    ${stepInd()}
    <div class="modal-title">Your Friends Are Still Subscribed!</div>
    <div class="modal-body" style="text-align:center">
      <div class="friends-row">${fHtml}</div>
      <p style="font-size:13px">${friends[0].name}, ${friends[1].name}, and ${friends[2].name} are all still happily subscribed to <strong>The Not So Evil Corporation</strong>.</p>
      <p style="margin-top:8px;font-size:13px">Are you <em>still</em> sure you want to cancel?</p>
    </div>
    ${stayBtn('No, Stay Subscribed Like My Friends!')}
    ${proceedBtn('Yes, cancel anyway')}
  `);
}

function popup4() {
  openModal(`
    ${stepInd()}
    <div class="modal-title">🎁 Special Offer Just For You!</div>
    <div class="modal-body" style="text-align:center;padding:10px 0">
      <p>If you stay subscribed, we'll give you</p>
      <p style="font-size:24px;font-weight:bold;margin:10px 0">10% OFF</p>
      <p>one month — <em>a year from now!</em></p>
      <p style="font-size:11px;color:#aaa;margin-top:8px">(That's up to $150 in savings!)</p>
    </div>
    ${stayBtn('Yes! Keep My Subscription & Claim Offer!')}
    ${proceedBtn('No, cancel anyway')}
  `);
}

function popup5() {
  openModal(`
    ${stepInd()}
    <div class="modal-title">⚠️ Price Increase Alert!</div>
    <div class="modal-sub">Limited Time Warning</div>
    <div class="modal-body" style="text-align:center">
      <p>This is your <strong>last opportunity</strong> to keep your subscription before prices increase by <strong>$5/month</strong>!</p>
      <p style="margin-top:10px;font-size:13px">
        Current: $1,500/mo<br>
        <span style="color:#c0392b;font-weight:bold">↑ New: $1,505/mo</span>
      </p>
      <p style="margin-top:10px;font-size:13px">Are you still sure you'd like to cancel?</p>
    </div>
    ${stayBtn('No! Lock In My Current Rate!')}
    ${proceedBtn('Yes, cancel and pay more later I guess')}
  `);
}

function popup6() {
  openModal(`
    ${stepInd()}
    <div class="modal-title">Our Absolute Last Offer</div>
    <div class="modal-sub">We really don't want to lose you</div>
    <div class="modal-body">
      <p style="text-align:center;margin-bottom:8px">If you stay subscribed, you'll get:</p>
      <ul>
        <li>Current rates <strong>locked in forever</strong></li>
        <li><strong>10% off two months</strong> — one year from now</li>
        <li>Your loyalty status maintained</li>
      </ul>
    </div>
    ${stayBtn("Yes, I'll Stay for This Amazing Deal!")}
    ${proceedBtn('No, cancel')}
  `);
}

// Survey
function showSurvey() {
  openModal(`
    <div class="step-indicator">Step 7 of 7 — Almost there!</div>
    <div class="modal-title" style="font-size:18px">We're Sad To See You Go 😢</div>
    <div class="modal-sub">Please complete this quick survey to proceed</div>

    <div class="survey-q">
      <label>How would you rate your experience?</label>
      <div class="stars">★★★★★</div>
    </div>

    <div class="survey-q">
      <label>Why are you canceling? (select all that apply)</label>
      <div class="chk-row"><input type="checkbox" checked> I actually love the service</div>
      <div class="chk-row"><input type="checkbox" checked> I don't want to miss out on benefits</div>
      <div class="chk-row"><input type="checkbox" checked> I'll definitely resubscribe soon</div>
      <div class="chk-row"><input type="checkbox"> The service doesn't meet my needs</div>
      <div class="chk-row"><input type="checkbox"> It's too expensive for me</div>
    </div>

    <div class="survey-q">
      <label>Would you like to reconsider?</label>
      <label class="radio-stay">
        <input type="radio" name="reconsider" value="yes" checked> Yes, I'd like to stay!
      </label>
      <label class="radio-cancel">
        <input type="radio" name="reconsider" value="no"> No, please proceed with cancellation
      </label>
    </div>

    <button class="btn-submit" onclick="submitSurvey()">Submit Survey</button>
  `);
}

function submitSurvey() {
  const radios = document.querySelectorAll('input[name="reconsider"]');
  let val = 'yes';
  radios.forEach(r => { if (r.checked) val = r.value; });

  if (val === 'no') {
    addPts(10);
    closeModal();
    setTimeout(() => {
      document.getElementById('final-score').textContent = '🎉 Final Score: ' + G.points + ' pts';
      showScreen('final');
    }, 220);
  } else {
    fail();
  }
}

function adClick() { popBubble(pick(AD_MSGS)); }
function manageClick() { popBubble('Modification is currently unavailable. Please try again later.'); }

randName();
