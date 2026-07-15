/* ============================================================
   PGD Explainer — shared SVG helpers + scene drawing functions
   Edit drawings here. Section CONTENT lives in sections/*.js
   ============================================================ */
function defs(){return '<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>';}
function wrapText(sub,maxChars){
  var words=sub.split(' '), lines=[], cur='';
  for(var i=0;i<words.length;i++){
    var test=cur?cur+' '+words[i]:words[i];
    if(test.length>maxChars && cur){ lines.push(cur); cur=words[i]; }
    else cur=test;
  }
  if(cur)lines.push(cur);
  return lines;
}
function node(id,x,y,w,h,color,title,sub,extra){
  extra=extra||'';
  var F={teal:'var(--teal-bg)',coral:'var(--coral-bg)',purple:'var(--purple-bg)',amber:'var(--amber-bg)',blue:'var(--blue-bg)',gray:'var(--gray-bg)',pink:'var(--pink-bg)',green:'var(--green-bg)'}[color];
  var S={teal:'var(--teal)',coral:'var(--coral)',purple:'var(--purple)',amber:'var(--amber)',blue:'var(--blue)',gray:'var(--gray)',pink:'var(--pink)',green:'var(--green)'}[color];
  var cx=x+w/2;
  var isCyl = w<=185;
  if(isCyl){
    // TALL frosted-glass cylinder, anchored at the given top (y), extended downward to a
    // minimum height. NODE NAME goes inside (larger); STATUS/descriptor goes BELOW it.
    var ch=Math.max(h,84), top=y, bot=y+ch;
    var rx=w/2, ry=Math.max(7,Math.min(12,Math.round(ch*0.15)));
    var topcy=top+ry, botcy=bot-ry, left=x, right=x+w, midy=top+ch/2;
    var shape='<ellipse class="base-ring" cx="'+cx+'" cy="'+botcy+'" rx="'+rx+'" ry="'+ry+'" fill="none" stroke="'+S+'" stroke-width="2.2"/>'
      +'<ellipse class="cyl-bottom" cx="'+cx+'" cy="'+botcy+'" rx="'+rx+'" ry="'+ry+'" fill="'+S+'" fill-opacity="0.14" stroke="'+S+'" stroke-opacity="0.4"/>'
      +'<path class="cyl-body" d="M'+left+','+topcy+' L'+left+','+botcy+' A'+rx+','+ry+' 0 0 0 '+right+','+botcy+' L'+right+','+topcy+' Z" fill="rgba(255,255,255,0.075)" stroke="'+S+'" stroke-opacity="0.55" stroke-width="1.1"/>'
      +'<path class="cyl-sheen" d="M'+(left+5)+','+(topcy+3)+' L'+(left+5)+','+(botcy-3)+'" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<ellipse class="cyl-top" cx="'+cx+'" cy="'+topcy+'" rx="'+rx+'" ry="'+ry+'" fill="rgba(255,255,255,0.20)" stroke="'+S+'" stroke-width="1.2"/>';
    var s='<g id="'+id+'" class="node-rect fade cyl" style="color:'+S+'" '+extra+'>'+shape;
    s+='<text class="cyl-name" x="'+cx+'" y="'+(midy+1)+'" text-anchor="middle" dominant-baseline="central">'+title+'</text>';
    if(sub){
      var lines=wrapText(sub, Math.max(14, Math.floor((w+60)/7.5)));
      var sy=bot+16;
      for(var i=0;i<lines.length;i++){
        s+='<text class="cyl-sub" x="'+cx+'" y="'+(sy+i*14)+'" text-anchor="middle">'+lines[i]+'</text>';
      }
    }
    return s+'</g>';
  }
  // wide info panel — flat box with title + wrapped subtitle inside (unchanged)
  var lines = sub ? wrapText(sub, Math.max(10, Math.floor((w-20)/6.5))) : [];
  var lineH=16, titleH=lines.length?17:0, blockH=titleH + lines.length*lineH;
  var startY = y + (h-blockH)/2 + (lines.length?9:1);
  var s='<g id="'+id+'" class="node-rect fade" style="color:'+S+'" '+extra+'>'
    +'<rect class="panel" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="11" fill="'+F+'" stroke="'+S+'" stroke-width="1.2"/>';
  if(lines.length){
    s+='<text class="lbl-w" x="'+cx+'" y="'+startY+'" text-anchor="middle" dominant-baseline="central">'+title+'</text>';
    var sy2=startY+titleH;
    for(var j=0;j<lines.length;j++){
      s+='<text class="lbl-s" x="'+cx+'" y="'+(sy2+j*lineH)+'" text-anchor="middle" dominant-baseline="central">'+lines[j]+'</text>';
    }
  } else {
    s+='<text class="lbl-w" x="'+cx+'" y="'+(y+h/2+1)+'" text-anchor="middle" dominant-baseline="central">'+title+'</text>';
  }
  return s+'</g>';
}
function tx(id,x,y,t,cls,anchor,fill){return '<text id="'+id+'" class="'+(cls||'lbl-s')+' fade" x="'+x+'" y="'+y+'" text-anchor="'+(anchor||'middle')+'"'+(fill?' fill="'+fill+'"':'')+'>'+t+'</text>';}
function ln(id,x1,y1,x2,y2,color,dpath){
  var S={teal:'var(--teal-l)',coral:'var(--coral-l)',purple:'var(--purple-l)',amber:'var(--amber-l)',blue:'var(--blue-l)',gray:'var(--gray)',pink:'var(--pink-l)',green:'var(--green-l)'}[color]||color;
  if(dpath)return '<path id="'+id+'" d="'+dpath+'" fill="none" class="flow off" stroke="'+S+'" stroke-width="2.4" marker-end="url(#ah)"/>';
  return '<line id="'+id+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="flow off" stroke="'+S+'" stroke-width="2.4" marker-end="url(#ah)"/>';
}

/* reusable 3-node mesh */
function meshSVG(extraNodes,extraLines,h){
  h=h||430;
  return '<svg viewBox="0 0 560 '+h+'" role="img"><title>mesh</title>'+defs()+
    node('n1',60,150,130,62,'teal','Database 1','full copy')+
    node('n2',215,150,130,62,'teal','Database 2','full copy')+
    node('n3',370,150,130,62,'teal','Database 3','full copy')+
    ln('l12',190,181,213,181,'teal')+ln('l23',345,181,368,181,'teal')+
    ln('l13',125,212,'','','teal','M125 212 Q280 280 435 212')+
    (extraNodes||'')+(extraLines||'')+'</svg>';
}

/* ===================== SCENES ===================== */

function s_whatis(){return '<svg viewBox="0 0 560 430" role="img"><title>what is pgd</title>'+defs()+
  node('a',210,18,140,52,'gray','Your app','one place to talk to')+
  node('n1',60,150,130,62,'teal','Database 1','full copy')+
  node('n2',215,150,130,62,'teal','Database 2','full copy')+
  node('n3',370,150,130,62,'teal','Database 3','full copy')+
  ln('a1',280,70,120,148,'gray')+
  node('note',120,320,320,72,'blue','Many copies, one system','lose one, the rest keep going')+'</svg>';}

function s_mesh(){return meshSVG(
  tx('ml',280,300,'every copy talks to every other copy','lbl-s'),
  '',430);}

function s_multimaster(){return '<svg viewBox="0 0 560 420" role="img"><title>multi master</title>'+defs()+
  node('w1',40,40,150,60,'teal','Database 1','accepts writes')+
  node('w2',360,40,150,60,'teal','Database 2','accepts writes')+
  node('w3',200,300,150,60,'teal','Database 3','accepts writes')+
  tx('mm',280,200,'anyone can write — changes flow both ways','lbl-s')+
  ln('m12',192,68,358,68,'teal')+ln('m21',358,90,192,90,'coral')+
  ln('m13',95,100,'','','teal','M95 100 Q120 230 230 298')+
  ln('m23',455,100,'','','coral','M455 100 Q440 230 322 298')+'</svg>';}

