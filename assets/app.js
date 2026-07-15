/* ============================================================
   PGD Explainer — player, search, view-DDL modal, voiceover.
   Content comes from sections/*.js (window.PGD_GROUPS) and
   view reference from assets/views_ref.js (window.PGD_VIEWS).
   ============================================================ */

/* ---- FEEDBACK FORM LINK — EDIT THIS ONE LINE ---- */
var FEEDBACK_URL = "https://docs.google.com/spreadsheets/d/1jEMqQSSCBTton6lFHsV8hhwgpNuaF_fMGai-FypbGUI/edit?gid=0#gid=0";

/* ---------- data ---------- */
var GROUPS = window.PGD_GROUPS || [];
var VIEWS  = window.PGD_VIEWS || {};
var CLI    = window.PGD_CLI || {};
var MON    = window.PGD_MON || {};
var SET    = window.PGD_SET || {};
var CLIREF = window.PGD_CLIREF || {};
var TOPIC  = window.PGD_TOPIC || {};
var STORY  = window.PGD_STORY || {};
var QUIZ   = window.PGD_QUIZ || {};

/* flatten into steps with version+badge (steps may override badge);
   append a synthetic knowledge-check step after any chapter with a quiz bank,
   and a final course-review step after every chapter if QUIZ.FINAL exists */
var STEPS=[]; var GROUPMETA=[];
GROUPS.forEach(function(g){
  var start=STEPS.length;
  g.steps.forEach(function(s){ s.badge=s.badge||g.badge; s.group=g.label; STEPS.push(s); });
  var qset=QUIZ[g.label];
  if(qset && qset.length) STEPS.push({t:'Knowledge Check — '+g.label, tag:'quiz', isQuiz:true, badge:g.badge, group:g.label, quizSet:qset});
  GROUPMETA.push({label:g.label,badge:g.badge,start:start,count:STEPS.length-start});
});
if(QUIZ.FINAL && QUIZ.FINAL.length){
  var fstart=STEPS.length;
  STEPS.push({t:'Final Knowledge Check', tag:'quiz', isQuiz:true, badge:'Review', group:'Course Review', quizSet:QUIZ.FINAL});
  GROUPMETA.push({label:'Course Review',badge:'Review',start:fstart,count:1});
}

/* ---------- player state ---------- */
var idx=0, ph=0, playing=false, voiceOn=true, timer=null;
var activePanel=null, continuousPlay=false;

/* ---------- collapsible panel constants ---------- */
var ACTION_BTNS=[
  {id:'transcript',label:'📝 Transcript',     panel:'transcriptPanel',always:true },
  {id:'cli',       label:'⌨️ PGD CLI Commands',panel:'cliPanel',       always:false},
  {id:'views',     label:'🔍 Views',           panel:'bdrPanel',       always:false},
  {id:'monitor',   label:'📈 Monitor it',      panel:'monPanel',       always:false},
  {id:'settings',  label:'⚙️ Settings (GUCs)', panel:'setPanel',       always:false}
];

function togglePanel(panelId){
  document.querySelectorAll('.cpanel').forEach(function(p){ p.style.display='none'; });
  document.querySelectorAll('.action-btn').forEach(function(b){ b.classList.remove('active'); });
  if(activePanel===panelId){ activePanel=null; return; }
  activePanel=panelId;
  var p=document.getElementById(panelId); if(p) p.style.display='block';
  var b=document.querySelector('.action-btn[data-panel="'+panelId+'"]');
  if(b) b.classList.add('active');
}

