/* ============================================================
   motion_wb.js — shared primitives for the "hand-drawn whiteboard"
   self-running scenes: light paper background, hand-lettering font,
   minimalist line-art human characters. Mirrors the shape of
   motion_lib.js (window.MOT) but for the whiteboard aesthetic;
   exposes window.MOTWB. Each scene picks its own cycle length via
   makeH(durSeconds) since scenes vary in how much they narrate.
   ============================================================ */
(function(){
  var HAND='Segoe Print,Bradley Hand,Comic Sans MS,cursive';
  var COL={ INK:'#2B2B2B', PAPER:'#FAFAFA', RED:'#D64545', GREEN:'#2E9E4F',
            BLUE:'#3B6FD6', AMBER:'#C9891A', GRAY:'#9a9a9a', PURPLE:'#6E5FC9' };
  function f(x){ return Math.round(x*1000)/1000; }

  function makeH(dur){
    function ani(attr,kt,vals){return '<animate attributeName="'+attr+'" dur="'+dur+'s" repeatCount="indefinite" calcMode="linear" keyTimes="'+kt+'" values="'+vals+'"/>';}
    function vis(a,b){
      a=Math.max(0,a); b=Math.min(1,b);
      if(a<=0) return ani('opacity','0;'+f(b-0.01)+';'+f(b)+';1','1;1;0;0');
      if(b>=1) return ani('opacity','0;'+f(a-0.01)+';'+f(a)+';1','0;0;1;1');
      return ani('opacity','0;'+f(a-0.01)+';'+f(a)+';'+f(b-0.01)+';'+f(b)+';1','0;0;1;1;0;0');
    }
    function move(path,a,b,rotate){return '<animateMotion dur="'+dur+'s" repeatCount="indefinite" calcMode="linear" '+(rotate?'rotate="auto" ':'')+'path="'+path+'" keyTimes="0;'+f(a)+';'+f(b)+';1" keyPoints="0;0;1;1"/>';}
    function token(path,a,b,color){
      return '<g opacity="0">'+vis(a-0.015,b+0.03)
        +'<path d="M-11 0 L-1 0 M-2 -5.5 L8 0 L-2 5.5 Z" fill="'+color+'" stroke="'+color+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        + move(path,a,b,true)
        +'</g>';
    }
    function tst(x,y,t,size,fill,weight,extra){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+HAND+'" font-size="'+size+'" fill="'+fill+'"'+(weight?' font-weight="700"':'')+(extra||'')+'>'+t+'</text>';}
    function tan(x,y,t,size,fill,weight,inner,extra){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+HAND+'" font-size="'+size+'" fill="'+fill+'"'+(weight?' font-weight="700"':'')+' opacity="0"'+(extra||'')+'>'+t+inner+'</text>';}
    function flip(x,y,fromT,toT,frac,size,fromFill,toFill,weight){
      return tan(x,y,fromT,size,fromFill,weight,vis(0,frac)) + tan(x,y,toT,size,toFill,weight,vis(frac,1));
    }
    function draw(a,b,len){ return ani('stroke-dashoffset','0;'+f(a)+';'+f(b)+';1', len+';'+len+';0;0'); }
    function cap(cx,cy,t,a,b,col){ return tan(cx,cy,t,14,col||COL.INK,false,vis(a,b)); }
    return {ani:ani,vis:vis,move:move,token:token,tst:tst,tan:tan,flip:flip,draw:draw,cap:cap,dur:dur};
  }

  /* paper background + bottom tray line */
  function paper(w,h){return '<rect x="0" y="0" width="'+w+'" height="'+h+'" fill="'+COL.PAPER+'"/><line x1="0" y1="'+(h-6)+'" x2="'+w+'" y2="'+(h-6)+'" stroke="#d8d3c4" stroke-width="4"/>';}

  /* minimalist line-art person. accessory: 'hardhat' | 'tablet' | null */
  function person(x,y,label,accessory){
    var g='<g>';
    g+='<circle cx="'+x+'" cy="'+y+'" r="9" fill="none" stroke="'+COL.INK+'" stroke-width="2.2"/>';
    g+='<line x1="'+x+'" y1="'+(y+9)+'" x2="'+x+'" y2="'+(y+34)+'" stroke="'+COL.INK+'" stroke-width="2.2" stroke-linecap="round"/>';
    g+='<line x1="'+x+'" y1="'+(y+17)+'" x2="'+(x-13)+'" y2="'+(y+27)+'" stroke="'+COL.INK+'" stroke-width="2.2" stroke-linecap="round"/>';
    g+='<line x1="'+x+'" y1="'+(y+17)+'" x2="'+(x+13)+'" y2="'+(y+12)+'" stroke="'+COL.INK+'" stroke-width="2.2" stroke-linecap="round"/>';
    g+='<line x1="'+x+'" y1="'+(y+34)+'" x2="'+(x-10)+'" y2="'+(y+54)+'" stroke="'+COL.INK+'" stroke-width="2.2" stroke-linecap="round"/>';
    g+='<line x1="'+x+'" y1="'+(y+34)+'" x2="'+(x+10)+'" y2="'+(y+54)+'" stroke="'+COL.INK+'" stroke-width="2.2" stroke-linecap="round"/>';
    if(accessory==='hardhat'){ g+='<path d="M'+(x-11)+' '+(y-9)+' A11 8 0 0 1 '+(x+11)+' '+(y-9)+' Z" fill="'+COL.AMBER+'" fill-opacity="0.85" stroke="'+COL.INK+'" stroke-width="1.6"/>'; }
    if(accessory==='tablet'){ g+='<rect x="'+(x+10)+'" y="'+(y+8)+'" width="14" height="18" rx="2" fill="#fff" stroke="'+COL.INK+'" stroke-width="1.8"/>'; }
    if(label) g+='<text x="'+x+'" y="'+(y+72)+'" text-anchor="middle" font-family="'+HAND+'" font-size="14" fill="'+COL.INK+'" font-weight="700">'+label+'</text>';
    g+='</g>';
    return g;
  }

  /* simple hand-drawn database cylinder icon with label + optional sub-label, both inside */
  function cyl(x,y,w,h,label,sub,color){
    color=color||COL.INK;
    return '<g><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="#fff" stroke="'+color+'" stroke-width="2.4"/>'
      +'<ellipse cx="'+(x+w/2)+'" cy="'+y+'" rx="'+(w/2)+'" ry="8" fill="#fff" stroke="'+color+'" stroke-width="2.2"/>'
      +'<text x="'+(x+w/2)+'" y="'+(y+h/2-4)+'" text-anchor="middle" font-family="'+HAND+'" font-size="16" fill="'+color+'" font-weight="700">'+label+'</text>'
      +(sub?'<text x="'+(x+w/2)+'" y="'+(y+h/2+14)+'" text-anchor="middle" font-family="'+HAND+'" font-size="14" fill="'+color+'">'+sub+'</text>':'')
      +'</g>';
  }

  window.MOTWB={ C:COL, HAND:HAND, f:f, makeH:makeH, paper:paper, person:person, cyl:cyl };
})();