function s_eventual(){return '<svg viewBox="0 0 560 380" role="img"><title>eventual</title>'+defs()+
  node('e1',40,60,150,60,'teal','Database 1','wrote at 10:00')+
  node('e2',370,60,150,60,'teal','Database 2','gets it 10:00.2')+
  tx('et',280,52,'a tiny moment apart…','lbl-s')+
  ln('ef',192,90,368,90,'teal')+
  node('en',120,200,320,72,'blue','Eventually identical','all copies catch up within moments')+'</svg>';}

function s_roworigin(){return '<svg viewBox="0 0 560 360" role="img"><title>row origin</title>'+defs()+
  node('o1',40,50,150,60,'teal','Database 1','change born here')+
  node('o2',210,50,150,60,'teal','Database 2','re-shares it')+
  node('o3',380,50,150,60,'teal','Database 3','knows the source')+
  ln('o12',192,80,208,80,'teal')+ln('o23',362,80,378,80,'teal')+
  node('on',110,200,340,72,'purple','Row origin','each change remembers where it started, so it never loops back')+'</svg>';}

function s_repsets(){return '<svg viewBox="0 0 560 380" role="img"><title>replication sets</title>'+defs()+
  node('all',190,16,180,50,'gray','Tables','not all need copying')+
  node('set1',40,150,150,70,'green','Set: "everywhere"','orders, customers')+
  node('set2',360,150,150,70,'amber','Set: "local only"','temp, logs')+
  ln('la',250,66,150,148,'green')+ln('lb',320,66,420,148,'amber')+
  node('n',110,270,340,72,'green','Replication sets','groups of tables; you choose which copies subscribe')+'</svg>';}

function s_rowfilter(){return '<svg viewBox="0 0 560 360" role="img"><title>row filter</title>'+defs()+
  node('src',40,140,150,70,'teal','Database 1','all rows')+
  node('dst',370,140,150,70,'teal','Database 2','only region = EU')+
  node('f',215,140,120,70,'amber','Row filter','gatekeeper')+
  ln('a',192,175,213,175,'teal')+ln('b',337,175,368,175,'green')+
  node('n',110,270,340,66,'amber','Row filter','only rows matching a rule get replicated')+'</svg>';}

function s_ddlfilter(){return '<svg viewBox="0 0 560 360" role="img"><title>ddl filter</title>'+defs()+
  node('src',40,140,150,70,'teal','Database 1','runs a CREATE')+
  node('f',215,140,120,70,'pink','DDL filter','allow / block')+
  node('dst',370,140,150,70,'teal','Database 2','gets approved DDL')+
  ln('a',192,175,213,175,'teal')+ln('b',337,175,368,175,'green')+
  node('n',95,270,370,66,'pink','DDL filter','controls which structure changes replicate where')+'</svg>';}

function s_applydelay(){return '<svg viewBox="0 0 560 360" role="img"><title>apply delay</title>'+defs()+
  node('lead',40,60,150,62,'teal','Database 1','writes now')+
  node('clock',215,60,120,62,'amber','⏱ delay','wait 5s')+
  node('foll',370,60,150,62,'teal','Database 2','applies later')+
  ln('a',192,91,213,91,'teal')+ln('b',337,91,368,91,'amber')+
  node('n',95,190,370,80,'amber','Apply delay','deliberately hold back a copy — handy as a "time machine" to recover from a bad change before it lands')+'</svg>';}

function s_conflict(){return '<svg viewBox="0 0 560 400" role="img"><title>conflict</title>'+defs()+
  node('a',40,40,150,60,'teal','Database 1','sets price = 10')+
  node('b',370,40,150,60,'teal','Database 2','sets price = 12')+
  tx('clash',280,150,'⚡ same row, same time, different value','lbl-w','middle','var(--coral-l)')+
  ln('a2',150,100,250,180,'teal')+ln('b2',410,100,310,180,'coral')+
  node('n',95,230,370,80,'coral','Conflict','when two copies change the same thing at once, PGD must detect it and decide which wins')+'</svg>';}

function s_conflictres(){return '<svg viewBox="0 0 560 450" role="img"><title>conflict resolution</title>'+defs()+
  node('a',40,40,140,56,'teal','price = 10','at 10:00.1')+
  node('b',380,40,140,56,'teal','price = 12','at 10:00.2')+
  node('judge',200,150,160,64,'amber','Resolver','newest wins')+
  ln('a2',110,96,240,148,'teal')+ln('b2',450,96,320,148,'coral')+
  node('win',200,260,160,56,'green','price = 12','kept everywhere')+
  ln('w',280,214,280,258,'green')+
  node('n',95,375,370,62,'amber','Conflict resolution','a chosen rule (default: last-update-wins) picks the winner automatically')+'</svg>';}

function s_crdt(){return '<svg viewBox="0 0 560 400" role="img"><title>crdt</title>'+defs()+
  node('a',40,50,150,60,'teal','+5 likes','on Database 1')+
  node('b',370,50,150,60,'teal','+3 likes','on Database 2')+
  node('sum',205,180,150,64,'green','= +8 likes','both counted')+
  ln('a2',110,110,250,178,'teal')+ln('b2',450,110,310,178,'teal')+
  node('n',80,290,400,80,'green','CRDT (conflict-free data type)','special counters that merge instead of fighting — both changes add up, no winner needed')+'</svg>';}

function s_globallock(){return '<svg viewBox="0 0 560 445" role="img"><title>global lock</title>'+defs()+
  node('a',205,30,150,60,'amber','Database 1','wants to change shape')+
  node('lock',215,150,130,56,'coral','🔒 Global lock','asks everyone')+
  node('n1',40,250,140,54,'teal','Database 2','pauses')+
  node('n2',380,250,140,54,'teal','Database 3','pauses')+
  ln('d',280,90,280,148,'amber')+ln('l1',240,206,130,248,'coral')+ln('l2',320,206,430,248,'coral')+
  node('n',95,365,370,62,'coral','Global lock','structure changes need all copies to agree first, so nobody clashes')+'</svg>';}

function s_advisory(){return '<svg viewBox="0 0 560 360" role="img"><title>advisory lock</title>'+defs()+
  node('a',40,60,150,62,'teal','App on DB1','grabs a ticket')+
  node('tok',215,60,120,62,'purple','🎫 token','cluster-wide')+
  node('b',370,60,150,62,'teal','App on DB2','must wait')+
  ln('g',192,91,213,91,'purple')+ln('w',368,91,337,91,'coral')+
  node('n',80,190,400,80,'purple','Global advisory lock','an app-chosen "do not disturb" ticket that every copy respects — used to coordinate work across the cluster')+'</svg>';}

function s_replag(){return '<svg viewBox="0 0 560 360" role="img"><title>replication lag</title>'+defs()+
  node('fast',40,70,150,64,'teal','Leader','far ahead')+
  node('slow',370,70,150,64,'coral','Follower','behind by N')+
  tx('gap',280,60,'the gap = lag','lbl-s','middle','var(--coral-l)')+
  ln('f',192,102,368,102,'coral')+
  node('n',95,200,370,80,'coral','Replication lag','how far behind a copy is. Small = healthy. Large = risk of losing recent data if that copy is promoted')+'</svg>';}

function s_raft(){return '<svg viewBox="0 0 560 445" role="img"><title>raft</title>'+defs()+
  '<circle id="ring" class="node-rect fade" cx="280" cy="180" r="115" fill="none" stroke="var(--line2)" stroke-width="1" stroke-dasharray="4 6"/>'+
  node('r1',205,30,150,58,'amber','Database 1','★ leader')+
  node('r2',385,235,140,56,'teal','Database 2','follower')+
  node('r3',30,235,140,56,'teal','Database 3','follower')+
  tx('v1',180,165,'vote ✓','lbl-s','middle','var(--amber-l)')+tx('v2',380,165,'vote ✓','lbl-s','middle','var(--amber-l)')+
  ln('rv2',420,235,330,90,'teal')+ln('rv3',140,235,232,90,'teal')+
  node('rn',110,350,340,66,'amber','Raft consensus','a fair majority vote; re-runs automatically if the leader fails')+'</svg>';}

