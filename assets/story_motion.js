/* ============================================================
   story_motion.js — self-running "true-motion" hero scenes
   (3Blue1Brown spirit) built on window.MOT. Each scene loops on
   a 12s cycle, plays by itself, and every movement depicts a
   real state change (values flip, nodes change colour, tokens
   travel once, crowns drop). Overrides PGD_STORY by title.
   Loaded after motion_lib.js. To tweak one scene, edit its
   builder below — nothing else changes.
   ============================================================ */
(function(){
  var M=window.MOT, C=M.C;
  var box=M.box, ba=M.boxAnim, tst=M.tst, tan=M.tan, flip=M.flip, tok=M.token,
      vis=M.vis, ani=M.ani, crown=M.crownAt, line=M.line, cap=M.cap, svg=M.svg, f=M.f;
  function title(cx,cy,t){return tst(cx,cy,t,15,C.INK,true);}
  function sub(cx,cy,t,fill,a,b){return tan(cx,cy,t,11,fill||C.MUT,false,vis(a,b));}
  function drawOn(a,b,len){return ani('stroke-dashoffset','0;'+f(a)+';'+f(b)+';1', len+';'+len+';0;0');}

  /* ---- The mesh ---- */
  function mesh(){var s='';
    s+=line(170,182,215,182)+line(345,182,390,182)+'<path d="M105 214 Q280 300 455 214" fill="none" stroke="'+C.LINE+'" stroke-width="1.4" opacity="0.5"/>';
    s+=box(40,150,130,64,C.TF,C.TS)+title(105,176,'Database 1')+tan(105,198,'x = 7',12,C.TL,true,vis(0.16,1));
    s+=box(215,150,130,64,C.TF,C.TS)+title(280,176,'Database 2')+flip(280,198,'x = ?','x = 7',0.50,12,C.MUT,C.GRL);
    s+=box(390,150,130,64,C.TF,C.TS)+title(455,176,'Database 3')+flip(455,198,'x = ?','x = 7',0.52,12,C.MUT,C.GRL);
    s+=tok('M170 182 L215 182',0.30,0.42,C.TL)+tok('M105 214 Q280 300 455 214',0.30,0.46,C.TL);
    s+=tok('M280 214 L120 200',0.78,0.90,C.AS)+tok('M280 214 L450 200',0.78,0.90,C.AS);
    s+=cap('Three databases, each holding a full copy.',0,0.16)
      +cap('A write lands on Database 1 — x = 7.',0.16,0.30)
      +cap('It streams straight to every other copy.',0.30,0.50,C.TL)
      +cap('Now all three copies hold x = 7.',0.50,0.74,C.GRL)
      +cap('And any node can originate the next change.',0.74,1.0,C.AL);
    return svg(470,s);}

  /* ---- Eventual consistency ---- */
  function eventual(){var s='';
    s+=line(190,150,370,150);
    s+=box(40,120,150,62,C.TF,C.TS)+title(115,146,'Node 1')+tan(115,168,'v=42 @ .000',11,C.TL,false,vis(0.10,1));
    s+=ba(370,120,150,62,'0;0.46;0.52;1',C.TF+';'+C.TF+';'+C.GRF+';'+C.GRF,C.GS+';'+C.GS+';'+C.GRS+';'+C.GRS)
      +title(445,146,'Node 2')+flip(445,168,'stale: v=41','v=42 @ .200',0.50,11,C.CRL,C.GRL);
    s+=tok('M192 151 L368 151',0.22,0.44,C.TL);
    s+=tan(280,108,'≠ differ',12,C.CRL,true,vis(0.24,0.50))+tan(280,108,'= identical ✓',12,C.GRL,true,vis(0.52,1.0));
    s+=cap('Database 1 commits a write at 10:00:00.',0,0.22)
      +cap('Database 2 is briefly behind — still stale.',0.22,0.46,C.CRL)
      +cap('A moment later it applies the change.',0.46,0.62,C.GRL)
      +cap('Not instant, but quickly identical — eventual consistency.',0.62,1.0);
    return svg(470,s);}

  /* ---- What is a conflict? ---- */
  function conflict(){var s='';
    s+=box(40,70,160,60,C.TF,C.TS)+title(120,96,'Node 1')+tan(120,118,'row42 = 10',11,C.TL,true,vis(0.06,1));
    s+=box(360,70,160,60,C.TF,C.TS)+title(440,96,'Node 2')+tan(440,118,'row42 = 12',11,C.AL,true,vis(0.20,1));
    s+=tok('M150 130 L262 196',0.36,0.54,C.TL)+tok('M410 130 L298 196',0.36,0.54,C.AS);
    s+='<circle cx="280" cy="200" r="6" fill="'+C.CRL+'" opacity="0">'+vis(0.54,0.70)+ani('r','0;0.54;0.63;0.70;1','6;6;30;42;42')+'</circle>';
    s+=tan(280,206,'⚡',26,C.CRL,false,vis(0.55,0.72));
    s+=tan(280,250,'CONFLICT — same row, same instant',14,C.CRL,true,vis(0.70,1.0));
    s+=cap('Node 1 sets row 42 to 10.',0,0.20)
      +cap('At the same instant, Node 2 sets it to 12.',0.20,0.36,C.AL)
      +cap('Both changes travel across the mesh…',0.36,0.55,C.TL)
      +cap('…and collide on the same row.',0.55,0.70,C.CRL)
      +cap('That clash is a conflict PGD must resolve.',0.70,1.0,C.CRL);
    return svg(470,s);}

  /* ---- Conflict resolution (hand-drawn whiteboard — deliberate break from the dark canvas) ---- */
  function confres(){
    var INKB='#2B2B2B', PAPER='#FAFAFA', RED='#D64545', GREEN='#2E9E4F', BLUE='#3B6FD6', HAND='Segoe Print,Bradley Hand,Comic Sans MS,cursive';
    var s='<rect x="0" y="0" width="560" height="500" fill="'+PAPER+'"/>';
    s+='<line x1="30" y1="470" x2="530" y2="470" stroke="#d8d3c4" stroke-width="4"/>';
    s+='<text x="280" y="34" text-anchor="middle" font-family="'+HAND+'" font-size="19" fill="'+INKB+'" font-weight="700">Same row, same instant — two writers</text>';
    s+='<text x="105" y="70" text-anchor="middle" font-family="'+HAND+'" font-size="17" fill="'+BLUE+'" font-weight="700">Client A</text>';
    s+='<text x="455" y="70" text-anchor="middle" font-family="'+HAND+'" font-size="17" fill="'+BLUE+'" font-weight="700">Client B</text>';
    s+='<path d="M105 88 Q170 220 280 335" fill="none" stroke="'+INKB+'" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/>';
    s+='<path d="M455 88 Q390 220 280 335" fill="none" stroke="'+INKB+'" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/>';
    s+=tan(105,112,'active  (t1)',15,BLUE,true,vis(0.02,1));
    s+='<path d="M65 120 Q105 128 148 119" fill="none" stroke="'+BLUE+'" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="120" opacity="0">'+vis(0.02,1)+drawOn(0.03,0.12,120)+'</path>';
    s+=tan(455,112,'inactive  (t2)',15,BLUE,true,vis(0.02,1));
    s+='<path d="M410 120 Q455 129 500 119" fill="none" stroke="'+BLUE+'" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="120" opacity="0">'+vis(0.02,1)+drawOn(0.03,0.12,120)+'</path>';
    s+='<g transform="translate(280,335)"><ellipse cx="0" cy="30" rx="55" ry="16" fill="none" stroke="'+INKB+'" stroke-width="2.2"/>'
      +'<path d="M-55 0 L-55 30 A55 16 0 0 0 55 30 L55 0" fill="#fff" stroke="'+INKB+'" stroke-width="2.2"/>'
      +'<ellipse cx="0" cy="0" rx="55" ry="16" fill="#fff" stroke="'+INKB+'" stroke-width="2.2"/></g>';
    s+=tan(280,340,'?',14,'#999',true,vis(0,0.80))+tan(280,340,'inactive',14,GREEN,true,vis(0.80,1));
    s+=tok('M105 92 Q170 220 275 330',0.13,0.29,BLUE);
    s+=tok('M455 92 Q390 220 285 330',0.13,0.29,BLUE);
    s+='<g opacity="0" transform="translate(280,325)">'+vis(0.29,0.40)
      +'<path d="M0,-30 L8,-8 L30,-10 L12,6 L20,28 L0,14 L-20,28 L-12,6 L-30,-10 L-8,-8 Z" fill="'+RED+'" fill-opacity="0.18" stroke="'+RED+'" stroke-width="2.4"/></g>';
    s+=tan(280,300,'💥 CONFLICT DETECTED',16.5,RED,true,vis(0.30,0.42));
    s+='<g opacity="0">'+vis(0.42,0.56)
      +'<animateTransform attributeName="transform" type="translate" dur="12s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.42;0.49;0.56;1" values="105,100;105,100;455,100;455,100;455,100"/>'
      +'<circle cx="0" cy="0" r="20" fill="none" stroke="'+INKB+'" stroke-width="3"/>'
      +'<line x1="14" y1="14" x2="30" y2="30" stroke="'+INKB+'" stroke-width="4" stroke-linecap="round"/></g>';
    s+='<path d="M78 96 L134 130 M134 96 L78 130" fill="none" stroke="'+RED+'" stroke-width="4" stroke-linecap="round" stroke-dasharray="180" opacity="0">'+vis(0.56,1)+drawOn(0.56,0.62,180)+'</path>';
    s+='<path d="M428 112 L446 130 L484 96" fill="none" stroke="'+GREEN+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="140" opacity="0">'+vis(0.56,1)+drawOn(0.56,0.64,140)+'</path>';
    s+='<g transform="translate(70,420)" opacity="0">'+vis(0.66,1)
      +'<path d="M-30,-14 L-10,-14 L-4,-4 L30,-4 L30,16 L-30,16 Z" fill="#FFF6D8" stroke="'+INKB+'" stroke-width="2.2"/>'
      +'<text x="0" y="34" text-anchor="middle" font-family="'+HAND+'" font-size="13" fill="'+INKB+'">Conflict Log</text></g>';
    s+=tok('M105 118 Q60 260 70 410',0.66,0.80,RED);
    function capW(t,a,b,col){ return '<text x="280" y="486" text-anchor="middle" font-family="'+HAND+'" font-size="15" fill="'+(col||INKB)+'" opacity="0">'+t+vis(a,b)+'</text>'; }
    s+=capW('Client A writes ‘active’ at t1; Client B writes ‘inactive’ at t2 — same row.',0,0.13)
      +capW('Both changes race toward the same row.',0.13,0.29)
      +capW('Same row, two different values — a conflict.',0.29,0.42,RED)
      +capW('PGD compares commit timestamps to settle it.',0.42,0.56)
      +capW('Later timestamp wins — last update wins.',0.56,0.66,GREEN)
      +capW('The losing write is archived to the conflict log.',0.66,0.82)
      +capW('Every copy converges on Client B’s value.',0.82,1.0,GREEN);
    return '<svg viewBox="0 0 560 500" role="img"><title>conflict resolution (whiteboard)</title>'+M.glowDefs()+s+'</svg>';}

  /* ---- The Write Leader ---- */
  function leader(){var s='';
    s+=box(210,16,140,40,C.GF,C.GS)+title(280,41,'Apps');
    s+=line(115,250,280,152)+line(280,250,280,152)+line(445,250,280,152);
    s+=ba(205,92,150,60,'0;0.04;0.10;1',C.TF+';'+C.TF+';'+C.AF+';'+C.AF,C.TS+';'+C.TS+';'+C.AS+';'+C.AS)
      +title(280,118,'Node 1')+sub(280,138,'Write Leader',C.AL,0.10,1)+crown(280,90,0.06,1.0);
    s+=box(40,250,150,54,C.TF,C.TS)+title(115,280,'Node 2')+sub(115,296,'follower',C.GRL,0,1);
    s+=box(205,250,150,54,C.TF,C.TS)+title(280,280,'Node 3')+sub(280,296,'follower',C.GRL,0,1);
    s+=box(370,250,150,54,C.TF,C.TS)+title(445,280,'Node 4')+sub(445,296,'follower',C.GRL,0,1);
    s+=tok('M280 56 L280 92',0.22,0.32,C.AS)+tok('M280 56 L280 92',0.30,0.40,C.AS)+tok('M280 56 L280 92',0.38,0.48,C.AS);
    s+=tok('M250 152 L120 250',0.56,0.68,C.TL)+tok('M280 152 L280 250',0.56,0.68,C.TL)+tok('M310 152 L445 250',0.56,0.68,C.TL);
    s+=cap('Raft has elected one node as the Write Leader.',0,0.20,C.AL)
      +cap('All application writes route to that one leader.',0.20,0.52,C.AS)
      +cap('The leader streams them to every follower, in order.',0.52,0.80,C.TL)
      +cap('A single writer keeps changes consistent.',0.80,1.0);
    return svg(470,s);}

  /* ---- Switchover & failover ---- */
  function failover(){var s='';
    s+=box(30,20,120,40,C.GF,C.GS)+title(90,45,'Apps');
    s+=box(205,16,150,46,C.KF,C.KS)+title(280,44,'Conn Manager');
    s+=ba(40,150,150,60,'0;0.30;0.36;1',C.AF+';'+C.AF+';'+C.GF+';'+C.GF,C.AS+';'+C.AS+';'+C.GS+';'+C.GS)
      +title(115,176,'Node 1')+sub(115,196,'leader',C.AL,0,0.34)+sub(115,196,'✗ down',C.CRL,0.36,1.0)+crown(115,148,0.02,0.34);
    s+=ba(360,150,150,60,'0;0.48;0.54;1',C.TF+';'+C.TF+';'+C.AF+';'+C.AF,C.TS+';'+C.TS+';'+C.AS+';'+C.AS)
      +title(435,176,'Node 2')+sub(435,196,'standby',C.MUT,0,0.5)+sub(435,196,'new leader',C.AL,0.54,1.0)+crown(435,148,0.50,1.0);
    s+=tan(115,182,'✗',30,C.CRL,false,vis(0.34,0.98));
    s+=tok('M150 40 L205 40',0.08,0.16,C.KL)+tok('M250 62 L130 150',0.16,0.26,C.KL);
    s+=tok('M150 40 L205 40',0.66,0.74,C.KL)+tok('M310 62 L430 150',0.74,0.84,C.KL);
    s+=cap('Clients reach the leader via the Connection Manager.',0,0.30,C.KL)
      +cap('The leader fails.',0.30,0.46,C.CRL)
      +cap('Raft elects a new leader — failover (or manual switchover).',0.46,0.66,C.AL)
      +cap('The Connection Manager reroutes — same address for the app.',0.66,1.0,C.KL);
    return svg(470,s);}

  /* ---- CAMO ---- */
  function camo(){var s='';
    s+=box(15,190,140,56,C.GF,C.GS)+title(85,216,'App Server')+tan(85,236,'awaiting reply',10.5,C.MUT,false,vis(0,1));
    s+=ba(205,170,150,76,'0;0.06;0.16;0.52;0.62;1',
        C.TF+';'+C.TF+';'+C.AF+';'+C.AF+';'+C.GRF+';'+C.GRF,
        C.TS+';'+C.TS+';'+C.AS+';'+C.AS+';'+C.GRS+';'+C.GRS)
      +title(280,200,'Local Node');
    s+=tan(280,222,'idle',11,C.MUT,false,vis(0,0.06));
    s+=tan(280,222,'⏳ Pending',12,C.AL,true,vis(0.08,0.52));
    s+=tan(280,222,'✓ Committed',12,C.GRL,true,vis(0.54,1));
    s+=ba(390,170,150,76,'0;0.28;0.38;1',C.TF+';'+C.TF+';'+C.GRF+';'+C.GRF,C.TS+';'+C.TS+';'+C.GRS+';'+C.GRS)
      +title(465,200,'CAMO Partner');
    s+=tan(465,222,'standing by',11,C.MUT,false,vis(0,0.28));
    s+=tan(465,222,'✓ confirmed',12,C.GRL,true,vis(0.30,1));
    s+=tan(465,186,'✓',20,C.GRL,true,vis(0.30,0.40));
    s+=tok('M155 214 L205 206',0.04,0.14,C.AS);
    s+=tan(180,196,'COMMIT',9.5,C.AL,true,vis(0.03,0.16));
    s+=tok('M355 188 L390 188',0.16,0.28,C.AS);
    s+=tan(372,178,'prepare check',9.5,C.AL,true,vis(0.16,0.30));
    s+=tok('M390 230 L355 230',0.38,0.50,C.GRL);
    s+=tan(372,246,'ack',9.5,C.GRL,true,vis(0.38,0.52));
    s+=tok('M205 226 L155 224',0.62,0.74,C.GRL);
    s+=tan(180,244,'200 OK',9.5,C.GRL,true,vis(0.62,0.76));
    s+=cap('The app sends COMMIT to the local node.',0,0.16,C.INK)
      +cap('Instead of replying immediately, the local node checks with its CAMO partner first.',0.16,0.38,C.AL)
      +cap('The partner confirms the write and acknowledges.',0.38,0.62,C.GRL)
      +cap('Only now does the app hear success — the write can never be lost or duplicated.',0.62,1.0,C.GRL);
    return svg(470,s);}

  /* ---- Commit scopes ---- */
  function commit(){var s='';
    s+=ba(200,28,160,56,'0;0.20;0.30;1',C.PF+';'+C.PF+';'+C.PF+';'+C.PF,C.PS+';'+C.PS+';'+C.PL+';'+C.PL)
      +tan(280,54,'Commit scope',13.5,C.PL,true,vis(0.20,1))+tan(280,72,'one rule book',10.5,C.MUT,false,vis(0.20,1));
    s+='<g opacity="0">'+vis(0.22,1)+line(250,84,110,180)+line(280,84,280,180)+line(310,84,450,180)+'</g>';
    s+=box(20,180,160,60,C.KF,C.KS)+title(100,206,'CAMO')+sub(100,226,'no double-charge',C.KL,0,1);
    s+=box(200,180,160,60,C.TF,C.TS)+title(280,206,'Sync commit')+sub(280,226,'wait for copies',C.TL,0,1);
    s+=box(380,180,160,60,C.AF,C.AS)+title(460,206,'Group commit')+sub(460,226,'wait for a quorum',C.AL,0,1);
    s+=tok('M280 180 L280 86',0.50,0.62,C.PL);
    s+=cap('Three separate durability mechanisms…',0,0.22,C.MUT)
      +cap('…are unified under one thing: commit scopes.',0.22,0.46,C.PL)
      +cap('You pick the rule you want for a group or transaction.',0.46,0.70,C.PL)
      +cap('PGD then enforces exactly that durability.',0.70,1.0);
    return svg(460,s);}

  /* ---- Witness nodes ---- */
  function witness(){var s='';
    s+=box(60,60,150,56,C.TF,C.TS)+title(135,86,'Data node')+sub(135,104,'votes + data',C.TL,0,1);
    s+=box(360,60,150,56,C.TF,C.TS)+title(435,86,'Data node')+sub(435,104,'votes + data',C.TL,0,1);
    s+=tok('M210 88 L360 88',0.06,0.16,C.CRL)+tok('M360 88 L210 88',0.16,0.26,C.CRL);
    s+=tan(285,52,'tie? no majority',12,C.CRL,true,vis(0.06,0.28));
    s+=ba(205,180,150,60,'0;0.28;0.34;1',C.GF+';'+C.GF+';'+C.AF+';'+C.AF,C.GS+';'+C.GS+';'+C.AS+';'+C.AS)
      +title(280,206,'Witness')+sub(280,226,'votes only · no data',C.AL,0.30,1);
    s+=tok('M280 80 L280 180',0.28,0.38,C.AL);
    s+=tok('M135 116 L255 182',0.46,0.58,C.AL)+tok('M435 116 L305 182',0.46,0.58,C.AL);
    s+=tan(280,150,'3 voters → majority ✓',12,C.GRL,true,vis(0.60,1.0));
    s+=cap('Two voters can deadlock in a tie.',0,0.28,C.CRL)
      +cap('Add a witness — it votes but stores no data.',0.28,0.46,C.AL)
      +cap('Now three voters always yield a clear majority.',0.46,0.74,C.GRL)
      +cap('The witness breaks ties cheaply.',0.74,1.0);
    return svg(470,s);}

  /* ---- Sharding ---- */
  function shard(){var s='';
    s+=ba(180,30,200,52,'0;0.5;0.6;1',C.GF+';'+C.GF+';'+C.GF+';'+C.GF,C.GS+';'+C.GS+';'+C.GS+';'+C.GS)
      +title(280,58,'ALL DATA')+sub(280,74,'too big for one node',C.MUT,0,0.55);
    s+=box(30,170,150,64,C.BF,C.BS)+title(105,196,'Shard A')+sub(105,216,'A–H',C.BL,0.40,1);
    s+=box(205,170,150,64,C.BF,C.BS)+title(280,196,'Shard B')+sub(280,216,'I–P',C.BL,0.42,1);
    s+=box(380,170,150,64,C.BF,C.BS)+title(455,196,'Shard C')+sub(455,216,'Q–Z',C.BL,0.44,1);
    s+='<g opacity="0">'+vis(0.40,1)+'</g>';
    s+=tok('M230 82 L105 170',0.24,0.40,C.BL)+tok('M280 82 L280 170',0.24,0.40,C.BL)+tok('M330 82 L455 170',0.24,0.40,C.BL);
    s+=tok('M280 16 L280 168',0.70,0.82,C.AS);
    s+=cap('One dataset, too big for a single node.',0,0.24,C.MUT)
      +cap('Sharding splits it into slices…',0.24,0.42,C.BL)
      +cap('…each node holds only its slice (A–H, I–P, Q–Z).',0.42,0.70,C.BL)
      +cap('A query routes to the shard that owns the data.',0.70,1.0,C.AL);
    return svg(470,s);}

  /* ---- Node lifecycle ---- */
  function lifecycle(){var s='';
    s+=box(60,40,120,46,C.TF,C.TS)+title(120,68,'Node A');
    s+=box(220,40,120,46,C.TF,C.TS)+title(280,68,'Node B');
    s+=box(380,40,120,46,C.TF,C.TS)+title(440,68,'Node C');
    // JOIN (left)
    s+=ba(30,170,150,64,'0;0.10;0.30;0.36;1',C.GF+';'+C.GF+';'+C.GF+';'+C.GRF+';'+C.GRF,C.GS+';'+C.GS+';'+C.GS+';'+C.GRS+';'+C.GRS)
      +tan(105,196,'New node',13,C.INK,true,vis(0.06,1))+sub(105,216,'joining…',C.MUT,0.06,0.36)+sub(105,216,'active ✓',C.GRL,0.36,1);
    s+=tok('M120 86 L105 170',0.14,0.30,C.TL);
    // PROMOTE (mid)
    s+=ba(205,170,150,64,'0;0.50;0.56;1',C.TF+';'+C.TF+';'+C.AF+';'+C.AF,C.TS+';'+C.TS+';'+C.AS+';'+C.AS)
      +title(280,196,'Standby')+sub(280,216,'standby',C.MUT,0,0.52)+sub(280,216,'promoted ★',C.AL,0.56,1)+crown(280,168,0.52,1.0);
    // PART (right)
    s+='<g>'+ani('opacity','0;0.74;0.86;1','1;1;0.18;0.18')+box(380,170,150,64,C.TF,C.TS)+title(455,196,'Dead node')+'</g>';
    s+=tan(455,206,'✗ parted',12,C.CRL,true,vis(0.78,1.0));
    s+=cap('A new node joins and syncs live from its peers.',0,0.30,C.TL)
      +cap('Once caught up, it becomes an active member.',0.30,0.50,C.GRL)
      +cap('A standby can be promoted to replace a failure.',0.50,0.74,C.AL)
      +cap('And a dead node is parted — cleanly removed.',0.74,1.0,C.CRL);
    return svg(470,s);}

  /* ---- Regional mesh & partition tolerance ---- */
  function meshpartition(){var s='';
    s+='<line x1="245" y1="104" x2="150" y2="250" stroke="'+C.TS+'" stroke-width="1.6" opacity="0.55"/>';
    var apKt='0;0.40;0.44;0.62;0.66;1';
    s+='<line x1="315" y1="104" x2="410" y2="250" stroke-width="1.6" opacity="0.55">'+ani('stroke',apKt,C.TS+';'+C.TS+';'+C.GS+';'+C.GS+';'+C.TS+';'+C.TS)+ani('stroke-dasharray',apKt,'0;0;6 5;6 5;0;0')+'</line>';
    s+='<line x1="190" y1="282" x2="370" y2="282" stroke-width="1.6" opacity="0.55">'+ani('stroke',apKt,C.TS+';'+C.TS+';'+C.GS+';'+C.GS+';'+C.TS+';'+C.TS)+ani('stroke-dasharray',apKt,'0;0;6 5;6 5;0;0')+'</line>';
    s+=box(205,40,150,64,C.TF,C.TS)+title(280,66,'US East')+tan(280,86,'writer',11,C.MUT,false,vis(0,1));
    s+=box(40,250,150,64,C.TF,C.TS)+title(115,276,'EU West')+tan(115,296,'replica',11,C.MUT,false,vis(0,1));
    s+=ba(370,250,150,64,apKt,C.TF+';'+C.TF+';'+C.GF+';'+C.GF+';'+C.TF+';'+C.TF,C.TS+';'+C.TS+';'+C.GS+';'+C.GS+';'+C.TS+';'+C.TS)
      +title(445,276,'AP South');
    s+=tan(445,296,'replica',11,C.MUT,false,vis(0,0.40));
    s+=tan(445,296,'✗ partitioned',11,C.CRL,true,vis(0.42,0.64));
    s+=tan(445,296,'replica',11,C.GRL,false,vis(0.66,1));
    s+=tok('M280 6 L280 40',0.06,0.12,C.AS);
    s+=tok('M255 104 L165 250',0.20,0.32,C.TL);
    s+=tok('M310 104 L405 250',0.20,0.32,C.TL);
    s+='<circle cx="280" cy="150" r="22" fill="none" stroke="'+C.AS+'" stroke-width="1.6" stroke-dasharray="4 4" opacity="0">'+vis(0.44,0.66)+'</circle>';
    s+=tan(280,155,'⏳',15,C.AL,false,vis(0.44,0.66));
    s+='<circle cx="268" cy="164" r="3.5" fill="'+C.AL+'" opacity="0">'+vis(0.46,0.66)+'</circle>';
    s+='<circle cx="280" cy="164" r="3.5" fill="'+C.AL+'" opacity="0">'+vis(0.51,0.66)+'</circle>';
    s+='<circle cx="292" cy="164" r="3.5" fill="'+C.AL+'" opacity="0">'+vis(0.56,0.66)+'</circle>';
    s+=tan(280,182,'writes queued',10,C.AL,false,vis(0.52,0.66));
    s+=tok('M300 150 L410 250',0.67,0.78,C.AS);
    s+=cap('Three regions, fully meshed — every node can accept writes.',0,0.06,C.INK)
      +cap('A write lands on US East and commits locally.',0.06,0.20,C.INK)
      +cap('It replicates concurrently to EU West and AP South.',0.20,0.40,C.TL)
      +cap('A network partition isolates AP South.',0.40,0.44,C.CRL)
      +cap('US East buffers writes destined for AP South until the link recovers.',0.44,0.66,C.AL)
      +cap('Connectivity returns — buffered changes flush through in order.',0.66,0.84,C.TL)
      +cap('AP South catches up and all three regions converge.',0.84,1.0,C.GRL);
    return svg(470,s);}

  /* ---- Zero-downtime rolling upgrade ---- */
  function rollingupgrade(){var s='';
    var nodes=[{x:30,w:[0.06,0.17,0.28,0.36]},{x:205,w:[0.42,0.52,0.63,0.66]},{x:380,w:[0.72,0.82,0.93,0.94]}];
    var Y=150,H=90;
    s+='<line x1="180" y1="195" x2="205" y2="195" stroke="'+C.TL+'" stroke-width="2">'
      +ani('opacity','0;0.06;0.09;0.36;0.39;0.42;0.45;0.66;0.69;1','0.6;0.6;0.15;0.15;0.6;0.6;0.15;0.15;0.6;0.6')+'</line>';
    s+='<line x1="355" y1="195" x2="380" y2="195" stroke="'+C.TL+'" stroke-width="2">'
      +ani('opacity','0;0.42;0.45;0.66;0.69;0.72;0.75;0.94;0.97;1','0.6;0.6;0.15;0.15;0.6;0.6;0.15;0.15;0.6;0.6')+'</line>';
    nodes.forEach(function(nd,i){
      var w=nd.w, kt='0;'+w[1]+';'+w[2]+';1', cx=nd.x+75;
      s+=ba(nd.x,Y,150,H,kt,C.TF+';'+C.TF+';'+C.PF+';'+C.PF,C.TS+';'+C.TS+';'+C.PS+';'+C.PS)
        +title(cx,Y+34,'Node '+(i+1));
      s+=flip(cx,Y+56,'PGD v4','PGD v5/v6',(w[1]+w[2])/2,11,C.TL,C.PL,true);
      var dimKt='0;'+w[0]+';'+f(w[0]+0.02)+';'+w[2]+';'+f(w[2]+0.02)+';1';
      s+='<g opacity="1">'+ani('opacity',dimKt,'1;1;0.15;0.15;1;1');
      for(var k=0;k<3;k++){
        var begin=(k*0.5)+'s';
        s+='<circle cx="'+(nd.x+16)+'" cy="0" r="3" fill="'+C.GRL+'" opacity="0">'
          +'<animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur="1.6s" begin="'+begin+'" repeatCount="indefinite"/>'
          +'<animateMotion dur="1.6s" begin="'+begin+'" repeatCount="indefinite" path="M0 '+(Y+H-18)+' L0 '+(Y+18)+'"/></circle>';
      }
      s+='</g>';
      s+='<rect x="'+(nd.x-10)+'" y="130" width="170" height="130" rx="16" fill="#ffffff" fill-opacity="0.06" stroke="'+C.PL+'" stroke-width="1.8" stroke-dasharray="6 5" opacity="0">'+vis(w[0],w[3])+'</rect>';
      s+=tan(cx,124,'🛡',15,C.PL,false,vis(w[0],w[3]));
    });
    s+=cap('Three-node cluster running PGD v4, serving live traffic.',0,0.06,C.INK)
      +cap('A rolling upgrade begins — Node 1 is shielded and isolated from replication.',0.06,0.17,C.PL)
      +cap('Behind the shield it upgrades to PGD v6 while Node 2 and Node 3 keep serving.',0.17,0.36,C.PL)
      +cap('Node 1 rejoins on the new version — zero downtime. Node 2 is next.',0.36,0.63,C.GRL)
      +cap('Node 2 rejoins; Node 3 takes its turn behind the shield.',0.63,0.93,C.GRL)
      +cap('The entire cluster now runs PGD v6 — upgraded node by node, without a second of downtime.',0.93,1.0,C.GRL);
    return svg(470,s);}

  /* ---- Galloc sequences ---- */
  function galloc(){var s='';
    s+=title(280,22,'Global Sequence Manager');
    s+='<path d="M230 32 L330 32 L312 54 L248 54 Z" fill="'+C.PF+'" fill-opacity="0.4" stroke="'+C.PS+'" stroke-width="1.6"/>';
    var rows=[{y:76,label:'Node 1',block:'1–1000'},{y:186,label:'Node 2',block:'1001–2000'},{y:296,label:'Node 3',block:'2001–3000'}];
    rows.forEach(function(r,i){
      s+=box(60,r.y,110,54,C.TF,C.TS)+title(115,r.y+24,r.label);
      var dropA=f(0.06+i*0.05), dropB=f(0.16+i*0.05);
      s+=tok('M280 54 Q280 '+f((54+r.y)/2)+' 115 '+r.y,dropA,dropB,C.PS);
      s+=tan(115,r.y+70,'block '+r.block,10.5,C.PL,true,vis(dropB,1));
    });
    s+='<rect x="55" y="'+(rows[1].y-6)+'" width="440" height="66" rx="12" fill="#000" opacity="0">'+ani('opacity','0;0.26;0.28;0.56;0.58;1','0;0;0.4;0.4;0;0')+'</rect>';
    s+='<rect x="55" y="'+(rows[2].y-6)+'" width="440" height="66" rx="12" fill="#000" opacity="0">'+ani('opacity','0;0.26;0.28;0.56;0.58;1','0;0;0.4;0.4;0;0')+'</rect>';
    var counters=['1','2','…','247','…','999'], span=0.28, n=counters.length;
    counters.forEach(function(txt,i){
      var a=f(0.30+span*(i/n)), b=f(0.30+span*((i+1)/n));
      s+=tan(430,rows[0].y+30,txt,15,C.AL,true,vis(a,b));
    });
    for(var k=0;k<3;k++){
      s+='<circle cx="'+(160+k*30)+'" cy="'+(rows[0].y+18)+'" r="3.5" fill="'+C.TL+'" opacity="0">'+vis(0.30,0.58)
        +'<animateMotion dur="0.7s" begin="'+(k*0.15)+'s" repeatCount="indefinite" path="M0 0 L220 0"/></circle>';
    }
    s+=tan(280,rows[0].y+70,'no network round-trip needed',10.5,C.MUT,false,vis(0.30,0.58));
    s+='<rect x="60" y="'+rows[0].y+'" width="440" height="54" rx="10" fill="'+C.CRL+'" fill-opacity="0">'
      +ani('fill-opacity','0;0.58;0.62;0.72;0.76;1','0;0;0.22;0.22;0;0')+'</rect>';
    s+=tan(280,rows[0].y+30,'1000 / 1000 used',13,C.CRL,true,vis(0.60,0.72));
    s+=tok('M120 '+rows[0].y+' Q160 40 260 54',0.62,0.72,C.CRL);
    s+=tok('M280 54 Q280 40 120 '+rows[0].y,0.74,0.86,C.PS);
    s+=tan(115,rows[0].y+70,'block 3001–4000',10.5,C.PL,true,vis(0.86,1));
    s+=cap('The global manager pre-allocates a block of IDs to each node.',0,0.28,C.INK)
      +cap('Node 1 hands out numbers from its own block — fast and clash-free.',0.28,0.58,C.AL)
      +cap('Node 1 exhausts its block and signals the manager.',0.58,0.74,C.CRL)
      +cap('A fresh block arrives and Node 1 resumes — without touching the other nodes.',0.74,1.0,C.GRL);
    return svg(470,s);}

  var map={
    "The mesh":mesh, "Eventual consistency":eventual, "What is a conflict?":conflict,
    "Conflict resolution":confres, "The Write Leader":leader, "Switchover & failover":failover,
    "CAMO":camo, "Commit scopes":commit, "Witness nodes":witness, "Sharding":shard,
    "Node lifecycle":lifecycle, "Regional mesh & partition tolerance":meshpartition,
    "Zero-downtime rolling upgrade":rollingupgrade, "Galloc sequences":galloc
  };
  window.PGD_STORY = window.PGD_STORY || {};
  var NR={
    "The mesh":"A write on one database streams directly to every copy, and any node can originate the next change — that is the multi-master mesh.",
    "Eventual consistency":"One node commits first; another is briefly behind, then applies the change. Copies are not identical instantly, but they converge within moments.",
    "What is a conflict?":"Two nodes change the same row at the same instant with different values. The changes collide — that clash is a conflict PGD must resolve.",
    "Conflict resolution":"The resolver compares the two writes; by default the later one wins, and that value is applied on every node so the copies agree again.",
    "The Write Leader":"All writes route to one elected leader, which streams them to the followers in a single order — keeping changes consistent.",
    "Switchover & failover":"Clients reach the leader through the Connection Manager. When the leader fails, Raft elects a new one and traffic reroutes — same address, minimal downtime.",
    "CAMO":"The app's node confirms with its CAMO partner that the write is stored before telling the app 'done', so the transaction commits at most once.",
    "Commit scopes":"Version 6 unifies CAMO, synchronous and group commit into one thing — commit scopes — and enforces exactly the durability rule you choose.",
    "Witness nodes":"Two voters can tie. A witness votes but stores no data, making three voters and a guaranteed majority — breaking ties cheaply.",
    "Sharding":"A dataset too big for one node is split into slices; each node holds only its slice, and queries route to the shard that owns the data.",
    "Node lifecycle":"A node joins and syncs, a standby is promoted to replace a failure, and a dead node is parted — the cluster grows and heals without downtime.",
    "Regional mesh & partition tolerance":"Every node in the mesh can accept writes and replicates directly to every other node. If a link between two regions drops, the origin node buffers the outgoing changes and flushes them once connectivity returns, so the partitioned region catches up automatically.",
    "Zero-downtime rolling upgrade":"A rolling upgrade takes one node out of the replication path at a time, upgrades it, and rejoins it before moving to the next, so the whole cluster moves to a new major version without ever stopping traffic.",
    "Galloc sequences":"A global manager pre-allocates a block of ID values to each node. Each node hands out numbers from its own block with no network round trip, and only asks the manager for a fresh block once its own runs out."
  };
  Object.keys(map).forEach(function(t){ window.PGD_STORY[t]={ sc:map[t], phases:[{nr:NR[t]}] }; });
})();
