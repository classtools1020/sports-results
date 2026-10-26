(() => {
  const mapURL = query => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  const venueMap = mapURL('國立新竹特殊教育學校 新竹縣竹北市光明六路東二段201號');
  const parkingMap = mapURL('嘉豐國小公有地下停車場 新竹縣竹北市嘉豐五路一段59號');

  window.ArrivalGuideHTML = function () {
    return `<section class="arrival-guide" aria-labelledby="arrival-guide-title">
      <div class="arrival-guide-heading">
        <h2 id="arrival-guide-title">到場與停車</h2>
        <p>活動場地與汽車停車資訊</p>
      </div>
      <div class="arrival-guide-grid">
        <article class="arrival-card arrival-card-venue" aria-labelledby="arrival-venue-title">
          <div class="arrival-card-body">
            <p class="arrival-card-label">活動場地</p>
            <h3 id="arrival-venue-title">國立新竹特殊教育學校</h3>
            <address>302 新竹縣竹北市光明六路東二段201號</address>
            <div class="arrival-dropoff">
              <h4>車輛下車入口</h4>
              <p>遊覽車由活動中心後門下車，各校交通車由前門下車，依現場引導。</p>
            </div>
            <a class="arrival-map-link" href="${venueMap}" target="_blank" rel="noopener noreferrer">Google Maps 定位<span aria-hidden="true">↗</span></a>
            <p class="arrival-source">地址依<a href="https://www.nhs.hcc.edu.tw/home?cid=302" target="_blank" rel="noopener noreferrer">校方地理位置頁</a>。</p>
          </div>
        </article>
        <article class="arrival-card arrival-card-parking" aria-labelledby="arrival-parking-title">
          <figure class="arrival-parking-photo">
            <a href="assets/jiafeng-parking-reference.jpg" data-photo-open target="_blank" rel="noopener" aria-label="放大查看嘉豐國小公有地下停車場汽車坡道照片">
              <img src="assets/jiafeng-parking-reference.jpg" width="1424" height="937" alt="嘉豐國小公有地下停車場汽車坡道，照片右側標示入口及限高2.1公尺，左側標示禁止進入。" loading="lazy">
              <span class="arrival-photo-action">放大看圖<span aria-hidden="true">↗</span></span>
            </a>
            <figcaption>照片：新竹縣政府，114/2/25公告 · <a href="https://www.hsinchu.gov.tw/News_Content.aspx?n=153&amp;s=269527" target="_blank" rel="noopener noreferrer">來源公告</a></figcaption>
          </figure>
          <div class="arrival-card-body">
            <h3 id="arrival-parking-title">嘉豐國小公有地下停車場<span>（汽車）</span></h3>
            <address>302052 新竹縣竹北市嘉豐五路一段59號</address>
            <p class="arrival-parking-note">汽車停車辨識參考；活動停車依大會及現場引導。</p>
            <a class="arrival-map-link" href="${parkingMap}" target="_blank" rel="noopener noreferrer">Google Maps 定位<span aria-hidden="true">↗</span></a>
            <p class="arrival-source">地址依<a href="https://jfes.hcc.edu.tw/p/412-1124-6618.php" target="_blank" rel="noopener noreferrer">嘉豐國小交通位置頁</a>。</p>
          </div>
        </article>
      </div>
    </section>`;
  };
})();
