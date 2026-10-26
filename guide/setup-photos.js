(() => {
  const photos = [
    {
      src: 'assets/history-seating-reference.jpg',
      title: '座位與校名牌',
      alt: '歷年活動中心座位與各校校名牌，座位區之間留有通道。',
      caption: '校名牌、座位分區與走道的擺設參考。'
    },
    {
      src: 'assets/history-stations-reference.jpg',
      title: '競賽桌與帳篷配重',
      alt: '歷年戶外競賽桌、帳篷、站牌及藍色配重桶。',
      caption: '桌面、掛牌與配重桶的擺設參考；圖中站名為歷年內容。'
    },
    {
      src: 'assets/history-vip-seating-reference.jpg',
      title: '貴賓座位',
      alt: '歷年活動中心前排貴賓座椅及長官貴賓立牌。',
      caption: '前排座位與立牌的擺設參考，今年依核定配置。'
    },
    {
      src: 'assets/history-medical-reference.jpg',
      title: '醫護圍布',
      alt: '歷年醫護站帳篷，設有醫護站牌、圍布及旁側工作空間。',
      caption: '圍布、站牌與工作空間的擺設參考。'
    },
    {
      src: 'assets/history-scorewall-reference.jpg',
      title: '成績公告牆',
      alt: '歷年公告牆張貼場地圖、休息區分配與成績總表。',
      caption: '圖表張貼方式的參考；今年的場地圖與成績表使用115版。'
    }
  ];

  window.SetupPhotosHTML = function () {
    return `<section class="setup-photos" aria-labelledby="setup-photos-title">
      <div class="setup-photos-heading">
        <h2 id="setup-photos-title">歷年場佈參考</h2>
        <p>照片可點開放大。</p>
      </div>
      <p class="setup-photos-note">歷年照片僅供辨認擺設；今年學校位置、站名與數量，依115定版圖表為準。</p>
      <div class="setup-photos-grid">
        ${photos.map(photo => `<figure class="setup-photo">
          <a class="setup-photo-image" href="${photo.src}" data-photo-open target="_blank" rel="noopener" aria-label="放大查看歷年${photo.title}照片">
            <img src="${photo.src}" width="4032" height="3024" alt="${photo.alt}" loading="lazy" decoding="async">
            <span class="setup-photo-open">放大看圖<span aria-hidden="true">↗</span></span>
          </a>
          <figcaption><h3>${photo.title}</h3><p>${photo.caption}</p></figcaption>
        </figure>`).join('')}
        <aside class="setup-photos-current" aria-labelledby="setup-current-title">
          <h3 id="setup-current-title">今年張貼用圖</h3>
          <ul>
            <li>今年場地圖</li>
            <li>各校休息區分配圖</li>
            <li>國小、國中成績總表</li>
            <li>成績QR海報</li>
          </ul>
          <p>圖表使用115定版，張貼後確認文字清楚、QR碼可開啟。</p><p>A3主公告：QR圖區約15公分。近距離A4：QR約10–12公分，印後先手機試掃。</p>
        </aside>
      </div>
    </section>`;
  };
})();