function s_leader(){return '<svg viewBox="0 0 560 415" role="img"><title>write leader</title>'+defs()+
  node('lead',195,30,170,60,'amber','Write Leader','★ the decider')+
  node('f1',40,200,150,56,'teal','Follower','obeys')+
  node('f2',205,200,150,56,'teal','Follower','obeys')+
  node('f3',370,200,150,56,'teal','Follower','obeys')+
  ln('d1',230,90,130,198,'amber')+ln('d2',280,90,280,198,'amber')+ln('d3',330,90,430,198,'amber')+
  node('n',95,315,370,72,'amber','Write Leader','one elected copy coordinates cluster-wide decisions so everyone stays consistent')+'</svg>';}

function s_kv(){return '<svg viewBox="0 0 560 385" role="img"><title>kv store</title>'+defs()+
  node('store',180,40,200,70,'purple','Raft KV store','shared sticky-notes')+
  node('n1',40,180,140,54,'teal','Database 1','reads same note')+
  node('n2',210,180,140,54,'teal','Database 2','reads same note')+
  node('n3',380,180,140,54,'teal','Database 3','reads same note')+
  ln('k1',230,110,110,178,'purple')+ln('k2',280,110,280,178,'purple')+ln('k3',330,110,450,178,'purple')+
  node('n',110,295,340,56,'purple','Key-value store','tiny shared facts kept in sync by Raft for all nodes')+'</svg>';}

function s_witness(){return '<svg viewBox="0 0 560 400" role="img"><title>witness</title>'+defs()+
  node('d1',60,40,140,56,'teal','Data node','plays + votes')+
  node('d2',360,40,140,56,'teal','Data node','plays + votes')+
  node('wit',205,180,150,64,'amber','Witness','votes only')+
  ln('w1',150,96,250,178,'amber')+ln('w2',410,96,310,178,'amber')+
  node('n',80,290,400,80,'amber','Witness node','holds no real data — it just votes, keeping the count odd so there is always a clear majority')+'</svg>';}

/* ---- v4 specifics ---- */
function s_bdr(){return '<svg viewBox="0 0 560 320" role="img"><title>bdr name</title>'+defs()+
  node('old',60,60,180,70,'gray','BDR','Bi-Directional Replication')+
  node('arr',270,75,40,40,'gray','→','')+
  node('new',330,60,170,70,'teal','PGD','same engine, new name')+
  ln('x',240,95,328,95,'gray')+
  node('n',95,180,370,72,'blue','Version 4 = BDR era','the underlying extension was called BDR; later versions rebrand to PGD')+'</svg>';}

function s_harp(){return '<svg viewBox="0 0 560 440" role="img"><title>harp</title>'+defs()+
  node('app',205,14,150,50,'gray','Your app','one address')+
  node('harp',190,118,170,60,'coral','HARP','traffic director')+
  node('dcs',385,118,155,60,'purple','Consensus store','HARP\u2019s notepad')+
  node('l1',40,300,150,58,'amber','Database 1','★ leader')+
  node('l2',205,300,150,58,'teal','Database 2','follower')+
  node('l3',370,300,150,58,'teal','Database 3','follower')+
  ln('a',280,64,280,116,'gray')+ln('d',360,148,383,148,'purple')+
  ln('w',250,178,'','','coral','M250 178 Q150 240 115 298')+
  ln('r12',280,178,280,298,'teal')+ln('r13',330,178,'','','teal','M330 178 Q420 240 445 298')+'</svg>';}

function s_metal(){return '<svg viewBox="0 0 560 320" role="img"><title>metal tiers</title>'+defs()+
  node('b',40,60,150,70,'coral','Bronze','smallest practice')+
  node('s',205,60,150,70,'gray','Silver','typical setup')+
  node('g',370,60,150,70,'amber','(Gold)','larger')+
  node('n',95,190,370,72,'blue','Metal-tier clusters (v4 training)','informal size names — later replaced by real PGD-S / PGD-X editions')+'</svg>';}

function s_shard(){return '<svg viewBox="0 0 560 360" role="img"><title>shard</title>'+defs()+
  node('all',180,16,200,50,'gray','All the data','too big for one box')+
  node('a',30,160,150,70,'blue','Shard A','customers A–H')+
  node('b',205,160,150,70,'blue','Shard B','customers I–P')+
  node('c',380,160,150,70,'blue','Shard C','customers Q–Z')+
  ln('la',230,66,110,158,'gray')+ln('lb',280,66,280,158,'gray')+ln('lc',330,66,450,158,'gray')+
  node('n',110,275,340,66,'blue','Sharding','split huge data into slices so no copy holds it all (manual setup in v4)')+'</svg>';}

function s_camo(){return '<svg viewBox="0 0 560 400" role="img"><title>camo</title>'+defs()+
  node('app',30,40,150,60,'gray','Your app','sends a payment')+
  node('n1',210,40,150,60,'teal','Database 1','partner A')+
  node('n2',210,180,150,60,'teal','Database 2','partner B')+
  tx('chk',285,135,'both agree ✓','lbl-w','middle','var(--teal-l)')+
  ln('send',182,70,208,70,'gray')+ln('pair',285,100,285,178,'teal')+ln('ack',208,92,184,92,'amber')+
  node('n',95,290,370,72,'pink','CAMO — Commit At Most Once','a pair of copies confirm the write is safely saved before saying "done" — no lost or double transactions')+'</svg>';}

/* ---- v5 specifics ---- */
function s_proxy(){return '<svg viewBox="0 0 560 440" role="img"><title>proxy</title>'+defs()+
  node('app',205,14,150,50,'gray','Your app','one address')+
  node('proxy',180,118,200,60,'coral','PGD Proxy','built right in')+
  node('cli',420,118,120,60,'amber','pgd-cli','one tool')+
  node('l1',40,300,150,58,'amber','Database 1','★ leader')+
  node('l2',205,300,150,58,'teal','Database 2','follower')+
  node('l3',370,300,150,58,'teal','Database 3','follower')+
  ln('a',280,64,280,116,'gray')+
  ln('w',250,178,'','','coral','M250 178 Q150 240 115 298')+
  ln('r12',280,178,280,298,'teal')+ln('r13',330,178,'','','teal','M330 178 Q420 240 445 298')+
  ln('cliw',430,178,'','','amber','M430 178 Q360 250 295 298')+'</svg>';}

function s_failover(){return '<svg viewBox="0 0 560 480" role="img"><title>failover</title>'+defs()+
  node('proxy',195,18,170,54,'coral','PGD Proxy','keeps watching')+
  node('old',40,180,150,64,'gray','Database 1','✗ went down')+
  node('new',360,180,150,64,'amber','Database 2','★ new leader')+
  node('f3',200,290,150,58,'teal','Database 3','follower')+
  tx('x',115,162,'✗','lbl-w','middle','var(--coral-l)')+
  ln('toold',230,72,140,178,'gray')+ln('tonew',330,72,430,178,'amber')+ln('rep',360,212,192,212,'amber')+
  node('n',95,420,370,52,'amber','Failover (auto) & switchover (planned)','a new leader is chosen; your app keeps the same address')+'</svg>';}

function s_maint(){return '<svg viewBox="0 0 560 340" role="img"><title>maintenance</title>'+defs()+
  node('n1',40,60,150,64,'amber','Node in upkeep','safely paused')+
  node('n2',205,60,150,64,'teal','Node 2','carries load')+
  node('n3',370,60,150,64,'teal','Node 3','carries load')+
  ln('m1',115,124,260,160,'amber')+
  node('n',95,200,370,80,'amber','Maintenance mode','take one node offline for patching while the cluster keeps serving — then bring it back')+'</svg>';}

function s_lagctl(){return '<svg viewBox="0 0 560 350" role="img"><title>lag control</title>'+defs()+
  node('fast',40,50,150,62,'teal','Fast leader','writing quickly')+
  node('slow',370,50,150,62,'coral','Slow follower','falling behind')+
  tx('g',280,42,'gap growing…','lbl-s','middle','var(--coral-l)')+
  ln('flow',192,81,368,81,'coral')+
  node('brake',180,170,200,58,'amber','Lag control','gently slows leader')+
  ln('b',280,112,280,168,'amber')+
  node('n',95,255,370,56,'amber','Replication lag control','throttles the leader so followers never drift too far behind')+'</svg>';}

