const characters = [
  { name: "緑谷出久", heroName: "デク", quirk: "ワン・フォー・オール", description: "オールマイトの遺志を受け継ぐ、誰よりもヒーローになることを夢見る少年。", image: "images/deku.jpg" },
  { name: "爆豪勝己", heroName: "大・爆・殺・神ダイナマイト", quirk: "爆破", description: "勝利への執念が強い、強力な爆発を操るライバルキャラクター。", image: "images/bakugo.jpg" },
  { name: "轟焦凍", heroName: "シュート", quirk: "氷と燃焼", description: "氷と炎の両方を使いこなす、冷静沈着な能力者。", image: "images/todoroki.jpg" },
  { name: "麗日お茶子", heroName: "ウラビティ", quirk: "浮遊", description: "触れたものを浮かせられる、明るく前向きなヒーロー志望生。", image: "images/uraraka.jpg" },
  { name: "飯田天哉", heroName: "インゲニウム", quirk: "エンジン", description: "足にエンジンを持つ、規律正しく仲間を支える俊足ヒーロー。", image: "images/iida.jpg" },
  { name: "蛙吹梅雨", heroName: "フロッピー", quirk: "カエル", description: "カエルの能力を使いこなす、冷静で観察力に優れた生徒。", image: "images/asui.jpg" },
  { name: "切島鋭児郎", heroName: "レッドライオット", quirk: "硬化", description: "カチッときた仲間を守る、硬い心と体を持つ熱血ヒーロー。", image: "images/kirishima.jpg" },
  { name: "上鳴電気", heroName: "チャージズマ", quirk: "帯電", description: "電気を蓄えて放出する、お調子者だが仲間想いのクラスメイト。", image: "images/kaminari.jpg" },
  { name: "常闇踏陰", heroName: "ツクヨミ", quirk: "黒影", description: "影の中に潜む生物を操る、クールでミステリアスな力の持ち主。", image: "images/tokoyami.jpg" },
  { name: "耳郎響香", heroName: "イヤホンジャック", quirk: "イヤホンジャック", description: "イヤホン状の耳で音を探知・攻撃できる、クールなヒーロー志望生。", image: "images/jiro.jpg" },
  { name: "八百万百", heroName: "クリエイティ", quirk: "創造", description: "体脂肪から物質を生み出せる、優秀で頼れるクラス委員。", image: "images/yaoyorozu.jpg" },
  { name: "相澤消太", heroName: "イレイザー・ヘッド", quirk: "消去", description: "個性を一時的に無効化できる、厳しく生徒たちを鍛える教師。", image: "images/aizawa.jpg" },
  { name: "オールマイト", heroName: "オールマイト", quirk: "ワン・フォー・オール", description: "平和の象徴として世界を守った、誰もが憧れる伝説のヒーロー。", image: "images/allmight.jpg" },
  { name: "エンデヴァー", heroName: "エンデヴァー", quirk: "ホットセンス", description: "炎を操るナンバー２ヒーロー。強さと責任を追い求める父親。", image: "images/endeavor.jpg" },
  { name: "ホークス", heroName: "ホークス", quirk: "翼", description: "羽根を操り高速で活動する、自由な発想と高い実力を持つヒーロー。", image: "images/hawks.jpg" },
  { name: "死柄木弔", heroName: "シガラキトムラ", quirk: "異能解放", description: "触れたものを崩壊させる力を持つ、ヴィラン連合の中心的存在。", image: "images/shigaraki.jpg" },
  { name: "荼毘", heroName: "ダビ", quirk: "蒼炎", description: "強烈な青い炎を操る、冷淡な印象のヴィラン。", image: "images/dabi.jpg" },
  { name: "トガヒミコ", heroName: "トガヒミコ", quirk: "個性吸血", description: "人の血を飲むことでその姿と個性を使える、自由奔放なヴィラン。", image: "images/toga.jpg" }
];

const startButton = document.getElementById("startButton");
const buttonText = document.getElementById("buttonText");
const statusText = document.getElementById("statusText");
const resultPanel = document.getElementById("resultPanel");
const characterImage = document.getElementById("characterImage");
const imageFallback = document.getElementById("imageFallback");
const characterName = document.getElementById("characterName");
const heroName = document.getElementById("heroName");
const quirk = document.getElementById("quirk");
const description = document.getElementById("description");
const historyList = document.getElementById("historyList");
const clearHistoryButton = document.getElementById("clearHistory");

let isSpinning = false;
let history = loadHistory();

function loadHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem("mhaRouletteHistory"));
    return Array.isArray(stored) ? stored.slice(0, 10) : [];
  } catch {
    return [];
  }
}

function saveHistory() {
  localStorage.setItem("mhaRouletteHistory", JSON.stringify(history));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setImage(src, fallbackName) {
  characterImage.hidden = false;
  imageFallback.hidden = true;
  characterImage.src = src;
  characterImage.alt = fallbackName;
}

characterImage.addEventListener("error", () => {
  characterImage.hidden = true;
  imageFallback.hidden = false;
  imageFallback.textContent = characterName.textContent;
});

function renderHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty-history">まだ履歴がありません</p>';
    return;
  }

  historyList.innerHTML = history.map((item, index) => `
    <article class="history-item" title="${escapeHtml(item.name)}">
      <img src="${escapeHtml(item.image)}" alt="" onerror="this.outerHTML='<span class=&quot;history-thumb-fallback&quot;>${escapeHtml(item.name.charAt(0))}</span>'">
      <div class="history-copy">
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml(item.heroName)}</small>
      </div>
    </article>
  `).join("");
}

function randomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function displayCharacter(character) {
  characterName.textContent = character.name;
  heroName.textContent = character.heroName;
  quirk.textContent = character.quirk;
  description.textContent = character.description;
  setImage(character.image, character.name);
}

function addToHistory(character) {
  history = [character, ...history].slice(0, 10);
  saveHistory();
  renderHistory();
}

function spinRoulette() {
  if (isSpinning) return;
  isSpinning = true;
  startButton.disabled = true;
  buttonText.textContent = "抽選中…";
  statusText.textContent = "ルーレット回転中";
  resultPanel.classList.remove("reveal");
  resultPanel.classList.add("spinning");

  const winner = randomCharacter();
  const startTime = performance.now();
  const duration = 3000;
  let timeoutId;

  function cycle(now) {
    const elapsed = now - startTime;

    let interval;
    if (elapsed < 1200) interval = 55;
    else if (elapsed < 2100) interval = 95;
    else interval = 155 + ((elapsed - 2100) / 900) * 170;

    if (elapsed >= duration) {
      clearTimeout(timeoutId);
      finish(winner);
      return;
    }

    displayCharacter(randomCharacter());
    timeoutId = setTimeout(() => requestAnimationFrame(cycle), interval);
  }

  requestAnimationFrame(cycle);
}

function finish(winner) {
  displayCharacter(winner);
  addToHistory(winner);

  resultPanel.classList.remove("spinning");
  void resultPanel.offsetWidth;
  resultPanel.classList.add("reveal");
  statusText.textContent = "キャラクター選出！";
  buttonText.textContent = "もう一度引く";
  startButton.disabled = false;
  isSpinning = false;
}

startButton.addEventListener("click", spinRoulette);

clearHistoryButton.addEventListener("click", () => {
  history = [];
  saveHistory();
  renderHistory();
});

renderHistory();
