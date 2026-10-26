/* Formal rest-area PDF, 115/10/22. Rectangle coordinates are copied in PDF points;
   colors and type are redesigned, but no school position or seat count is changed. */
(function () {
  'use strict';
  const B = [
    ['大同國小',9,112.5,286.5,91.5,33,'left'],['竹仁國小',8,112.5,336,91.5,33,'left'],
    ['博愛國小',9,112.5,385.5,91.5,15.75,'left'],['松林國小',8,112.5,401.25,91.5,16.5,'left'],
    ['竹北國中',15,112.5,434.25,91.5,49.5,'left'],['富光國中',5,112.5,500.25,91.5,16.5,'left'],
    ['竹特學校',12,112.5,532.5,91.5,33,'left'],['竹特學校',23,112.5,582,91.5,65.25,'left'],
    ['山崎國小',20,219,286.5,121.5,33,'center'],['竹北國小',6,219,336,121.5,16.5,'center'],
    ['新豐國小',10,219,352.5,121.5,33,'center'],['新社國小',4,219,385.5,121.5,15.75,'center'],
    ['新埔國小',9,219,401.25,121.5,16.5,'center'],['芎林國小',10,219,434.25,121.5,16.5,'center'],
    ['竹東國中',15,219,483.75,121.5,33,'center'],['新豐國中',14,219,532.5,121.5,33,'center'],
    ['竹特學校',31,219,582,121.5,65.25,'center'],
    ['中山國小',10,355.5,286.5,91.5,16.5,'right'],['嘉豐國小',9,355.5,303,91.5,33,'right'],
    ['竹東國小',10,355.5,336,91.5,16.5,'right'],['湖口國小',9,355.5,352.5,91.5,33,'right'],
    ['關西國小',10,355.5,385.5,91.5,32.25,'right'],['橫山國小',9,355.5,434.25,91.5,16.5,'right'],
    ['新湖國小',6,355.5,450.75,91.5,16.5,'right'],['芎林國中',8,355.5,483.75,91.5,33,'right'],
    ['湖口國中',6,355.5,532.5,91.5,33,'right'],['竹特學校',18,355.5,582,91.5,65.25,'right']
  ];
  const names = [...new Set(B.map(b=>b[0]))].sort((a,b)=>a.localeCompare(b,'zh-Hant'));
  const side = {left:'左列',center:'中列',right:'右列'};
  const esc = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function block(b,i) {
    const [name,count,x,y,w,h]=b, cx=x+w/2, cy=y+h/2;
    const text=h>26?`<text x="${cx}" y="${cy-2}" class="rm-school-label">${name}</text><text x="${cx}" y="${cy+10}" class="rm-seat-label">${count} 席</text>`:`<text x="${cx}" y="${cy+3}" class="rm-school-label">${name} <tspan class="rm-inline-count">${count}</tspan></text>`;
    return `<g class="rm-block${name.includes('國中')||name==='竹特學校'?' rm-block-secondary':''}" data-rm-school="${name}" data-rm-index="${i}" tabindex="0" role="button" aria-label="${name}，原圖${count}個學生座位，${side[b[6]]}" aria-pressed="false"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>${text}</g>`;
  }
  function fixedRect(x,y,w,h,label,cls='') {
    return `<g class="rm-fixed ${cls}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>${label?`<text x="${x+w/2}" y="${y+h/2+3}">${label}</text>`:''}</g>`;
  }
  function svg() {
    let s=`<svg class="rm-svg" viewBox="93 69 420 591" xmlns="http://www.w3.org/2000/svg" aria-labelledby="rm-svg-title rm-svg-desc"><title id="rm-svg-title">各校休息區互動分配圖</title><desc id="rm-svg-desc">依115年10月22日正式分配圖繪製。舞台在圖上方，學校分左中右三列，廊道休息區在右側。可點學校或使用旁邊的學校搜尋。</desc>`;
    s+=fixedRect(158.62,81.37,242.25,43.5,'舞台','rm-stage');
    [112.5,219,355.5].forEach((x,i)=>{
      let w=i===1?121.5:91.5;
      s+=fixedRect(x,139.5,w,48.75,'','rm-unlabelled');
      s+=fixedRect(x,188.25,w,33,i===2?'校長座位區':'貴賓座位區');
      s+=fixedRect(x,237.75,w,33,i===2?'校長座位區':'貴賓座位區');
    });
    s+=`<g class="rm-corridor"><rect x="462" y="139.5" width="38.25" height="507.75"/><text x="481.125" y="385" style="writing-mode:vertical-rl;text-orientation:upright">廊道休息區</text></g>`;
    // The original printed row/column indices are retained for location matching.
    const rowBaselines=[151.45,167.95,183.70,200.20,216.70,233.20,249.70,266.20,282.70,298.45,314.95,331.45,347.95,364.45,380.95,397.45,413.20,429.70,446.20,462.70,479.20,495.70,512.20,527.95,544.45,560.95,577.45,593.95,610.45,626.95,642.70];
    rowBaselines.forEach((y,i)=>s+=`<text class="rm-grid-number" x="103.95" y="${y}">${i+1}</text>`);
    for(let i=1;i<=22;i++)s+=`<text class="rm-grid-number" x="${120.344+(i-1)*15.17578}" y="135.70">${i}</text>`;
    s+=B.map(block).join('');
    return s+'</svg>';
  }
  window.RestMapHTML=function () {
    return `<section class="rm-root" aria-label="各校休息區互動地圖"><div class="rm-intro"><div><h2>各校休息區分配圖</h2><p>搜尋或選擇學校後，可查看分配位置與學生座位數。位置與數字依10/22正式圖。</p></div><a class="rm-source" href="assets/rest-area-1151022.pdf" target="_blank" rel="noopener">正式分配圖 PDF <span aria-hidden="true">↗</span></a></div><div class="rm-layout"><aside class="rm-finder"><label class="rm-search-label" for="rm-search">找學校</label><div class="rm-search-wrap"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input id="rm-search" type="search" placeholder="輸入校名，例如竹北" autocomplete="off"/></div><div class="rm-selection" role="status" aria-live="polite"><span class="rm-selection-caption">目前查看</span><strong id="rm-selected-name">所有學校</strong><p id="rm-selected-detail">可從學校清單或圖上的區塊查看位置。</p></div><div class="rm-result-heading"><span>學校清單</span><span id="rm-result-count">${names.length} 校</span></div><div class="rm-results" aria-label="選擇學校">${names.map(n=>`<button type="button" data-rm-name="${n}" aria-pressed="false">${n}<span aria-hidden="true">↗</span></button>`).join('')}</div><p class="rm-no-result" hidden>沒有符合的校名，試試輸入兩個字。</p></aside><div class="rm-board"><div class="rm-board-toolbar"><div class="rm-legend"><span><i class="rm-dot-primary"></i>國小</span><span><i class="rm-dot-secondary"></i>國中／竹特</span></div><div class="rm-zoom-controls" aria-label="地圖縮放"><button type="button" data-rm-zoom="out" aria-label="縮小地圖">−</button><output id="rm-zoom-value" aria-label="地圖縮放比例">100%</output><button type="button" data-rm-zoom="in" aria-label="放大地圖">＋</button><button type="button" data-rm-zoom="reset" class="rm-fit">全圖</button></div></div><div class="rm-viewport" tabindex="0" role="region" aria-label="可捲動的休息區地圖，選校後會放大定位"><div class="rm-canvas">${svg()}</div></div><div class="rm-map-note"><span>舞台朝上・廊道在右</span><span>放大後可滑動查看</span></div></div></div><p class="rm-footnote">圖上數字為學生座位數，依10/22正式分配圖。現場擺放、走道與服務桌位以場佈確認及現場標示為準。</p></section>`;
  };
  window.bindRestMap=function () {
    const root=document.querySelector('.rm-root'); if(!root)return;
    const viewport=root.querySelector('.rm-viewport'),canvas=root.querySelector('.rm-canvas'),input=root.querySelector('#rm-search');
    let zoom=1;
    function scale(v) {
      zoom=Math.max(1,Math.min(3,v));
      const heightLimit=parseFloat(getComputedStyle(viewport).maxHeight)||900;
      const baseWidth=Math.min(viewport.clientWidth,(heightLimit-30)*420/591);
      canvas.style.width=(baseWidth*zoom)+'px';
      canvas.style.marginInline=baseWidth*zoom<viewport.clientWidth?'auto':'0';
      root.querySelector('#rm-zoom-value').textContent=Math.round(zoom*100)+'%';
    }
    function select(name,focusIndex) {
      const selected=B.filter(b=>b[0]===name);if(!selected.length)return;
      const mobile=window.matchMedia('(max-width: 680px)').matches;
      const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.querySelectorAll('[data-rm-school]').forEach(g=>{let on=g.dataset.rmSchool===name;g.classList.toggle('rm-selected',on);g.setAttribute('aria-pressed',on)});
      root.querySelectorAll('[data-rm-name]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rmName===name)));
      root.querySelector('#rm-selected-name').textContent=name;
      root.querySelector('#rm-selected-detail').textContent=selected.length>1?`原圖分為 ${selected.length} 區，學生座位分別為 ${selected.map(b=>b[1]).join('、')} 席；同校區塊已全部標色。`:`原圖${side[selected[0][6]]}，${selected[0][1]} 個學生座位。`;
      // A multi-block school is fitted as one selection, never scrolled block by block.
      // An explicit map click still keeps the clicked block as the point of interest.
      scale(mobile?(selected.length>1&&focusIndex===undefined?1.1:2.15):1.3);
      if(mobile&&document.activeElement===input)input.blur();
      requestAnimationFrame(()=>{
        if(!root.isConnected)return;
        const targets=focusIndex===undefined?[...root.querySelectorAll('.rm-block.rm-selected')]:[root.querySelector(`[data-rm-index="${focusIndex}"]`)];
        const boxes=targets.filter(Boolean).map(el=>el.getBoundingClientRect());
        const a={left:Math.min(...boxes.map(r=>r.left)),right:Math.max(...boxes.map(r=>r.right)),top:Math.min(...boxes.map(r=>r.top)),bottom:Math.max(...boxes.map(r=>r.bottom))};
        a.width=a.right-a.left;a.height=a.bottom-a.top;
        const p=viewport.getBoundingClientRect();
        viewport.scrollTo({left:viewport.scrollLeft+a.left-p.left+a.width/2-viewport.clientWidth/2,top:viewport.scrollTop+a.top-p.top+a.height/2-viewport.clientHeight/2,behavior:'instant'});
        if(mobile)requestAnimationFrame(()=>{
          if(!root.isConnected)return;
          const header=document.querySelector('.site-header');
          const inset=header&&/sticky|fixed/.test(getComputedStyle(header).position)?Math.max(0,header.getBoundingClientRect().bottom):0;
          // Keep the zoom controls with the map, below the persistent navigation.
          const top=window.scrollY+root.querySelector('.rm-board').getBoundingClientRect().top-inset-12;
          window.scrollTo({top:Math.max(0,top),behavior:reducedMotion?'instant':'smooth'});
        });
      });
    }
    root.querySelectorAll('[data-rm-name]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.rmName)));
    root.querySelectorAll('[data-rm-school]').forEach(g=>{
      g.addEventListener('click',()=>select(g.dataset.rmSchool,Number(g.dataset.rmIndex)));
      g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(g.dataset.rmSchool,Number(g.dataset.rmIndex))}});
    });
    root.querySelectorAll('[data-rm-zoom]').forEach(b=>b.addEventListener('click',()=>{
      const action=b.dataset.rmZoom;if(action==='reset'){scale(1);viewport.scrollTo(0,0)}else scale(zoom+(action==='in'?.3:-.3));
    }));
    input.addEventListener('input',()=>{
      const q=input.value.trim();let count=0;
      root.querySelectorAll('[data-rm-name]').forEach(b=>{b.hidden=!b.dataset.rmName.includes(q);if(!b.hidden)count++});
      root.querySelector('#rm-result-count').textContent=count+' 校';root.querySelector('.rm-no-result').hidden=!!count;
    });
    input.addEventListener('keydown',e=>{if(e.key==='Enter'){const b=[...root.querySelectorAll('[data-rm-name]')].find(b=>!b.hidden);if(b){e.preventDefault();select(b.dataset.rmName)}}});
    scale(1);
  };
}());