function s_raftgroup(){return '<svg viewBox="0 0 560 400" role="img"><title>raft per group</title>'+defs()+
  '<rect x="30" y="40" width="240" height="180" rx="14" fill="var(--teal-bg)" stroke="var(--teal)" stroke-width="1" id="gA" class="node-rect fade"/>'+
  tx('gAt',150,64,'Location A','lbl-w')+
  node('a1',55,90,90,50,'teal','Node','')+node('a2',160,90,90,50,'teal','Node','')+node('a3',105,160,90,50,'amber','★ local','')+
  '<rect x="290" y="40" width="240" height="180" rx="14" fill="var(--purple-bg)" stroke="var(--purple)" stroke-width="1" id="gB" class="node-rect fade"/>'+
  tx('gBt',410,64,'Location B','lbl-w')+
  node('b1',315,90,90,50,'purple','Node','')+node('b2',420,90,90,50,'purple','Node','')+node('b3',365,160,90,50,'amber','★ local','')+
  node('n',95,260,370,72,'amber','Raft per group','each location can have its own local vote, so one region keeps working even if another is unreachable')+'</svg>';}

function s_raftfix(){return '<svg viewBox="0 0 560 360" role="img"><title>raft repair</title>'+defs()+
  node('snap',40,60,150,66,'purple','Snapshot','export / import')+
  node('reset',205,60,150,66,'coral','Reset','rebuild vote')+
  node('kv',370,60,150,66,'green','KV check','inspect state')+
  node('n',80,180,400,90,'purple','Raft repair tools (v5)','when the vote gets stuck, admins can export/import a snapshot or reset consensus to recover the cluster safely')+'</svg>';}

function s_upgrade(){return '<svg viewBox="0 0 560 360" role="img"><title>logical join upgrade</title>'+defs()+
  node('oldc',40,70,170,70,'gray','Old cluster','BDR 3.7 / PG 11')+
  node('newc',350,70,170,70,'teal','New cluster','PGD 5 / newer PG')+
  node('join',225,75,110,60,'amber','Logical join','copies live')+
  ln('a',212,100,223,100,'gray')+ln('b',337,100,348,100,'teal')+
  node('n',80,190,400,80,'amber','Logical-join upgrade','build a fresh cluster and let new nodes join and sync live, then switch over — upgrade with little downtime')+'</svg>';}

/* ---- v6 specifics ---- */
function s_editions(){return '<svg viewBox="0 0 560 400" role="img"><title>editions</title>'+defs()+
  '<rect x="24" y="40" width="250" height="320" rx="14" fill="var(--teal-bg)" stroke="var(--teal)" stroke-width="1" id="sbox" class="node-rect fade"/>'+
  tx('st',149,64,'PGD-S · Essential','lbl-w','middle','var(--teal-l)')+tx('sd',149,82,'simple — one location','lbl-s')+
  node('s1',48,108,90,52,'teal','Node 1','')+node('s2',158,108,90,52,'teal','Node 2','')+node('s3',103,196,90,52,'teal','Node 3','')+
  '<rect x="290" y="40" width="246" height="320" rx="14" fill="var(--purple-bg)" stroke="var(--purple)" stroke-width="1" id="xbox" class="node-rect fade"/>'+
  tx('xt',413,64,'PGD-X · Expanded','lbl-w','middle','var(--purple-l)')+tx('xd',413,82,'big — many locations','lbl-s')+
  node('x1',308,108,86,46,'purple','Data','')+node('x2',420,108,86,46,'purple','Data','')+
  node('x3',308,170,86,46,'purple','Data','')+node('x4',420,170,86,46,'purple','Data','')+
  node('xw1',308,236,86,44,'amber','Witness','')+node('xw2',420,236,86,44,'amber','Witness','')+
  node('xb',330,300,170,40,'blue','Barman backups','')+'</svg>';}

function s_cm(){return '<svg viewBox="0 0 560 440" role="img"><title>connection manager</title>'+defs()+
  node('app',30,16,150,50,'gray','Your app','one address')+
  node('ops',360,16,170,50,'blue','Other tools','via HTTP API')+
  node('cm',175,118,210,62,'coral','Connection Manager','smarter director')+
  node('l1',40,300,150,58,'amber','Database 1','★ leader')+
  node('l2',205,300,150,58,'teal','Database 2','follower')+
  node('l3',370,300,150,58,'teal','Database 3','follower')+
  ln('a',150,66,250,116,'gray')+ln('api',420,66,330,116,'blue')+
  ln('w',240,180,'','','coral','M240 180 Q150 240 115 298')+
  ln('r12',280,180,280,298,'teal')+ln('r13',330,180,'','','teal','M330 180 Q420 240 445 298')+'</svg>';}

function s_commitscope(){return '<svg viewBox="0 0 560 410" role="img"><title>commit scopes</title>'+defs()+
  node('hub',195,20,170,58,'purple','Commit scope','one rule book')+
  node('camo',20,170,160,62,'pink','CAMO','no double-charge')+
  node('sync',200,170,160,62,'teal','Sync commit','wait for copies')+
  node('group',380,170,160,62,'amber','Group commit','wait for a few')+
  ln('c',250,78,110,168,'purple')+ln('s',280,78,280,168,'purple')+ln('g',310,78,450,168,'purple')+
  node('n',95,290,370,72,'purple','Commit scopes','one place to set durability rules; CAMO, sync and group commit become options you pick')+'</svg>';}

function s_sync(){return '<svg viewBox="0 0 560 360" role="img"><title>sync commit</title>'+defs()+
  node('app',40,60,150,62,'gray','App','writes, waits')+
  node('lead',215,60,120,62,'teal','Leader','saved here')+
  node('copy',370,60,150,62,'teal','Copy','confirms ✓')+
  ln('a',192,91,213,91,'gray')+ln('b',337,91,368,91,'teal')+ln('back',368,110,196,110,'green')+
  node('n',80,180,400,80,'teal','Synchronous commit','the write only reports success after chosen copies confirm they have it — stronger safety, slightly slower')+'</svg>';}

function s_groupcommit(){return '<svg viewBox="0 0 560 385" role="img"><title>group commit</title>'+defs()+
  node('lead',205,30,150,58,'teal','Leader','needs a quorum')+
  node('c1',40,170,140,54,'teal','Copy ✓','')+node('c2',210,170,140,54,'teal','Copy ✓','')+node('c3',380,170,140,54,'gray','Copy …','optional')+
  ln('l1',240,88,130,168,'teal')+ln('l2',280,88,280,168,'teal')+ln('l3',320,88,430,168,'gray')+
  node('n',80,285,400,80,'amber','Group commit','wait for "enough" copies (a quorum) rather than all — balances safety and speed')+'</svg>';}

function s_tde(){return '<svg viewBox="0 0 560 360" role="img"><title>tde</title>'+defs()+
  node('plain',40,60,150,62,'teal','Your data','readable')+
  node('key',215,60,120,62,'amber','🔑 key','scrambles')+
  node('disk',370,60,150,62,'purple','On disk','scrambled')+
  ln('a',192,91,213,91,'teal')+ln('b',337,91,368,91,'purple')+
  node('n',80,180,400,80,'purple','TDE — Transparent Data Encryption','data is automatically scrambled on disk; stolen disks are useless without the key. v6 can rotate or migrate keys')+'</svg>';}

function s_reconcile(){return '<svg viewBox="0 0 560 385" role="img"><title>auto reconcile</title>'+defs()+
  node('a',40,60,150,62,'teal','Database 1','has row X')+
  node('b',370,60,150,62,'coral','Database 2','missing X')+
  node('fix',215,160,130,58,'green','Auto-fix','re-sends X')+
  ln('d',280,122,280,158,'green')+ln('to',345,189,455,122,'green')+
  node('n',80,275,400,80,'green','Automatic reconciliation','PGD notices small differences between copies and heals them on its own, keeping everyone identical')+'</svg>';}

