
// デジタル時計の更新
function updateClock() {
  const clockElement = document.getElementById("digital-clock");
  const now = new Date();
  clockElement.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// ドットを押すとスタートボタンが表示される
document.getElementById("dot").addEventListener("click", () => {
  const startButton = document.getElementById("start-button");
  startButton.style.display = "block";
});

// スタートボタンを押すと履歴が埋められる
document.getElementById("start-button").addEventListener("click", () => {
  const historyList = document.getElementById("history-list");
  const newItem = document.createElement("li");
  const randomContent = `History at ${new Date().toLocaleTimeString()}`;
  newItem.textContent = randomContent;
  historyList.appendChild(newItem);
});