/* ---------- fullscreen ---------- */
function toggleFullscreen(){
  var c=document.getElementById('canvas');
  if(!document.fullscreenElement){
    if(c.requestFullscreen) c.requestFullscreen();
    else if(c.webkitRequestFullscreen) c.webkitRequestFullscreen();
  } else {
    if(document.exitFullscreen) document.exitFullscreen();
    else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
}
['fullscreenchange','webkitfullscreenchange'].forEach(function(ev){
  document.addEventListener(ev,function(){
    var b=document.getElementById('fsBtn');
    if(b) b.textContent=document.fullscreenElement?'✕':'⤢';
  });
});

/* ---------- auto-play toggle ---------- */
function toggleContinuous(){
  continuousPlay=!continuousPlay;
  var b=document.getElementById('autoBtn');
  if(b){ b.classList.toggle('active',continuousPlay); b.textContent=continuousPlay?'■ Stop':'▶▶ Auto'; }
  if(continuousPlay){ if(!playing) startPlay(); }
  else stopPlay();
}

/* ---------- TOC (with search support) ---------- */
function buildTOC(){
  var toc=document.getElementById('toc'); toc.innerHTML='';
  GROUPMETA.forEach(function(g){
    var lab=document.createElement('div'); lab.className='vlabel'; lab.textContent=g.label;
    lab.setAttribute('data-grp',g.label); toc.appendChild(lab);
    for(var i=0;i<g.count;i++){
      (function(stepIndex){
        var s=STEPS[stepIndex];
        var b=document.createElement('button');
        b.innerHTML='<span class="n">'+(stepIndex+1)+'</span><span>'+s.t+'</span>';
        b.onclick=function(){ stopPlayKeepVoice(); idx=stepIndex; ph=0; render(); };
        b.id='toc_'+stepIndex;
        b.setAttribute('data-grp',g.label);
        toc.appendChild(b);
      })(g.start+i);
    }
  });
}

/* ---------- search / filter ---------- */
function stepHaystack(s){
  var views=(s.bv||[]).map(function(v){return v[0]+' '+v[1];}).join(' ');
  return (s.t+' '+s.group+' '+(s.chap||'')+' '+(s.an||'')+' '+(s.re||'')+' '+(s.nr||'')+' '+views+' '+s.badge).toLowerCase();
}
function runSearch(){
  var q=(document.getElementById('search').value||'').trim().toLowerCase();
  var shown=0, firstMatch=-1;
  var groupHas={};
  STEPS.forEach(function(s,i){
    var match = !q || stepHaystack(s).indexOf(q)>-1;
    var btn=document.getElementById('toc_'+i);
    if(btn) btn.style.display = match?'flex':'none';
    if(match){ shown++; groupHas[s.group]=true; if(firstMatch<0) firstMatch=i; }
  });
  document.querySelectorAll('.toc .vlabel').forEach(function(l){
    l.style.display = (!q || groupHas[l.getAttribute('data-grp')]) ? '' : 'none';
  });
  var none=document.getElementById('searchNone');
  if(none) none.style.display = (shown===0)?'block':'none';
  var info=document.getElementById('searchInfo');
  if(info) info.textContent = q ? (shown+' match'+(shown===1?'':'es')) : '';
}
function clearSearch(){
  var inp=document.getElementById('search'); inp.value=''; runSearch(); inp.focus();
}
function searchJumpFirst(){
  var q=(document.getElementById('search').value||'').trim().toLowerCase();
  if(!q) return;
  for(var i=0;i<STEPS.length;i++){
    if(stepHaystack(STEPS[i]).indexOf(q)>-1){ stopPlayKeepVoice(); idx=i; ph=0; render(); break; }
  }
}

function buildLegend(){
  document.getElementById('legend').innerHTML=
    '<span><i style="background:var(--teal)"></i>database copy</span>'+
    '<span><i style="background:var(--coral)"></i>routing / clash</span>'+
    '<span><i style="background:var(--amber)"></i>leader / new feature</span>'+
    '<span><i style="background:var(--purple)"></i>consensus / rules</span>'+
    '<span><i style="background:var(--green)"></i>healing / efficiency</span>';
}

/* ---------- render a step ---------- */
function render(){
  var s=STEPS[idx];
  document.getElementById('verBadge').textContent=s.badge;
  document.getElementById('sceneTitle').textContent=s.t;
  document.getElementById('chap').textContent=s.group;
  var isNew=s.tag==='new';
  var isQuizStep=!!s.isQuiz;
  var isGuideStep=!!s.guide;
  var isRefStep=!!s.ref;
  document.getElementById('sceneTag').textContent=isQuizStep?'Knowledge check':(isGuideStep?'Interactive guide':(isRefStep?'Reference':(isNew?('New in '+s.badge):'Core concept')));
  document.getElementById('sceneTag').className='scene-tag '+(isQuizStep?'tag-quiz':(isGuideStep?'tag-guide':(isRefStep?'tag-ref':(isNew?'tag-new':'tag-core'))));
  document.getElementById('analogy').innerHTML=s.an||'';
  document.getElementById('real').innerHTML=s.re||'';
  document.getElementById('narr').textContent=s.nr||'';

  var hb=document.getElementById('handsOn');
  if(hb){
    if(s.hb){ hb.style.display=''; hb.innerHTML='<span class="k">Hands-on</span> '+s.hb; }
    else hb.style.display='none';
  }

  var topic = TOPIC[s.t] || {};

  /* -- populate panel content (IDs preserved; no style.display here) -- */
  var bdrViews=document.getElementById('bdrViews');
  var seen={}, views=(s.bv||[]).filter(function(v){ if(seen[v[0]])return false; seen[v[0]]=1; return true; });
  if(bdrViews && views.length){
    bdrViews.innerHTML=views.map(function(v){
      var known = VIEWS[v[0]] && !VIEWS[v[0]].notFound;
      var docCls = known ? 'is-doc' : 'is-undoc';
      return '<button type="button" class="bdr-chip '+docCls+'" title="Click for documented columns &amp; definition" onclick="openView(\''+v[0].replace(/'/g,"\\'")+'\')">'
        +'<span class="bdr-dot"></span><span>'+v[0]+'</span>'
        +'<span class="bdr-desc">— '+v[1]+'</span></button>';
    }).join('');
  }

  var monRows=document.getElementById('monRows');
  var mon = topic.mon ? MON[topic.mon] : null;
  if(monRows && mon && mon.length){
    monRows.innerHTML=mon.map(function(m){
      return '<pre class="mon-q">'+esc(m.q)+'</pre><div class="mon-note">'+esc(m.note)+'</div>';
    }).join('');
  }

  var cliRows=document.getElementById('cliRows');
  var curated = s.cli || CLI[s.t] || [];
  var rows = curated.map(function(c){ return cliRefRow(c.v,c); });
  if(topic.cli && CLIREF[topic.cli]){
    var g=CLIREF[topic.cli], ref=[];
    (g.v6||[]).forEach(function(c){ ref.push(cliRefRow('v6',c)); });
    (g.v5||[]).forEach(function(c){ ref.push(cliRefRow('v5',c)); });
    (g.v4||[]).forEach(function(c){ ref.push(cliRefRow('v4',c)); });
    if(ref.length){ rows.push('<div class="cli-sub">Full subcommand reference (v6 · v5/v4 deltas)</div>'); rows=rows.concat(ref); }
  }
  if(cliRows && rows.length) cliRows.innerHTML=rows.join('');

  var setRows=document.getElementById('setRows');
  var sets=[]; (topic.set||[]).forEach(function(a){ (SET[a]||[]).forEach(function(x){ sets.push(x); }); });
  if(setRows && sets.length){
    setRows.innerHTML=sets.map(function(x){
      return '<div class="set-row"><code class="set-name">'+esc(x.name)+'</code>'
        +(x.def?'<span class="set-def">'+esc(x.def)+'</span>':'')
        +'<span class="set-desc">'+esc(x.desc)+'</span></div>';
    }).join('');
  }

  /* -- action bar -- */
  var hasCli=rows.length>0, hasViews=views.length>0;
  var hasMon=!!(mon&&mon.length), hasSet=sets.length>0;
  var actionBar=document.getElementById('actionBar');
  if(actionBar){
    var btnHtml='';
    if(!isQuizStep){
      ACTION_BTNS.forEach(function(def){
        var show=def.always
          ||(def.id==='cli'&&hasCli)||(def.id==='views'&&hasViews)
          ||(def.id==='monitor'&&hasMon)||(def.id==='settings'&&hasSet);
        if(!show) return;
        var isAct=activePanel===def.panel;
        btnHtml+='<button class="action-btn'+(isAct?' active':'')+'" data-panel="'+def.panel
                 +'" onclick="togglePanel(\''+def.panel+'\')">'+def.label+'</button>';
      });
    }
    actionBar.innerHTML=btnHtml;
  }
  /* hide all panels; restore active if button still present */
  document.querySelectorAll('.cpanel').forEach(function(p){ p.style.display='none'; });
  if(activePanel){
    var stillThere=document.querySelector('.action-btn[data-panel="'+activePanel+'"]');
    if(stillThere){ var ap=document.getElementById(activePanel); if(ap) ap.style.display='block'; }
    else activePanel=null;
  }

  var legendEl=document.getElementById('legend');
  if(legendEl) legendEl.style.display=(isQuizStep||isGuideStep||isRefStep)?'none':'';

  /* -- draw scene -- */
  var canvas=document.getElementById('canvas');
  if(isQuizStep){
    canvas.innerHTML=quizStepHTML(s);
    renderQuizQuestion();
  } else if(isGuideStep){
    canvas.innerHTML=guideStepHTML(s);
  } else if(isRefStep){
    canvas.innerHTML=refStepHTML(s);
  } else {
    canvas.innerHTML=curDraw(s)();
    var svg=canvas.querySelector('svg'); padViewBox(svg); if(svg) svg.classList.add('scene-in');
    markRemoved(svg);
    retimeSvgAnimations(svg, curPhases(s)[0].nr);
  }
  applyUpTo(ph, true);

  var prev=document.querySelector('.toc button.on'); if(prev)prev.classList.remove('on');
  var cur=document.getElementById('toc_'+idx); if(cur){cur.classList.add('on'); cur.scrollIntoView({block:'nearest'});}

  window.history.replaceState(null,'','#step-'+(idx+1));
}

/* ---------- phase (story-beat) engine ---------- */
function curDraw(s){ var st=STORY[s.t]; return (st&&st.sc)?st.sc:s.sc; }
function curPhases(s){ var st=STORY[s.t]; if(st&&st.phases&&st.phases.length) return st.phases; return [{nr:s.nr||'', show:(s.rv||[]), flow:(s.fl||[])}]; }
function curBeatNr(){ var s=STEPS[idx], PH=curPhases(s); return PH[Math.min(ph,PH.length-1)].nr; }
function reduceMotion(){ return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
function applyBeat(beat, animate){
  if(!beat) return;
  var reduce=reduceMotion(), svg=document.querySelector('#canvas svg');
  (beat.show||[]).forEach(function(id,i){ var el=document.getElementById(id); if(el){ el.style.transitionDelay=(animate&&!reduce?i*0.08:0)+'s'; el.classList.remove('fade'); } });
  (beat.flow||[]).forEach(function(id,i){ var el=document.getElementById(id); if(el){ el.style.transitionDelay=(animate&&!reduce?0.12+i*0.05:0)+'s'; el.classList.remove('off'); } });
  (beat.add||[]).forEach(function(p){ var el=document.getElementById(p[0]); if(el) el.classList.add(p[1]); });
  (beat.rm||[]).forEach(function(p){ var el=document.getElementById(p[0]); if(el) el.classList.remove(p[1]); });
  if(animate && !reduce && (beat.flow||[]).length){ setTimeout(function(){ sendPackets(svg, beat.flow); }, 320); }
}
function applyUpTo(p, speakLast){
  var s=STEPS[idx], PH=curPhases(s);
  if(p>PH.length-1) p=PH.length-1; if(p<0) p=0; ph=p;
  for(var k=0;k<=p;k++){ applyBeat(PH[k], k===p); }
  document.getElementById('narr').textContent = PH[p].nr;
  updateCounter();
  updateBeatDots();
  document.getElementById('prevBtn').disabled=(idx===0 && p===0);
  document.getElementById('nextBtn').disabled=(idx===STEPS.length-1 && p===PH.length-1);
  if(speakLast){ if(voiceOn) speak(PH[p].nr); else if(playing) schedulePlayTimer(); }
}
function updateCounter(){
  var PH=curPhases(STEPS[idx]); var c=document.getElementById('stepcount');
  c.textContent = PH.length>1 ? ((idx+1)+'/'+STEPS.length+' · beat '+(ph+1)+'/'+PH.length) : ((idx+1)+' / '+STEPS.length);
}
function updateBeatDots(){
  var PH=curPhases(STEPS[idx]);
  var dotsEl=document.getElementById('beatDots');
  if(!dotsEl) return;
  if(PH.length<=1){ dotsEl.innerHTML=''; return; }
  dotsEl.innerHTML=PH.map(function(_,i){
    return '<span class="beat-dot'+(i===ph?' beat-dot-on':'')+'" title="Beat '+(i+1)+'"></span>';
  }).join('');
}

/* ---------- animation: data packets travelling along the flow arrows ---------- */
var SVGNS='http://www.w3.org/2000/svg';
function sendPackets(svg, fls){
  if(!svg) return;
  fls.forEach(function(id){
    var el=document.getElementById(id); if(!el) return;
    var stroke=el.getAttribute('stroke')||'var(--teal-l)';
    var d;
    if(el.tagName.toLowerCase()==='path'){ d=el.getAttribute('d'); }
    else {
      var x1=el.getAttribute('x1'),y1=el.getAttribute('y1'),x2=el.getAttribute('x2'),y2=el.getAttribute('y2');
      if(x1==null||x2==null) return;
      d='M'+x1+' '+y1+' L'+x2+' '+y2;
    }
    if(!d) return;
    [0,0.9].forEach(function(off){
      var g=document.createElementNS(SVGNS,'g');
      g.setAttribute('class','packet'); g.style.color=stroke;
      var p=document.createElementNS(SVGNS,'path');
      p.setAttribute('d','M-13 0 L-1 0 M-2 -6 L10 0 L-2 6 Z');
      p.setAttribute('fill',stroke); p.setAttribute('stroke',stroke);
      p.setAttribute('stroke-width','2.2'); p.setAttribute('stroke-linecap','round'); p.setAttribute('stroke-linejoin','round');
      g.appendChild(p);
      var m=document.createElementNS(SVGNS,'animateMotion');
      m.setAttribute('dur','1.8s'); m.setAttribute('repeatCount','indefinite'); m.setAttribute('rotate','auto');
      m.setAttribute('path',d); m.setAttribute('begin',off+'s');
      var ao=document.createElementNS(SVGNS,'animate');
      ao.setAttribute('attributeName','opacity'); ao.setAttribute('values','0;1;1;0'); ao.setAttribute('keyTimes','0;0.15;0.85;1');
      ao.setAttribute('dur','1.8s'); ao.setAttribute('repeatCount','indefinite'); ao.setAttribute('begin',off+'s');
      g.appendChild(m); g.appendChild(ao);
      svg.appendChild(g);
      try{ g.querySelectorAll('animate,animateMotion').forEach(function(a){ if(a.beginElement) a.beginElement(); }); }catch(e){}
    });
  });
}
function markRemoved(svg){
  if(!svg) return;
  svg.querySelectorAll('text').forEach(function(t){
    if(t.textContent.indexOf('✗')>-1){ var g=t.closest('g'); if(g) g.classList.add('removed-node'); }
  });
}

/* ---------- small html escaper ---------- */
function esc(t){ return (t==null?'':String(t)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function cliRefRow(v,c){ return '<div class="cli-row"><span class="cli-v">'+esc(v)+'</span><code class="cli-cmd">'+esc(c.cmd)+'</code>'+(c.note?'<span class="cli-note">'+esc(c.note)+'</span>':'')+'</div>'; }

/* ---------- quiz steps: chapter-end and final knowledge checks ---------- */
var QZ_STATE=null;
function quizStepHTML(s){
  QZ_STATE={qi:0, score:0, total:s.quizSet.length};
  return '<div class="quiz-stage" id="quizStage"></div>';
}
function renderQuizQuestion(){
  var s=STEPS[idx], set=s.quizSet, st=QZ_STATE; if(!st) return;
  var q=set[st.qi];
  var stage=document.getElementById('quizStage'); if(!stage) return;
  var html='<div class="quiz-progress">Question '+(st.qi+1)+' of '+st.total+' · Score '+st.score+'/'+st.total+'</div>';
  if(q.scenario) html+='<div class="quiz-scenario">'+esc(q.scenario)+'</div>';
  html+='<div class="quiz-q">'+esc(q.q)+'</div>';
  html+=q.choices.map(function(c,i){ return '<button type="button" class="quiz-opt" data-i="'+i+'" onclick="answerQuiz('+i+')">'+esc(c)+'</button>'; }).join('');
  html+='<div class="quiz-explain" id="quizExplain" style="display:none"></div>';
  html+='<div class="quiz-nav" id="quizNav"></div>';
  stage.innerHTML=html;
}
function answerQuiz(i){
  var st=QZ_STATE; if(!st) return;
  var s=STEPS[idx], q=s.quizSet[st.qi];
  var opts=document.querySelectorAll('#quizStage .quiz-opt');
  if(!opts.length || opts[0].disabled) return;
  var correct=(i===q.answerIndex);
  if(correct) st.score++;
  opts.forEach(function(b,idx2){
    b.disabled=true;
    if(idx2===q.answerIndex) b.classList.add('correct');
    else if(idx2===i) b.classList.add('wrong');
  });
  var ex=document.getElementById('quizExplain');
  if(ex){ ex.style.display='block'; ex.textContent=(correct?'Correct — ':'Not quite — ')+(q.explain||''); }
  var prog=document.querySelector('#quizStage .quiz-progress');
  if(prog) prog.textContent='Question '+(st.qi+1)+' of '+st.total+' · Score '+st.score+'/'+st.total;
  var nav=document.getElementById('quizNav');
  if(nav){
    nav.innerHTML = (st.qi<st.total-1)
      ? '<button type="button" class="btn primary" onclick="quizNextQuestion()">Next question ›</button>'
      : '<div class="quiz-done">Quiz complete — score '+st.score+'/'+st.total+'</div>';
  }
}
function quizNextQuestion(){ if(!QZ_STATE) return; QZ_STATE.qi++; renderQuizQuestion(); }

/* ---------- guide steps: click a symptom to reveal diagnose + fix ---------- */
function guideStepHTML(s){
  var labels=s.guideLabels||['Diagnose','Fix'];
  return '<div class="guide-list">'+s.guide.map(function(item,i){
    return '<div class="guide-item" id="guideItem'+i+'">'
      +'<button type="button" class="guide-q" onclick="toggleGuideItem('+i+')">'
        +'<span class="guide-q-text">'+esc(item.symptom)+'</span><span class="guide-chev">›</span>'
      +'</button>'
      +'<div class="guide-a" id="guideA'+i+'" style="display:none">'
        +'<div class="guide-a-row"><span class="guide-k">'+esc(labels[0])+'</span>'+esc(item.diagnose)+'</div>'
        +'<div class="guide-a-row"><span class="guide-k">'+esc(labels[1])+'</span>'+esc(item.fix)+'</div>'
      +'</div>'
    +'</div>';
  }).join('')+'</div>';
}
function refStepHTML(s){
  return '<div class="ref-card">'+s.ref.map(function(row){
    return '<div class="ref-row"><div class="ref-label">'+esc(row.label)+'</div><div class="ref-detail">'+esc(row.detail)+'</div></div>';
  }).join('')+'</div>';
}
function toggleGuideItem(i){
  var a=document.getElementById('guideA'+i); if(!a) return;
  var open=a.style.display==='block';
  a.style.display=open?'none':'block';
  var item=document.getElementById('guideItem'+i);
  if(item) item.classList.toggle('open', !open);
}

/* ---------- catalog-view detail modal ---------- */
function openView(name){
  var v=VIEWS[name];
  document.getElementById('viewModalTitle').textContent=name;
  var body=document.getElementById('viewModalBody');
  var html='';
  if(v && !v.notFound){
    if(v.desc){ html+='<div class="vm-sec"><div class="vm-h">What it is</div><p class="vm-p">'+esc(v.desc)+'</p></div>'; }
    if(v.uses){ html+='<div class="vm-sec"><div class="vm-h">Uses functions</div><p class="vm-cols">'+esc(v.uses)+'</p></div>'; }
    if(v.cols && v.cols.length){
      html+='<div class="vm-sec"><div class="vm-h">Columns <span class="vm-tag">v6 catalog reference</span></div>'
        +'<table class="vm-table"><thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead><tbody>'
        +v.cols.map(function(c){ return '<tr><td><code>'+esc(c[0])+'</code></td><td>'+esc(c[1])+'</td><td>'+esc(c[2])+'</td></tr>'; }).join('')
        +'</tbody></table></div>';
    } else if(v.desc){
      html+='<div class="vm-sec"><div class="vm-note">The catalog reference publishes a description but no column table for this view.</div></div>';
    }
    html+='<div class="vm-sec"><div class="vm-h">View definition (DDL)</div><div class="vm-note vm-warn">EDB publishes this view as the column-level definition above, not as a literal <code>CREATE VIEW … AS SELECT</code>. For the exact SQL on your cluster run <code>\\sv '+esc(name)+'</code> or <code>SELECT pg_get_viewdef(\''+esc(name)+'\'::regclass, true);</code></div></div>';
    if(v.src){ html+='<div class="vm-src">Source: '+esc(v.src)+'</div>'; }
  } else {
    html+='<div class="vm-sec"><div class="vm-note">No entry for this name in the harvested v6 catalog reference. Verify against the EDB PGD reference for your version.</div></div>';
  }
  body.innerHTML=html;
  document.getElementById('viewModal').classList.add('open');
}
function closeView(){ document.getElementById('viewModal').classList.remove('open'); }

/* ---------- voice selection (Mac-optimized) ---------- */
var VOICES=[], chosenVoice=null;
var VOICE_PREFS=['Ava (Premium)','Ava (Enhanced)','Ava','Samantha (Enhanced)','Zoe (Premium)','Zoe (Enhanced)','Allison (Enhanced)','Allison','Samantha','Siri','Google US English'];
function pickBestVoice(){
  if(!VOICES.length) return null;
  var en=VOICES.filter(function(v){return /^en(-|_|$)/i.test(v.lang);});
  var pool=en.length?en:VOICES;
  for(var i=0;i<VOICE_PREFS.length;i++){
    var want=VOICE_PREFS[i].toLowerCase();
    for(var j=0;j<pool.length;j++){
      if(pool[j].name.toLowerCase().indexOf(want)===0 || pool[j].name.toLowerCase()===want) return pool[j];
    }
  }
  var us=pool.find(function(v){return /en[-_]us/i.test(v.lang);});
  return us||pool[0];
}
function buildVoiceDropdown(){
  var sel=document.getElementById('voiceSelect'); if(!sel)return;
  if(!VOICES.length){ sel.innerHTML='<option>Default voice</option>'; sel.disabled=true; return; }
  sel.disabled=false; sel.innerHTML='';
  var en=VOICES.filter(function(v){return /^en(-|_|$)/i.test(v.lang);});
  var list=en.length?en:VOICES;
  list.forEach(function(v){
    var o=document.createElement('option');
    o.value=v.name; o.textContent=v.name.replace(/\(.*\)/,'').trim()+(/enhanced|premium/i.test(v.name)?' ★':'');
    if(chosenVoice && v.name===chosenVoice.name) o.selected=true;
    sel.appendChild(o);
  });
}
function loadVoices(){
  VOICES = (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : [];
  if(VOICES.length){ if(!chosenVoice) chosenVoice=pickBestVoice(); buildVoiceDropdown(); }
}
function onVoicePick(){
  var sel=document.getElementById('voiceSelect');
  var v=VOICES.find(function(x){return x.name===sel.value;});
  if(v){ chosenVoice=v; if(voiceOn) speak(curBeatNr()); }
}
if('speechSynthesis' in window){ loadVoices(); window.speechSynthesis.onvoiceschanged=loadVoices; }

/* Speaks text clause by clause with an energetic, "host"-style contour rather
   than one flat utterance: a brighter overall pitch baseline, bigger swings
   per punctuation mark (commas lift, colons lift more, periods drop and hold
   a real pause, exclamations pop with energy), a strong bright opening, a
   fresh little lift at the start of every new sentence, and small random
   jitter on pitch/pause so repeated commas in one paragraph don't all sound
   identical. Long comma-less clauses get an extra break inserted at a nearby
   conjunction so no single utterance runs on too long. speechGen guards
   against a stale clause queue firing after a newer speak() call interrupts it. */
var speechGen=0;
var PUNCT_PROSODY={
  ',':{pitch:0.03, rate:1.03, pause:180},
  ';':{pitch:-0.02,rate:1.00, pause:240},
  ':':{pitch:0.08, rate:1.04, pause:270},
  '—':{pitch:0.02, rate:1.02, pause:210},
  '.':{pitch:-0.05,rate:0.95, pause:520},
  '!':{pitch:0.06, rate:1.05, pause:480},
  '?':{pitch:0.09, rate:0.98, pause:480}
};
function splitClauses(text){
  if(!text) return [];
  var raw=String(text).match(/[^,;:.!?—]+[,;:.!?—]*\s*/g);
  if(!raw||!raw.length) return [{text:String(text),punct:'.'}];
  var out=[], sentenceStart=true;
  raw.forEach(function(chunk){
    var trimmed=chunk.trim();
    if(!trimmed) return;
    var m=trimmed.match(/[,;:.!?—]$/);
    var punct=m?m[0]:'.';
    out.push({text:trimmed, punct:punct, sentenceStart:sentenceStart});
    sentenceStart=(punct==='.'||punct==='!'||punct==='?');
  });
  return out;
}
/* Long, comma-less clauses (>70 chars) get one extra break inserted at the
   conjunction closest to the middle, so a single utterance never runs on
   without a breath — a big source of "boring, monotone" TTS. */
function breakLongClauses(clauses){
  var joiner=/^(and|but|so|because|which|while|then|or)$/i, out=[];
  clauses.forEach(function(c){
    if(c.text.length<=70){ out.push(c); return; }
    var words=c.text.split(' '), mid=Math.floor(words.length/2), bestIdx=-1, bestDist=999;
    for(var k=1;k<words.length-1;k++){
      if(joiner.test(words[k])){
        var d=Math.abs(k-mid);
        if(d<bestDist){ bestDist=d; bestIdx=k; }
      }
    }
    if(bestIdx===-1){ out.push(c); return; }
    out.push({text:words.slice(0,bestIdx).join(' '), punct:',', sentenceStart:c.sentenceStart});
    out.push({text:words.slice(bestIdx).join(' '), punct:c.punct, sentenceStart:false});
  });
  return out;
}
function speak(text){
  if(!voiceOn||!('speechSynthesis' in window))return;
  try{
    window.speechSynthesis.cancel();
    if(!VOICES.length) loadVoices();
    var sp=document.getElementById('speedSelect');
    var baseRate=sp?parseFloat(sp.value)||0.97:0.97;
    var gen=++speechGen;
    speakQueue(breakLongClauses(splitClauses(text)), 0, baseRate, gen);
  }catch(e){}
}
function speakQueue(clauses, i, baseRate, gen){
  if(gen!==speechGen) return;
  if(i>=clauses.length){
    if(playing) timer=setTimeout(function(){ if(playing && gen===speechGen) playAdvance(); },350);
    return;
  }
  var c=clauses[i], isVeryFirst=(i===0), isVeryLast=(i===clauses.length-1);
  var prosody=PUNCT_PROSODY[c.punct]||PUNCT_PROSODY['.'];
  var jitter=(Math.random()-0.5)*0.03;
  var pitch=1.04 + prosody.pitch + jitter + (c.sentenceStart?0.035:0) + (isVeryFirst?0.05:0) - (isVeryLast?0.02:0);
  var rate=baseRate * prosody.rate * (isVeryFirst?1.05:1) * (isVeryLast?0.95:1);
  var pause=Math.max(60, prosody.pause + (Math.random()-0.5)*60);
  var u=new SpeechSynthesisUtterance(c.text);
  u.pitch=Math.max(0.75,Math.min(1.3,pitch));
  u.rate=rate;
  u.volume=1.0; u.lang='en-US';
  if(chosenVoice) u.voice=chosenVoice;
  u.onend=function(){
    if(gen!==speechGen) return;
    setTimeout(function(){ speakQueue(clauses, i+1, baseRate, gen); }, isVeryLast?0:pause);
  };
  window.speechSynthesis.speak(u);
}

/* Rough estimate (seconds) of how long speakQueue will take to read this
   text aloud, using the same clause split + per-punctuation pause/rate model
   as speakQueue itself, so the estimate tracks the real thing. */
function estimateSpeechSeconds(text, baseRate){
  var clauses=breakLongClauses(splitClauses(text));
  if(!clauses.length) return 0;
  var WPS=2.6*(baseRate||0.97), total=0;
  clauses.forEach(function(c,i){
    var words=c.text.trim().split(/\s+/).filter(Boolean).length;
    var prosody=PUNCT_PROSODY[c.punct]||PUNCT_PROSODY['.'];
    total += words/(WPS*prosody.rate);
    if(i<clauses.length-1) total += prosody.pause/1000;
  });
  return Math.max(3, total);
}
/* Every SMIL animate/animateMotion/animateTransform inside one whiteboard
   scene shares the same dur (they all come from a single makeH(dur) call),
   so reading any one of them gives the scene's original authored loop
   length. Rescale every one of them by the same factor so the loop's total
   length roughly matches how long the narration will actually take to
   speak — otherwise a scene authored for a 20s loop can badly outrun or
   lag a narration that (with the pacing above) might now take 30-40s.
   Clamped so an odd narration length can't make a scene absurdly fast or
   sluggish. */
function retimeSvgAnimations(svg, nrText){
  if(!svg || !nrText) return;
  var animEls=svg.querySelectorAll('animate[dur], animateMotion[dur], animateTransform[dur]');
  if(!animEls.length) return;
  var origDur=parseFloat(animEls[0].getAttribute('dur'));
  if(!origDur || isNaN(origDur)) return;
  var sp=document.getElementById('speedSelect');
  var baseRate=sp?parseFloat(sp.value)||0.97:0.97;
  var scale=estimateSpeechSeconds(nrText, baseRate)/origDur;
  scale=Math.max(0.6, Math.min(2.5, scale));
  animEls.forEach(function(el){
    var d=parseFloat(el.getAttribute('dur'));
    if(!isNaN(d)) el.setAttribute('dur', (d*scale).toFixed(2)+'s');
  });
}

/* ---------- navigation (beat-aware) ---------- */
function padViewBox(svg){ if(!svg) return; var vb=(svg.getAttribute('viewBox')||'').split(/\s+/); if(vb.length===4){ vb[3]=(parseFloat(vb[3])+46); svg.setAttribute('viewBox', vb.join(' ')); } }
function redrawScene(){ var s=STEPS[idx]; var c=document.getElementById('canvas'); c.innerHTML=curDraw(s)(); var svg=c.querySelector('svg'); padViewBox(svg); if(svg) svg.classList.add('scene-in'); markRemoved(svg); }
function gotoScene(i, atLast){ idx=i; ph = atLast ? curPhases(STEPS[idx]).length-1 : 0; render(); }
function nextBeat(){
  var PH=curPhases(STEPS[idx]);
  if(ph < PH.length-1){ ph++; applyUpTo(ph, true); }
  else if(idx < STEPS.length-1){
    gotoScene(idx+1, false); // render() inside gotoScene calls applyUpTo(0,true)
  }
  else { stopPlay(); }
}
function prevBeat(){
  if(ph>0){ ph--; redrawScene(); applyUpTo(ph, true); }
  else if(idx>0){ gotoScene(idx-1, false); }
}
function playAdvance(){ if(playing) nextBeat(); }
function schedulePlayTimer(){ clearTimeout(timer); timer=setTimeout(function(){ if(playing) playAdvance(); }, 4200); }
function nextStep(){ stopPlayKeepVoice(); nextBeat(); }
function prevStep(){ stopPlayKeepVoice(); prevBeat(); }
function togglePlay(){ playing?stopPlay():startPlay(); }
function startPlay(){
  playing=true;
  var b=document.getElementById('playBtn'); b.textContent='❚❚ Pause'; b.classList.remove('primary');
  applyUpTo(ph, true);
}
function stopPlay(){ playing=false; clearTimeout(timer); if('speechSynthesis' in window)window.speechSynthesis.cancel();
  var b=document.getElementById('playBtn'); b.textContent='▶ Play'; b.classList.add('primary'); }
function stopPlayKeepVoice(){ playing=false; clearTimeout(timer);
  var b=document.getElementById('playBtn'); b.textContent='▶ Play'; b.classList.add('primary'); }
function toggleVoice(){
  voiceOn=!voiceOn;
  document.getElementById('voiceSwitch').className='switch '+(voiceOn?'on':'');
  document.getElementById('voiceLabel').textContent=voiceOn?'Voiceover on':'Voiceover off';
  if(!voiceOn&&'speechSynthesis' in window)window.speechSynthesis.cancel();
  else if(voiceOn) speak(curBeatNr());
}

/* ---------- boot ---------- */
function boot(){
  if(!GROUPS.length){
    document.getElementById('canvas').innerHTML='<p style="color:var(--coral-l)">No sections loaded. Check that sections/*.js are present next to this page.</p>';
    return;
  }
  buildTOC(); buildLegend();

  /* URL hash jump */
  var hash=window.location.hash.match(/^#step-(\d+)$/);
  if(hash){ var hi=parseInt(hash[1],10)-1; if(hi>=0&&hi<STEPS.length) idx=hi; }

  render();

  var inp=document.getElementById('search');
  if(inp){
    inp.addEventListener('input',runSearch);
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter') searchJumpFirst(); if(e.key==='Escape') clearSearch(); });
  }

  /* keyboard shortcuts */
  document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT') return;
    if(e.key==='Escape'){ closeView(); return; }
    if(e.key===' '){ e.preventDefault(); togglePlay(); return; }
    if(e.key==='ArrowRight'){ nextStep(); return; }
    if(e.key==='ArrowLeft'){ prevStep(); return; }
    if(e.key.toLowerCase()==='f'){ toggleFullscreen(); return; }
    if(e.key.toLowerCase()==='t'){ togglePanel('transcriptPanel'); return; }
  });

  var ov=document.getElementById('viewModal');
  if(ov) ov.addEventListener('click',function(e){ if(e.target===ov) closeView(); });

  var btn=document.getElementById('fbBtn'), note=document.getElementById('fbNote');
  var set = FEEDBACK_URL && FEEDBACK_URL.indexOf('http')===0;
  if(set){ btn.href=FEEDBACK_URL; }
  else {
    btn.href='#'; btn.style.opacity='0.55'; btn.style.cursor='not-allowed';
    note.textContent='Feedback link not set yet — paste your Google Form URL into assets/app.js.';
    btn.addEventListener('click',function(e){ e.preventDefault(); });
  }
}
document.addEventListener('DOMContentLoaded',boot);
window.addEventListener('beforeunload',function(){ if('speechSynthesis' in window)window.speechSynthesis.cancel(); });