function s_optmesh(){return '<svg viewBox="0 0 560 380" role="img"><title>optimized mesh</title>'+defs()+
  node('full',40,50,200,64,'coral','Full mesh','every-to-every = lots of links')+
  node('opt',320,50,200,64,'green','Optimized mesh','fewer, smarter links')+
  tx('arr',280,86,'→','lbl-w')+
  node('n',80,180,400,90,'green','Optimized mesh','as clusters grow, connecting every node to every other gets expensive; v6 trims the connections intelligently while keeping data flowing')+'</svg>';}

function s_laghistory(){return '<svg viewBox="0 0 560 380" role="img"><title>lag history</title>'+defs()+
  node('mon',180,40,200,66,'blue','Lag history','records lag over time')+
  node('n1',40,180,140,54,'teal','Node','past + now')+node('n2',210,180,140,54,'teal','Node','past + now')+node('n3',380,180,140,54,'teal','Node','past + now')+
  ln('m1',230,106,110,178,'blue')+ln('m2',280,106,280,178,'blue')+ln('m3',330,106,450,178,'blue')+
  node('n',95,295,370,62,'blue','Lag history','keeps a timeline of replication health so you can spot trouble before it bites')+'</svg>';}

function s_conflictcfg(){return '<svg viewBox="0 0 560 360" role="img"><title>conflict config</title>'+defs()+
  node('log',40,60,220,66,'pink','Conflict logging','write every clash to a table')+
  node('res',300,60,220,66,'amber','Conflict resolver','choose the winning rule')+
  node('n',80,180,400,90,'pink','Tuning conflicts (v6)','you can log all conflicts for auditing, and switch the resolver strategy — including handling rare multi-unique-key clashes')+'</svg>';}

function s_parallel(){return '<svg viewBox="0 0 560 385" role="img"><title>parallel apply</title>'+defs()+
  node('lead',205,30,150,56,'teal','Incoming changes','a busy stream')+
  node('w1',40,160,140,54,'green','Worker 1','applies in parallel')+node('w2',210,160,140,54,'green','Worker 2','applies in parallel')+node('w3',380,160,140,54,'green','Worker 3','applies in parallel')+
  ln('a',240,86,130,158,'green')+ln('b',280,86,280,158,'green')+ln('c',320,86,430,158,'green')+
  node('n',80,275,400,80,'green','Parallel apply','followers use several workers at once to keep up with a busy leader (can be turned off for debugging)')+'</svg>';}

function s_streaming(){return '<svg viewBox="0 0 560 350" role="img"><title>transaction streaming</title>'+defs()+
  node('big',40,60,180,64,'teal','Big transaction','still in progress')+
  node('stream',250,60,90,64,'amber','stream','as it goes')+
  node('foll',380,60,140,64,'teal','Follower','starts early')+
  ln('a',222,92,248,92,'teal')+ln('b',342,92,378,92,'amber')+
  node('n',80,180,400,80,'amber','Transaction streaming','send a large transaction to copies while it is still being written, instead of waiting for the end — faster, less lag')+'</svg>';}

function s_decoder(){return '<svg viewBox="0 0 560 350" role="img"><title>single decoder</title>'+defs()+
  node('many',40,60,150,64,'coral','Many readers','one per peer')+
  node('arr',215,75,40,40,'gray','→','')+
  node('one',300,60,170,64,'green','One decoder','reads once, shares')+
  ln('x',192,92,298,92,'gray')+
  node('n',80,180,400,80,'green','Single decoder worker','instead of re-reading the change log once per peer, read it once and fan out — saves CPU on busy clusters')+'</svg>';}

function s_nodelifecycle(){return '<svg viewBox="0 0 560 380" role="img"><title>node lifecycle</title>'+defs()+
  node('join',30,60,150,64,'green','Join','add a node, sync live')+
  node('promote',205,60,150,64,'amber','Promote','standby → full node')+
  node('part',380,60,150,64,'coral','Part','remove cleanly')+
  node('n',80,190,400,90,'blue','Node lifecycle','nodes can join and catch up, a standby can be promoted to replace a failed node, and a dead node can be "parted" (removed) so the cluster stays tidy')+'</svg>';}

function s_indexvacuum(){return '<svg viewBox="0 0 560 360" role="img"><title>index vacuum</title>'+defs()+
  node('idx',40,60,220,66,'teal','CREATE INDEX CONCURRENTLY','build without blocking writes')+
  node('vac',300,60,220,66,'amber','VACUUM FULL','reclaim space carefully')+
  node('n',80,180,400,90,'blue','Routine housekeeping on a cluster','v6 shows how to do common Postgres maintenance safely across all copies, so upkeep does not freeze the whole system')+'</svg>';}



/* ============================================================
   NEW gap-topic scenes (v4–6) — added for sequences,
   partitioning, PITR/Barman, eager, resync, skip-changes.
   ============================================================ */
function s_seqkinds(){return '<svg viewBox="0 0 560 420" role="img"><title>sequence kinds</title>'+defs()+
  node('hub',190,16,180,52,'gray','Need unique IDs','across every node')+
  node('dist',20,150,150,66,'teal','distributed','default in v6 (SnowflakeID-style)')+
  node('snow',200,150,150,66,'blue','snowflakeid','time + node bits, 64-bit')+
  node('gal',380,150,150,66,'amber','galloc','blocks of values per node')+
  ln('la',250,68,110,148,'teal')+ln('lb',280,68,280,148,'blue')+ln('lc',310,68,450,148,'amber')+
  node('n',80,300,400,84,'teal','Distributed sequences','every node can mint IDs with no clash — no central counter. v6 defaults to "distributed"; you can also pick snowflakeid, galloc or timeshard per table.')+'</svg>';}

function s_galloc(){return '<svg viewBox="0 0 560 400" role="img"><title>galloc</title>'+defs()+
  node('pool',180,20,200,58,'purple','Value pool','0 … 1,000,000')+
  node('n1',30,170,150,60,'teal','Database 1','owns 1–1000')+
  node('n2',205,170,150,60,'teal','Database 2','owns 1001–2000')+
  node('n3',380,170,150,60,'teal','Database 3','owns 2001–3000')+
  ln('a',230,78,110,168,'purple')+ln('b',280,78,280,168,'purple')+ln('c',330,78,450,168,'purple')+
  node('n',80,290,400,84,'amber','Galloc sequences','each node is handed its own block of numbers to allocate locally. Fast and clash-free, but values are not strictly ordered across nodes. Inspect with bdr.sequences (seqkind = galloc).')+'</svg>';}

function s_autopartition(){return '<svg viewBox="0 0 560 400" role="img"><title>autopartition</title>'+defs()+
  node('tbl',190,16,180,54,'gray','measurement','PARTITION BY RANGE (logdate)')+
  node('d1',30,150,110,58,'green','day −2','kept')+
  node('d2',150,150,110,58,'green','day −1','kept')+
  node('d3',270,150,110,58,'teal','today','active')+
  node('old',400,150,130,58,'coral','> 30 days','auto-dropped')+
  ln('la',250,70,90,148,'green')+ln('lb',280,70,210,148,'green')+ln('lc',300,70,330,148,'teal')+ln('ld',330,70,460,148,'coral')+
  node('n',80,280,400,90,'amber','AutoPartition','bdr.autopartition() creates new time-based partitions on a schedule and retires old ones (data_retention_period). Managed by the task manager — autopartition_* views were renamed to bdr.taskmgr_* in v5/6.')+'</svg>';}

function s_pitr(){return '<svg viewBox="0 0 560 440" role="img"><title>pitr barman</title>'+defs()+
  node('c1',30,40,150,56,'teal','PGD-X node','live cluster')+
  node('c2',200,40,150,56,'teal','PGD-X node','live cluster')+
  node('barman',360,40,170,56,'purple','Barman server','streams backups + WAL')+
  ln('b1',180,68,358,60,'purple')+ln('b2',350,68,430,68,'purple')+
  node('seed',180,170,200,62,'amber','Recovered seed node','restore to a point in time')+
  ln('r',445,96,330,168,'purple')+
  node('n',80,290,400,96,'blue','PITR with Barman (v6 PGD-X)','Barman continuously backs up the cluster and archives WAL. To rebuild, restore a Barman backup to a point in time onto a fresh node, then use it as the seed for a new PGD cluster.')+'</svg>';}

