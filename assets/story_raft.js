/* ============================================================
   TRUE-MOTION prototype — Raft election.
   Self-running SMIL animation. Depicts: candidate nodes →
   election → majority vote → write leader + followers →
   leader failure → automatic re-election.
   Narration/captions are technical only (no UI/mechanics text).
   Loaded after stories.js; overrides only the Raft scene.
   ============================================================ */
(function(){
  var DUR='13s', FONT='Segoe UI,system-ui,sans-serif';
  var TF='#15352b',TS='#1D9E75',AF='#3b2e10',AS='#EF9F27',GF='#26262a',GS='#888780';
  var INK='#e8edf2',MUT='#9aa7b4',AML='#FAC775',GRL='#97C459',CRL='#F0997B';

  function ani(attr,kt,vals){return '<animate attributeName="'+attr+'" dur="'+DUR+'" repeatCount="indefinite" calcMode="linear" keyTimes="'+kt+'" values="'+vals+'"/>';}
  // opacity visible between fractions a..b of the cycle
  function vis(a,b){
    if(a<=0) return ani('opacity','0;'+(b-0.01).toFixed(2)+';'+b.toFixed(2)+';1','1;1;0;0');
    return ani('opacity','0;'+(a-0.01).toFixed(2)+';'+a.toFixed(2)+';'+(b-0.01).toFixed(2)+';'+b.toFixed(2)+';1','0;0;1;1;0;0');
  }
  function motion(path,a,b){return '<animateMotion dur="'+DUR+'" repeatCount="indefinite" calcMode="linear" path="'+path+'" keyTimes="0;'+a.toFixed(2)+';'+b.toFixed(2)+';1" keyPoints="0;0;1;1"/>';}
  // static text
  function tst(x,y,t,size,fill,weight){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+FONT+'" font-size="'+size+'" fill="'+fill+'"'+(weight?' font-weight="600"':'')+'>'+t+'</text>';}
  // text that fades in/out via an inner <animate> child
  function tan(x,y,t,size,fill,weight,inner){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+FONT+'" font-size="'+size+'" fill="'+fill+'"'+(weight?' font-weight="600"':'')+' opacity="0">'+t+inner+'</text>';}
  function arrow(path,a,b,col){
    return '<g opacity="0" filter="url(#glow)">'+vis(a-0.02,b+0.04)
      +'<path d="M-13 0 L-1 0 M-2 -6 L10 0 L-2 6 Z" fill="'+col+'" stroke="'+col+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'
      +'<animateMotion dur="'+DUR+'" repeatCount="indefinite" calcMode="linear" rotate="auto" path="'+path+'" keyTimes="0;'+a.toFixed(2)+';'+b.toFixed(2)+';1" keyPoints="0;0;1;1"/>'
      +'</g>';
  }
  function vote(path,a,b){return arrow(path,a,b,AS);}
  function repl(path,a,b){return arrow(path,a,b,TS);}
  // frosted-glass cylinder node; optional stroke animation across keyTimes
  function cyl(x,y,w,h,stroke0,ktS,strokes){
    var cx=x+w/2,rx=w/2,ry=Math.max(7,Math.min(13,Math.round(h*0.20))),ty=y+ry,by=y+h-ry,r=x+w;
    var sa=ktS?ani('stroke',ktS,strokes):'';
    return '<g class="cyl">'
      +'<ellipse class="base-ring" cx="'+cx+'" cy="'+by+'" rx="'+rx+'" ry="'+ry+'" fill="none" stroke="'+stroke0+'" stroke-width="2.4">'+sa+'</ellipse>'
      +'<ellipse cx="'+cx+'" cy="'+by+'" rx="'+rx+'" ry="'+ry+'" fill="'+stroke0+'" fill-opacity="0.14" stroke="'+stroke0+'" stroke-opacity="0.4"/>'
      +'<path d="M'+x+','+ty+' L'+x+','+by+' A'+rx+','+ry+' 0 0 0 '+r+','+by+' L'+r+','+ty+' Z" fill="rgba(255,255,255,0.075)" stroke="'+stroke0+'" stroke-opacity="0.6" stroke-width="1.2">'+sa+'</path>'
      +'<path d="M'+(x+5)+','+(ty+3)+' L'+(x+5)+','+(by-3)+'" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<ellipse class="cyl-top" cx="'+cx+'" cy="'+ty+'" rx="'+rx+'" ry="'+ry+'" fill="rgba(255,255,255,0.20)" stroke="'+stroke0+'" stroke-width="1.3">'+sa+'</ellipse>'
      +'</g>';
  }
  function crown(x,yFrom,yTo,aOn,aDrop){
    return '<text x="'+x+'" y="'+yFrom+'" text-anchor="middle" font-size="22" fill="'+AML+'" opacity="0">★'
      + ani('opacity','0;'+aOn.toFixed(2)+';'+(aOn+0.04).toFixed(2)+';'+aDrop.k+';'+aDrop.k2+';1', aDrop.ov)
      + ani('y','0;'+aOn.toFixed(2)+';'+(aOn+0.06).toFixed(2)+';1', yFrom+';'+yFrom+';'+yTo+';'+yTo) + '</text>';
  }

  function s_raft_motion(){
    // Taller cylinders. Node NAME sits inside (large); STATUS sits BELOW each cylinder.
    var s='<svg viewBox="0 0 560 500" role="img"><title>raft election (animated)</title>';
    s+='<defs><filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
    // static topology connectors (NOT animated) — node centres: N1(280,120) N2(130,294) N3(430,294)
    s+='<line x1="280" y1="120" x2="130" y2="294" stroke="#39485a" stroke-width="1.4" opacity="0.5"/>';
    s+='<line x1="280" y1="120" x2="430" y2="294" stroke="#39485a" stroke-width="1.4" opacity="0.5"/>';
    s+='<line x1="130" y1="294" x2="430" y2="294" stroke="#39485a" stroke-width="1.4" opacity="0.5"/>';
    // banner + tally
    s+=tan(280,38,'⚖ ELECTION',16,AML,true, ani('opacity','0;0.12;0.14;0.40;0.42;0.70;0.72;0.84;0.86;1','0;0;1;1;0;0;1;1;0;0'));
    s+=tan(478,118,'2 / 3 votes',12.5,AML,false, vis(0.30,0.64));

    // Node 1 — candidate -> leader -> fails   (cyl 210,76,140,88 → bottom y=164, centre 120)
    s+=cyl(210,76,140,88,TS,'0;0.36;0.40;0.62;0.66;0.98;1',TS+';'+TS+';'+AS+';'+AS+';'+GS+';'+GS+';'+TS);
    s+=tst(280,126,'Node 1',16,INK,true);
    s+=crown(280,52,72,0.40,{k:'0.62',k2:'0.66',ov:'0;0;1;1;0;0'});
    s+=tan(280,132,'✗',34,CRL,false,vis(0.64,0.98));
    // status BELOW the cylinder
    s+=tan(280,186,'candidate',12.5,MUT,false,vis(0,0.40));
    s+=tan(280,186,'★ Write Leader',13,AML,true,vis(0.42,0.62));
    s+=tan(280,186,'✗ down',13,CRL,true,vis(0.66,0.98));

    // Node 2 — candidate -> follower -> NEW leader   (cyl 60,250,140,88 → centre 294)
    s+=cyl(60,250,140,88,TS,'0;0.78;0.82;0.98;1',TS+';'+TS+';'+AS+';'+AS+';'+TS);
    s+=tst(130,300,'Node 2',16,INK,true);
    s+=crown(130,226,246,0.80,{k:'0.99',k2:'1',ov:'0;0;1;1;1;1'});
    s+=tan(130,360,'candidate',12.5,MUT,false,vis(0,0.50));
    s+=tan(130,360,'follower',12.5,GRL,false,vis(0.50,0.80));
    s+=tan(130,360,'★ Write Leader',13,AML,true,vis(0.82,1.0));

    // Node 3 — candidate -> follower   (cyl 360,250,140,88 → centre 294)
    s+=cyl(360,250,140,88,TS);
    s+=tst(430,300,'Node 3',16,INK,true);
    s+=tan(430,360,'candidate',12.5,MUT,false,vis(0,0.50));
    s+=tan(430,360,'follower',12.5,GRL,false,vis(0.50,1.0));

    // moving arrows (only during their beats)
    s+=vote('M155 250 L250 168',0.24,0.34);
    s+=vote('M405 250 L310 168',0.24,0.34);
    s+=repl('M255 166 L150 250',0.50,0.60);
    s+=repl('M305 166 L410 250',0.50,0.60);
    s+=vote('M360 300 L210 300',0.74,0.80);

    // captions cross-fading with the motion
    s+=tan(280,470,'Three equal nodes — any one could lead.',18,INK,false,vis(0,0.12));
    s+=tan(280,470,'No leader yet — so Raft calls an election.',18,INK,false,vis(0.12,0.24));
    s+=tan(280,470,'The other nodes vote for a candidate.',18,INK,false,vis(0.24,0.40));
    s+=tan(280,470,'A majority elects it the Write Leader.',18,AML,false,vis(0.40,0.50));
    s+=tan(280,470,'The leader streams changes to its followers.',18,GRL,false,vis(0.50,0.62));
    s+=tan(280,470,'Then the leader fails…',18,CRL,false,vis(0.62,0.74));
    s+=tan(280,470,'…and Raft instantly elects a new leader.',18,AML,false,vis(0.74,1.0));

    s+='</svg>';
    return s;
  }

  window.PGD_STORY = window.PGD_STORY || {};
  window.PGD_STORY["Raft consensus"]={ sc:s_raft_motion, phases:[
    {nr:"Raft holds an election among the data nodes. The node that receives votes from a majority becomes the write leader; the remaining nodes become followers and replicate from it. If the write leader fails, Raft automatically elects a new one, so the cluster always has exactly one write leader."}
  ]};
})();
