/* ============================================================
   motion_lib.js — shared primitives for the self-running,
   narration-synced "true-motion" scenes (3Blue1Brown spirit).
   Everything loops on a single cycle (default 12s) via SMIL,
   so scenes play by themselves with no Play button and no
   perpetual decorative arrows — motion only happens during a
   transition and depicts a real state change.
   Exposes window.MOT.
   ============================================================ */
(function(){
  var DUR='12s', FONT='Segoe UI,system-ui,sans-serif';
  var C={ TF:'#15352b',TS:'#1D9E75',TL:'#5DCAA5',
          AF:'#3b2e10',AS:'#EF9F27',AL:'#FAC775',
          GF:'#26262a',GS:'#888780',
          BF:'#16293f',BS:'#378ADD',BL:'#85B7EB',
          PF:'#241f3f',PS:'#7F77DD',PL:'#AFA9EC',
          KF:'#34182a',KS:'#D4537E',KL:'#ED93B1',
          GRF:'#1f3310',GRS:'#639922',GRL:'#97C459',
          INK:'#e8edf2',MUT:'#9aa7b4',CRL:'#F0997B',LINE:'#39485a' };
  function f(x){ return (Math.round(x*1000)/1000); }
  function ani(attr,kt,vals){return '<animate attributeName="'+attr+'" dur="'+DUR+'" repeatCount="indefinite" calcMode="linear" keyTimes="'+kt+'" values="'+vals+'"/>';}
  function vis(a,b){
    if(a<=0) return ani('opacity','0;'+f(b-0.01)+';'+f(b)+';1','1;1;0;0');
    if(b>=1) return ani('opacity','0;'+f(a-0.01)+';'+f(a)+';1','0;0;1;1');
    return ani('opacity','0;'+f(a-0.01)+';'+f(a)+';'+f(b-0.01)+';'+f(b)+';1','0;0;1;1;0;0');
  }
  function motion(path,a,b){return '<animateMotion dur="'+DUR+'" repeatCount="indefinite" calcMode="linear" path="'+path+'" keyTimes="0;'+f(a)+';'+f(b)+';1" keyPoints="0;0;1;1"/>';}
  function tst(x,y,t,size,fill,weight){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+FONT+'" font-size="'+size+'" fill="'+fill+'"'+(weight?' font-weight="600"':'')+'>'+t+'</text>';}
  function tan(x,y,t,size,fill,weight,inner){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+FONT+'" font-size="'+size+'" fill="'+fill+'"'+(weight?' font-weight="600"':'')+' opacity="0">'+t+inner+'</text>';}
  // a value/text that flips from one string to another at fraction `frac`
  function flip(x,y,fromT,toT,frac,size,fromFill,toFill){
    return tan(x,y,fromT,size,fromFill||C.MUT,false,vis(0,frac))+tan(x,y,toT,size,toFill||C.GRL,true,vis(frac,1));
  }
  // travelling ARROW along a path (points in the direction of travel),
  // visible only during a..b — replaces the old moving dot.
  function token(path,a,b,color,r){
    var col=color||C.AS;
    return '<g opacity="0" filter="url(#glow)">'+vis(a-0.02,b+0.04)
      +'<path d="M-13 0 L-1 0 M-2 -6 L10 0 L-2 6 Z" fill="'+col+'" stroke="'+col+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'
      +'<animateMotion dur="'+DUR+'" repeatCount="indefinite" calcMode="linear" rotate="auto" path="'+path+'" keyTimes="0;'+f(a)+';'+f(b)+';1" keyPoints="0;0;1;1"/>'
      +'</g>';
  }
  function cylGeom(x,y,w,h){var rx=w/2,ry=Math.max(7,Math.min(13,Math.round(h*0.20)));return {cx:x+w/2,rx:rx,ry:ry,ty:y+ry,by:y+h-ry,r:x+w};}
  // static frosted-glass cylinder node
  function box(x,y,w,h,fill,stroke){
    var g=cylGeom(x,y,w,h);
    return '<g class="cyl" style="color:'+stroke+'">'
      +'<ellipse class="base-ring" cx="'+g.cx+'" cy="'+g.by+'" rx="'+g.rx+'" ry="'+g.ry+'" fill="none" stroke="'+stroke+'" stroke-width="2.2"/>'
      +'<ellipse cx="'+g.cx+'" cy="'+g.by+'" rx="'+g.rx+'" ry="'+g.ry+'" fill="'+stroke+'" fill-opacity="0.14" stroke="'+stroke+'" stroke-opacity="0.4"/>'
      +'<path d="M'+x+','+g.ty+' L'+x+','+g.by+' A'+g.rx+','+g.ry+' 0 0 0 '+g.r+','+g.by+' L'+g.r+','+g.ty+' Z" fill="rgba(255,255,255,0.075)" stroke="'+stroke+'" stroke-opacity="0.55" stroke-width="1.1"/>'
      +'<path d="M'+(x+5)+','+(g.ty+3)+' L'+(x+5)+','+(g.by-3)+'" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<ellipse class="cyl-top" cx="'+g.cx+'" cy="'+g.ty+'" rx="'+g.rx+'" ry="'+g.ry+'" fill="rgba(255,255,255,0.20)" stroke="'+stroke+'" stroke-width="1.2"/>'
      +'</g>';
  }
  // cylinder whose accent (rim/base) + tint change across keyTimes (state transition)
  function boxAnim(x,y,w,h,kt,fills,strokes){
    var g=cylGeom(x,y,w,h), s0=strokes.split(';')[0], f0=fills.split(';')[0], sa=ani('stroke',kt,strokes);
    return '<g class="cyl">'
      +'<ellipse class="base-ring" cx="'+g.cx+'" cy="'+g.by+'" rx="'+g.rx+'" ry="'+g.ry+'" fill="none" stroke="'+s0+'" stroke-width="2.4">'+sa+'</ellipse>'
      +'<ellipse cx="'+g.cx+'" cy="'+g.by+'" rx="'+g.rx+'" ry="'+g.ry+'" fill="'+f0+'" fill-opacity="0.18" stroke="'+s0+'" stroke-opacity="0.4">'+ani('fill',kt,fills)+'</ellipse>'
      +'<path d="M'+x+','+g.ty+' L'+x+','+g.by+' A'+g.rx+','+g.ry+' 0 0 0 '+g.r+','+g.by+' L'+g.r+','+g.ty+' Z" fill="rgba(255,255,255,0.075)" stroke="'+s0+'" stroke-opacity="0.6" stroke-width="1.2">'+sa+'</path>'
      +'<path d="M'+(x+5)+','+(g.ty+3)+' L'+(x+5)+','+(g.by-3)+'" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<ellipse class="cyl-top" cx="'+g.cx+'" cy="'+g.ty+'" rx="'+g.rx+'" ry="'+g.ry+'" fill="rgba(255,255,255,0.20)" stroke="'+s0+'" stroke-width="1.3">'+sa+'</ellipse>'
      +'</g>';
  }
  function crownAt(x,yTo,aOn,aOff){
    return '<text x="'+x+'" y="'+(yTo-26)+'" text-anchor="middle" font-size="20" fill="'+C.AL+'" opacity="0">★'
      + vis(aOn,aOff) + ani('y','0;'+f(aOn)+';'+f(aOn+0.05)+';1',(yTo-26)+';'+(yTo-26)+';'+yTo+';'+yTo) + '</text>';
  }
  function line(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+C.LINE+'" stroke-width="1.4" opacity="0.55"/>';}
  function glowDefs(){return '<defs><filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';}
  function cap(t,a,b,fill){return tan(280,452,t,18,fill||C.INK,false,vis(a,b));}
  function svg(h,inner){return '<svg viewBox="0 0 560 '+(h||470)+'" role="img"><title>animated</title>'+glowDefs()+inner+'</svg>';}

  window.MOT={C:C,ani:ani,vis:vis,motion:motion,tst:tst,tan:tan,flip:flip,token:token,box:box,boxAnim:boxAnim,crownAt:crownAt,line:line,glowDefs:glowDefs,cap:cap,svg:svg,f:f};
})();