function s_eager(){return '<svg viewBox="0 0 560 420" role="img"><title>eager replication</title>'+defs()+
  node('app',40,40,150,60,'gray','App','one transaction')+
  node('lead',205,40,150,60,'teal','Origin node','proposes commit')+
  node('peers',370,40,150,60,'teal','All peers','must agree first')+
  tx('chk',285,135,'everyone applies before commit ✓','lbl-w','middle','var(--green-l)')+
  ln('a',192,70,203,70,'gray')+ln('b',357,70,368,70,'teal')+ln('back',368,92,196,92,'green')+
  node('n',80,200,400,96,'pink','Eager replication','a Group-Commit commit scope where a write is applied on all nodes and conflicts are detected up-front, before commit returns. Strongest consistency. In v6 it requires Parallel Apply to be off (writers_per_subscription = 1).')+'</svg>';}

function s_resync(){return '<svg viewBox="0 0 560 425" role="img"><title>resynchronize table</title>'+defs()+
  node('bad',40,60,150,64,'coral','node1.tbl','accidentally TRUNCATEd')+
  node('good',370,60,150,64,'teal','node2.tbl','still has the rows')+
  node('fn',195,160,170,60,'green','resynchronize','copy table from peer')+
  ln('pull',370,100,355,158,'green')+ln('push',205,189,150,124,'green')+
  node('n',80,275,400,96,'green','Resynchronize a table','bdr.resynchronize_table_from_node(node_name, relation) re-copies one table from a healthy peer. Use it to repair a single table after a non-replicated TRUNCATE/DELETE, without rebuilding the whole node.')+'</svg>';}

function s_skipchanges(){return '<svg viewBox="0 0 560 410" role="img"><title>skip changes</title>'+defs()+
  node('stuck',40,50,180,64,'coral','Apply stuck','error replays forever')+
  node('lsn',250,50,90,64,'amber','LSN','the bad change')+
  node('skip',360,50,160,64,'green','skip up to','jump past it')+
  ln('a',222,82,248,82,'coral')+ln('b',342,82,358,82,'green')+
  node('n',80,170,400,100,'amber','Skip changes up to an LSN','when a poison change blocks replication, bdr.alter_subscription_skip_changes_upto(sub, lsn) tells the subscription to skip everything up to that LSN so apply can resume. A blunt last-resort tool — it can drop data, so resync afterwards if needed.')+
  node('warn',95,290,370,60,'coral','Then verify','re-check bdr.subscription_error_status and reconcile any divergence')+'</svg>';}

/* ============================================================
   Architecture evolution scenes (v4 → v6, incl. minor versions)
   Components appear/disappear step to step: HARP leaves, PGD
   Proxy enters, then Connection Manager + editions arrive.
   ============================================================ */
function s_arch_v4(){return '<svg viewBox="0 0 560 490" role="img"><title>v4 architecture</title>'+defs()+
  node('app',200,14,160,46,'gray','Your app','multi-host connection string')+
  node('proxy',30,140,220,60,'coral','HARP Proxy','routes traffic to the lead master')+
  node('dcs',320,140,210,58,'purple','Consensus store (DCS)','etcd or BDR native')+
  node('mgr',150,234,260,58,'amber','HARP Manager','reports state · holds the leader lease')+
  node('lead',40,302,150,58,'amber','Lead master','★ takes the writes')+
  node('sh1',205,302,150,58,'teal','Shadow master','writable, discouraged')+
  node('sh2',370,302,150,58,'teal','Shadow master','writable, discouraged')+
  ln('a_ap',280,60,130,140,'gray')+
  ln('a_pl',120,200,115,300,'coral')+
  ln('a_md',300,234,380,200,'purple')+
  ln('a_ml',280,292,180,300,'amber')+
  node('n',95,416,370,52,'blue','v4 = BDR + HARP','an external HARP layer (Proxy + Manager + DCS) decides who is writable')+'</svg>';}

function s_arch_v44(){return '<svg viewBox="0 0 560 360" role="img"><title>v4.4 changes</title>'+defs()+
  node('t',160,16,240,48,'gray','PGD 4.4.x','Extended Life Support line')+
  node('b1',30,96,500,54,'blue','4.4.0','prerequisite to upgrade to PGD 6.1+ · bug fixes only')+
  node('b2',30,162,500,54,'blue','4.4.1','prerequisite to PGD 6.2+ · preserves node_uuid / node_kind on join')+
  node('b3',30,228,500,54,'amber','No new features','stabilization & upgrade-path releases for ELS customers')+'</svg>';}

function s_arch_v5(){return '<svg viewBox="0 0 560 490" role="img"><title>v5 architecture</title>'+defs()+
  node('app',200,14,160,46,'gray','Your app','single proxy endpoint')+
  node('harp',30,120,150,58,'gray','HARP','✗ removed in v5')+
  node('proxy',200,120,180,58,'coral','PGD Proxy','★ built-in router (HA)')+
  node('cli',400,120,130,58,'amber','pgd-cli','manage the cluster')+
  node('raft',190,212,200,46,'purple','Raft consensus','elects the write leader')+
  node('lead',40,300,150,58,'amber','Write leader','★ takes the writes')+
  node('f1',205,300,150,58,'teal','Follower','replays changes')+
  node('f2',370,300,150,58,'teal','Follower','replays changes')+
  ln('a_ap',280,60,280,118,'gray')+
  ln('a_pl',250,178,115,298,'coral')+
  ln('a_rl',250,258,140,298,'purple')+
  node('n',95,415,370,56,'blue','v5 = BDR + PGD Proxy','HARP is gone; routing is built in and driven by PGD’s own Raft')+'</svg>';}

function s_arch_v5x(){return '<svg viewBox="0 0 560 420" role="img"><title>v5 minor versions</title>'+defs()+
  node('t',150,16,260,46,'gray','PGD 5.6 → 5.9','what changed along the way')+
  node('r1',30,90,500,52,'teal','5.6','commit-scope DEGRADE ON / ORIGIN_GROUP · streaming via decoding worker')+
  node('r2',30,150,500,52,'blue','5.7','redesigned pgd CLI (noun-verb) · pgd assess · pgd node upgrade')+
  node('r3',30,210,500,52,'purple','5.8','CLI usability · bdr.galloc_chunk_info() · CVE-2025-2506 fix')+
  node('r4',30,270,500,52,'amber','5.9','in-place upgrade to PGD 6 · Connection Manager back-port · AutoPartition detach')+
  node('n',95,338,370,52,'green','Minor releases matter','each minor adds routing, durability or CLI capability you can rely on')+'</svg>';}

function s_arch_v6(){return '<svg viewBox="0 0 560 480" role="img"><title>v6 architecture</title>'+defs()+
  node('app',30,14,150,46,'gray','Your app','RW / RO ports')+
  node('ops',370,14,170,46,'blue','Other tools','via HTTP API')+
  node('proxyold',20,120,150,56,'gray','PGD Proxy','✗ replaced in v6')+
  node('cm',155,108,250,60,'coral','Connection Manager','★ built into every node')+
  node('ports',140,180,280,40,'blue','6432 RW · 6433 RO · 6434 HTTP','')+
  node('lead',40,290,150,52,'amber','Write leader','★ takes the writes')+
  node('f1',205,290,150,52,'teal','Follower','replays changes')+
  node('f2',370,290,150,52,'teal','Follower','replays changes')+
  node('ess',40,360,230,50,'teal','PGD Essential','≤4 data nodes · ≤2 groups')+
  node('exp',300,360,230,50,'purple','PGD Expanded','unlimited · fully configurable')+
  ln('a_ac',120,60,280,106,'gray')+
  ln('a_oc',420,60,330,106,'blue')+
  ln('a_cl',260,220,140,288,'coral')+
  node('n',95,426,370,46,'green','v6 = BDR + Connection Manager','routing is a worker on every node, with an HTTP API and two editions')+'</svg>';}

