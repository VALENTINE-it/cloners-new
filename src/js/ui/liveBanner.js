export function renderLiveBanner(newItem, onMerge) {
  const container = document.getElementById('live-banner-container');
  container.innerHTML = `
    <div class="live-banner">
      <span>New story arrived: <strong>${newItem.title}</strong></span>
      <button id="merge-live-btn">View</button>
    </div>
  `;
  document.getElementById('merge-live-btn').addEventListener('click', onMerge);
}

export function clearLiveBanner() {
  document.getElementById('live-banner-container').innerHTML = '';
}
