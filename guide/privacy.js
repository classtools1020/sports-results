/* Keep prior personal checkmarks while moving people to anonymous route IDs. */
(function(){'use strict';const routes={"dd774e5c":"p01","807d847b":"p02","dd3f058d":"p03","da811c5e":"p04","12a20e9f":"p05","41f91812":"p06","f49b7a9a":"p07","924314bd":"p08","dc1c5009":"p09","24d0020d":"p10","8d4d65dd":"p11","3be9a475":"p12","32228a0b":"p13","f752b9ed":"p14","48f36c5d":"p15","1177dee9":"p16","2d5e3e54":"p17"};
function fingerprint(s){let n=2166136261;for(let i=0;i<s.length;i++){n^=s.charCodeAt(i);n=Math.imul(n,16777619)}return(n>>>0).toString(16)}
window.prepareAnonymousStaff=function(){try{Object.keys(localStorage).filter(k=>k.startsWith('staff115-ops-teacher-')).forEach(k=>{const m=k.match(/^staff115-ops-teacher-(.+)-(nov[56])$/);if(!m)return;const id=routes[fingerprint(m[1])];if(!id)return;const next='staff115-ops-teacher-'+id+'-'+m[2];if(localStorage.getItem(next)===null)localStorage.setItem(next,localStorage.getItem(k));localStorage.removeItem(k)})}catch{}
const match=location.hash.match(/^#people\/(.+)$/);if(match){const id=routes[fingerprint(match[1])];if(id)history.replaceState(null,'','#people/'+id)}};window.prepareAnonymousStaff();
})();