function s_arch_v6x(){return '<svg viewBox="0 0 560 440" role="img"><title>v6 minor versions</title>'+defs()+
  node('t',150,16,260,46,'gray','PGD 6.1 → 6.4','the v6 line so far')+
  node('r1',30,90,500,52,'teal','6.1','CLI get/update GUCs · view & part-node commands · Leader DDL Lock')+
  node('r2',30,150,500,52,'blue','6.2','TDE migration on upgrade · LDAP auth for Connection Manager')+
  node('r3',30,210,500,52,'purple','6.3','Connection Manager on subscriber-only nodes · better leader election')+
  node('r4',30,270,500,52,'amber','6.4 (latest)','configurable apply-error policy · large-object replication · parallel apply + Quorum Commit')+
  node('n',95,338,370,52,'green','Staying current','latest = 6.4.0; base /pgd/6/ defaults to 6.0.2')+'</svg>';}

/* ---- regional mesh & partition tolerance (base scene; see story_motion.js for the animated version) ---- */
function s_meshpartition(){return '<svg viewBox="0 0 560 470" role="img"><title>regional mesh &amp; partition</title>'+defs()+
  node('usEast',205,30,150,62,'teal','US East','writer')+
  node('euWest',40,240,150,62,'teal','EU West','replica')+
  node('apSouth',370,240,150,62,'teal','AP South','replica')+
  ln('lUE',235,92,145,240,'teal')+ln('lUA',325,92,415,240,'teal')+ln('lEA',190,271,370,271,'teal')+
  node('n',95,340,370,80,'blue','Regional mesh &amp; partitions','every region can accept writes; if a link drops, the origin buffers changes and flushes them once connectivity returns')+'</svg>';}

/* ---- zero-downtime rolling upgrade (base scene; see story_motion.js for the animated version) ---- */
function s_rollingupgrade(){return '<svg viewBox="0 0 560 400" role="img"><title>rolling upgrade</title>'+defs()+
  node('c1',30,120,150,90,'teal','Node 1','PGD v4')+
  node('c2',205,120,150,90,'teal','Node 2','PGD v4')+
  node('c3',380,120,150,90,'teal','Node 3','PGD v4')+
  ln('l12',180,165,205,165,'teal')+ln('l23',355,165,380,165,'teal')+
  node('n',95,260,370,80,'purple','Zero-downtime rolling upgrade','one node at a time is shielded, upgraded, and rejoined — the cluster never stops serving traffic')+'</svg>';}

/* ---- core mesh protocol internals (base scene; see story_whiteboard.js for the animated version) ---- */
function s_meshinternals(){return '<svg viewBox="0 0 560 400" role="img"><title>core mesh protocol internals</title>'+defs()+
  node('wal',205,220,150,56,'gray','WAL Storage','durable log')+
  node('dec',205,140,150,56,'blue','Logical Decoder','reads WAL')+
  node('bdr',205,60,150,56,'purple','BDR Worker','streams changes')+
  ln('u1',280,220,280,196,'gray')+ln('u2',280,140,280,116,'blue')+
  ln('out',355,88,470,88,'purple')+
  node('n',95,300,370,70,'purple','Inside every node','WAL Storage → Logical Decoder → BDR Worker turns a commit into an outbound replication stream')+'</svg>';}

/* ---- cluster observability via management views (base scene; see story_whiteboard.js for the animated version) ---- */
function s_clusterobservability(){return '<svg viewBox="0 0 560 360" role="img"><title>cluster observability</title>'+defs()+
  node('eng',30,60,140,56,'gray','Support Engineer','runs a query')+
  node('sql',200,40,330,50,'blue','bdr.node_slots_summary','SELECT node_name, replication_lag FROM …')+
  node('tbl',200,120,330,80,'amber','Lag Alert','pnode_2 — 14.25s behind ⚠')+
  ln('a',170,88,200,65,'gray')+ln('b',365,90,365,118,'blue')+
  node('n',95,230,370,70,'blue','Built-in observability','PGD management views surface per-node replication lag before it becomes an outage')+'</svg>';}

/* ---- course map / intro index (base scene; see story_whiteboard.js for the animated version) ---- */
function s_coursemap(){return '<svg viewBox="0 0 560 560" role="img"><title>course map</title>'+defs()+
  node('title',80,10,400,44,'blue','What We’ll Cover','a quick map of the whole course')+
  tx('i1',60,86,'1. Architecture evolution (4 → 6)','lbl-w','start')+
  tx('i2',60,112,'2. Foundations','lbl-w','start')+
  tx('i3',60,138,'3. Conflicts &amp; data safety','lbl-w','start')+
  tx('i4',60,164,'4. Coordination (Raft)','lbl-w','start')+
  tx('i5',60,190,'5. Durability &amp; safe writes','lbl-w','start')+
  tx('i6',60,216,'6. Version 4 · BDR + HARP','lbl-w','start')+
  tx('i7',60,242,'7. Version 5 · PGD + Proxy','lbl-w','start')+
  tx('i8',60,268,'8. Version 6 · Editions &amp; Commit scopes','lbl-w','start')+
  tx('i9',60,294,'9. Sequences &amp; partitioning','lbl-w','start')+
  tx('i10',60,320,'10. Operations &amp; recovery','lbl-w','start')+
  node('n',95,370,370,60,'green','64 topics ahead','let’s dive in, starting with architecture evolution')+'</svg>';}

/* ---- architecture overview v4 -> v6 (base scene; see story_whiteboard.js for the animated version) ---- */
function s_archoverview(){return '<svg viewBox="0 0 560 400" role="img"><title>architecture overview v4 to v6</title>'+defs()+
  node('v4',20,60,160,70,'gray','v4','HARP (external)')+
  node('v5',200,60,160,70,'purple','v5','PGD Proxy (built-in)')+
  node('v6',380,60,160,70,'green','v6','Connection Mgr (every node)')+
  ln('a45',180,95,200,95,'gray')+ln('a56',360,95,380,95,'purple')+
  node('n',95,180,370,90,'blue','Same engine, simpler routing','HARP (external) → built-in PGD Proxy → Connection Manager on every node')+'</svg>';}

/* ---- PGD 4 architecture tiers (base scene; see story_whiteboard.js for the animated version) ---- */
function s_pgd4arch(){return '<svg viewBox="0 0 560 380" role="img"><title>PGD 4 architecture tiers</title>'+defs()+
  node('bronze',20,60,120,60,'amber','Bronze','2 data + 1 witness')+
  node('silver',150,60,120,60,'gray','Silver','3 data + offsite backup')+
  node('gold',280,60,120,60,'amber','Gold','4 data + 1 witness · 3 locs')+
  node('platinum',410,60,130,60,'purple','Platinum','4 data + 2 standbys · 2 locs')+
  node('n',95,160,370,80,'blue','Four Always-On tiers','Bronze → Silver → Gold → Platinum, growing from one location to two, with more redundancy at each step')+'</svg>';}

/* ---- PGD 5 architecture (base scene; see story_whiteboard.js for the animated version) ---- */
function s_pgd5arch(){return '<svg viewBox="0 0 560 340" role="img"><title>PGD 5 architecture</title>'+defs()+
  node('single',60,60,200,70,'blue','Single-Location','3-node group + PGD Proxy')+
  node('multi',300,60,200,70,'purple','Multi-Location','6 nodes · 2 locations + witness-only 3rd')+
  node('n',95,160,370,70,'blue','Two building blocks','the single-location group repeats per site; a witness-only third location protects global Raft')+'</svg>';}

/* ---- PGD 6 architecture (base scene; see story_whiteboard.js for the animated version) ---- */
function s_pgd6arch(){return '<svg viewBox="0 0 560 340" role="img"><title>PGD 6 architecture</title>'+defs()+
  node('single',20,60,170,70,'amber','Single Data Group','foundational pattern')+
  node('two',200,60,170,70,'blue','Two Data Groups','active-active · 2 locations')+
  node('read',380,60,160,70,'purple','Read Scaling','+ subscriber-only nodes')+
  node('n',95,160,370,70,'blue','Deployment patterns replace tiers','pick the pattern that matches how many locations and how much read scale you need')+'</svg>';}

/* ---- Replica Identity (base scene; see story_whiteboard.js for the animated version) ---- */
function s_replicaidentity(){return '<svg viewBox="0 0 560 320" role="img"><title>replica identity</title>'+defs()+
  node('haspk',60,60,220,70,'green','Has a Primary Key','UPDATE/DELETE match the exact row')+
  node('nopk',300,60,220,70,'coral','No Replica Identity','row match is ambiguous — may be rejected')+
  node('n',95,160,370,70,'blue','bdr.default_replica_identity','sets the default RIF for new tables; the default changes in v6')+'</svg>';}

/* ---- Replication Slots & the Group Slot (base scene; see story_whiteboard.js for the animated version) ---- */
function s_replicationslots(){return '<svg viewBox="0 0 560 320" role="img"><title>replication slots and the group slot</title>'+defs()+
  node('slotb',60,60,200,70,'blue','Slot → Node B','tracks what Node B still needs')+
  node('slotc',300,60,200,70,'purple','Slot → Node C','tracks what Node C still needs')+
  node('n',95,160,370,70,'amber','Group Slot pins retention','always trails the slowest peer — if Raft stalls, WAL keeps growing')+'</svg>';}

/* ---- DDL Replication Mechanics & Table Rewrites (base scene; see story_whiteboard.js for the animated version) ---- */
function s_ddlmechanics(){return '<svg viewBox="0 0 560 320" role="img"><title>DDL replication mechanics and table rewrites</title>'+defs()+
  node('repl',20,60,170,70,'green','Replicated','CREATE TABLE, ALTER TABLE ADD COLUMN')+
  node('local',200,60,170,70,'coral','Local-only','LOCK, VACUUM, ANALYZE, CLUSTER')+
  node('rewrite',380,60,160,70,'amber','Table rewrites','cluster-wide lock, except CONCURRENTLY')+
  node('n',95,160,370,70,'blue','Structure changes propagate differently','know which DDL replicates, which stays local, and which takes a cluster-wide lock')+'</svg>';}

/* ---- Node Types (base scene; see story_whiteboard.js for the animated version) ---- */
function s_nodetypes(){return '<svg viewBox="0 0 560 320" role="img"><title>node types: physical standby, logical standby, subscriber-only</title>'+defs()+
  node('phys',20,60,170,70,'gray','Physical Standby','byte-for-byte copy · promotable · deprecated v6')+
  node('logi',200,60,170,70,'purple','Logical Standby','logical changes · promotable to full node')+
  node('sub',380,60,160,70,'amber','Subscriber-only','read-scale-out · never votes or publishes')+
  node('n',95,160,370,70,'blue','Beyond the regular data node','three more node types, each with a different mix of voting, writing, and promotability')+'</svg>';}

/* ---- Clock Skew & Cluster Sizing Limits (base scene; see story_whiteboard.js for the animated version) ---- */
function s_clockskew(){return '<svg viewBox="0 0 560 320" role="img"><title>clock skew and cluster sizing limits</title>'+defs()+
  node('sync',60,60,220,70,'green','Clocks in sync','NTP keeps skew within bdr.maximum_clock_skew')+
  node('drift',300,60,220,70,'coral','Clock drift','breaks timestamp-based conflict resolution')+
  node('size',95,160,370,70,'purple','Typical 3–16 nodes','tested well beyond that, into the hundreds')+'</svg>';}

/* ---- Local Locks & Blocking Replication (base scene; see story_whiteboard.js for the animated version) ---- */
function s_locallocks(){return '<svg viewBox="0 0 560 320" role="img"><title>local locks and blocking replication</title>'+defs()+
  node('local',60,60,220,70,'coral','Local transaction','holds a lock on row X, still open')+
  node('apply',300,60,220,70,'blue','Apply Worker','waiting on the same row lock')+
  node('n',95,160,370,70,'amber','pg_blocking_pids()','run on the stalled backend to find and resolve the blocking session')+'</svg>';}

/* ---- Global Lock Modes (base scene; see story_whiteboard.js for the animated version) ---- */
function s_globallockmodes(){return '<svg viewBox="0 0 560 320" role="img"><title>global lock modes: DDL, DML, and leader lock</title>'+defs()+
  node('ddl',20,60,170,70,'coral','on — Global DDL Lock','blocks every write, every table, cluster-wide')+
  node('dml',200,60,170,70,'amber','dml — Global DML Lock','blocks only the table being altered')+
  node('leader',380,60,160,70,'green','leader — v6 Leader Lock','only the write leader coordinates')+
  node('n',95,160,370,70,'blue','ddl_locking evolves across versions','narrower locking at each step means more of the cluster stays available')+'</svg>';}

/* ---- Column-Level Conflict Resolution (base scene; see story_whiteboard.js for the animated version) ---- */
function s_columnconflict(){return '<svg viewBox="0 0 560 320" role="img"><title>column-level conflict resolution</title>'+defs()+
  node('row',60,60,220,70,'coral','Row-level (default)','one whole row version wins — other changes lost')+
  node('col',300,60,220,70,'green','Column-level','bdr.column_timestamps — each column merges on its own')+
  node('n',95,160,370,70,'blue','Two non-conflicting edits, one row','column-level resolution keeps both when different columns changed')+'</svg>';}

/* ---- Stream Triggers (base scene; see story_whiteboard.js for the animated version) ---- */
function s_streamtriggers(){return '<svg viewBox="0 0 560 320" role="img"><title>stream triggers: conflict and transform</title>'+defs()+
  node('conflict',60,60,220,70,'purple','Conflict Trigger','custom resolution logic, e.g. trusted source wins')+
  node('transform',300,60,220,70,'amber','Transform Trigger','reshapes a row to bridge schemas during upgrades')+
  node('n',95,160,370,70,'blue','Triggers that run during apply','override the default resolver or adapt a row before it lands')+'</svg>';}

/* ---- Upgrade Paths & Breaking Changes (base scene; see story_whiteboard.js for the animated version) ---- */
function s_upgradepaths(){return '<svg viewBox="0 0 560 320" role="img"><title>upgrade paths and breaking changes, v4 to v6</title>'+defs()+
  node('v4tov5',20,60,250,70,'gray','v4 → v5','HARP removed — PGD Proxy becomes the router')+
  node('v5tov6',290,60,250,70,'blue','v5 → v6','PGD Proxy → Connection Manager; durability → commit scopes')+
  node('n',95,160,370,70,'coral','pgd node upgrade · no downgrade','since 5.7, one command upgrades Postgres and PGD together')+'</svg>';}

/* ---- Sequence Kinds Beyond Galloc (base scene; see story_whiteboard.js for the animated version) ---- */
function s_seqkindsbeyond(){return '<svg viewBox="0 0 560 320" role="img"><title>sequence kinds beyond galloc</title>'+defs()+
  node('timeshard',20,60,160,70,'blue','Timeshard','timestamp + node id, roughly sortable')+
  node('snowflake',200,60,170,70,'purple','SnowflakeID','timestamp + node + counter, one integer')+
  node('ksuuid',390,60,150,70,'green','KSUUID','a UUID that sorts by creation time')+
  node('n',95,160,370,70,'gray','Offset & Local sequences','simplest options — a per-node step, or not distributed at all')+'</svg>';}

/* ---- PGD on Kubernetes (base scene; see story_whiteboard.js for the animated version) ---- */
function s_pgdkubernetes(){return '<svg viewBox="0 0 560 320" role="img"><title>PGD on Kubernetes (PGD4K)</title>'+defs()+
  node('map',20,60,200,70,'blue','Pod + PVC = one node','CloudNativePG\'s Global Cluster maps PGD nodes to pods')+
  node('wrong',240,60,150,70,'coral','Wrong','deleting the pod/PVC directly leaves Raft expecting it')+
  node('right',410,60,130,70,'green','Right','pgd node part; pgd node drop — then delete the pod/PVC')+
  node('n',95,160,370,70,'amber','PGD4K — more details coming soon','Kubernetes doesn\'t know about PGD membership; always part/drop before removing the pod')+'</svg>';}
