/* ============================================================
   story_whiteboard.js — "hand-drawn whiteboard" self-running scenes:
   light paper background, hand-lettering, minimalist line-art human
   characters. Built on window.MOTWB (motion_wb.js). Overrides
   PGD_STORY by title — loaded after story_pilot.js so it wins for
   any title also touched there (e.g. "Multi-master writes").
   ============================================================ */
(function(){
  var M=window.MOTWB, C=M.C, HAND=M.HAND, f=M.f, person=M.person, paper=M.paper, cyl=M.cyl;

  /* ---- PGD 4 Architecture (Bronze / Silver / Gold / Platinum) ---- */
  function pgd4Architecture(){
    var H=M.makeH(24), s=paper(640,480);
    s+='<text x="320" y="20" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">PGD 4 Architecture</text>';
    s+=H.tan(320,50,'Bronze',20,C.PURPLE,true,H.vis(0,0.27));
    s+=H.tan(320,50,'Silver',20,C.PURPLE,true,H.vis(0.27,0.52));
    s+=H.tan(320,50,'Gold',20,C.PURPLE,true,H.vis(0.52,0.77));
    s+=H.tan(320,50,'Platinum',20,C.PURPLE,true,H.vis(0.77,1));
    s+=person(30,150,'DBA',null);

    /* Bronze: 1 location — 2 data + witness, + local backup outside */
    s+='<g opacity="0">'+H.vis(0,0.27)
      +'<rect x="150" y="85" width="280" height="170" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="165" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location A</text>'
      +cyl(165,120,110,46,'Data 1',null,C.BLUE)
      +cyl(295,120,110,46,'Data 2',null,C.BLUE)
      +cyl(230,195,110,46,'Witness',null,C.AMBER)
      +cyl(470,140,130,46,'Local Backup',null,C.GRAY)
      +'</g>';
    s+=H.tan(320,320,'2 data + 1 witness · 1 location',14,C.INK,false,H.vis(0,0.27));

    /* Silver: 1 location (3 data) + 2nd location offsite backup */
    s+='<g opacity="0">'+H.vis(0.27,0.52)
      +'<rect x="110" y="85" width="260" height="170" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="125" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location A</text>'
      +cyl(125,120,110,46,'Data 1',null,C.BLUE)
      +cyl(255,120,110,46,'Data 2',null,C.BLUE)
      +cyl(190,195,110,46,'Data 3',null,C.BLUE)
      +'<rect x="410" y="110" width="190" height="100" rx="12" fill="none" stroke="'+C.GRAY+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="425" y="130" font-family="'+HAND+'" font-size="14" fill="'+C.GRAY+'" font-weight="700">Location B</text>'
      +cyl(425,145,160,46,'Offsite Backup',null,C.GRAY)
      +'</g>';
    s+=H.tan(320,320,'3 data · 2 locations',14,C.INK,false,H.vis(0.27,0.52));

    /* Gold: 2 locations (2 data each) + 3rd-location witness */
    s+='<g opacity="0">'+H.vis(0.52,0.77)
      +'<rect x="75" y="85" width="220" height="130" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="90" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location A</text>'
      +cyl(90,120,90,44,'Data',null,C.BLUE)
      +cyl(190,120,90,44,'Data',null,C.BLUE)
      +'<rect x="345" y="85" width="220" height="130" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="360" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location B</text>'
      +cyl(360,120,90,44,'Data',null,C.BLUE)
      +cyl(460,120,90,44,'Data',null,C.BLUE)
      +'<rect x="245" y="225" width="150" height="65" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="258" y="243" font-family="'+HAND+'" font-size="14" fill="'+C.AMBER+'" font-weight="700">Location C</text>'
      +cyl(258,247,124,40,'Witness',null,C.AMBER)
      +'</g>';
    s+=H.tan(320,320,'4 data + 1 witness · 3 locations',14,C.INK,false,H.vis(0.52,0.77));

    /* Platinum: 2 locations (3 data each + hot standbys) */
    s+='<g opacity="0">'+H.vis(0.77,1)
      +'<rect x="60" y="85" width="230" height="175" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="75" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location A</text>'
      +cyl(72,120,95,42,'Data',null,C.BLUE)
      +cyl(177,120,95,42,'Data',null,C.BLUE)
      +cyl(124,185,95,42,'Data',null,C.BLUE)
      +'<rect x="350" y="85" width="230" height="175" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="365" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location B</text>'
      +cyl(362,120,95,42,'Data',null,C.BLUE)
      +cyl(467,120,95,42,'Data',null,C.BLUE)
      +cyl(414,185,95,42,'Data',null,C.BLUE)
      +'</g>';
    s+=H.tan(320,278,'+ hot standby redundant hardware',14,C.PURPLE,true,H.vis(0.79,1));
    s+=H.tan(320,320,'4 data + 2 standbys · 2 locations',14,C.INK,false,H.vis(0.77,1));

    s+=H.cap(320,450,'PGD 4 shipped four named Always-On tiers, from smallest to largest.',0,0.14,C.INK)
      +H.cap(320,450,'Bronze: two data nodes and a witness, one location, plus a local backup.',0.14,0.27,C.BLUE)
      +H.cap(320,450,'Silver: three data nodes, plus a second location holding an offsite backup.',0.27,0.52,C.BLUE)
      +H.cap(320,450,'Gold: two locations of two data nodes, plus a third-location witness for Raft majority.',0.52,0.77,C.AMBER)
      +H.cap(320,450,'Platinum: two locations of three data nodes each, with redundant hot-standby hardware.',0.77,1.0,C.PURPLE);
    return '<svg viewBox="0 0 640 480" role="img"><title>PGD 4 architecture tiers</title>'+s+'</svg>';
  }

  /* ---- PGD 5 Architecture (Single-location / Multi-location) ---- */
  function pgd5Architecture(){
    var H=M.makeH(18), s=paper(640,460);
    s+='<text x="320" y="20" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">PGD 5 Architecture</text>';
    s+=H.tan(320,50,'Single-Location',18,C.PURPLE,true,H.vis(0,0.48));
    s+=H.tan(320,50,'Multi-Location',18,C.PURPLE,true,H.vis(0.48,1));
    s+=person(30,150,'DBA',null);

    /* Single-location: 3-node group, each node + proxy */
    s+='<g opacity="0">'+H.vis(0,0.48)
      +'<rect x="140" y="85" width="340" height="180" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="155" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Single Location</text>'
      +cyl(160,120,110,46,'Data 1','+proxy',C.BLUE)
      +cyl(290,120,110,46,'Data 2','+proxy',C.BLUE)
      +cyl(225,195,110,46,'Data 3','+proxy',C.BLUE)
      +'</g>';
    s+=H.tan(320,300,'Min 3 nodes · ≥2 proxies per location',14,C.INK,false,H.vis(0,0.48));

    /* Multi-location: 2 locations (2 data + witness each) + 3rd-location global witness */
    s+='<g opacity="0">'+H.vis(0.48,1)
      +'<rect x="75" y="80" width="220" height="150" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="90" y="100" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location A</text>'
      +cyl(90,112,90,42,'Data',null,C.BLUE)
      +cyl(190,112,90,42,'Data',null,C.BLUE)
      +cyl(140,165,90,42,'Witness',null,C.AMBER)
      +'<rect x="345" y="80" width="220" height="150" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="360" y="100" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Location B</text>'
      +cyl(360,112,90,42,'Data',null,C.BLUE)
      +cyl(460,112,90,42,'Data',null,C.BLUE)
      +cyl(410,165,90,42,'Witness',null,C.AMBER)
      +'<rect x="235" y="245" width="170" height="65" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="248" y="263" font-family="'+HAND+'" font-size="14" fill="'+C.AMBER+'" font-weight="700">Location C</text>'
      +cyl(248,267,144,38,'Witness','global Raft',C.AMBER)
      +'</g>';
    s+=H.tan(320,335,'6 data/witness + 3rd-location witness',14,C.INK,false,H.vis(0.48,1));

    s+=H.cap(320,430,'PGD 5 offers two building blocks: single-location and multi-location.',0,0.14,C.INK)
      +H.cap(320,430,'A single location runs the basic 3-node group, each with its own PGD Proxy.',0.14,0.48,C.BLUE)
      +H.cap(320,430,'Multi-location doubles that across two sites…',0.48,0.66,C.BLUE)
      +H.cap(320,430,'…plus a witness-only third location, so global Raft survives losing a whole site.',0.66,1.0,C.AMBER);
    return '<svg viewBox="0 0 640 460" role="img"><title>PGD 5 architecture</title>'+s+'</svg>';
  }

  /* ---- PGD 6 Architecture (Single group / Two groups / Read scaling) ---- */
  function pgd6Architecture(){
    var H=M.makeH(20), s=paper(640,460);
    s+='<text x="320" y="20" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">PGD 6 Architecture</text>';
    s+=H.tan(320,50,'Single Data Group',17,C.PURPLE,true,H.vis(0,0.32));
    s+=H.tan(320,50,'Two Data Groups',17,C.PURPLE,true,H.vis(0.32,0.64));
    s+=H.tan(320,50,'Read Scaling',17,C.PURPLE,true,H.vis(0.64,1));
    s+=person(30,150,'DBA',null);

    /* Single data group */
    s+='<g opacity="0">'+H.vis(0,0.32)
      +'<rect x="170" y="90" width="300" height="170" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="185" y="110" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">One Data Group</text>'
      +cyl(190,125,110,46,'Leader',null,C.AMBER)
      +cyl(320,125,110,46,'Data 2',null,C.BLUE)
      +cyl(255,195,110,46,'Data 3',null,C.BLUE)
      +'</g>';
    s+=H.tan(320,235,'★',18,C.AMBER,true,H.vis(0.03,0.32));
    s+=H.tan(320,320,'Min 3 data nodes · 1 location',14,C.INK,false,H.vis(0,0.32));

    /* Two data groups (active-active) */
    s+='<g opacity="0">'+H.vis(0.32,0.64)
      +'<rect x="75" y="85" width="220" height="145" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="90" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Group / Loc A</text>'
      +cyl(90,118,90,42,'★ Lead',null,C.AMBER)
      +cyl(190,118,90,42,'Data',null,C.BLUE)
      +cyl(140,168,90,42,'Data',null,C.BLUE)
      +'<rect x="345" y="85" width="220" height="145" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="360" y="105" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Group / Loc B</text>'
      +cyl(360,118,90,42,'★ Lead',null,C.AMBER)
      +cyl(460,118,90,42,'Data',null,C.BLUE)
      +cyl(410,168,90,42,'Data',null,C.BLUE)
      +'</g>';
    s+=H.tan(320,320,'3 nodes/location · 2 locations, active-active',14,C.INK,false,H.vis(0.32,0.64));

    /* Read scaling with subscriber-only nodes */
    s+='<g opacity="0">'+H.vis(0.64,1)
      +'<rect x="60" y="95" width="280" height="160" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" stroke-dasharray="5 5"/>'
      +'<text x="75" y="115" font-family="'+HAND+'" font-size="14" fill="'+C.BLUE+'" font-weight="700">Data Group</text>'
      +cyl(75,130,100,44,'★ Leader',null,C.AMBER)
      +cyl(195,130,100,44,'Data 2',null,C.BLUE)
      +cyl(135,190,100,44,'Data 3',null,C.BLUE)
      +cyl(400,105,150,44,'Sub-only','read scale',C.PURPLE)
      +cyl(400,175,150,44,'Sub-only','read scale',C.PURPLE)
      +H.token('M340,150 L400,127',0.68,0.80,C.PURPLE)
      +H.token('M340,180 L400,197',0.70,0.82,C.PURPLE)
      +'</g>';
    s+=H.tan(320,320,'3 data + N subscriber-only',14,C.INK,false,H.vis(0.64,1));

    s+=H.cap(320,430,'PGD 6 replaces named tiers with deployment patterns.',0,0.10,C.INK)
      +H.cap(320,430,'A single data group — three nodes, one Raft group — is the foundational pattern.',0.10,0.32,C.AMBER)
      +H.cap(320,430,'Two data groups run active-active across locations, each with its own write leader.',0.32,0.64,C.BLUE)
      +H.cap(320,430,'Subscriber-only nodes receive changes but never vote or write — scaling reads for free.',0.64,1.0,C.PURPLE);
    return '<svg viewBox="0 0 640 460" role="img"><title>PGD 6 architecture</title>'+s+'</svg>';
  }

  /* ---- Architecture Overview: v4 -> v6 ---- */
  function archOverview(){
    var H=M.makeH(22), s=paper(600,460);
    s+='<text x="300" y="20" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Architecture Overview: v4 → v6</text>';
    s+=H.tan(300,78,'v4',22,C.PURPLE,true,H.vis(0,0.36));
    s+=H.tan(300,78,'v5',22,C.PURPLE,true,H.vis(0.36,0.66));
    s+=H.tan(300,78,'v6',22,C.PURPLE,true,H.vis(0.66,1));
    s+=person(55,150,'App','tablet');
    s+='<g opacity="0">'+H.vis(0,0.34)+cyl(210,112,180,60,'HARP','external layer',C.GRAY)+'</g>';
    s+='<g opacity="0">'+H.vis(0.34,0.64)+cyl(210,112,180,60,'PGD Proxy','built-in',C.PURPLE)+'</g>';
    s+='<g opacity="0">'+H.vis(0,0.36)+cyl(40,250,160,64,'Lead Master',null,C.AMBER)+'</g>';
    s+='<g opacity="0">'+H.vis(0.36,1)+cyl(40,250,160,64,'Write Leader',null,C.AMBER)+'</g>';
    s+=H.tan(120,236,'★',18,C.AMBER,true,H.vis(0.14,1));
    s+='<g opacity="0">'+H.vis(0,0.36)+cyl(220,250,160,64,'Shadow Master',null,C.GRAY)+'</g>';
    s+='<g opacity="0">'+H.vis(0.36,1)+cyl(220,250,160,64,'Follower',null,C.BLUE)+'</g>';
    s+='<g opacity="0">'+H.vis(0,0.36)+cyl(400,250,160,64,'Shadow Master',null,C.GRAY)+'</g>';
    s+='<g opacity="0">'+H.vis(0.36,1)+cyl(400,250,160,64,'Follower',null,C.BLUE)+'</g>';
    s+=H.token('M100 158 L210 142',0.10,0.30,C.BLUE);
    s+=H.token('M240 172 L120 250',0.16,0.34,C.PURPLE);
    s+=H.token('M100 158 L210 142',0.40,0.60,C.BLUE);
    s+=H.token('M240 172 L120 250',0.46,0.62,C.PURPLE);
    s+=H.token('M100 158 Q160 210 120 250',0.70,0.86,C.GREEN);
    s+=H.tan(120,330,'+ CM',14,C.GREEN,true,H.vis(0.66,1));
    s+=H.tan(300,330,'+ CM',14,C.GREEN,true,H.vis(0.66,1));
    s+=H.tan(480,330,'+ CM',14,C.GREEN,true,H.vis(0.66,1));
    s+=H.tan(300,368,'+ HTTP API for automation',14,C.PURPLE,true,H.vis(0.80,1));
    s+=H.cap(300,430,'Let’s trace PGD’s architecture from v4 to v6.',0,0.08,C.INK)
      +H.cap(300,430,'In v4, HARP is an external layer routing to one leader.',0.08,0.20,C.PURPLE)
      +H.cap(300,430,'The rest are discouraged shadow masters.',0.20,0.36,C.PURPLE)
      +H.cap(300,430,'v5 removes HARP — routing becomes the built-in PGD Proxy.',0.36,0.50,C.PURPLE)
      +H.cap(300,430,'PGD’s own Raft elects a single write leader.',0.50,0.66,C.PURPLE)
      +H.cap(300,430,'v6 moves routing onto every node — the Connection Manager.',0.66,0.80,C.GREEN)
      +H.cap(300,430,'Each node adds an HTTP API for automation.',0.80,0.92,C.GREEN)
      +H.cap(300,430,'Same engine throughout — just simpler, version after version.',0.92,1.0,C.INK);
    return '<svg viewBox="0 0 600 460" role="img"><title>architecture overview v4 to v6</title>'+s+'</svg>';
  }

  /* ---- Course Map (intro / table of contents) ---- */
  function courseMap(){
    var H=M.makeH(20), s=paper(600,520);
    s+='<text x="300" y="24" text-anchor="middle" font-family="'+HAND+'" font-size="19" fill="'+C.INK+'" font-weight="700">What We’ll Cover</text>';
    s+=person(55,240,'Guide',null);
    var items=[
      'Architecture Evolution (4 → 6)',
      'Foundations',
      'Conflicts &amp; Data Safety',
      'Coordination (Raft)',
      'Durability &amp; Safe Writes',
      'Version 4 — BDR + HARP',
      'Version 5 — PGD + Proxy',
      'Version 6 — Editions &amp; Commit Scopes',
      'Sequences &amp; Partitioning',
      'Operations &amp; Recovery'
    ];
    items.forEach(function(label,i){
      var y=64+i*37, a=f(0.04+i*0.075);
      s+='<circle cx="150" cy="'+y+'" r="17" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2.2" opacity="0">'+H.vis(a,1)+'</circle>';
      s+=H.tan(150,y+5,''+(i+1),14,C.BLUE,true,H.vis(a,1));
      s+=H.tan(390,y+5,label,14,C.INK,false,H.vis(a,1));
    });
    s+=H.tan(300,425,'✓ 64 topics ahead — let’s dive in',16,C.GREEN,true,H.vis(0.80,1));
    s+=H.cap(300,495,'Welcome to the PGD explainer. Here’s a quick map of everything ahead.',0,0.11,C.INK)
      +H.cap(300,495,'We’ll start with how PGD’s architecture evolved, then cover the foundations everyone needs.',0.11,0.34,C.BLUE)
      +H.cap(300,495,'Next: conflict handling, Raft coordination, durability, and the version 4 specifics.',0.34,0.57,C.BLUE)
      +H.cap(300,495,'Then version 5, version 6, and how distributed sequences and partitioning work.',0.57,0.80,C.BLUE)
      +H.cap(300,495,'And finally, day-to-day operations and recovery. Let’s dive in.',0.80,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 520" role="img"><title>course map</title>'+s+'</svg>';
  }

  /* ---- PITR with Barman ---- */
  function pitrBarman(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">PITR with Barman</text>';
    s+=person(55,280,'DBA','tablet');
    s+=cyl(60,90,180,64,'PGD Cluster',null,C.BLUE);
    s+=cyl(340,90,180,64,'Barman Vault','WAL archive',C.PURPLE);
    s+=H.token('M240 122 L340 122',0.10,0.24,C.PURPLE);
    s+=H.token('M240 122 L340 122',0.40,0.54,C.PURPLE);
    s+=H.tan(430,230,'restore to 10:32 AM',14,C.PURPLE,true,H.vis(0.40,0.62));
    s+='<g opacity="0">'+H.vis(0.60,1)+cyl(200,300,200,64,'Fresh Node','restored to that moment',C.GREEN)+'</g>';
    s+=H.token('M400 154 L340 300',0.44,0.60,C.PURPLE);
    s+=H.cap(300,430,'Barman continuously backs up the cluster and archives WAL.',0,0.10,C.INK)
      +H.cap(300,430,'For point-in-time recovery, you pick a moment in time…',0.10,0.34,C.PURPLE)
      +H.cap(300,430,'…and restore a backup to exactly that point, onto a fresh node.',0.34,0.60,C.PURPLE)
      +H.cap(300,430,'That node becomes the seed for a brand-new PGD cluster.',0.60,0.82,C.GREEN)
      +H.cap(300,430,'A full rewind, without touching the live cluster.',0.82,1.0,C.INK);
    return '<svg viewBox="0 0 600 460" role="img"><title>PITR with barman</title>'+s+'</svg>';
  }

  /* ---- Eager replication ---- */
  function eagerReplication(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Eager Replication</text>';
    s+=person(55,260,'App','tablet');
    s+=cyl(40,140,160,64,'Node 1',null,C.BLUE);
    s+=cyl(220,140,160,64,'Node 2',null,C.BLUE);
    s+=cyl(400,140,160,64,'Node 3',null,C.BLUE);
    s+=H.token('M100 130 L110 140',0.10,0.22,C.BLUE);
    s+=H.token('M150 122 L300 140',0.10,0.22,C.BLUE);
    s+=H.token('M180 122 L470 140',0.10,0.22,C.BLUE);
    s+=H.flip(120,224,'applying…','applied ✓',0.50,14,C.AMBER,C.GREEN,true);
    s+=H.flip(300,224,'applying…','applied ✓',0.50,14,C.AMBER,C.GREEN,true);
    s+=H.flip(480,224,'applying…','applied ✓',0.50,14,C.AMBER,C.GREEN,true);
    s+=H.tan(300,280,'commit returns ✓',15,C.GREEN,true,H.vis(0.58,0.80));
    s+=H.tan(300,320,'requires Parallel Apply off',14,C.GRAY,false,H.vis(0.80,1));
    s+=H.cap(300,410,'Eager replication applies a transaction on every node before commit returns.',0,0.10,C.INK)
      +H.cap(300,410,'The write goes out to all three nodes at once.',0.10,0.30,C.BLUE)
      +H.cap(300,410,'Each must confirm — any conflict is caught right then, not later.',0.30,0.55,C.AMBER)
      +H.cap(300,410,'Only when every node agrees does commit return — the strongest consistency.',0.55,0.80,C.GREEN)
      +H.cap(300,410,'In version 6, this needs Parallel Apply turned off.',0.80,1.0,C.GRAY);
    return '<svg viewBox="0 0 600 440" role="img"><title>eager replication</title>'+s+'</svg>';
  }

  /* ---- Resynchronize a table ---- */
  function resyncTable(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Resynchronize a Table</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(90,90,180,64,'Node A','table intact',C.BLUE);
    s+=cyl(330,90,180,64,'Node B',null,C.RED);
    s+=H.flip(420,180,'table erased','table restored ✓',0.60,14,C.RED,C.GREEN,true);
    s+='<text x="300" y="224" text-anchor="middle" font-family="monospace" font-size="14" fill="'+C.PURPLE+'" font-weight="700" opacity="0">bdr.resynchronize_table_from_node()'+H.vis(0.30,0.82)+'</text>';
    s+=H.token('M270 122 L330 122',0.55,0.70,C.GREEN);
    s+=H.cap(300,410,'A non-replicated TRUNCATE or DELETE can erase a table on one node.',0,0.10,C.INK)
      +H.cap(300,410,'Node B’s table is gone, but Node A still has it.',0.10,0.30,C.RED)
      +H.cap(300,410,'Running resynchronize_table_from_node re-copies just that table.',0.30,0.55,C.PURPLE)
      +H.cap(300,410,'It blocks until done, then reports how many rows were copied.',0.55,0.80,C.BLUE)
      +H.cap(300,410,'One table repaired — no need to rebuild the whole node.',0.80,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>resynchronize a table</title>'+s+'</svg>';
  }

  /* ---- Skip changes up to an LSN ---- */
  function skipChangesLSN(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="17" fill="'+C.INK+'" font-weight="700">Skip Changes Up to an LSN</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(90,90,180,64,'Leader',null,C.BLUE);
    s+=cyl(330,90,180,64,'Follower',null,C.RED);
    s+=H.tan(300,122,'🚫',22,C.RED,false,H.vis(0.10,0.60));
    s+=H.flip(420,180,'stuck ✗','resumed ✓',0.60,14,C.RED,C.GREEN,true);
    s+='<text x="300" y="224" text-anchor="middle" font-family="monospace" font-size="14" fill="'+C.PURPLE+'" font-weight="700" opacity="0">skip_changes_upto(sub, lsn)'+H.vis(0.34,0.82)+'</text>';
    s+=H.tan(300,264,'⚠ may lose skipped data — verify after',14,C.AMBER,true,H.vis(0.80,1));
    s+=H.cap(300,410,'Sometimes a single poison change blocks a subscription from applying anything further.',0,0.10,C.INK)
      +H.cap(300,410,'The follower is stuck, unable to get past it.',0.10,0.34,C.RED)
      +H.cap(300,410,'skip_changes_upto tells it to jump past that LSN.',0.34,0.60,C.PURPLE)
      +H.cap(300,410,'Replication resumes — but the skipped change is gone.',0.60,0.80,C.GREEN)
      +H.cap(300,410,'A blunt last resort — verify and reconcile afterward.',0.80,1.0,C.AMBER);
    return '<svg viewBox="0 0 600 440" role="img"><title>skip changes up to an lsn</title>'+s+'</svg>';
  }

  /* ---- Distributed sequences ---- */
  function distributedSequences(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Distributed Sequences</text>';
    s+=person(55,300,'DBA','tablet');
    s+=cyl(40,90,160,64,'Node 1',null,C.BLUE);
    s+=cyl(220,90,160,64,'Node 2',null,C.BLUE);
    s+=cyl(400,90,160,64,'Node 3',null,C.BLUE);
    s+=H.flip(120,180,'id: 101','id: 101-A',0.55,14,C.RED,C.GREEN,true);
    s+=H.flip(300,180,'id: 101','id: 101-B',0.55,14,C.RED,C.GREEN,true);
    s+=H.flip(480,180,'id: 101','id: 101-C',0.55,14,C.RED,C.GREEN,true);
    s+=H.tan(300,214,'💥 CLASH!',15,C.RED,true,H.vis(0.20,0.36));
    s+='<rect x="15" y="250" width="170" height="36" rx="18" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.80,1)+'</rect>';
    s+=H.tan(100,273,'distributed ★',14,C.BLUE,true,H.vis(0.80,1));
    s+='<rect x="195" y="250" width="150" height="36" rx="18" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2" opacity="0">'+H.vis(0.84,1)+'</rect>';
    s+=H.tan(270,273,'snowflakeid',14,C.PURPLE,true,H.vis(0.84,1));
    s+='<rect x="355" y="250" width="110" height="36" rx="18" fill="#fff" stroke="'+C.AMBER+'" stroke-width="2" opacity="0">'+H.vis(0.88,1)+'</rect>';
    s+=H.tan(410,273,'galloc',14,C.AMBER,true,H.vis(0.88,1));
    s+='<rect x="475" y="250" width="110" height="36" rx="18" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2" opacity="0">'+H.vis(0.92,1)+'</rect>';
    s+=H.tan(530,273,'timeshard',14,C.GREEN,true,H.vis(0.92,1));
    s+=H.cap(300,430,'In multi-master, every node can generate IDs at the same moment.',0,0.10,C.INK)
      +H.cap(300,430,'A plain SERIAL would clash — two nodes could both hand out id 101.',0.10,0.36,C.RED)
      +H.cap(300,430,'PGD uses distributed sequences instead, so IDs never collide.',0.36,0.60,C.BLUE)
      +H.cap(300,430,'Version 6 defaults to the distributed kind…',0.60,0.80,C.INK)
      +H.cap(300,430,'…and you can also choose snowflakeid, galloc, or timeshard per table.',0.80,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>distributed sequences</title>'+s+'</svg>';
  }

  /* ---- AutoPartition ---- */
  function autoPartition(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">AutoPartition</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(200,80,200,56,'events table','1 day increments',C.BLUE);
    s+='<g opacity="0">'+H.vis(0,0.55)+'<rect x="20" y="200" width="130" height="56" rx="8" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>'
      +'<text x="85" y="233" text-anchor="middle" font-family="'+HAND+'" font-size="15" fill="'+C.BLUE+'" font-weight="700">Day 1</text></g>';
    s+='<g opacity="0">'+H.vis(0.55,0.75)+'<rect x="20" y="200" width="130" height="56" rx="8" fill="#fff" stroke="'+C.RED+'" stroke-width="2"/>'
      +'<text x="85" y="233" text-anchor="middle" font-family="'+HAND+'" font-size="15" fill="'+C.RED+'" font-weight="700">✗ retired</text></g>';
    s+='<rect x="170" y="200" width="130" height="56" rx="8" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+=H.tst(235,233,'Day 2',15,C.BLUE,true);
    s+='<rect x="320" y="200" width="130" height="56" rx="8" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+=H.tst(385,233,'Day 3',15,C.BLUE,true);
    s+='<g opacity="0">'+H.vis(0.30,1)+'<rect x="470" y="200" width="110" height="56" rx="8" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2"/>'
      +'<text x="525" y="233" text-anchor="middle" font-family="'+HAND+'" font-size="15" fill="'+C.GREEN+'" font-weight="700">Day 4</text></g>';
    s+=H.tan(300,290,'30-day retention period',14,C.INK,false,H.vis(0.50,1));
    s+=H.cap(300,410,'AutoPartition creates a new time-based partition on schedule…',0,0.30,C.BLUE)
      +H.cap(300,410,'…here, once a day.',0.30,0.50,C.INK)
      +H.cap(300,410,'Partitions older than the retention period are automatically retired.',0.50,0.75,C.RED)
      +H.cap(300,410,'All without you lifting a finger.',0.75,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>autopartition</title>'+s+'</svg>';
  }

  /* ---- Parallel apply ---- */
  function parallelApply(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Parallel Apply</text>';
    s+=person(55,110,'DBA',null);
    s+=cyl(210,80,180,60,'Leader','busy writer',C.AMBER);
    s+=H.tan(300,175,'Follower — 3 parallel workers',15,C.BLUE,true,H.vis(0,1));
    s+='<rect x="40" y="205" width="520" height="90" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="2" stroke-dasharray="6 5"/>';
    s+=cyl(60,220,140,60,'Worker 1',null,C.BLUE);
    s+=cyl(230,220,140,60,'Worker 2',null,C.BLUE);
    s+=cyl(400,220,140,60,'Worker 3',null,C.BLUE);
    s+=H.token('M260 140 L130 220',0.10,0.22,C.AMBER);
    s+=H.token('M300 140 L300 220',0.14,0.26,C.AMBER);
    s+=H.token('M340 140 L470 220',0.18,0.30,C.AMBER);
    s+=H.token('M260 140 L130 220',0.42,0.54,C.AMBER);
    s+=H.token('M300 140 L300 220',0.46,0.58,C.AMBER);
    s+=H.token('M340 140 L470 220',0.50,0.62,C.AMBER);
    s+=H.cap(300,410,'A busy leader can produce changes faster than one worker can apply them.',0,0.10,C.INK)
      +H.cap(300,410,'Parallel apply lets the follower use several workers at once.',0.10,0.34,C.AMBER)
      +H.cap(300,410,'Each worker takes a share of the incoming changes.',0.34,0.60,C.BLUE)
      +H.cap(300,410,'Together they keep up with the busy leader.',0.60,0.82,C.BLUE)
      +H.cap(300,410,'It can be turned off when debugging an issue.',0.82,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>parallel apply</title>'+s+'</svg>';
  }

  /* ---- Transaction streaming ---- */
  function transactionStreaming(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Transaction Streaming</text>';
    s+=person(55,110,'DBA',null);
    s+=cyl(90,90,180,64,'Leader','still writing…',C.AMBER);
    s+=cyl(330,90,180,64,'Follower',null,C.BLUE);
    s+=H.token('M270 122 L330 122',0.30,0.37,C.BLUE);
    s+=H.token('M270 122 L330 122',0.38,0.45,C.BLUE);
    s+=H.token('M270 122 L330 122',0.46,0.53,C.BLUE);
    s+=H.token('M270 122 L330 122',0.54,0.61,C.BLUE);
    s+=H.token('M270 122 L330 122',0.62,0.69,C.BLUE);
    s+=H.tan(180,180,'🚩 commit',15,C.AMBER,true,H.vis(0.66,0.86));
    s+=H.cap(300,410,'A big transaction can take a while to write.',0,0.10,C.INK)
      +H.cap(300,410,'Normally, copies wait until it commits before seeing any of it.',0.10,0.30,C.AMBER)
      +H.cap(300,410,'Transaction streaming sends pieces to copies while it’s still being written.',0.30,0.66,C.BLUE)
      +H.cap(300,410,'By the time it commits…',0.66,0.80,C.INK)
      +H.cap(300,410,'…the follower is already almost caught up — faster, with less lag.',0.80,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>transaction streaming</title>'+s+'</svg>';
  }

  /* ---- Single decoder worker ---- */
  function singleDecoderWorker(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Single Decoder Worker</text>';
    s+=person(55,110,'DBA',null);
    s+=cyl(210,80,180,60,'Change Log',null,C.GRAY);
    s+=cyl(210,190,180,60,'Decoder',null,C.PURPLE);
    s+=cyl(40,300,150,64,'Peer 1',null,C.BLUE);
    s+=cyl(225,300,150,64,'Peer 2',null,C.BLUE);
    s+=cyl(410,300,150,64,'Peer 3',null,C.BLUE);
    s+=H.token('M300 140 L300 190',0.10,0.26,C.GRAY);
    s+=H.token('M260 250 L115 300',0.50,0.62,C.PURPLE);
    s+=H.token('M300 250 L300 300',0.54,0.66,C.PURPLE);
    s+=H.token('M340 250 L485 300',0.58,0.70,C.PURPLE);
    s+=H.cap(300,430,'Every peer used to decode the change log separately — repeating the same work.',0,0.10,C.INK)
      +H.cap(300,430,'The change log is read once…',0.10,0.30,C.GRAY)
      +H.cap(300,430,'…by a single decoder worker.',0.30,0.50,C.PURPLE)
      +H.cap(300,430,'It fans the decoded changes out to every peer at once.',0.50,0.76,C.BLUE)
      +H.cap(300,430,'One read instead of many — saving CPU on busy clusters.',0.76,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>single decoder worker</title>'+s+'</svg>';
  }

  /* ---- Node lifecycle ---- */
  function nodeLifecycle(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Node Lifecycle</text>';
    s+=person(55,280,'DBA',null);
    s+='<g opacity="0">'+H.vis(0,0.34)+cyl(40,90,160,64,'Node A','joining…',C.GRAY)+'</g>';
    s+='<g opacity="0">'+H.vis(0.34,1)+cyl(40,90,160,64,'Node A','active ✓',C.GREEN)+'</g>';
    s+='<g opacity="0">'+H.vis(0,0.50)+cyl(220,90,160,64,'Node B','standby',C.GRAY)+'</g>';
    s+='<g opacity="0">'+H.vis(0.50,1)+cyl(220,90,160,64,'Node B','promoted',C.AMBER)+'</g>';
    s+=H.tan(300,74,'★',18,C.AMBER,true,H.vis(0.52,1));
    s+='<g opacity="0">'+H.vis(0,0.70)+cyl(400,90,160,64,'Node C','active',C.BLUE)+'</g>';
    s+='<g opacity="0">'+H.vis(0.70,1)+cyl(400,90,160,64,'Node C','✗ parted',C.GRAY)+'</g>';
    s+=H.cap(300,410,'PGD manages a node’s whole life.',0,0.10,C.INK)
      +H.cap(300,410,'A new node joins and syncs live from its peers…',0.10,0.34,C.AMBER)
      +H.cap(300,410,'…then becomes a fully active member.',0.34,0.50,C.GREEN)
      +H.cap(300,410,'A standby can be promoted to replace a failed node.',0.50,0.70,C.AMBER)
      +H.cap(300,410,'And a dead node is parted — cleanly removed from the cluster.',0.70,1.0,C.RED);
    return '<svg viewBox="0 0 600 440" role="img"><title>node lifecycle</title>'+s+'</svg>';
  }

  /* ---- Safe housekeeping ---- */
  function safeHousekeeping(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Safe Housekeeping</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(210,90,180,64,'Data Node',null,C.BLUE);
    for(var k=0;k<3;k++){
      var begin=(k*0.5)+'s';
      s+='<circle cx="'+(226)+'" cy="0" r="3" fill="'+C.GREEN+'" opacity="0">'
        +'<animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur="1.6s" begin="'+begin+'" repeatCount="indefinite"/>'
        +'<animateMotion dur="1.6s" begin="'+begin+'" repeatCount="indefinite" path="M0 150 L0 96"/></circle>';
    }
    s+='<rect x="60" y="220" width="220" height="60" rx="10" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.10,1)+'</rect>';
    s+=H.tan(170,244,'CREATE INDEX',14,C.BLUE,true,H.vis(0.10,1));
    s+=H.tan(170,264,'CONCURRENTLY',14,C.BLUE,true,H.vis(0.10,1));
    s+=H.tan(170,300,'✓ index built',14,C.GREEN,true,H.vis(0.38,1));
    s+='<rect x="320" y="220" width="220" height="60" rx="10" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2" opacity="0">'+H.vis(0.46,1)+'</rect>';
    s+=H.tan(430,254,'VACUUM FULL',15,C.PURPLE,true,H.vis(0.46,1));
    s+=H.tan(430,300,'✓ space reclaimed',14,C.GREEN,true,H.vis(0.74,1));
    s+=H.cap(300,410,'Routine upkeep still has to happen across a live cluster.',0,0.10,C.INK)
      +H.cap(300,410,'CREATE INDEX CONCURRENTLY builds a new index without blocking writes.',0.10,0.38,C.BLUE)
      +H.cap(300,410,'Writes keep flowing the whole time.',0.38,0.46,C.INK)
      +H.cap(300,410,'VACUUM FULL reclaims space the same safe way.',0.46,0.76,C.PURPLE)
      +H.cap(300,410,'Both run cluster-wide without anyone stopping work.',0.76,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>safe housekeeping</title>'+s+'</svg>';
  }

  /* ---- TDE encryption ---- */
  function tdeEncryption(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">TDE Encryption</text>';
    s+=person(55,250,'DBA','tablet');
    s+='<rect x="40" y="90" width="160" height="60" rx="8" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+=H.tan(120,125,'plain data',15,C.BLUE,true,H.vis(0,1));
    s+=H.tan(300,120,'🔑',22,C.AMBER,false,H.vis(0.10,1));
    s+='<rect x="400" y="90" width="160" height="60" rx="8" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2"/>';
    s+=H.tan(480,120,'disk',14,C.PURPLE,true,H.vis(0,0.34));
    s+=H.tan(480,120,'●●●●●●●●',15,C.PURPLE,true,H.vis(0.34,1));
    s+=H.token('M200 120 L400 120',0.14,0.30,C.BLUE);
    s+=H.tan(480,210,'👤 disk stolen',14,C.RED,true,H.vis(0.60,0.74));
    s+=H.tan(480,236,'still unreadable ✓',14,C.GREEN,true,H.vis(0.74,0.92));
    s+=H.cap(300,410,'TDE automatically scrambles data before it touches disk.',0,0.10,C.INK)
      +H.cap(300,410,'A secret key encrypts every write.',0.10,0.34,C.AMBER)
      +H.cap(300,410,'On disk, it’s just scrambled bytes.',0.34,0.60,C.PURPLE)
      +H.cap(300,410,'Even a stolen disk reveals nothing without the key.',0.60,0.92,C.RED)
      +H.cap(300,410,'Version 6 also supports rotating or migrating that key.',0.92,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>TDE encryption</title>'+s+'</svg>';
  }

  /* ---- Automatic reconciliation ---- */
  function autoReconciliation(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Automatic Reconciliation</text>';
    s+=person(55,110,'DBA',null);
    s+=cyl(90,90,180,64,'Node A',null,C.BLUE);
    s+=cyl(330,90,180,64,'Node B',null,C.BLUE);
    s+=H.tan(180,180,'row 42: present ✓',14,C.GREEN,true,H.vis(0,1));
    s+=H.flip(420,180,'row 42: missing','row 42: healed ✓',0.55,14,C.RED,C.GREEN,true);
    s+=H.tan(300,215,'🔍 comparing…',14,C.PURPLE,true,H.vis(0.24,0.50));
    s+=H.token('M270 130 L330 130',0.55,0.68,C.GREEN);
    s+=H.cap(300,410,'Copies can drift slightly out of sync over time.',0,0.14,C.INK)
      +H.cap(300,410,'Node B is missing a row that Node A has.',0.14,0.30,C.RED)
      +H.cap(300,410,'Automatic reconciliation quietly compares the copies…',0.30,0.55,C.PURPLE)
      +H.cap(300,410,'…and heals the difference on its own.',0.55,0.76,C.GREEN)
      +H.cap(300,410,'No manual fix needed — copies stay identical.',0.76,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>automatic reconciliation</title>'+s+'</svg>';
  }

  /* ---- Optimized mesh ---- */
  function optimizedMesh(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Optimized Mesh</text>';
    s+=person(55,110,'DBA',null);
    var pts=[[300,90],[410,160],[370,280],[230,280],[190,160]];
    var full=[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]];
    var ring=[[0,1],[1,2],[2,3],[3,4],[4,0]];
    full.forEach(function(p){
      s+='<line x1="'+pts[p[0]][0]+'" y1="'+pts[p[0]][1]+'" x2="'+pts[p[1]][0]+'" y2="'+pts[p[1]][1]+'" stroke="'+C.RED+'" stroke-width="1.4" opacity="0">'+H.vis(0.10,0.40)+'</line>';
    });
    ring.forEach(function(p){
      s+='<line x1="'+pts[p[0]][0]+'" y1="'+pts[p[0]][1]+'" x2="'+pts[p[1]][0]+'" y2="'+pts[p[1]][1]+'" stroke="'+C.GREEN+'" stroke-width="2.2" opacity="0">'+H.vis(0.40,1)+'</line>';
    });
    pts.forEach(function(p,i){
      s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="22" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2.2"/>';
      s+=H.tst(p[0],p[1]+5,''+(i+1),15,C.BLUE,true);
    });
    s+=H.cap(300,410,'As a cluster grows, connecting every node to every other gets noisy.',0,0.10,C.INK)
      +H.cap(300,410,'A full mesh needs a connection for every single pair.',0.10,0.40,C.RED)
      +H.cap(300,410,'Optimized mesh trims that down intelligently…',0.40,0.66,C.INK)
      +H.cap(300,410,'…while still moving data everywhere it needs to go.',0.66,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>optimized mesh</title>'+s+'</svg>';
  }

  /* ---- Lag history ---- */
  function lagHistory(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Lag History</text>';
    s+=person(55,110,'DBA','tablet');
    s+='<rect x="80" y="90" width="440" height="220" rx="8" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>';
    s+='<line x1="100" y1="290" x2="100" y2="110" stroke="'+C.INK+'" stroke-width="1.4" opacity="0.5"/>';
    s+='<line x1="100" y1="290" x2="500" y2="290" stroke="'+C.INK+'" stroke-width="1.4" opacity="0.5"/>';
    s+='<path d="M100 278 L500 278" fill="none" stroke="'+C.BLUE+'" stroke-width="2.2" stroke-dasharray="300" opacity="0">'+H.vis(0.10,1)+H.draw(0.10,0.30,300)+'</path>';
    s+='<path d="M100 286 L500 268" fill="none" stroke="'+C.GREEN+'" stroke-width="2.2" stroke-dasharray="300" opacity="0">'+H.vis(0.10,1)+H.draw(0.10,0.30,300)+'</path>';
    s+='<path d="M100 282 Q300 260 500 120" fill="none" stroke="'+C.RED+'" stroke-width="2.4" stroke-dasharray="420" opacity="0">'+H.vis(0.40,1)+H.draw(0.40,0.66,420)+'</path>';
    s+=H.tan(460,105,'⚠ trending up',14,C.RED,true,H.vis(0.66,1));
    s+=H.cap(300,410,'Lag history keeps a timeline of replication health for every node.',0,0.10,C.INK)
      +H.cap(300,410,'Node 1 and Node 2 stay consistently healthy.',0.10,0.40,C.BLUE)
      +H.cap(300,410,'Node 3’s lag is quietly trending upward.',0.40,0.70,C.RED)
      +H.cap(300,410,'Spotting that trend early means fixing it before it becomes an outage.',0.70,1.0,C.AMBER);
    return '<svg viewBox="0 0 600 440" role="img"><title>lag history</title>'+s+'</svg>';
  }

  /* ---- Tuning conflicts ---- */
  function tuningConflicts(){
    var H=M.makeH(15), s=paper(600,420);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Tuning Conflicts</text>';
    s+=person(55,110,'DBA','tablet');
    s+='<rect x="150" y="100" width="300" height="60" rx="10" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+=H.flip(300,135,'Conflict Logging: OFF','Conflict Logging: ON ✓',0.30,15,C.GRAY,C.GREEN,true);
    s+='<rect x="150" y="200" width="300" height="60" rx="10" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2"/>';
    s+=H.flip(300,232,'Resolver: last-update-wins','Resolver: multi-key aware',0.65,14,C.PURPLE,C.GREEN,true);
    s+=H.cap(300,390,'Version 6 lets you tune exactly how conflicts are handled.',0,0.10,C.INK)
      +H.cap(300,390,'Turn on conflict logging to record every clash for review.',0.10,0.40,C.BLUE)
      +H.cap(300,390,'And choose the resolver strategy…',0.40,0.70,C.PURPLE)
      +H.cap(300,390,'…including tricky cases with multiple unique keys.',0.70,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 420" role="img"><title>tuning conflicts</title>'+s+'</svg>';
  }

  /* ---- PGD-S vs PGD-X editions ---- */
  function pgdEditions(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">PGD Essential vs PGD Expanded</text>';
    s+=person(55,110,'DBA',null);
    s+='<rect x="40" y="90" width="220" height="280" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+=H.tan(150,120,'PGD Essential',16,C.BLUE,true,H.vis(0,1));
    s+='<circle cx="110" cy="175" r="20" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/><circle cx="190" cy="175" r="20" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+='<line x1="130" y1="175" x2="170" y2="175" stroke="'+C.BLUE+'" stroke-width="1.6" opacity="0.6"/>';
    s+=H.tan(150,225,'≤4 data nodes',14,C.INK,false,H.vis(0.10,1));
    s+=H.tan(150,248,'≤2 groups',14,C.INK,false,H.vis(0.10,1));
    s+=H.tan(150,271,'fixed commit scopes',14,C.INK,false,H.vis(0.10,1));
    s+=H.tan(150,294,'quick start',14,C.INK,false,H.vis(0.10,1));
    s+='<rect x="340" y="90" width="220" height="280" rx="12" fill="none" stroke="'+C.PURPLE+'" stroke-width="2"/>';
    s+=H.tan(450,120,'PGD Expanded',16,C.PURPLE,true,H.vis(0,1));
    s+='<circle cx="410" cy="180" r="16" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2"/><circle cx="490" cy="160" r="16" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2"/><circle cx="490" cy="200" r="16" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2"/>';
    s+='<line x1="425" y1="175" x2="475" y2="165" stroke="'+C.PURPLE+'" stroke-width="1.6" opacity="0.6"/><line x1="425" y1="185" x2="475" y2="195" stroke="'+C.PURPLE+'" stroke-width="1.6" opacity="0.6"/>';
    s+=H.tan(450,225,'no node/group limits',14,C.INK,false,H.vis(0.40,1));
    s+=H.tan(450,248,'witnesses supported',14,C.INK,false,H.vis(0.40,1));
    s+=H.tan(450,271,'Barman backups',14,C.INK,false,H.vis(0.40,1));
    s+=H.tan(450,294,'full features',14,C.INK,false,H.vis(0.40,1));
    s+=H.cap(300,430,'Version 6 formalizes two editions.',0,0.10,C.INK)
      +H.cap(300,430,'PGD Essential is a simple, capped quick-start edition.',0.10,0.40,C.BLUE)
      +H.cap(300,430,'PGD Expanded has full features with no node or group limits.',0.40,0.70,C.PURPLE)
      +H.cap(300,430,'Same engine, different scale.',0.70,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>pgd essential vs expanded editions</title>'+s+'</svg>';
  }

  /* ---- Connection Manager ---- */
  function connectionManagerHttp(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Connection Manager</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(210,90,180,70,'Data Node','+ Connection Mgr',C.PURPLE);
    s+='<rect x="40" y="240" width="250" height="54" rx="8" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.06,1)+'</rect>';
    s+='<text x="165" y="272" text-anchor="middle" font-family="monospace" font-size="14" fill="'+C.BLUE+'" opacity="0">GET /node/is-read-write'+H.vis(0.06,1)+'</text>';
    s+='<rect x="320" y="240" width="240" height="54" rx="8" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2" opacity="0">'+H.vis(0.44,1)+'</rect>';
    s+='<text x="440" y="272" text-anchor="middle" font-family="monospace" font-size="14" fill="'+C.GREEN+'" opacity="0">{ "read_write": true }'+H.vis(0.44,1)+'</text>';
    s+=H.token('M165 240 L280 160',0.10,0.24,C.BLUE);
    s+=H.token('M320 160 L440 240',0.30,0.44,C.GREEN);
    s+=H.cap(300,410,'Version 6 adds an HTTP API to the Connection Manager.',0,0.10,C.INK)
      +H.cap(300,410,'Any tool or automation script can query it directly…',0.10,0.30,C.BLUE)
      +H.cap(300,410,'…like asking: is this node read-write?',0.24,0.44,C.BLUE)
      +H.cap(300,410,'The API replies over plain HTTP — no special client needed.',0.44,0.76,C.GREEN)
      +H.cap(300,410,'Now automation can ask “who is in charge?” just as easily as an app can.',0.76,1.0,C.INK);
    return '<svg viewBox="0 0 600 440" role="img"><title>connection manager http api</title>'+s+'</svg>';
  }

  /* ---- Commit scopes ---- */
  function commitScopesWB(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Commit Scopes</text>';
    s+=person(55,260,'DBA','tablet');
    s+=cyl(40,90,150,60,'CAMO',null,C.PURPLE);
    s+=cyl(225,90,150,60,'Sync Commit',null,C.BLUE);
    s+=cyl(410,90,150,60,'Group Commit',null,C.AMBER);
    s+='<g opacity="0">'+H.vis(0.46,1)+cyl(210,250,180,70,'Commit Scope','one rule book',C.PURPLE)+'</g>';
    s+=H.token('M115 154 L260 250',0.28,0.42,C.PURPLE);
    s+=H.token('M300 150 L300 250',0.28,0.42,C.BLUE);
    s+=H.token('M485 154 L340 250',0.28,0.42,C.AMBER);
    s+=H.cap(300,410,'Three separate durability mechanisms…',0,0.16,C.INK)
      +H.cap(300,410,'CAMO, synchronous commit, and group commit…',0.16,0.28,C.INK)
      +H.cap(300,410,'…are unified under one idea: commit scopes.',0.28,0.50,C.PURPLE)
      +H.cap(300,410,'You pick the rule you want for a group or transaction.',0.50,0.76,C.INK)
      +H.cap(300,410,'PGD then enforces exactly that durability.',0.76,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>commit scopes</title>'+s+'</svg>';
  }

  /* ---- Maintenance mode ---- */
  function maintenanceMode(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Maintenance Mode</text>';
    s+=person(55,90,'DBA','tablet');
    s+='<g opacity="0">'+H.vis(0,0.20)+cyl(40,200,160,64,'Node 1',null,C.BLUE)+'</g>';
    s+='<g opacity="0">'+H.vis(0.20,0.74)+cyl(40,200,160,64,'Node 1','🔧 maintenance',C.AMBER)+'</g>';
    s+='<g opacity="0">'+H.vis(0.74,1)+cyl(40,200,160,64,'Node 1','✓ back online',C.GREEN)+'</g>';
    s+=cyl(220,200,160,64,'Node 2','carries load',C.BLUE);
    s+=cyl(400,200,160,64,'Node 3','carries load',C.BLUE);
    s+=H.cap(300,410,'One node can be taken offline for patching.',0,0.10,C.INK)
      +H.cap(300,410,'It enters maintenance mode…',0.10,0.20,C.AMBER)
      +H.cap(300,410,'…while the rest of the cluster keeps serving traffic.',0.20,0.74,C.AMBER)
      +H.cap(300,410,'Once patched, it rejoins and resumes serving.',0.74,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>maintenance mode</title>'+s+'</svg>';
  }

  /* ---- Replication lag control ---- */
  function lagControl(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Replication Lag Control</text>';
    s+=person(55,220,'DBA',null);
    s+=cyl(90,90,180,64,'Leader','writing fast',C.BLUE);
    s+=cyl(330,90,180,64,'Follower',null,C.AMBER);
    s+=H.tan(420,180,'small gap',14,C.GREEN,true,H.vis(0,0.30));
    s+=H.tan(420,180,'gap growing…',14,C.RED,true,H.vis(0.30,0.50));
    s+=H.tan(420,180,'gap stabilizes',14,C.GREEN,true,H.vis(0.66,1));
    s+=H.tan(300,230,'🐢 leader throttled',14,C.AMBER,true,H.vis(0.50,1));
    s+=H.cap(300,410,'Replication lag control watches how far behind each follower is.',0,0.10,C.INK)
      +H.cap(300,410,'Normally the gap stays small.',0.10,0.30,C.GREEN)
      +H.cap(300,410,'If a follower starts falling behind…',0.30,0.50,C.RED)
      +H.cap(300,410,'…the leader is gently throttled.',0.50,0.66,C.AMBER)
      +H.cap(300,410,'The gap stabilizes, so a later failover loses very little data.',0.66,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>replication lag control</title>'+s+'</svg>';
  }

  /* ---- Raft per group ---- */
  function raftPerGroup(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Raft Per Group</text>';
    s+=person(55,110,'DBA',null);
    s+='<rect x="40" y="80" width="220" height="180" rx="14" fill="none" stroke="'+C.BLUE+'" stroke-width="2" stroke-dasharray="6 5"/>';
    s+=H.tan(150,110,'Location A',15,C.BLUE,true,H.vis(0,1));
    s+='<circle cx="110" cy="170" r="18" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/><circle cx="190" cy="170" r="18" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+=H.tan(150,220,'🗳️ voting locally',14,C.BLUE,true,H.vis(0.10,1));
    s+='<rect x="340" y="80" width="220" height="180" rx="14" fill="none" stroke="'+C.BLUE+'" stroke-width="2" stroke-dasharray="6 5"/>';
    s+=H.tan(450,110,'Location B',15,C.BLUE,true,H.vis(0,1));
    s+='<circle cx="410" cy="170" r="18" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/><circle cx="490" cy="170" r="18" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2"/>';
    s+=H.tan(450,220,'🗳️ voting locally',14,C.BLUE,true,H.vis(0.34,1));
    s+='<line x1="260" y1="170" x2="340" y2="170" stroke="'+C.RED+'" stroke-width="2" stroke-dasharray="4 5" opacity="0">'+H.vis(0.58,0.78)+'</line>';
    s+=H.cap(300,410,'Each location can run its own local Raft group.',0,0.14,C.INK)
      +H.cap(300,410,'Location A holds its own vote…',0.14,0.34,C.BLUE)
      +H.cap(300,410,'…and Location B holds its own, independently.',0.34,0.58,C.BLUE)
      +H.cap(300,410,'Even if the link between them drops…',0.58,0.78,C.RED)
      +H.cap(300,410,'…each location keeps working on its own consensus.',0.78,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>raft per group</title>'+s+'</svg>';
  }

  /* ---- Raft repair tools ---- */
  function raftRepairTools(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Raft Repair Tools</text>';
    s+=person(55,110,'DBA','tablet');
    s+='<g opacity="0">'+H.vis(0,0.74)+cyl(210,70,180,60,'Raft','⚠ stuck',C.RED)+'</g>';
    s+='<g opacity="0">'+H.vis(0.74,1)+cyl(210,70,180,60,'Raft','✓ healthy',C.GREEN)+'</g>';
    s+='<rect x="30" y="210" width="170" height="60" rx="8" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2" opacity="0">'+H.vis(0.20,1)+'</rect>';
    s+=H.tan(115,232,'Snapshot',14,C.PURPLE,true,H.vis(0.20,1));
    s+=H.tan(115,252,'export/import',14,C.PURPLE,false,H.vis(0.20,1));
    s+='<rect x="215" y="210" width="170" height="60" rx="8" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2" opacity="0">'+H.vis(0.36,1)+'</rect>';
    s+=H.tan(300,244,'Reset',15,C.PURPLE,true,H.vis(0.36,1));
    s+='<rect x="400" y="210" width="170" height="60" rx="8" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2" opacity="0">'+H.vis(0.52,1)+'</rect>';
    s+=H.tan(485,232,'Inspect',14,C.PURPLE,true,H.vis(0.52,1));
    s+=H.tan(485,252,'the KV store',14,C.PURPLE,false,H.vis(0.52,1));
    s+=H.token('M115 210 L260 130',0.22,0.34,C.PURPLE);
    s+=H.token('M300 210 L300 130',0.38,0.50,C.PURPLE);
    s+=H.token('M485 210 L340 130',0.54,0.66,C.PURPLE);
    s+=H.cap(300,410,'Sometimes Raft consensus can get stuck.',0,0.10,C.RED)
      +H.cap(300,410,'Version 5 adds recovery tools for exactly this.',0.10,0.20,C.INK)
      +H.cap(300,410,'Snapshot export and import save or restore Raft’s state.',0.20,0.36,C.PURPLE)
      +H.cap(300,410,'A full reset clears a jammed election.',0.36,0.52,C.PURPLE)
      +H.cap(300,410,'You can also inspect the key-value store directly.',0.52,0.74,C.PURPLE)
      +H.cap(300,410,'Together, these get a stuck cluster voting again.',0.74,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>raft repair tools</title>'+s+'</svg>';
  }

  /* ---- Logical-join upgrades ---- */
  function logicalJoinUpgrade(){
    var H=M.makeH(15), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Logical-Join Upgrades</text>';
    s+=person(55,70,'DBA','tablet');
    s+=H.tan(300,90,'live traffic',14,C.INK,true,H.vis(0,1));
    s+=cyl(60,180,200,70,'Old Cluster','v5',C.BLUE);
    s+=cyl(340,180,200,70,'New Cluster','v6',C.PURPLE);
    s+='<path d="M300 104 L160 180" fill="none" stroke="'+C.INK+'" stroke-width="2" opacity="0">'+H.vis(0,0.62)+'</path>';
    s+='<path d="M300 104 L440 180" fill="none" stroke="'+C.INK+'" stroke-width="2" opacity="0">'+H.vis(0.62,1)+'</path>';
    s+=H.token('M270 215 L330 215',0.14,0.26,C.PURPLE);
    s+=H.token('M330 230 L270 230',0.30,0.42,C.PURPLE);
    s+=H.cap(300,410,'A logical-join upgrade builds a brand-new cluster alongside the old one.',0,0.14,C.INK)
      +H.cap(300,410,'The new cluster joins and syncs live from the old one…',0.14,0.42,C.BLUE)
      +H.cap(300,410,'…copying everything while both stay online.',0.42,0.62,C.INK)
      +H.cap(300,410,'Once caught up, you switch traffic over to the new cluster.',0.62,0.82,C.PURPLE)
      +H.cap(300,410,'A major-version upgrade with barely a pause.',0.82,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>logical-join upgrades</title>'+s+'</svg>';
  }

  /* ---- The BDR name (v4) ---- */
  function bdrNameV4(){
    var H=M.makeH(13), s=paper(600,380);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">The BDR Name</text>';
    s+=person(55,150,'DBA',null);
    s+=cyl(140,90,160,64,'BDR','current name',C.GRAY);
    s+=cyl(320,90,160,64,'PGD','future name',C.BLUE);
    s+=H.token('M300 122 L320 122',0.45,0.60,C.BLUE);
    s+=H.cap(300,350,'In version 4, the underlying extension is called BDR.',0,0.15,C.INK)
      +H.cap(300,350,'BDR stands for Bi-Directional Replication.',0.15,0.45,C.GRAY)
      +H.cap(300,350,'Later versions rename it…',0.45,0.60,C.INK)
      +H.cap(300,350,'…to PGD — same engine family, new name.',0.60,1.0,C.BLUE);
    return '<svg viewBox="0 0 600 380" role="img"><title>the BDR name</title>'+s+'</svg>';
  }

  /* ---- HARP routing ---- */
  function harpRouting(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">HARP Routing</text>';
    s+=person(55,110,'App','tablet');
    s+=cyl(210,76,180,60,'HARP','routing layer',C.PURPLE);
    s+=cyl(210,170,180,56,'Consensus Store','the notepad',C.PURPLE);
    s+='<line x1="300" y1="136" x2="300" y2="170" stroke="'+C.PURPLE+'" stroke-width="1.8" opacity="0.6"/>';
    s+=cyl(30,280,160,64,'Leader',null,C.AMBER);
    s+=cyl(220,280,160,64,'Follower',null,C.BLUE);
    s+=cyl(410,280,160,64,'Follower',null,C.BLUE);
    s+=H.tan(110,272,'★',18,C.AMBER,true,H.vis(0.50,1));
    s+=H.token('M100 108 L220 100',0.06,0.18,C.BLUE);
    s+=H.token('M260 136 L110 280',0.30,0.46,C.AMBER);
    s+=H.cap(300,430,'Version 4 uses HARP, a separate layer, to route your app to the right copy.',0,0.14,C.INK)
      +H.cap(300,430,'HARP relies on a consensus store — a shared notepad — to track the leader.',0.14,0.30,C.PURPLE)
      +H.cap(300,430,'It routes your connection straight to that leader.',0.30,0.50,C.AMBER)
      +H.cap(300,430,'Your app just uses a multi-host connection string; HARP does the rest.',0.50,1.0,C.INK);
    return '<svg viewBox="0 0 600 460" role="img"><title>harp routing</title>'+s+'</svg>';
  }

  /* ---- Metal-tier clusters ---- */
  function metalTiers(){
    var H=M.makeH(14), s=paper(600,400);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Metal-Tier Clusters</text>';
    s+=person(55,200,'DBA',null);
    s+=cyl(60,80,150,64,'Bronze','smallest practice',C.AMBER);
    s+=cyl(225,80,150,64,'Silver','typical setup',C.GRAY);
    s+=cyl(390,80,150,64,'(Gold)','larger',C.AMBER);
    s+='<g opacity="0">'+H.vis(0.55,1)+cyl(210,250,180,64,'PGD-S / PGD-X','the real editions',C.GREEN)+'</g>';
    s+=H.token('M135 144 L260 250',0.16,0.30,C.AMBER);
    s+=H.token('M465 144 L340 250',0.16,0.30,C.AMBER);
    s+=H.cap(300,370,'Version 4 training used informal metal-tier names for cluster sizes.',0,0.16,C.INK)
      +H.cap(300,370,'Bronze for small, silver for typical, occasionally gold for larger.',0.16,0.40,C.AMBER)
      +H.cap(300,370,'These were just nicknames…',0.40,0.55,C.INK)
      +H.cap(300,370,'…that later become the real PGD-S and PGD-X editions.',0.55,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 400" role="img"><title>metal-tier clusters</title>'+s+'</svg>';
  }

  /* ---- Rename to PGD (v5) ---- */
  function renameToPGD(){
    var H=M.makeH(13), s=paper(600,380);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Rename to PGD</text>';
    s+=person(55,150,'DBA',null);
    s+='<g opacity="0">'+H.vis(0,0.50)+cyl(220,90,160,64,'BDR','previous name',C.GRAY)+'</g>';
    s+='<g opacity="0">'+H.vis(0.50,1)+cyl(220,90,160,64,'PGD','current name',C.BLUE)+'</g>';
    s+=H.cap(300,350,'Version 5 renames the technology from BDR to PGD.',0,0.20,C.INK)
      +H.cap(300,350,'The core idea is unchanged…',0.20,0.50,C.GRAY)
      +H.cap(300,350,'…management just becomes simpler and more unified.',0.50,1.0,C.BLUE);
    return '<svg viewBox="0 0 600 380" role="img"><title>rename to PGD</title>'+s+'</svg>';
  }

  /* ---- PGD Proxy replaces HARP ---- */
  function pgdProxyCli(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">PGD Proxy Replaces HARP</text>';
    s+=person(55,110,'DBA','tablet');
    s+='<g opacity="0">'+H.vis(0,0.14)+cyl(210,76,180,60,'HARP','external',C.GRAY)+'<text x="300" y="106" text-anchor="middle" font-size="24" fill="'+C.RED+'">✗</text></g>';
    s+='<g opacity="0">'+H.vis(0.14,1)+cyl(210,76,180,60,'PGD Proxy','built in',C.PURPLE)+'</g>';
    s+=H.tan(300,58,'⚖ Raft',14,C.PURPLE,true,H.vis(0.20,0.40));
    s+='<rect x="150" y="230" width="300" height="60" rx="10" fill="#fff" stroke="'+C.AMBER+'" stroke-width="2" opacity="0">'+H.vis(0.42,1)+'</rect>';
    s+=H.tan(300,258,'pgd-cli ⌨',15,C.AMBER,true,H.vis(0.42,1));
    s+=H.tan(300,280,'one tool for the whole cluster',14,C.AMBER,false,H.vis(0.46,1));
    s+=H.token('M300 136 L300 230',0.20,0.34,C.PURPLE);
    s+=H.cap(300,410,'HARP is removed — routing becomes the built-in PGD Proxy.',0,0.20,C.INK)
      +H.cap(300,410,'The Proxy tracks the leader through PGD’s own Raft.',0.20,0.42,C.PURPLE)
      +H.cap(300,410,'Version 5 also adds pgd-cli…',0.42,0.60,C.AMBER)
      +H.cap(300,410,'…one tool to manage the whole cluster, instead of many.',0.60,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>pgd proxy replaces harp</title>'+s+'</svg>';
  }

  /* ---- Switchover & failover ---- */
  function switchoverFailover(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Switchover &amp; Failover</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(210,70,180,56,'PGD Proxy','keeps watching',C.PURPLE);
    s+='<g opacity="0">'+H.vis(0,0.30)+cyl(40,220,160,64,'Node 1','leader',C.AMBER)+'</g>';
    s+='<g opacity="0">'+H.vis(0.30,1)+cyl(40,220,160,64,'Node 1','✗ down',C.GRAY)+'</g>';
    s+=cyl(220,220,160,64,'Node 3',null,C.BLUE);
    s+='<g opacity="0">'+H.vis(0,0.55)+cyl(400,220,160,64,'Node 2','standby',C.BLUE)+'</g>';
    s+='<g opacity="0">'+H.vis(0.55,1)+cyl(400,220,160,64,'Node 2','new leader',C.AMBER)+'</g>';
    s+=H.tan(480,212,'★',18,C.AMBER,true,H.vis(0.58,1));
    s+=H.token('M260 98 L120 220',0.06,0.16,C.PURPLE);
    s+=H.token('M340 98 L480 220',0.36,0.52,C.PURPLE);
    s+=H.cap(300,430,'Clients reach the leader through the Proxy, which keeps watching every node.',0,0.16,C.INK)
      +H.cap(300,430,'The leader fails.',0.16,0.30,C.RED)
      +H.cap(300,430,'Raft elects a new leader — automatic for failover, on command for switchover.',0.30,0.58,C.AMBER)
      +H.cap(300,430,'The Proxy reroutes — your app keeps using the same address.',0.58,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>switchover and failover</title>'+s+'</svg>';
  }

  /* ---- The Write Leader ---- */
  function writeLeader(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">The Write Leader</text>';
    s+=person(55,155,'Observer',null);
    s+='<g opacity="0">'+H.vis(0,0.46)+cyl(210,80,180,64,'Write Leader',null,C.AMBER)+'</g>';
    s+='<g opacity="0">'+H.vis(0.46,1)+cyl(210,80,180,64,'Node (down)',null,C.GRAY)+'</g>';
    s+=H.tan(300,66,'★',20,C.AMBER,true,H.vis(0.06,0.46));
    s+=H.tan(300,112,'✗',22,C.RED,true,H.vis(0.46,0.66));
    s+=cyl(40,260,150,64,'Follower',null,C.BLUE);
    s+='<g opacity="0">'+H.vis(0,0.66)+cyl(225,260,150,64,'Follower',null,C.BLUE)+'</g>';
    s+='<g opacity="0">'+H.vis(0.66,1)+cyl(225,260,150,64,'Write Leader',null,C.AMBER)+'</g>';
    s+=cyl(410,260,150,64,'Follower',null,C.BLUE);
    s+=H.tan(300,246,'★',20,C.AMBER,true,H.vis(0.68,1));
    s+=H.token('M260 144 L105 260',0.14,0.28,C.AMBER);
    s+=H.token('M300 144 L300 260',0.14,0.28,C.AMBER);
    s+=H.token('M340 144 L485 260',0.14,0.28,C.AMBER);
    s+=H.cap(300,430,'The vote winner becomes the Write Leader.',0,0.14,C.INK)
      +H.cap(300,430,'Cluster-wide decisions route through that one leader for consistency.',0.14,0.46,C.AMBER)
      +H.cap(300,430,'If the leader fails…',0.46,0.66,C.RED)
      +H.cap(300,430,'…Raft automatically elects a new leader from the followers.',0.66,0.82,C.AMBER)
      +H.cap(300,430,'The cluster always has exactly one write leader.',0.82,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>the write leader</title>'+s+'</svg>';
  }

  /* ---- Witness nodes ---- */
  function witnessNodes(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Witness Nodes</text>';
    s+=person(55,250,'DBA',null);
    s+=cyl(60,90,180,64,'Data Node','votes + data',C.BLUE);
    s+=cyl(360,90,180,64,'Data Node','votes + data',C.BLUE);
    s+=H.token('M240 118 L360 118',0.06,0.16,C.RED);
    s+=H.token('M360 130 L240 130',0.16,0.26,C.RED);
    s+=H.tan(300,68,'tie? no majority',14,C.RED,true,H.vis(0.06,0.30));
    s+='<g opacity="0">'+H.vis(0.30,1)+cyl(210,270,180,64,'Witness','votes only, no data',C.AMBER)+'</g>';
    s+=H.token('M150 154 L260 270',0.32,0.44,C.AMBER);
    s+=H.token('M450 154 L340 270',0.32,0.44,C.AMBER);
    s+=H.tan(300,364,'3 voters → majority ✓',15,C.GREEN,true,H.vis(0.50,1));
    s+=H.cap(300,430,'Two data nodes can tie in a vote.',0,0.16,C.INK)
      +H.cap(300,430,'With only two voters, there’s no guaranteed majority.',0.16,0.30,C.RED)
      +H.cap(300,430,'A witness joins — it votes but holds no data.',0.30,0.46,C.AMBER)
      +H.cap(300,430,'Now three voters always yield a clear majority.',0.46,0.70,C.INK)
      +H.cap(300,430,'It breaks ties cheaply, without storing a full copy.',0.70,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>witness nodes</title>'+s+'</svg>';
  }

  /* ---- Sharding ---- */
  function sharding(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Sharding</text>';
    s+=person(55,110,'DBA',null);
    s+=cyl(210,70,180,54,'All Data','too big for one node',C.GRAY);
    s+=cyl(30,260,170,64,'Shard A','customers A–H',C.BLUE);
    s+=cyl(215,260,170,64,'Shard B','customers I–P',C.BLUE);
    s+=cyl(400,260,170,64,'Shard C','customers Q–Z',C.BLUE);
    s+=H.token('M260 124 L115 260',0.10,0.24,C.BLUE);
    s+=H.token('M300 124 L300 260',0.10,0.24,C.BLUE);
    s+=H.token('M340 124 L485 260',0.10,0.24,C.BLUE);
    s+=H.tan(300,360,'query: customer "Karen" → Shard B',14,C.AMBER,true,H.vis(0.52,1));
    s+=H.token('M300 145 L300 260',0.54,0.68,C.AMBER);
    s+=H.cap(300,430,'One dataset can be too big for a single node to hold.',0,0.10,C.INK)
      +H.cap(300,430,'Sharding splits it into slices…',0.10,0.30,C.BLUE)
      +H.cap(300,430,'…each node holds only its slice: A–H, I–P, or Q–Z.',0.30,0.52,C.BLUE)
      +H.cap(300,430,'A query for the right slice routes straight to the shard that owns it.',0.52,0.76,C.AMBER)
      +H.cap(300,430,'No single copy has to hold everything.',0.76,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>sharding</title>'+s+'</svg>';
  }

  /* ---- Key-value store ---- */
  function keyValueStore(){
    var H=M.makeH(14), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Key-Value Store</text>';
    s+=person(55,300,'DBA',null);
    s+=cyl(60,80,150,64,'Node 1',null,C.BLUE);
    s+=cyl(225,80,150,64,'Node 2',null,C.BLUE);
    s+=cyl(390,80,150,64,'Node 3',null,C.BLUE);
    s+='<path d="M135 144 L255 222" fill="none" stroke="'+C.PURPLE+'" stroke-width="1.6" opacity="0.5"/>';
    s+='<path d="M300 144 L300 222" fill="none" stroke="'+C.PURPLE+'" stroke-width="1.6" opacity="0.5"/>';
    s+='<path d="M465 144 L345 222" fill="none" stroke="'+C.PURPLE+'" stroke-width="1.6" opacity="0.5"/>';
    s+='<rect x="210" y="222" width="180" height="80" rx="10" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2.2"/>';
    s+=H.tan(300,252,'KV Store',15,C.PURPLE,true,H.vis(0,1));
    s+=H.tan(300,276,'leader = Node 2', 14,C.PURPLE,false,H.vis(0.10,1));
    s+=H.token('M135 144 L255 222',0.10,0.22,C.BLUE);
    s+=H.token('M300 144 L300 222',0.10,0.22,C.BLUE);
    s+=H.token('M465 144 L345 222',0.10,0.22,C.BLUE);
    s+=H.token('M255 222 L135 144',0.42,0.56,C.GREEN);
    s+=H.token('M300 222 L300 144',0.42,0.56,C.GREEN);
    s+=H.token('M345 222 L465 144',0.42,0.56,C.GREEN);
    s+=H.cap(300,430,'Raft keeps a small shared key-value store alongside its votes.',0,0.10,C.INK)
      +H.cap(300,430,'Every node can write small facts into it…',0.10,0.30,C.PURPLE)
      +H.cap(300,430,'…like which node is currently the leader.',0.30,0.42,C.PURPLE)
      +H.cap(300,430,'Every node reads back the identical value.',0.42,0.66,C.BLUE)
      +H.cap(300,430,'A tiny shared board, kept perfectly in sync by Raft.',0.66,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>key-value store</title>'+s+'</svg>';
  }

  /* ---- Synchronous commit ---- */
  function syncCommit(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Synchronous Commit</text>';
    s+=person(55,172,'App','tablet');
    s+=cyl(130,140,170,64,'Leader',null,C.BLUE);
    s+=cyl(360,140,170,64,'Follower',null,C.BLUE);
    s+=H.tan(215,232,'awaiting confirm',14,C.AMBER,true,H.vis(0.16,0.50));
    s+=H.tan(215,232,'confirmed ✓',14,C.GREEN,true,H.vis(0.50,1));
    s+=H.token('M100 172 L130 172',0.06,0.16,C.AMBER);
    s+=H.token('M300 172 L360 172',0.18,0.32,C.BLUE);
    s+=H.token('M360 190 L300 190',0.36,0.50,C.GREEN);
    s+=H.token('M130 190 L100 190',0.52,0.66,C.GREEN);
    s+=H.cap(300,410,'The app sends a write to the leader.',0,0.16,C.INK)
      +H.cap(300,410,'Synchronous commit means the leader waits for the follower to confirm…',0.16,0.36,C.BLUE)
      +H.cap(300,410,'…before replying.',0.36,0.52,C.GREEN)
      +H.cap(300,410,'Only once both copies agree does the app hear success — stronger safety, a bit slower.',0.52,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>synchronous commit</title>'+s+'</svg>';
  }

  /* ---- Group commit ---- */
  function groupCommit(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Group Commit</text>';
    s+=person(55,110,'App','tablet');
    s+=cyl(210,80,180,64,'Leader',null,C.AMBER);
    s+=cyl(30,260,150,64,'Follower 1',null,C.BLUE);
    s+=cyl(225,260,150,64,'Follower 2',null,C.BLUE);
    s+='<rect x="410" y="260" width="150" height="64" rx="10" fill="'+C.GRAY+'" opacity="0">'+H.vis(0.46,1)+'</rect>';
    s+=cyl(410,260,150,64,'Follower 3',null,C.GRAY);
    s+=H.token('M260 144 L105 260',0.10,0.24,C.AMBER);
    s+=H.token('M300 144 L300 260',0.10,0.24,C.AMBER);
    s+=H.token('M340 144 L485 260',0.10,0.24,C.AMBER);
    s+=H.token('M105 260 L260 144',0.30,0.44,C.GREEN);
    s+=H.token('M300 260 L300 144',0.30,0.44,C.GREEN);
    s+=H.tan(300,362,'2 of 3 = quorum ✓',15,C.GREEN,true,H.vis(0.46,1));
    s+=H.tan(485,340,'still catching up', 14,C.GRAY,true,H.vis(0.66,1));
    s+=H.cap(300,430,'The leader replicates a write to all three followers.',0,0.10,C.INK)
      +H.cap(300,430,'It only needs enough copies to confirm — a quorum — not all of them.',0.10,0.30,C.AMBER)
      +H.cap(300,430,'Follower 1 and Follower 2 acknowledge quickly…',0.30,0.46,C.INK)
      +H.cap(300,430,'…2 of 3 is already a quorum, so the leader commits.',0.46,0.66,C.GREEN)
      +H.cap(300,430,'Follower 3 can catch up later — it never blocked the write.',0.66,1.0,C.GRAY);
    return '<svg viewBox="0 0 600 460" role="img"><title>group commit</title>'+s+'</svg>';
  }

  /* ---- Eventual consistency ---- */
  function eventualConsistency(){
    var H=M.makeH(13), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Eventual Consistency</text>';
    s+=person(55,220,'Observer',null);
    s+=cyl(90,90,170,64,'Node 1',null,C.BLUE);
    s+=cyl(340,90,170,64,'Node 2',null,C.BLUE);
    s+=H.tan(175,180,'v = 42 @ 10:00:00.000',14,C.BLUE,true,H.vis(0.10,1));
    s+=H.flip(425,180,'v = 41 (stale)','v = 42 @ 10:00:00.050',0.55,14,C.RED,C.GREEN,true);
    s+=H.token('M260 122 L340 122',0.20,0.40,C.BLUE);
    s+=H.cap(300,410,'Node 1 commits a write at 10:00:00.000.',0,0.10,C.INK)
      +H.cap(300,410,'The change starts streaming toward Node 2.',0.10,0.20,C.BLUE)
      +H.cap(300,410,'For a brief moment, Node 2 is still behind — stale.',0.20,0.55,C.RED)
      +H.cap(300,410,'A moment later, Node 2 applies the change too.',0.55,0.75,C.GREEN)
      +H.cap(300,410,'Not instant everywhere, but quickly the same — eventual consistency.',0.75,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>eventual consistency</title>'+s+'</svg>';
  }

  /* ---- Row origin ---- */
  function rowOrigin(){
    var H=M.makeH(14), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Row Origin</text>';
    s+=person(55,90,'Observer',null);
    s+='<path d="M262 154 L152 300" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0.55"/>';
    s+='<path d="M338 154 L448 300" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0.55"/>';
    s+='<path d="M225 332 L375 332" fill="none" stroke="'+C.RED+'" stroke-width="1.8" stroke-dasharray="4 5" opacity="0.7"/>';
    s+=cyl(225,90,150,64,'Node A',null,C.BLUE);
    s+=cyl(75,300,150,64,'Node B',null,C.BLUE);
    s+=cyl(375,300,150,64,'Node C',null,C.BLUE);
    s+=H.tan(300,60,'origin: A', 14,C.BLUE,true,H.vis(0.10,0.30));
    s+=H.token('M262 154 L152 300',0.20,0.32,C.BLUE);
    s+=H.token('M338 154 L448 300',0.20,0.32,C.BLUE);
    s+='<g opacity="0">'+H.vis(0.50,0.68)
      +'<circle cx="300" cy="332" r="16" fill="#fff" stroke="'+C.RED+'" stroke-width="2.4"/>'
      +'<line x1="292" y1="324" x2="308" y2="340" stroke="'+C.RED+'" stroke-width="3" stroke-linecap="round"/>'
      +'<line x1="308" y1="324" x2="292" y2="340" stroke="'+C.RED+'" stroke-width="3" stroke-linecap="round"/></g>';
    s+=H.tan(300,385,'not sent back to origin', 14,C.RED,true,H.vis(0.50,0.70));
    s+=H.cap(300,440,'Every change carries its origin — the node that first wrote it.',0,0.20,C.INK)
      +H.cap(300,440,'Node A writes, and the change replicates out to B and C.',0.20,0.40,C.BLUE)
      +H.cap(300,440,'Node C would normally forward changes onward…',0.40,0.50,C.INK)
      +H.cap(300,440,'…but it never sends the change back to A, its origin.',0.50,0.70,C.RED)
      +H.cap(300,440,'Origin tracking prevents endless replication loops.',0.70,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>row origin</title>'+s+'</svg>';
  }

  /* ---- Replication sets ---- */
  function replicationSets(){
    var H=M.makeH(14), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Replication Sets</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(210,74,180,60,'Source Node','all tables',C.BLUE);
    s+='<rect x="100" y="188" width="180" height="52" rx="8" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2" opacity="0">'+H.vis(0.14,1)+'</rect>';
    s+=H.tan(190,210,'Set 1', 14,C.GREEN,true,H.vis(0.14,1));
    s+=H.tan(190,230,'core tables', 14,C.INK,false,H.vis(0.14,1));
    s+='<rect x="320" y="188" width="180" height="52" rx="8" fill="#fff" stroke="'+C.AMBER+'" stroke-width="2" opacity="0">'+H.vis(0.26,1)+'</rect>';
    s+=H.tan(410,210,'Set 2', 14,C.AMBER,true,H.vis(0.26,1));
    s+=H.tan(410,230,'regional tables', 14,C.INK,false,H.vis(0.26,1));
    s+=cyl(30,310,190,64,'Node B','subscribes: Set 1 + 2',C.BLUE);
    s+=cyl(340,310,190,64,'Node C','subscribes: Set 1 only',C.BLUE);
    s+=H.token('M270 134 L190 188',0.06,0.14,C.GREEN);
    s+=H.token('M330 134 L410 188',0.06,0.26,C.AMBER);
    s+=H.token('M180 240 L140 310',0.32,0.42,C.GREEN);
    s+=H.token('M420 240 L420 310',0.42,0.52,C.AMBER);
    s+=H.token('M170 240 L420 310',0.52,0.66,C.GREEN);
    s+=H.cap(300,440,'Replication sets group tables together.',0,0.14,C.INK)
      +H.cap(300,440,'The source node splits its tables into Set 1 and Set 2.',0.14,0.32,C.GREEN)
      +H.cap(300,440,'Node B subscribes to both sets and gets everything.',0.32,0.52,C.BLUE)
      +H.cap(300,440,'Node C subscribes to only Set 1 — not every table has to go everywhere.',0.52,1.0,C.AMBER);
    return '<svg viewBox="0 0 600 460" role="img"><title>replication sets</title>'+s+'</svg>';
  }

  /* ---- Row filters ---- */
  function rowFilters(){
    var H=M.makeH(13), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Row Filters</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(210,70,180,60,'Source Table','all customers',C.BLUE);
    s+=H.tan(220,168,'EU',14,C.GREEN,true,H.vis(0.05,1));
    s+=H.tan(300,168,'US',14,C.GRAY,true,H.vis(0.05,1));
    s+=H.tan(380,168,'APAC',14,C.GRAY,true,H.vis(0.05,1));
    s+='<path d="M170 200 L430 200 L370 250 L230 250 Z" fill="'+C.PURPLE+'" fill-opacity="0.14" stroke="'+C.PURPLE+'" stroke-width="2"/>';
    s+=H.tan(300,228,'region = EU', 14,C.PURPLE,true,H.vis(0,1));
    s+=cyl(210,300,180,64,'Destination',null,C.BLUE);
    s+=H.token('M220 172 L280 200',0.16,0.28,C.GREEN);
    s+=H.token('M280 250 L300 300',0.32,0.42,C.GREEN);
    s+=H.tan(300,340,'EU row only', 14,C.GREEN,true,H.vis(0.44,1));
    s+='<g opacity="0">'+H.vis(0.16,0.30)
      +'<line x1="290" y1="180" x2="310" y2="196" stroke="'+C.RED+'" stroke-width="2.6" stroke-linecap="round"/>'
      +'<line x1="310" y1="180" x2="290" y2="196" stroke="'+C.RED+'" stroke-width="2.6" stroke-linecap="round"/></g>';
    s+='<g opacity="0">'+H.vis(0.16,0.30)
      +'<line x1="370" y1="180" x2="390" y2="196" stroke="'+C.RED+'" stroke-width="2.6" stroke-linecap="round"/>'
      +'<line x1="390" y1="180" x2="370" y2="196" stroke="'+C.RED+'" stroke-width="2.6" stroke-linecap="round"/></g>';
    s+=H.cap(300,410,'A row filter only replicates rows that match a rule.',0,0.16,C.INK)
      +H.cap(300,410,'Here the rule is region equals EU.',0.16,0.30,C.PURPLE)
      +H.cap(300,410,'Only the EU row passes through to the destination.',0.30,0.44,C.GREEN)
      +H.cap(300,410,'US and APAC rows stay behind — the copy holds just its slice.',0.44,1.0,C.GRAY);
    return '<svg viewBox="0 0 600 440" role="img"><title>row filters</title>'+s+'</svg>';
  }

  /* ---- DDL filters ---- */
  function ddlFilters(){
    var H=M.makeH(13), s=paper(600,480);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">DDL Filters</text>';
    s+=person(55,110,'DBA','tablet');
    s+=cyl(210,70,180,60,'Source Node','schema changes',C.BLUE);
    s+=H.tan(300,155,'ALTER TABLE orders',14,C.GREEN,true,H.vis(0.05,1));
    s+=H.tan(300,180,'DROP TABLE audit_log',14,C.GRAY,true,H.vis(0.05,1));
    s+='<g opacity="0">'+H.vis(0.16,0.30)
      +'<line x1="402" y1="160" x2="418" y2="176" stroke="'+C.RED+'" stroke-width="2.6" stroke-linecap="round"/>'
      +'<line x1="418" y1="160" x2="402" y2="176" stroke="'+C.RED+'" stroke-width="2.6" stroke-linecap="round"/></g>';
    s+='<path d="M170 210 L430 210 L370 260 L230 260 Z" fill="'+C.PURPLE+'" fill-opacity="0.14" stroke="'+C.PURPLE+'" stroke-width="2"/>';
    s+=H.tan(300,238,'DDL filter',14,C.PURPLE,true,H.vis(0,1));
    s+=cyl(210,310,180,64,'Destination',null,C.BLUE);
    s+=H.token('M300 184 L300 210',0.16,0.26,C.GREEN);
    s+=H.token('M300 260 L300 310',0.30,0.40,C.GREEN);
    s+=H.tan(300,396,'structure change applied',14,C.GREEN,true,H.vis(0.44,1));
    s+=H.cap(300,450,'DDL filters control which structure changes are allowed to replicate.',0,0.16,C.INK)
      +H.cap(300,450,'DDL means data-definition language — creating or altering tables.',0.16,0.30,C.PURPLE)
      +H.cap(300,450,'An allowed change, like an ALTER TABLE, replicates through.',0.30,0.44,C.GREEN)
      +H.cap(300,450,'A filtered statement, like a risky DROP TABLE, stays local.',0.44,1.0,C.GRAY);
    return '<svg viewBox="0 0 600 480" role="img"><title>ddl filters</title>'+s+'</svg>';
  }

  /* ---- Apply delay ---- */
  function applyDelay(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Apply Delay</text>';
    s+=person(55,220,'DBA','tablet');
    s+=cyl(210,80,180,64,'Leader',null,C.BLUE);
    s+='<g opacity="0">'+H.vis(0.10,1)
      +'<rect x="255" y="90" width="90" height="26" rx="5" fill="#fff" stroke="'+C.RED+'" stroke-width="1.8"/></g>';
    s+=H.tan(300,108,'BAD UPDATE', 14,C.RED,true,H.vis(0.10,1));
    s+=cyl(210,300,180,64,'Delayed Copy','5 min behind',C.GREEN);
    s+='<circle cx="300" cy="240" r="26" fill="none" stroke="'+C.AMBER+'" stroke-width="2" stroke-dasharray="4 4" opacity="0">'+H.vis(0.18,0.60)+'</circle>';
    s+=H.tan(300,246,'⏳',16,C.AMBER,false,H.vis(0.18,0.60));
    s+=H.tan(300,290,'still holds the good value', 14,C.GREEN,true,H.vis(0.30,0.62));
    s+=H.token('M300 144 L300 300',0.65,0.80,C.GREEN);
    s+='<g opacity="0">'+H.vis(0.62,1)
      +'<rect x="240" y="360" width="120" height="26" rx="5" fill="#fff" stroke="'+C.GREEN+'" stroke-width="1.8"/></g>';
    s+=H.tan(300,378,'mistake caught!', 14,C.GREEN,true,H.vis(0.62,1));
    s+=H.cap(300,440,'The leader commits a change immediately — including mistakes.',0,0.18,C.RED)
      +H.cap(300,440,'A delayed copy deliberately waits before applying anything.',0.18,0.40,C.AMBER)
      +H.cap(300,440,'It acts like a time machine — the bad change hasn’t landed there yet.',0.40,0.65,C.GREEN)
      +H.cap(300,440,'Catch the mistake before the delay window closes, and you can recover.',0.65,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>apply delay</title>'+s+'</svg>';
  }

  /* ---- CRDTs ---- */
  function crdts(){
    var H=M.makeH(14), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">CRDTs</text>';
    s+=person(55,220,'DBA',null);
    s+=cyl(90,90,180,64,'Node A',null,C.BLUE);
    s+=cyl(330,90,180,64,'Node B',null,C.BLUE);
    s+=H.tan(180,180,'+5 likes',14,C.BLUE,true,H.vis(0.08,1));
    s+=H.tan(420,180,'+3 likes',14,C.BLUE,true,H.vis(0.08,1));
    s+=H.token('M180 154 Q240 260 280 320',0.30,0.46,C.BLUE);
    s+=H.token('M420 154 Q360 260 320 320',0.30,0.46,C.BLUE);
    s+='<rect x="210" y="300" width="180" height="60" rx="10" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2" opacity="0">'+H.vis(0.50,1)+'</rect>';
    s+=H.tan(300,336,'Total: 8 likes ✓',14,C.GREEN,true,H.vis(0.52,1));
    s+=H.cap(300,430,'CRDTs are values built to merge, not collide.',0,0.10,C.INK)
      +H.cap(300,430,'Node A adds 5 likes while Node B adds 3, at the same time.',0.10,0.30,C.BLUE)
      +H.cap(300,430,'Instead of picking a winner…',0.30,0.50,C.INK)
      +H.cap(300,430,'…both changes combine: 5 + 3 = 8 likes, automatically.',0.50,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 460" role="img"><title>CRDTs</title>'+s+'</svg>';
  }

  /* ---- Global locks ---- */
  function globalLocks(){
    var H=M.makeH(15), s=paper(600,450);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Global Locks</text>';
    s+=person(55,280,'DBA','tablet');
    s+=H.tan(300,72,'🔒 ALTER TABLE inventory',15,C.PURPLE,true,H.vis(0.08,1));
    s+=cyl(40,130,160,64,'Node 1',null,C.BLUE);
    s+=cyl(220,130,160,64,'Node 2',null,C.BLUE);
    s+=cyl(400,130,160,64,'Node 3',null,C.BLUE);
    s+=H.tan(120,224,'⏸ paused',14,C.AMBER,true,H.vis(0.30,0.66));
    s+=H.tan(300,224,'⏸ paused',14,C.AMBER,true,H.vis(0.30,0.66));
    s+=H.tan(480,224,'⏸ paused',14,C.AMBER,true,H.vis(0.30,0.66));
    s+=H.tan(120,224,'✓ resumed',14,C.GREEN,true,H.vis(0.66,1));
    s+=H.tan(300,224,'✓ resumed',14,C.GREEN,true,H.vis(0.66,1));
    s+=H.tan(480,224,'✓ resumed',14,C.GREEN,true,H.vis(0.66,1));
    s+=H.cap(300,420,'Before a structure change, every copy must agree to pause.',0,0.10,C.INK)
      +H.cap(300,420,'The DBA runs an ALTER TABLE — a global DDL lock is requested.',0.10,0.30,C.PURPLE)
      +H.cap(300,420,'All three nodes pause, so no other structure change can clash.',0.30,0.66,C.AMBER)
      +H.cap(300,420,'Once the change completes, the lock releases and every node resumes.',0.66,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 450" role="img"><title>global locks</title>'+s+'</svg>';
  }

  /* ---- Global advisory locks ---- */
  function globalAdvisoryLocks(){
    var H=M.makeH(14), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Global Advisory Locks</text>';
    s+=person(90,110,'App A','tablet');
    s+=person(510,110,'App B','tablet');
    s+='<rect x="220" y="180" width="160" height="60" rx="10" fill="#fff" stroke="'+C.AMBER+'" stroke-width="2" opacity="0">'+H.vis(0.10,1)+'</rect>';
    s+=H.tan(300,216,'🎫 ticket #42',14,C.AMBER,true,H.vis(0.10,1));
    s+=H.token('M130 130 L225 195',0.06,0.18,C.AMBER);
    s+=H.token('M470 130 L375 195',0.40,0.52,C.RED);
    s+=H.tan(510,215,'⏳ waiting',14,C.RED,true,H.vis(0.52,1));
    s+=H.tan(300,278,'every copy honours the same ticket',14,C.INK,false,H.vis(0.28,1));
    s+=H.cap(300,430,'A global advisory lock is an app-chosen ticket, not enforced by the database.',0,0.10,C.INK)
      +H.cap(300,430,'App A grabs the ticket first.',0.10,0.28,C.AMBER)
      +H.cap(300,430,'Every cooperating copy honours the same ticket.',0.28,0.52,C.INK)
      +H.cap(300,430,'App B tries for the same ticket and must wait its turn.',0.52,1.0,C.RED);
    return '<svg viewBox="0 0 600 460" role="img"><title>global advisory locks</title>'+s+'</svg>';
  }

  /* ---- Replication lag ---- */
  function replicationLag(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Replication Lag</text>';
    s+=person(55,220,'DBA','tablet');
    s+=cyl(90,90,180,64,'Fast Node','writing quickly',C.BLUE);
    s+=cyl(330,90,180,64,'Slow Follower',null,C.AMBER);
    s+=H.flip(420,180,'2s behind','45s behind',0.44,14,C.GREEN,C.RED,true);
    s+=H.token('M270 122 L330 122',0.10,0.24,C.BLUE);
    s+=H.token('M270 122 L330 122',0.50,0.70,C.RED);
    s+='<rect x="130" y="255" width="340" height="80" rx="10" fill="#fff" stroke="'+C.RED+'" stroke-width="2" opacity="0">'+H.vis(0.66,1)+'</rect>';
    s+=H.tan(300,278,'⚠ risk: recent writes',14,C.RED,true,H.vis(0.68,1));
    s+=H.tan(300,298,'could be lost if this copy',14,C.RED,true,H.vis(0.69,1));
    s+=H.tan(300,318,'is promoted now',14,C.RED,true,H.vis(0.70,1));
    s+=H.cap(300,410,'Replication lag is how far behind a copy is.',0,0.10,C.INK)
      +H.cap(300,410,'A small, healthy gap is normal — the follower catches up quickly.',0.10,0.44,C.BLUE)
      +H.cap(300,410,'If the gap keeps growing, the follower falls further behind.',0.44,0.66,C.RED)
      +H.cap(300,410,'A large lag risks losing recent writes if that copy is promoted after a failure.',0.66,1.0,C.RED);
    return '<svg viewBox="0 0 600 440" role="img"><title>replication lag</title>'+s+'</svg>';
  }

  /* ---- Regional mesh & partition tolerance ---- */
  function regionalMesh(){
    var H=M.makeH(16), s=paper(600,480);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Regional Mesh &amp; Partition Tolerance</text>';
    s+=person(55,100,'Operator','tablet');
    /* mesh lines drawn first so nodes sit on top */
    s+='<path d="M262 154 L152 300" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0.55"/>';
    var apKt='0;0.40;0.44;0.62;0.66;1';
    s+='<path d="M338 154 L448 300" fill="none" stroke-width="1.8" opacity="0.55">'
      +H.ani('stroke',apKt,C.BLUE+';'+C.BLUE+';'+C.GRAY+';'+C.GRAY+';'+C.BLUE+';'+C.BLUE)
      +H.ani('stroke-dasharray',apKt,'0;0;5 6;5 6;0;0')+'</path>';
    s+='<path d="M225 332 L375 332" fill="none" stroke-width="1.8" opacity="0.55">'
      +H.ani('stroke',apKt,C.BLUE+';'+C.BLUE+';'+C.GRAY+';'+C.GRAY+';'+C.BLUE+';'+C.BLUE)
      +H.ani('stroke-dasharray',apKt,'0;0;5 6;5 6;0;0')+'</path>';
    s+=cyl(225,90,150,64,'US East','writer',C.BLUE);
    s+=cyl(75,300,150,64,'EU West','replica',C.BLUE);
    s+=cyl(375,300,150,64,'AP South','replica',C.BLUE);
    s+='<rect x="375" y="300" width="150" height="64" rx="10" fill="'+C.GRAY+'" opacity="0">'+H.ani('opacity',apKt,'0;0;0.5;0.5;0;0')+'</rect>';
    s+=H.tan(450,388,'✗ partitioned', 14,C.RED,true,H.vis(0.42,0.64));
    s+=H.token('M300 58 L300 90',0.06,0.14,C.AMBER);
    s+=H.tan(300,48,'WRITE', 14,C.AMBER,true,H.vis(0.05,0.16));
    s+=H.token('M262 154 L152 300',0.20,0.32,C.BLUE);
    s+=H.token('M338 154 L448 300',0.20,0.32,C.BLUE);
    s+='<circle cx="300" cy="200" r="24" fill="none" stroke="'+C.AMBER+'" stroke-width="1.8" stroke-dasharray="4 4" opacity="0">'+H.vis(0.44,0.66)+'</circle>';
    s+=H.tan(300,205,'⏳',15,C.AMBER,false,H.vis(0.44,0.66));
    s+=H.tan(300,236,'writes queued', 14,C.AMBER,false,H.vis(0.50,0.66));
    s+=H.token('M312 210 L440 300',0.67,0.80,C.AMBER);
    s+=H.cap(300,455,'Any node in the mesh can accept a write.',0,0.06,C.INK)
      +H.cap(300,455,'A write lands on US East and commits locally.',0.06,0.20,C.INK)
      +H.cap(300,455,'It replicates concurrently to EU West and AP South.',0.20,0.40,C.BLUE)
      +H.cap(300,455,'A network partition isolates AP South.',0.40,0.44,C.RED)
      +H.cap(300,455,'US East buffers writes destined for AP South until the link recovers.',0.44,0.66,C.AMBER)
      +H.cap(300,455,'Connectivity returns — buffered changes flush through in order.',0.66,0.84,C.BLUE)
      +H.cap(300,455,'AP South catches up and all three regions converge.',0.84,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 480" role="img"><title>regional mesh and partition tolerance</title>'+s+'</svg>';
  }

  /* ---- v4 — BDR + HARP ---- */
  function v4harp(){
    var H=M.makeH(15), s=paper(600,480);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">v4 — BDR + HARP</text>';
    s+=person(55,104,'App','tablet');
    s+=cyl(220,76,160,56,'HARP Proxy','router',C.PURPLE);
    s+=cyl(140,170,150,56,'HARP Manager','leader lease',C.PURPLE);
    s+=cyl(310,170,150,56,'Consensus Store','DCS',C.PURPLE);
    s+='<line x1="290" y1="198" x2="310" y2="198" stroke="'+C.PURPLE+'" stroke-width="1.8" opacity="0.6"/>';
    s+=cyl(30,300,150,64,'Lead Master',null,C.AMBER);
    s+=cyl(225,300,150,64,'Shadow Master',null,C.GRAY);
    s+=cyl(420,300,150,64,'Shadow Master',null,C.GRAY);
    s+=H.tan(105,292,'★',20,C.AMBER,true,H.vis(0.56,1));
    s+=H.tan(300,384,'shadow — discouraged', 14,C.GRAY,true,H.vis(0.64,1));
    s+=H.tan(495,384,'shadow — discouraged', 14,C.GRAY,true,H.vis(0.64,1));
    s+=H.tan(385,156,'leader = Lead Master', 14,C.PURPLE,true,H.vis(0.30,1));
    s+=H.token('M100 108 L220 100',0.06,0.16,C.BLUE);
    s+=H.tan(160,88,'connects', 14,C.BLUE,true,H.vis(0.06,0.18));
    s+=H.token('M255 132 L215 170',0.16,0.28,C.PURPLE);
    s+=H.token('M215 170 L255 132',0.34,0.44,C.PURPLE);
    s+=H.token('M240 132 Q170 220 105 300',0.44,0.56,C.AMBER);
    s+=H.cap(300,455,'In PGD v4, apps don’t talk to the database directly — they go through HARP.',0,0.06,C.INK)
      +H.cap(300,455,'The app connects using a multi-host connection string, reaching the HARP Proxy.',0.06,0.16,C.BLUE)
      +H.cap(300,455,'HARP Proxy asks the HARP Manager, which holds the leader lease from the consensus store.',0.16,0.34,C.PURPLE)
      +H.cap(300,455,'The Manager tells the Proxy who the current lead master is.',0.34,0.44,C.PURPLE)
      +H.cap(300,455,'The Proxy routes the write straight to that one lead master.',0.44,0.64,C.AMBER)
      +H.cap(300,455,'The remaining nodes are shadow masters — technically writable, but discouraged.',0.64,0.82,C.GRAY)
      +H.cap(300,455,'One external layer decides who is boss, so every app agrees.',0.82,1.0,C.INK);
    return '<svg viewBox="0 0 600 480" role="img"><title>v4 BDR and HARP</title>'+s+'</svg>';
  }

  /* ---- v4.4 — stabilization line ---- */
  function v44(){
    var H=M.makeH(14), s=paper(600,420);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">v4.4 — Stabilization Line</text>';
    s+=person(60,95,'Release Manager','tablet');
    s+=cyl(210,80,180,70,'PGD v4.4','stable line',C.BLUE);
    s+=H.tan(300,168,'no new features', 14,C.GRAY,false,H.vis(0.05,1));
    s+='<rect x="90" y="192" width="420" height="40" rx="8" fill="#fff" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0">'+H.vis(0.16,1)+'</rect>';
    s+=H.tan(300,217,'4.4.0 → prerequisite for PGD 6.1+', 14,C.BLUE,true,H.vis(0.16,1));
    s+='<rect x="60" y="242" width="480" height="40" rx="8" fill="#fff" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0">'+H.vis(0.42,1)+'</rect>';
    s+=H.tan(300,267,'4.4.1 → prereq for 6.2+, preserves node identity', 14,C.BLUE,true,H.vis(0.42,1));
    s+='<path d="M300 150 L300 310" fill="none" stroke="'+C.GREEN+'" stroke-width="2" stroke-dasharray="1 8" stroke-linecap="round" opacity="0">'+H.vis(0.60,1)+H.draw(0.60,0.76,180)+'</path>';
    s+='<g opacity="0">'+H.vis(0.60,1)+cyl(210,310,180,56,'PGD v6','the target',C.GREEN)+'</g>';
    s+=H.cap(300,400,'The 4.4.x minor line adds no new features — it exists to stabilize and certify the v4 line.',0,0.16,C.INK)
      +H.cap(300,400,'4.4.0 is a prerequisite for upgrading to PGD 6.1 or later.',0.16,0.42,C.BLUE)
      +H.cap(300,400,'4.4.1 is a prerequisite for 6.2+, and preserves node identity in a mixed-version cluster.',0.42,0.60,C.BLUE)
      +H.cap(300,400,'An Extended-Life-Support release — the certified bridge to PGD 6.',0.60,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 420" role="img"><title>v4.4 stabilization line</title>'+s+'</svg>';
  }

  /* ---- v5 — HARP out, PGD Proxy in ---- */
  function v5proxy(){
    var H=M.makeH(15), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">v5 — HARP Out, PGD Proxy In</text>';
    s+=person(55,104,'App','tablet');
    s+='<g opacity="0">'+H.vis(0,0.16)+cyl(220,76,160,56,'HARP','external',C.GRAY)+'<text x="300" y="104" text-anchor="middle" font-size="26" fill="'+C.RED+'">✗</text></g>';
    s+='<g opacity="0">'+H.vis(0.16,1)+cyl(220,76,160,56,'PGD Proxy','built in',C.PURPLE)+'</g>';
    s+=H.tan(300,58,'⚖ Raft', 14,C.PURPLE,true,H.vis(0.30,0.44));
    s+=cyl(30,300,150,64,'Write Leader',null,C.AMBER);
    s+=cyl(225,300,150,64,'Follower',null,C.BLUE);
    s+=cyl(420,300,150,64,'Follower',null,C.BLUE);
    s+=H.tan(105,292,'★',20,C.AMBER,true,H.vis(0.56,1));
    s+='<rect x="440" y="200" width="120" height="30" rx="6" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="1.8" opacity="0">'+H.vis(0.70,1)+'</rect>';
    s+=H.tan(500,220,'pgd-cli ⌨', 14,C.PURPLE,true,H.vis(0.70,1));
    s+=H.token('M100 108 L220 100',0.18,0.28,C.BLUE);
    s+=H.token('M240 132 Q170 220 105 300',0.46,0.58,C.AMBER);
    s+=H.cap(300,440,'Version 4 used an external HARP layer to route traffic.',0,0.16,C.INK)
      +H.cap(300,440,'v5 removes HARP entirely — routing is now the built-in PGD Proxy.',0.16,0.30,C.PURPLE)
      +H.cap(300,440,'The Proxy is driven by PGD’s own Raft, which elects a single write leader.',0.30,0.46,C.PURPLE)
      +H.cap(300,440,'The Proxy routes writes straight to that elected leader.',0.46,0.62,C.AMBER)
      +H.cap(300,440,'v5 also introduces pgd-cli — one tool to manage the whole cluster.',0.70,1.0,C.PURPLE);
    return '<svg viewBox="0 0 600 460" role="img"><title>v5 PGD Proxy replaces HARP</title>'+s+'</svg>';
  }

  /* shared checklist scene builder for "what changed" minor-version topics */
  function changelog(title, items, dur){
    var ROWH=100, BOXH=84;
    var H=M.makeH(dur||15), h=110+items.length*ROWH+40, s=paper(600,h);
    s+='<text x="300" y="24" text-anchor="middle" font-family="'+HAND+'" font-size="19" fill="'+C.INK+'" font-weight="700">'+title+'</text>';
    s+=person(55,h/2,'Release Manager','tablet');
    var span=1/(items.length+0.6);
    items.forEach(function(it,i){
      var y=74+i*ROWH, a=f(0.06+i*span);
      s+='<rect x="130" y="'+y+'" width="400" height="'+BOXH+'" rx="10" fill="#fff" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0">'+H.vis(a,1)+'</rect>';
      s+='<circle cx="165" cy="'+(y+42)+'" r="22" fill="none" stroke="'+C.BLUE+'" stroke-width="2.2" opacity="0">'+H.vis(a,1)+'</circle>';
      s+=H.tan(165,y+47,it.v,14,C.BLUE,true,H.vis(a,1));
      var lines=it.text.match(/.{1,32}(\s|$)/g)||[it.text];
      lines.forEach(function(ln,li){
        s+=H.tan(360,y+30+li*19,ln.trim(),14,C.INK,false,H.vis(a,1));
      });
    });
    function cap(t,a,b,col){ return H.cap(300,h-20,t,a,b,col); }
    var caps='';
    items.forEach(function(it,i){
      var a=f(0.06+i*span), b= i<items.length-1 ? f(0.06+(i+1)*span) : 1;
      caps+=cap(it.v+' — '+it.text, a, b, C.BLUE);
    });
    s+=caps;
    return '<svg viewBox="0 0 600 '+h+'" role="img"><title>'+title+'</title>'+s+'</svg>';
  }
  function v56to59(){
    return changelog('v5.6 → 5.9 — What Changed', [
      {v:'5.6', text:'Commit-scope DEGRADE ON / ORIGIN_GROUP, streaming via the decoding worker'},
      {v:'5.7', text:'Redesigned noun-verb CLI — pgd assess, pgd node upgrade'},
      {v:'5.8', text:'CLI usability improvements + bdr.galloc_chunk_info()'},
      {v:'5.9', text:'In-place upgrade to PGD 6, back-ported Connection Manager'}
    ], 16);
  }
  function v61to64(){
    return changelog('v6.1 → 6.4 — What Changed', [
      {v:'6.1', text:'CLI GUC get/update, view and part-node commands, Leader DDL Lock'},
      {v:'6.2', text:'TDE migration on upgrade, LDAP auth for Connection Manager'},
      {v:'6.3', text:'Connection Manager on subscriber-only nodes, better leader election'},
      {v:'6.4', text:'Configurable apply-error policy, large-object replication, parallel apply + Quorum Commit'}
    ], 16);
  }

  /* ---- v6 — Connection Manager + editions ---- */
  function v6cm(){
    var H=M.makeH(15), s=paper(600,480);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">v6 — Connection Manager + Editions</text>';
    s+=person(55,110,'App','tablet');
    s+=cyl(200,76,200,90,'Data Node','+ Connection Mgr',C.PURPLE);
    s+='<rect x="200" y="178" width="92" height="30" rx="5" fill="#fff" stroke="'+C.BLUE+'" stroke-width="1.6" opacity="0">'+H.vis(0.10,1)+'</rect>';
    s+=H.tan(246,199,'RW 6432',14,C.BLUE,true,H.vis(0.10,1));
    s+='<rect x="300" y="178" width="92" height="30" rx="5" fill="#fff" stroke="'+C.GREEN+'" stroke-width="1.6" opacity="0">'+H.vis(0.16,1)+'</rect>';
    s+=H.tan(346,199,'RO 6433',14,C.GREEN,true,H.vis(0.16,1));
    s+='<rect x="400" y="178" width="112" height="30" rx="5" fill="#fff" stroke="'+C.AMBER+'" stroke-width="1.6" opacity="0">'+H.vis(0.22,1)+'</rect>';
    s+=H.tan(456,199,'HTTP 6434',14,C.AMBER,true,H.vis(0.22,1));
    s+=H.token('M100 108 L215 130',0.28,0.40,C.BLUE);
    s+='<rect x="40" y="260" width="255" height="100" rx="10" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.48,1)+'</rect>';
    s+=H.tan(167,288,'PGD Essential',15,C.BLUE,true,H.vis(0.48,1));
    s+=H.tan(167,314,'≤4 data nodes, ≤2 groups',14,C.INK,false,H.vis(0.48,1));
    s+=H.tan(167,334,'fixed commit-scope set',14,C.INK,false,H.vis(0.48,1));
    s+='<rect x="305" y="260" width="255" height="100" rx="10" fill="#fff" stroke="'+C.PURPLE+'" stroke-width="2" opacity="0">'+H.vis(0.66,1)+'</rect>';
    s+=H.tan(432,288,'PGD Expanded',15,C.PURPLE,true,H.vis(0.66,1));
    s+=H.tan(432,314,'full features, no limits',14,C.INK,false,H.vis(0.66,1));
    s+=H.tan(432,334,'witnesses + Barman backups',14,C.INK,false,H.vis(0.66,1));
    s+=H.cap(300,450,'v6 replaces PGD Proxy with the Connection Manager, built into every data node.',0,0.22,C.INK)
      +H.cap(300,450,'It exposes read-write, read-only, and HTTP API ports on that same node.',0.22,0.48,C.PURPLE)
      +H.cap(300,450,'PGD Essential is the simple quick-start edition, capped and fixed.',0.48,0.66,C.BLUE)
      +H.cap(300,450,'PGD Expanded has full features with no node or group limits.',0.66,1.0,C.PURPLE);
    return '<svg viewBox="0 0 600 480" role="img"><title>v6 connection manager and editions</title>'+s+'</svg>';
  }

  /* ---- What is PGD? ---- */
  function whatIsPGD(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">What is PGD?</text>';
    s+=person(55,104,'App','tablet');
    s+=cyl(70,90,140,60,'Copy 1',null,C.BLUE);
    s+=cyl(230,90,140,60,'Copy 2',null,C.BLUE);
    s+=cyl(390,90,140,60,'Copy 3',null,C.BLUE);
    s+='<rect x="70" y="90" width="140" height="60" rx="10" fill="'+C.GRAY+'" opacity="0">'+H.vis(0.66,1)+'</rect>';
    s+=H.tan(140,180,'✗ lost', 14,C.RED,true,H.vis(0.66,1));
    s+=H.token('M100 108 L140 108',0.10,0.20,C.BLUE);
    s+=H.token('M100 108 L300 108',0.10,0.24,C.BLUE);
    s+=H.token('M100 108 L460 108',0.10,0.28,C.BLUE);
    s+='<rect x="120" y="260" width="360" height="70" rx="10" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2" opacity="0">'+H.vis(0.68,1)+'</rect>';
    s+=H.tan(300,288,'Copy 2 and Copy 3 still have everything', 14,C.GREEN,true,H.vis(0.68,1));
    s+=H.tan(300,310,'the app keeps working without interruption', 14,C.INK,false,H.vis(0.72,1));
    s+=H.cap(300,410,'PGD runs several full, live copies of your database at once.',0,0.10,C.INK)
      +H.cap(300,410,'Your app talks to one address, while a write reaches every copy.',0.10,0.30,C.BLUE)
      +H.cap(300,410,'Lose one copy…',0.30,0.66,C.INK)
      +H.cap(300,410,'…and the others keep serving — nothing is lost.',0.66,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>what is PGD</title>'+s+'</svg>';
  }

  /* ---- The mesh ---- */
  function theMesh(){
    var H=M.makeH(13), s=paper(600,440);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">The Mesh</text>';
    s+=person(55,220,'DBA','tablet');
    s+='<path d="M225 154 L150 260" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0.6"/>';
    s+='<path d="M375 154 L450 260" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0.6"/>';
    s+='<path d="M225 292 L375 292" fill="none" stroke="'+C.BLUE+'" stroke-width="1.8" opacity="0.6"/>';
    s+=cyl(225,90,150,64,'Database 1',null,C.BLUE);
    s+=cyl(75,260,150,64,'Database 2',null,C.BLUE);
    s+=cyl(375,260,150,64,'Database 3',null,C.BLUE);
    s+=H.token('M225 154 L150 260',0.20,0.34,C.GREEN);
    s+=H.token('M375 154 L450 260',0.20,0.36,C.GREEN);
    s+=H.token('M225 292 L375 292',0.36,0.48,C.GREEN);
    s+=H.tan(300,384,'every copy talks to every other', 14,C.INK,false,H.vis(0.50,1));
    s+=H.cap(300,415,'Copies are linked in a full mesh — every copy talks to every other.',0,0.20,C.INK)
      +H.cap(300,415,'A change on Database 1 streams directly to every peer at once.',0.20,0.48,C.GREEN)
      +H.cap(300,415,'No hub, no bottleneck — a change anywhere spreads everywhere.',0.48,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>the mesh</title>'+s+'</svg>';
  }

  /* ---- 1.1 Asynchronous Symmetric Multi-Master ---- */
  function multimaster(){
    var H=M.makeH(15), s=paper(640,480);
    s+=H.tst(320,26,'Asynchronous Symmetric Multi-Master',16,C.INK,true);
    s+='<rect x="185" y="54" width="100" height="26" rx="5" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.10,1)+'</rect>';
    s+=H.tan(235,72,'WRITE [A]', 14,C.BLUE,true,H.vis(0.10,1));
    s+='<rect x="485" y="54" width="100" height="26" rx="5" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.10,1)+'</rect>';
    s+=H.tan(535,72,'WRITE [B]', 14,C.BLUE,true,H.vis(0.10,1));
    s+=cyl(160,96,150,64,'Node 1','US East',C.BLUE);
    s+=cyl(460,96,150,64,'Node 2','EU West',C.BLUE);
    s+=person(60,128,'Developer','tablet');
    s+=H.token('M100 128 Q150 108 185 128',0.08,0.18,C.BLUE);
    s+=H.token('M100 128 Q300 90 485 128',0.08,0.20,C.BLUE);
    s+='<circle cx="235" cy="128" r="34" fill="none" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.18,0.26)+'</circle>';
    s+='<circle cx="535" cy="128" r="34" fill="none" stroke="'+C.BLUE+'" stroke-width="2" opacity="0">'+H.vis(0.20,0.28)+'</circle>';
    s+='<path d="M230 195 Q320 240 410 195" fill="none" stroke="'+C.INK+'" stroke-width="2.2" stroke-dasharray="1 8" stroke-linecap="round" opacity="0">'+H.vis(0.30,1)+H.draw(0.30,0.46,420)+'</path>';
    s+=H.token('M240 205 Q320 240 400 205',0.50,0.66,C.GREEN);
    s+=H.token('M400 208 Q320 246 240 208',0.68,0.84,C.GREEN);
    s+=H.tan(320,266,'Logical Replication Stream', 14,C.INK,false,H.vis(0.32,1));
    s+=H.cap(320,450,'Any node can accept a write — there is no single master.',0,0.10)
      +H.cap(320,450,'The developer writes to Node 1 and Node 2 at the same time.',0.10,0.28,C.BLUE)
      +H.cap(320,450,'Each write commits locally first — this is asynchronous replication.',0.28,0.46)
      +H.cap(320,450,'Changes then flow both ways over the logical replication stream…',0.46,0.68,C.GREEN)
      +H.cap(320,450,'…until both nodes hold an identical, converged copy.',0.68,1.0,C.GREEN);
    return '<svg viewBox="0 0 640 480" role="img"><title>async symmetric multi-master</title>'+s+'</svg>';
  }

  /* ---- 1.2 The Core Mesh Protocol Under the Hood ---- */
  function meshinternals(){
    var H=M.makeH(14), s=paper(600,460);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">The Core Mesh Protocol Under the Hood</text>';
    s+=person(60,220,'DBA','tablet');
    s+='<rect x="200" y="78" width="200" height="292" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2.4"/>';
    s+='<line x1="200" y1="175" x2="400" y2="175" stroke="'+C.INK+'" stroke-width="1.8" opacity="0">'+H.vis(0.08,1)+'</line>';
    s+='<line x1="200" y1="273" x2="400" y2="273" stroke="'+C.INK+'" stroke-width="1.8" opacity="0">'+H.vis(0.16,1)+'</line>';
    s+=H.tan(300,330,'[1. WAL Storage]', 14,C.INK,true,H.vis(0.06,1));
    s+=H.tan(300,230,'[2. Logical Decoder]', 14,C.BLUE,true,H.vis(0.14,1));
    s+=H.tan(300,130,'[3. BDR Worker]', 14,C.PURPLE,true,H.vis(0.22,1));
    s+='<circle cx="300" cy="350" r="6" fill="'+C.INK+'" opacity="0">'
      +H.vis(0.30,0.62)
      +'<animateMotion dur="14s" repeatCount="indefinite" calcMode="linear" path="M0 0 L0 -100 L0 -200" keyTimes="0;0.30;0.62;1" keyPoints="0;0;1;1"/></circle>';
    s+=H.token('M400 130 L520 130',0.64,0.78,C.PURPLE);
    s+=H.tan(490,168,'Replication Stream', 14,C.PURPLE,true,H.vis(0.64,1));
    s+=H.cap(300,440,'Inside every node, three layers turn a commit into a replicated change.',0,0.14)
      +H.cap(300,440,'WAL Storage durably records the write first.',0.14,0.30,C.INK)
      +H.cap(300,440,'The Logical Decoder reads the WAL and reconstructs row-level changes.',0.30,0.50,C.BLUE)
      +H.cap(300,440,'The BDR Worker packages and streams those changes outward.',0.50,0.66,C.PURPLE)
      +H.cap(300,440,'That outbound stream is what every peer subscribes to.',0.66,1.0,C.PURPLE);
    return '<svg viewBox="0 0 600 460" role="img"><title>core mesh protocol</title>'+s+'</svg>';
  }

  /* ---- 2.1 Multi-Master Concurrent Write Collisions ---- */
  function conflictCollision(){
    var H=M.makeH(13), s=paper(600,460);
    s+='<text x="300" y="30" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Multi-Master Concurrent Write Collisions</text>';
    s+=person(55,90,'User A',null);
    s+=person(55,300,'User B',null);
    s+=H.tan(140,70,'UPDATE balance = 100', 14,C.BLUE,true,H.vis(0.02,1));
    s+=H.tan(140,405,'UPDATE balance = 150', 14,C.BLUE,true,H.vis(0.02,1));
    s+='<path d="M100 95 L470 200" fill="none" stroke="'+C.INK+'" stroke-width="1.6" stroke-dasharray="1 7" opacity="0.7"/>';
    s+='<path d="M100 290 L470 210" fill="none" stroke="'+C.INK+'" stroke-width="1.6" stroke-dasharray="1 7" opacity="0.7"/>';
    s+=H.tst(200,120,'Node 1', 14,C.BLUE,true);
    s+=H.tst(200,270,'Node 2', 14,C.BLUE,true);
    s+=H.token('M100 95 L470 200',0.14,0.34,C.BLUE);
    s+=H.token('M100 290 L470 210',0.14,0.34,C.BLUE);
    s+='<g opacity="0" transform="translate(475,205)">'+H.vis(0.34,0.50)
      +'<path d="M0,-32 L9,-9 L32,-11 L13,7 L21,30 L0,15 L-21,30 L-13,7 L-32,-11 L-9,-9 Z" fill="'+C.RED+'" fill-opacity="0.16" stroke="'+C.RED+'" stroke-width="2.6"/></g>';
    s+=H.tan(475,255,'💥 CONFLICT DETECTED', 14,C.RED,true,H.vis(0.36,0.50));
    s+=H.tan(475,274,'Row ID Identifier Collision', 14,C.RED,false,H.vis(0.36,0.52));
    s+=H.cap(300,440,'User A and User B write to the same row on different nodes, at the same instant.',0,0.14)
      +H.cap(300,440,'Both updates race across the mesh toward every copy.',0.14,0.34,C.BLUE)
      +H.cap(300,440,'They collide on the same row — a conflict PGD must resolve.',0.34,0.60,C.RED)
      +H.cap(300,440,'Next: PGD applies a deterministic rule to settle it.',0.60,1.0);
    return '<svg viewBox="0 0 600 460" role="img"><title>concurrent write collision</title>'+s+'</svg>';
  }

  /* ---- 2.2 Deterministic Resolution Strategies (Last Update Wins) ---- */
  function conflictResolution(){
    var H=M.makeH(15), s=paper(600,480);
    s+='<g opacity="0.35">'
      +'<path d="M100 95 L470 200" fill="none" stroke="'+C.INK+'" stroke-width="1.4" stroke-dasharray="1 7"/>'
      +'<path d="M100 290 L470 210" fill="none" stroke="'+C.INK+'" stroke-width="1.4" stroke-dasharray="1 7"/></g>';
    s+='<rect x="0" y="0" width="600" height="480" fill="#000" opacity="0">'+H.ani('opacity','0;0.06;0.10;1','0;0;0.06;0.06')+'</rect>';
    s+=H.tan(500,40,'Resolution Rule: Last Update Wins', 14,C.PURPLE,true,H.vis(0.46,1));
    s+='<g opacity="0">'+H.vis(0.06,1)
      +'<circle cx="300" cy="230" r="105" fill="#fff" fill-opacity="0.85" stroke="'+C.INK+'" stroke-width="4"/>'
      +'<line x1="378" y1="308" x2="420" y2="350" stroke="'+C.INK+'" stroke-width="8" stroke-linecap="round"/>'
      +'</g>';
    s+=H.tan(300,190,'Packet A: 12:00:00.004123', 14,C.BLUE,true,H.vis(0.12,1));
    s+=H.tan(300,230,'Packet B: 12:00:00.004126', 14,C.GREEN,true,H.vis(0.20,1));
    s+='<circle cx="380" cy="230" r="8" fill="none" stroke="'+C.GREEN+'" stroke-width="2" opacity="0">'+H.vis(0.24,1)+'</circle>';
    s+='<line x1="380" y1="230" x2="380" y2="225" stroke="'+C.GREEN+'" stroke-width="1.6" opacity="0">'+H.vis(0.24,1)+'</line>';
    s+='<path d="M260 178 L340 202" fill="none" stroke="'+C.RED+'" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="120" opacity="0">'+H.vis(0.34,1)+H.draw(0.34,0.42,120)+'</path>';
    s+='<path d="M260 202 L340 178" fill="none" stroke="'+C.RED+'" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="120" opacity="0">'+H.vis(0.34,1)+H.draw(0.34,0.42,120)+'</path>';
    s+=H.token('M280 190 Q180 340 130 400',0.44,0.60,C.RED);
    s+='<g opacity="0">'+H.vis(0.58,1)
      +'<path d="M100 376 L140 376 L148 388 L200 388 L200 418 L100 418 Z" fill="#FFF6D8" stroke="'+C.INK+'" stroke-width="2.2"/></g>';
    s+=H.tan(150,440,'bdr.conflict_history (Log)',14,C.INK,true,H.vis(0.58,1));
    s+='<rect x="420" y="70" width="150" height="60" rx="8" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2" opacity="0">'+H.vis(0.62,1)+'</rect>';
    s+=H.tan(495,96,'Live Grid',14,C.GREEN,true,H.vis(0.62,1));
    s+=H.tan(495,116,'balance = 150 ✓',14,C.GREEN,false,H.vis(0.66,1));
    s+=H.cap(300,505,'A magnifying glass inspects the two conflicting commit timestamps.',0,0.24)
      +H.cap(300,505,'Packet B committed 3 microseconds later.',0.24,0.34,C.GREEN)
      +H.cap(300,505,'Packet A is struck out — it loses under last-update-wins.',0.34,0.58,C.RED)
      +H.cap(300,505,'The losing write is archived to the conflict log; the grid keeps B.',0.58,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 520" role="img"><title>deterministic conflict resolution</title>'+s+'</svg>';
  }

  /* ---- 3.1 Distributed Consensus & Node State Machine ---- */
  function consensus(){
    var H=M.makeH(15), s=paper(600,480);
    s+='<text x="300" y="22" text-anchor="middle" font-family="'+HAND+'" font-size="18" fill="'+C.INK+'" font-weight="700">Distributed Consensus &amp; Node State Machine</text>';
    var A=[110,158], B=[300,98], Cc=[490,158];
    s+=cyl(A[0]-60,A[1],120,60,'Node A',null,C.BLUE);
    s+=cyl(B[0]-60,B[1],120,60,'Node B',null,C.BLUE);
    var apKt='0;0.40;0.46;1';
    s+=cyl(Cc[0]-60,Cc[1],120,60,'Node C',null,C.BLUE);
    s+='<rect x="'+(Cc[0]-60)+'" y="'+Cc[1]+'" width="120" height="60" rx="10" fill="none" stroke="'+C.RED+'" stroke-width="0" opacity="0">'
      +H.ani('stroke-width',apKt,'0;0;3.2;3.2')+H.vis(0.40,1)+'</rect>';
    s+=person(300,250,'Cluster Inspector','hardhat');
    s+='<line x1="290" y1="250" x2="'+A[0]+'" y2="'+(A[1]+30)+'" stroke="'+C.INK+'" stroke-width="1.6" stroke-dasharray="1 6" opacity="0">'+H.vis(0.14,1)+'</line>';
    s+='<line x1="300" y1="240" x2="'+B[0]+'" y2="'+(B[1]+60)+'" stroke="'+C.INK+'" stroke-width="1.6" stroke-dasharray="1 6" opacity="0">'+H.vis(0.14,1)+'</line>';
    s+='<line x1="310" y1="250" x2="'+Cc[0]+'" y2="'+(Cc[1]+30)+'" stroke="'+C.INK+'" stroke-width="1.6" stroke-dasharray="1 6" opacity="0">'+H.vis(0.14,1)+'</line>';
    s+='<rect x="'+(A[0]-38)+'" y="'+(A[1]+66)+'" width="76" height="22" rx="4" fill="#fff" stroke="'+C.GREEN+'" stroke-width="1.8" opacity="0">'+H.vis(0.20,1)+'</rect>';
    s+=H.tan(A[0],A[1]+81,'[ONLINE]', 14,C.GREEN,true,H.vis(0.20,1));
    s+='<rect x="'+(B[0]-38)+'" y="'+(B[1]-30)+'" width="76" height="22" rx="4" fill="#fff" stroke="'+C.GREEN+'" stroke-width="1.8" opacity="0">'+H.vis(0.24,1)+'</rect>';
    s+=H.tan(B[0],B[1]-15,'[ONLINE]', 14,C.GREEN,true,H.vis(0.24,1));
    s+='<rect x="'+(Cc[0]-40)+'" y="'+(Cc[1]+66)+'" width="82" height="22" rx="4" fill="#fff" stroke="'+C.GREEN+'" stroke-width="1.8" opacity="0">'+H.vis(0.28,0.40)+'</rect>';
    s+=H.tan(Cc[0],Cc[1]+81,'[ONLINE]', 14,C.GREEN,true,H.vis(0.28,0.40));
    s+='<rect x="'+(Cc[0]-68)+'" y="'+(Cc[1]+66)+'" width="136" height="22" rx="4" fill="#fff" stroke="'+C.RED+'" stroke-width="1.8" opacity="0">'+H.vis(0.42,1)+'</rect>';
    s+=H.tan(Cc[0],Cc[1]+81,'[UNREACHABLE]', 14,C.RED,true,H.vis(0.42,1));
    for(var k=0;k<5;k++){
      s+='<line x1="'+(Cc[0]-50+k*22)+'" y1="'+(Cc[1]-6)+'" x2="'+(Cc[0]-30+k*22)+'" y2="'+(Cc[1]+66)+'" stroke="'+C.RED+'" stroke-width="2" opacity="0">'+H.vis(0.34,0.42)+'</line>';
    }
    s+='<rect x="30" y="440" width="540" height="34" rx="6" fill="#fff" stroke="'+C.INK+'" stroke-width="1.8" opacity="0">'+H.vis(0.50,1)+'</rect>';
    s+=H.tan(300,462,'Quorum: 2/3 Nodes Operational → Cluster Active',14,C.GREEN,true,H.vis(0.50,1));
    s+=H.cap(300,408,'The Cluster Inspector polls every node for its status.',0,0.20,C.INK)
      +H.cap(300,408,'All three report online.',0.20,0.34,C.GREEN)
      +H.cap(300,408,'Node C suffers a network failure.',0.34,0.42,C.RED)
      +H.cap(300,408,'Two of three nodes still form a majority — the cluster stays active.',0.50,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 480" role="img"><title>consensus and node state machine</title>'+s+'</svg>';
  }

  /* ---- 4.1 CAMO (swimlanes) ---- */
  function camoSwimlanes(){
    var H=M.makeH(14), s=paper(600,440);
    s+='<line x1="200" y1="20" x2="200" y2="400" stroke="#c9c4b5" stroke-width="2"/>';
    s+='<line x1="400" y1="20" x2="400" y2="400" stroke="#c9c4b5" stroke-width="2"/>';
    s+=H.tst(100,40,'Client', 14,C.INK,true);
    s+=H.tst(300,40,'Master Node A', 14,C.INK,true);
    s+=H.tst(500,40,'CAMO Partner B', 14,C.INK,true);
    s+=person(100,110,null,null);
    s+='<rect x="240" y="150" width="120" height="60" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2.4" opacity="0">'
      +H.ani('stroke','0;0.10;0.20;0.50;0.60;1',C.AMBER+';'+C.AMBER+';'+C.AMBER+';'+C.AMBER+';'+C.GREEN+';'+C.GREEN)
      +H.vis(0,1)+'</rect>';
    s+=H.tst(300,184,'Node A', 14,C.INK,true);
    s+=H.tan(300,300,'[PREPARE]', 14,C.AMBER,true,H.vis(0.10,0.50));
    s+=H.tan(300,300,'[COMMITTED]', 14,C.GREEN,true,H.vis(0.52,1));
    s+='<rect x="440" y="150" width="120" height="60" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2.2"/>';
    s+=H.tst(500,184,'Node B', 14,C.INK,true);
    s+=H.tan(500,300,'✓ mirrored', 14,C.GREEN,true,H.vis(0.32,1));
    s+=H.token('M120 130 L240 178',0.04,0.14,C.AMBER);
    s+=H.tan(160,140,'COMMIT', 14,C.AMBER,true,H.vis(0.03,0.16));
    s+=H.token('M360 172 L440 172',0.18,0.30,C.AMBER);
    s+=H.tan(400,160,'validate', 14,C.AMBER,true,H.vis(0.18,0.32));
    s+=H.token('M440 196 L360 196',0.34,0.46,C.GREEN);
    s+=H.tan(400,212,'confirm', 14,C.GREEN,true,H.vis(0.34,0.48));
    s+=H.token('M240 184 L120 140',0.56,0.70,C.GREEN);
    s+=H.tan(160,168,'success', 14,C.GREEN,true,H.vis(0.56,0.72));
    s+=H.cap(300,420,'The client sends COMMIT into Node A.',0,0.18,C.INK)
      +H.cap(300,420,'Node A withholds its reply and validates with CAMO Partner B first.',0.18,0.34,C.AMBER)
      +H.cap(300,420,'Partner B mirrors the write and confirms.',0.34,0.52,C.GREEN)
      +H.cap(300,420,'Only now does Node A commit and tell the client it succeeded.',0.52,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 440" role="img"><title>CAMO swimlanes</title>'+s+'</svg>';
  }

  /* ---- 5.1 Non-Disruptive Rolling Major Version Migration ---- */
  function rollingMigration(){
    var H=M.makeH(15), s=paper(620,400);
    s+=H.tan(310,26,'Zero Downtime Upgrade',14,C.PURPLE,true,H.vis(0,1));
    var xs=[40,235,430], W=150,Y=140,Hh=100;
    xs.forEach(function(x,i){
      s+='<rect x="'+x+'" y="'+Y+'" width="'+W+'" height="'+Hh+'" rx="10" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2.4"/>';
      s+='<ellipse cx="'+(x+W/2)+'" cy="'+Y+'" rx="'+(W/2)+'" ry="9" fill="#fff" stroke="'+C.BLUE+'" stroke-width="2.2"/>';
      for(var k=0;k<3;k++){
        var begin=(k*0.5+i*0.2)+'s';
        s+='<circle cx="'+(x+22)+'" cy="0" r="3" fill="'+C.GREEN+'" opacity="0">'
          +'<animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur="1.6s" begin="'+begin+'" repeatCount="indefinite"/>'
          +'<animateMotion dur="1.6s" begin="'+begin+'" repeatCount="indefinite" path="M0 '+(Y+Hh-14)+' L0 '+(Y+14)+'"/></circle>';
      }
    });
    s+=H.tan(310,Y+Hh/2+4,'[PGD v4]',14,C.BLUE,true,H.vis(0,1));
    s+=H.tan(505,Y+Hh/2+4,'[PGD v4]',14,C.BLUE,true,H.vis(0,1));
    s+=H.flip(115,Y+Hh/2+4,'[PGD v4]','[PGD v6]',0.55,14,C.BLUE,C.PURPLE,true);
    s+='<g opacity="0">'+H.vis(0.10,0.62)
      +'<rect x="25" y="'+(Y-24)+'" width="180" height="'+(Hh+48)+'" rx="18" fill="#ffffff" fill-opacity="0.3" stroke="'+C.PURPLE+'" stroke-width="2" stroke-dasharray="6 5"/>'
      +'<text x="115" y="'+(Y-32)+'" text-anchor="middle" font-family="'+HAND+'" font-size="20">🛡</text></g>';
    s+=H.cap(310,380,'Three nodes run PGD v4, serving continuous live traffic.',0,0.10,C.INK)
      +H.cap(310,380,'Node 1 is domed off — traffic quietly reroutes through Node 2 and Node 3.',0.10,0.30,C.PURPLE)
      +H.cap(310,380,'Behind the dome, Node 1 is upgraded to PGD v6.',0.30,0.55,C.PURPLE)
      +H.cap(310,380,'The dome lifts and traffic splits evenly across all three again.',0.62,1.0,C.GREEN);
    return '<svg viewBox="0 0 620 400" role="img"><title>rolling major version migration</title>'+s+'</svg>';
  }

  /* ---- 6.1 Non-Overlapping ID Chunk Allocation ---- */
  function sequenceChunks(){
    var H=M.makeH(15), s=paper(600,480);
    s+=H.tst(300,16,'Global Sequence Range Manager', 14,C.PURPLE,true);
    s+='<path d="M220 34 L380 34 L355 62 L245 62 Z" fill="'+C.PURPLE+'" fill-opacity="0.18" stroke="'+C.PURPLE+'" stroke-width="1.8"/>';
    var rows=[{y:100,label:'Node 1',range:'IDs: 1 to 10,000'},{y:220,label:'Node 2',range:'IDs: 10,001 to 20,000'},{y:340,label:'Node 3',range:'IDs: 20,001 to 30,000'}];
    rows.forEach(function(r,i){
      s+='<rect x="60" y="'+r.y+'" width="480" height="56" rx="8" fill="#fff" stroke="'+C.INK+'" stroke-width="1.8"/>';
      s+=H.tst(115,r.y+34,r.label, 14,C.INK,true);
      var a=f(0.06+i*0.06), b=f(0.18+i*0.06);
      s+=H.token('M300 62 Q300 '+f((62+r.y)/2)+' 200 '+(r.y+28),a,b,C.PURPLE);
      s+='<rect x="220" y="'+(r.y+8)+'" width="220" height="40" rx="8" fill="#FFF6D8" stroke="'+C.PURPLE+'" stroke-width="1.8" opacity="0">'+H.vis(b,1)+'</rect>';
      s+=H.tan(330,r.y+33,r.range, 14,C.PURPLE,true,H.vis(b,1));
    });
    s+=person(60,405,'Local User',null);
    var counters=['1','2','3'], span=0.24, n=counters.length, base=0.32;
    counters.forEach(function(txt,i){
      var a=f(base+span*(i/n)), b=f(base+span*((i+1)/n));
      s+=H.tan(200,rows[0].y+34,txt,15,C.BLUE,true,H.vis(a,b));
    });
    s+=H.tan(300,rows[0].y+70,'zero cross-network communication', 14,C.INK,false,H.vis(0.32,0.56));
    s+=H.cap(300,450,'The global manager hands each node a non-overlapping ID range.',0,0.30,C.INK)
      +H.cap(300,450,'Node 1 pulls IDs straight off its own block — no coordination needed.',0.32,0.56,C.BLUE)
      +H.cap(300,450,'Every ID is unique cluster-wide, with zero network round-trips.',0.56,1.0,C.GREEN);
    return '<svg viewBox="0 0 600 480" role="img"><title>distributed sequence chunk allocation</title>'+s+'</svg>';
  }

  /* ---- 7.1 Cluster Observability via Management Views ---- */
  function observability(){
    var H=M.makeH(15), s=paper(640,440);
    s+=person(55,220,'Support Engineer','desk');
    s+='<rect x="140" y="40" width="470" height="340" rx="10" fill="#101418" stroke="'+C.INK+'" stroke-width="2.4"/>';
    s+='<line x1="140" y1="80" x2="610" y2="80" stroke="#333" stroke-width="1.4"/>';
    s+='<line x1="330" y1="80" x2="330" y2="380" stroke="#333" stroke-width="1.4"/>';
    s+='<circle cx="160" cy="60" r="5" fill="'+C.RED+'"/><circle cx="176" cy="60" r="5" fill="'+C.AMBER+'"/><circle cx="192" cy="60" r="5" fill="'+C.GREEN+'"/>';
    s+='<text x="160" y="112" font-family="monospace" font-size="14" fill="#7CFC9A" opacity="0">'+H.vis(0.08,1)+'SELECT node_name,'+'</text>';
    s+='<text x="160" y="130" font-family="monospace" font-size="14" fill="#7CFC9A" opacity="0">'+H.vis(0.14,1)+'  replication_lag'+'</text>';
    s+='<text x="160" y="148" font-family="monospace" font-size="14" fill="#7CFC9A" opacity="0">'+H.vis(0.20,1)+'FROM bdr.node_slots_summary;'+'</text>';
    s+='<text x="350" y="105" font-family="monospace" font-size="14" fill="#eee" opacity="0">'+H.vis(0.30,1)+'node       lag      state'+'</text>';
    s+='<line x1="345" y1="115" x2="600" y2="115" stroke="#333" stroke-width="1"/>';
    s+='<text x="350" y="145" font-family="monospace" font-size="14" fill="'+C.GREEN+'" opacity="0">'+H.vis(0.36,1)+'pnode_1    0.00s    Active'+'</text>';
    s+='<text x="350" y="185" font-family="monospace" font-size="14" fill="'+C.AMBER+'" opacity="0">'+H.vis(0.44,1)+'pnode_2   14.25s   ⚠ Lag Alert'+'</text>';
    s+='<ellipse cx="470" cy="180" rx="118" ry="16" fill="none" stroke="'+C.RED+'" stroke-width="2.6" opacity="0">'+H.vis(0.56,1)+'</ellipse>';
    s+=H.cap(320,420,'The support engineer queries PGD’s built-in monitoring views.',0,0.30,C.INK)
      +H.cap(320,420,'bdr.node_slots_summary reports per-node replication lag.',0.30,0.44,C.GREEN)
      +H.cap(320,420,'pnode_2 is 14.25 seconds behind — a lag alert worth investigating.',0.44,0.72,C.AMBER)
      +H.cap(320,420,'The same views operators use to spot problems before they become outages.',0.72,1.0,C.INK);
    return '<svg viewBox="0 0 640 440" role="img"><title>cluster observability</title>'+s+'</svg>';
  }

  /* ---- Replica Identity (RIF) ---- */
  function replicaIdentity(){
    var H=M.makeH(16), s=paper(640,420);
    s+=H.tan(320,50,'Has a Primary Key (default RIF)',16,C.PURPLE,true,H.vis(0,0.5));
    s+=H.tan(320,50,'No Replica Identity',16,C.PURPLE,true,H.vis(0.5,1));
    s+=person(30,150,'DBA',null);
    s+='<rect x="150" y="80" width="340" height="46" rx="8" fill="#101418" stroke="'+C.INK+'" stroke-width="2"/>';
    s+='<text x="320" y="108" text-anchor="middle" font-family="monospace" font-size="14" fill="#7CFC9A">UPDATE orders SET amt=50 WHERE id=5</text>';
    s+=cyl(70,150,150,50,'Node A','origin',C.BLUE);
    s+=cyl(420,150,150,50,'Node B','replica',C.BLUE);
    s+=H.token('M225 175 L415 175',0.02,0.16,C.PURPLE)+H.token('M225 175 L415 175',0.52,0.66,C.PURPLE);
    s+=H.tan(145,235,'orders(id PK, name, amt)',14,C.BLUE,false,H.vis(0,0.5));
    s+=H.tan(145,235,'orders(name, amt) — no PK',14,C.RED,false,H.vis(0.5,1));
    s+=H.tan(495,235,'✓ id=5 matched exactly',14,C.GREEN,true,H.vis(0.18,0.5));
    s+=H.tan(495,235,'? which row is "id=5"?',14,C.RED,true,H.vis(0.68,1));
    s+=H.tan(320,290,'bdr.default_replica_identity sets the default for new tables',14,C.PURPLE,false,H.vis(0,1));
    s+=H.cap(320,390,'With a primary key as replica identity, an UPDATE or DELETE names the exact row to change.',0,0.5,C.INK)
      +H.cap(320,390,'Without one, a peer can\'t uniquely match the row — updates and deletes get rejected.',0.5,1,C.RED);
    return '<svg viewBox="0 0 640 420" role="img"><title>replica identity</title>'+s+'</svg>';
  }

  /* ---- Replication Slots & the PGD Group Slot ---- */
  function replicationSlots(){
    var H=M.makeH(20), s=paper(640,420);
    s+=H.tan(320,45,'Normal — both peers close',15,C.PURPLE,true,H.vis(0,0.34));
    s+=H.tan(320,45,'Node C falls behind',15,C.PURPLE,true,H.vis(0.34,0.7));
    s+=H.tan(320,45,'Risk: Raft stalled',15,C.PURPLE,true,H.vis(0.7,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(100,190,110,44,'Node A','origin',C.BLUE);
    s+=H.tan(340,85,'WAL on Node A (oldest → newest)',14,C.INK,false,H.vis(0,1));
    s+='<rect x="90" y="105" width="500" height="34" rx="6" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>';
    /* phase 1: normal */
    s+='<g opacity="0">'+H.vis(0,0.34)
      +'<rect x="435" y="105" width="155" height="34" fill="'+C.AMBER+'" opacity="0.3"/>'
      +'<line x1="555" y1="100" x2="555" y2="155" stroke="'+C.BLUE+'" stroke-width="2.4"/>'
      +'<line x1="435" y1="100" x2="435" y2="155" stroke="'+C.AMBER+'" stroke-width="2.6"/>'
      +H.tst(555,172,'Slot→B',14,C.BLUE,true)
      +H.tst(435,172,'Slot→C = pin',14,C.AMBER,true)
      +'</g>';
    /* phase 2: lag */
    s+='<g opacity="0">'+H.vis(0.34,0.7)
      +'<rect x="200" y="105" width="390" height="34" fill="'+C.AMBER+'" opacity="0.3"/>'
      +'<line x1="560" y1="100" x2="560" y2="155" stroke="'+C.BLUE+'" stroke-width="2.4"/>'
      +'<line x1="200" y1="100" x2="200" y2="155" stroke="'+C.AMBER+'" stroke-width="2.6"/>'
      +H.tst(560,172,'Slot→B',14,C.BLUE,true)
      +H.tst(200,172,'Slot→C = pin',14,C.AMBER,true)
      +'</g>';
    /* phase 3: danger — same positions as phase 2, add warning border */
    s+='<g opacity="0">'+H.vis(0.7,1)
      +'<rect x="200" y="105" width="390" height="34" fill="'+C.AMBER+'" opacity="0.3"/>'
      +'<line x1="560" y1="100" x2="560" y2="155" stroke="'+C.BLUE+'" stroke-width="2.4"/>'
      +'<line x1="200" y1="100" x2="200" y2="155" stroke="'+C.AMBER+'" stroke-width="2.6"/>'
      +H.tst(560,172,'Slot→B',14,C.BLUE,true)
      +H.tst(200,172,'Slot→C = pin',14,C.AMBER,true)
      +'<rect x="85" y="95" width="510" height="70" rx="6" fill="none" stroke="'+C.RED+'" stroke-width="2.4" stroke-dasharray="6 5"/>'
      +'</g>';
    s+=H.tan(320,258,'Node A must retain WAL back to the slowest confirmed slot',14,C.INK,false,H.vis(0,1));
    s+=H.tan(320,285,'⚠ If Raft stalls, the Group Slot can\'t advance',14,C.RED,true,H.vis(0.72,1));
    s+=H.tan(320,305,'and WAL keeps growing — disk-exhaustion risk',14,C.RED,true,H.vis(0.72,1));
    s+=H.cap(320,390,'In steady state, Node B and Node C confirm receipt at a similar pace.',0,0.34,C.INK)
      +H.cap(320,390,'If Node C falls behind, the Group Slot — pinned to the slowest peer — retains WAL too.',0.34,0.7,C.AMBER)
      +H.cap(320,390,'But if Raft itself stalls, the Group Slot can\'t advance either, and WAL keeps growing.',0.7,1,C.RED);
    return '<svg viewBox="0 0 640 420" role="img"><title>replication slots and the group slot</title>'+s+'</svg>';
  }

  /* ---- DDL Replication Mechanics & Table Rewrites ---- */
  function ddlMechanics(){
    var H=M.makeH(20), s=paper(640,400);
    s+=H.tan(320,45,'Replicated DDL',15,C.PURPLE,true,H.vis(0,0.34));
    s+=H.tan(320,45,'Local-only DDL',15,C.PURPLE,true,H.vis(0.34,0.62));
    s+=H.tan(320,45,'Table Rewrites — cluster-wide lock',15,C.PURPLE,true,H.vis(0.62,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(120,90,140,50,'Node A',null,C.BLUE);
    s+=cyl(380,90,140,50,'Node B',null,C.BLUE);
    /* phase 1: replicated */
    s+='<g opacity="0">'+H.vis(0,0.34)
      +H.token('M270 115 L370 115',0.05,0.28,C.GREEN)
      +H.tst(190,170,'CREATE TABLE …',14,C.BLUE,true)
      +H.tst(190,190,'ALTER TABLE … ADD COLUMN',14,C.BLUE,false)
      +H.tst(450,170,'applied on Node B too',14,C.GREEN,true)
      +'</g>';
    /* phase 2: local-only */
    s+='<g opacity="0">'+H.vis(0.34,0.62)
      +H.tst(320,120,'🚫',20,C.RED,true)
      +H.tst(190,170,'LOCK, VACUUM,',14,C.RED,true)
      +H.tst(190,190,'ANALYZE, CLUSTER',14,C.RED,false)
      +H.tst(450,170,'never arrives here',14,C.RED,true)
      +'</g>';
    /* phase 3: table rewrite */
    s+='<g opacity="0">'+H.vis(0.62,1)
      +'<rect x="110" y="80" width="160" height="70" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="2.4" stroke-dasharray="6 5"/>'
      +'<rect x="370" y="80" width="160" height="70" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="2.4" stroke-dasharray="6 5"/>'
      +H.tst(320,172,'ALTER COLUMN TYPE rewrites the table —',14,C.AMBER,true)
      +H.tst(320,192,'cluster-wide lock while it runs',14,C.AMBER,true)
      +H.tst(320,225,'Exception: CREATE / DROP INDEX CONCURRENTLY skips this lock',14,C.GREEN,true)
      +'</g>';
    s+=H.cap(320,365,'Most DDL — CREATE TABLE, ALTER TABLE ADD COLUMN — replicates automatically to every node.',0,0.34,C.INK)
      +H.cap(320,365,'A few operations stay local only: LOCK, VACUUM, ANALYZE, and CLUSTER never replicate.',0.34,0.62,C.RED)
      +H.cap(320,365,'Table rewrites take a cluster-wide lock, except CREATE/DROP INDEX CONCURRENTLY.',0.62,1,C.AMBER);
    return '<svg viewBox="0 0 640 400" role="img"><title>DDL replication mechanics and table rewrites</title>'+s+'</svg>';
  }

  /* ---- Node Types: Physical Standby, Logical Standby & Subscriber-Only ---- */
  function nodeTypes(){
    var H=M.makeH(20), s=paper(640,400);
    s+=H.tan(320,45,'Physical Standby',16,C.PURPLE,true,H.vis(0,0.34));
    s+=H.tan(320,45,'Logical Standby',16,C.PURPLE,true,H.vis(0.34,0.64));
    s+=H.tan(320,45,'Subscriber-Only',16,C.PURPLE,true,H.vis(0.64,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(190,80,140,50,'Data Node','votes + writes',C.BLUE);
    /* phase 1: physical standby */
    s+='<g opacity="0">'+H.vis(0,0.34)
      +'<line x1="260" y1="130" x2="260" y2="185" stroke="'+C.GRAY+'" stroke-width="2.2"/>'
      +'<rect x="150" y="158" width="220" height="18" fill="'+C.PAPER+'"/>'
      +H.tst(260,165,'PG streaming replication',14,C.GRAY,false)
      +cyl(190,185,140,50,'Physical Standby','byte-for-byte',C.GRAY)
      +H.tst(480,195,'Votes: No',14,C.RED,true)
      +H.tst(480,217,'Writes: No',14,C.RED,true)
      +H.tst(480,239,'Promotable: replaces this node',14,C.GREEN,true)
      +H.tst(480,261,'Deprecated in v6',14,C.AMBER,true)
      +'</g>';
    /* phase 2: logical standby */
    s+='<g opacity="0">'+H.vis(0.34,0.64)
      +'<line x1="260" y1="130" x2="260" y2="185" stroke="'+C.PURPLE+'" stroke-width="2.2" stroke-dasharray="5 4"/>'
      +'<rect x="150" y="158" width="220" height="18" fill="'+C.PAPER+'"/>'
      +H.tst(260,165,'logical subscription',14,C.PURPLE,false)
      +cyl(190,185,140,50,'Logical Standby','logical changes',C.PURPLE)
      +H.tst(480,195,'Votes: No',14,C.RED,true)
      +H.tst(480,217,'Writes: No',14,C.RED,true)
      +H.tst(480,239,'Promotable: full Data Node',14,C.GREEN,true)
      +H.tst(480,261,'Siblings can\'t follow after promotion',14,C.AMBER,true)
      +'</g>';
    /* phase 3: subscriber-only */
    s+='<g opacity="0">'+H.vis(0.64,1)
      +'<line x1="260" y1="130" x2="260" y2="185" stroke="'+C.AMBER+'" stroke-width="2.2" stroke-dasharray="2 5"/>'
      +'<rect x="150" y="158" width="220" height="18" fill="'+C.PAPER+'"/>'
      +H.tst(260,165,'logical subscription',14,C.AMBER,false)
      +cyl(190,185,140,50,'Subscriber-only','read replica',C.AMBER)
      +H.tst(480,195,'Votes: No',14,C.RED,true)
      +H.tst(480,217,'Publishes changes: No',14,C.RED,true)
      +H.tst(480,239,'Receives changes: Yes',14,C.GREEN,true)
      +H.tst(480,261,'Never votes or publishes back',14,C.RED,true)
      +'</g>';
    s+=H.cap(320,360,'Physical Standby: a plain PG copy of one node. Doesn\'t vote; promotable. Deprecated in v6.',0,0.34,C.INK)
      +H.cap(320,360,'Logical Standby: receives logical changes and can be promoted to a full Data Node.',0.34,0.64,C.PURPLE)
      +H.cap(320,360,'Subscriber-only nodes receive every change for read-scaling, but never vote or publish back.',0.64,1,C.AMBER);
    return '<svg viewBox="0 0 640 400" role="img"><title>node types: physical standby, logical standby, subscriber-only</title>'+s+'</svg>';
  }

  /* ---- Clock Skew & Cluster Sizing Limits ---- */
  function clockSkewSizing(){
    var H=M.makeH(18), s=paper(640,420);
    s+=H.tan(320,42,'Clocks must stay in sync',15,C.PURPLE,true,H.vis(0,0.4));
    s+=H.tan(320,42,'Skew breaks conflict resolution',15,C.PURPLE,true,H.vis(0.4,0.7));
    s+=H.tan(320,42,'How big can a cluster get?',15,C.PURPLE,true,H.vis(0.7,1));
    s+=person(30,150,'DBA',null);
    /* phases 1+2 share the 3-node clock row */
    s+='<g opacity="0">'+H.vis(0,0.7)
      +cyl(90,92,140,50,'Node A',null,C.BLUE)
      +cyl(250,92,140,50,'Node B',null,C.BLUE)
      +cyl(410,92,140,50,'Node C',null,C.BLUE)
      +'<circle cx="160" cy="72" r="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>'
      +'<circle cx="320" cy="72" r="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>'
      +'<circle cx="480" cy="72" r="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>'
      +'<line x1="160" y1="72" x2="160" y2="63" stroke="'+C.GREEN+'" stroke-width="2.2" stroke-linecap="round"/>'
      +'<line x1="320" y1="72" x2="320" y2="63" stroke="'+C.GREEN+'" stroke-width="2.2" stroke-linecap="round"/>'
      +'<line x1="480" y1="72" x2="480" y2="63" stroke="'+C.GREEN+'" stroke-width="2.2" stroke-linecap="round" opacity="0">'+H.vis(0,0.4)+'</line>'
      +'<line x1="480" y1="72" x2="487" y2="65" stroke="'+C.RED+'" stroke-width="2.4" stroke-linecap="round" opacity="0">'+H.vis(0.42,0.7)+'</line>'
      +'<circle cx="480" cy="72" r="14" fill="none" stroke="'+C.RED+'" stroke-width="2" stroke-dasharray="3 3" opacity="0">'+H.vis(0.42,0.7)+'</circle>'
      +H.tan(320,175,'NTP keeps all clocks within bdr.maximum_clock_skew',14,C.GREEN,false,H.vis(0,0.4))
      +H.tan(320,175,'Node C has drifted — conflict-resolution timestamps become unreliable',14,C.RED,true,H.vis(0.42,0.7))
      +'</g>';
    /* phase 3: sizing gauge */
    s+='<g opacity="0">'+H.vis(0.7,1)
      +'<rect x="100" y="100" width="200" height="26" fill="'+C.BLUE+'" opacity="0.3"/>'
      +'<rect x="300" y="100" width="180" height="26" fill="'+C.GREEN+'" opacity="0.25"/>'
      +'<rect x="90" y="100" width="440" height="26" rx="6" fill="none" stroke="'+C.INK+'" stroke-width="2"/>'
      +H.tst(100,145,'3',14,C.INK,true)+H.tst(300,145,'16',14,C.INK,true)+H.tst(480,145,'48',14,C.INK,true)
      +H.tst(200,175,'Typical: 3–16 nodes',14,C.BLUE,true)
      +H.tst(420,175,'Tested well beyond that',14,C.GREEN,true)
      +H.tst(320,205,'Largest known deployments run into the hundreds of nodes',14,C.PURPLE,false)
      +'</g>';
    s+=H.cap(320,390,'PGD relies on synchronized clocks — NTP keeps every node within bdr.maximum_clock_skew.',0,0.4,C.INK)
      +H.cap(320,390,'A node whose clock drifts past that threshold makes conflict timestamps unreliable.',0.4,0.7,C.RED)
      +H.cap(320,390,'Typical clusters run 3 to 16 nodes; PGD has been tested well beyond that, into the hundreds.',0.7,1,C.PURPLE);
    return '<svg viewBox="0 0 640 420" role="img"><title>clock skew and cluster sizing limits</title>'+s+'</svg>';
  }

  /* ---- Local Locks & Blocking Replication ---- */
  function localLocksBlocking(){
    var H=M.makeH(20), s=paper(640,420);
    s+=H.tan(320,42,'Normal — applier keeps up',15,C.PURPLE,true,H.vis(0,0.34));
    s+=H.tan(320,42,'Blocked — a local lock stalls apply',15,C.PURPLE,true,H.vis(0.34,0.68));
    s+=H.tan(320,42,'Diagnose with pg_blocking_pids()',15,C.PURPLE,true,H.vis(0.68,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(230,80,180,50,'Node A',null,C.BLUE);
    /* phase 1: normal */
    s+='<g opacity="0">'+H.vis(0,0.34)
      +'<rect x="90" y="170" width="200" height="60" rx="8" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2"/>'
      +'<rect x="350" y="170" width="200" height="60" rx="8" fill="#fff" stroke="'+C.GREEN+'" stroke-width="2"/>'
      +H.tst(190,197,'Local txn: BEGIN…COMMIT',14,C.GREEN,true)+H.tst(190,217,'(quick, no overlap)',14,C.GREEN,false)
      +H.tst(450,197,'Apply Worker: row X',14,C.GREEN,true)+H.tst(450,217,'applied ✓',14,C.GREEN,true)
      +H.tst(320,205,'🔓',18,C.GREEN,false)
      +H.tan(320,265,'No blocking — replication lag stays near zero',14,C.GREEN,false,H.vis(0.03,0.34))
      +'</g>';
    /* phase 2: blocked */
    s+='<g opacity="0">'+H.vis(0.34,0.68)
      +'<rect x="90" y="170" width="200" height="60" rx="8" fill="#fff" stroke="'+C.RED+'" stroke-width="2.4"/>'
      +'<rect x="350" y="170" width="200" height="60" rx="8" fill="#fff" stroke="'+C.RED+'" stroke-width="2.4"/>'
      +H.tst(190,197,'BEGIN; UPDATE row X…',14,C.RED,true)+H.tst(190,217,'still open (long txn)',14,C.RED,false)
      +H.tst(450,197,'Apply Worker: row X',14,C.RED,true)+H.tst(450,217,'waiting on the lock…',14,C.RED,true)
      +H.tst(320,205,'🔒',18,C.RED,false)
      +H.tan(320,265,'Replication lag on Node A starts climbing',14,C.RED,true,H.vis(0.36,0.68))
      +'</g>';
    /* phase 3: diagnose */
    s+='<g opacity="0">'+H.vis(0.68,1)
      +'<rect x="140" y="175" width="360" height="40" rx="6" fill="#101418" stroke="'+C.INK+'" stroke-width="2"/>'
      +'<text x="320" y="200" text-anchor="middle" font-family="monospace" font-size="14" fill="#7CFC9A">SELECT pg_blocking_pids(applier_pid);</text>'
      +H.tan(320,235,'→ blocking session pid 4821 found',14,C.AMBER,true,H.vis(0.72,1))
      +H.tan(320,262,'Session committed — apply resumes immediately',14,C.GREEN,true,H.vis(0.85,1))
      +'</g>';
    s+=H.cap(320,390,'When nothing else holds row X, the apply worker replicates it immediately.',0,0.34,C.INK)
      +H.cap(320,390,'A long local transaction holding row X blocks the apply worker until it ends.',0.34,0.68,C.RED)
      +H.cap(320,390,'pg_blocking_pids() on the stuck backend reveals exactly who\'s holding the lock.',0.68,1,C.AMBER);
    return '<svg viewBox="0 0 640 420" role="img"><title>local locks and blocking replication</title>'+s+'</svg>';
  }

  /* ---- Global Lock Modes: DDL → DML → Leader Lock ---- */
  function globalLockModes(){
    var H=M.makeH(20), s=paper(640,420);
    s+=H.tan(320,40,'ddl_locking = on (Global DDL Lock)',14.5,C.PURPLE,true,H.vis(0,0.34));
    s+=H.tan(320,40,'ddl_locking = dml (Global DML Lock)',14.5,C.PURPLE,true,H.vis(0.34,0.67));
    s+=H.tan(320,40,'ddl_locking = leader (v6 Leader Lock)',14.5,C.PURPLE,true,H.vis(0.67,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(100,90,140,46,'Node A',null,C.BLUE);
    s+=cyl(260,90,140,46,'Node B',null,C.BLUE);
    s+=cyl(420,90,140,46,'Node C',null,C.BLUE);
    /* phase 1: global DDL lock — everything blocked everywhere */
    s+='<g opacity="0">'+H.vis(0,0.34)
      +'<rect x="90" y="80" width="160" height="66" rx="10" fill="none" stroke="'+C.RED+'" stroke-width="2.4" stroke-dasharray="6 5"/>'
      +'<rect x="250" y="80" width="160" height="66" rx="10" fill="none" stroke="'+C.RED+'" stroke-width="2.4" stroke-dasharray="6 5"/>'
      +'<rect x="410" y="80" width="160" height="66" rx="10" fill="none" stroke="'+C.RED+'" stroke-width="2.4" stroke-dasharray="6 5"/>'
      +H.tan(320,180,'Every write, on every table, waits for the lock',14,C.RED,true,H.vis(0.03,0.34))
      +'</g>';
    /* phase 2: global DML lock — only the affected table */
    s+='<g opacity="0">'+H.vis(0.34,0.67)
      +H.tst(170,180,'orders: locked',14,C.RED,true)+H.tst(170,200,'other tables: OK',14,C.GREEN,false)
      +H.tst(330,180,'orders: locked',14,C.RED,true)+H.tst(330,200,'other tables: OK',14,C.GREEN,false)
      +H.tst(490,180,'orders: locked',14,C.RED,true)+H.tst(490,200,'other tables: OK',14,C.GREEN,false)
      +'</g>';
    /* phase 3: leader lock — only the write leader coordinates */
    s+='<g opacity="0">'+H.vis(0.67,1)
      +H.tst(170,178,'★ Write Leader',14,C.AMBER,true)+H.tst(170,198,'coordinates the lock',14,C.AMBER,false)
      +H.tst(330,180,'writing normally',14,C.GREEN,false)
      +H.tst(490,180,'writing normally',14,C.GREEN,false)
      +'</g>';
    s+=H.cap(320,390,'v4/v5 default: ddl_locking=on blocks every write, on every table, cluster-wide.',0,0.34,C.RED)
      +H.cap(320,390,'ddl_locking=dml narrows that to just the table being altered.',0.34,0.67,C.AMBER)
      +H.cap(320,390,'v6\'s Leader Lock has only the write leader coordinate, keeping the rest available.',0.67,1,C.GREEN);
    return '<svg viewBox="0 0 640 420" role="img"><title>global lock modes: DDL, DML, and leader lock</title>'+s+'</svg>';
  }

  /* ---- Column-Level Conflict Resolution ---- */
  function columnConflict(){
    var H=M.makeH(16), s=paper(640,420);
    s+=H.tan(320,45,'Row-level: one version wins entirely',15,C.PURPLE,true,H.vis(0,0.5));
    s+=H.tan(320,45,'Column-level: each column merges',15,C.PURPLE,true,H.vis(0.5,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(50,90,150,46,'Node A','changes email',C.BLUE);
    s+=cyl(440,90,150,46,'Node B','changes phone',C.BLUE);
    s+=cyl(245,90,150,46,'customer row',null,C.GRAY);
    s+=H.token('M200 113 L245 113',0.05,0.2,C.PURPLE)+H.token('M440 113 L395 113',0.05,0.2,C.PURPLE);
    s+='<g opacity="0">'+H.vis(0,0.5)
      +H.tst(320,160,'email: Node A\'s change lost',14,C.RED,true)
      +H.tst(320,182,'phone: Node B\'s change kept',14,C.GREEN,false)
      +'</g>';
    s+='<g opacity="0">'+H.vis(0.5,1)
      +H.tst(320,160,'email: Node A\'s change kept',14,C.GREEN,true)
      +H.tst(320,182,'phone: Node B\'s change kept',14,C.GREEN,false)
      +H.tst(320,207,'bdr.column_timestamps tracks each column',14,C.PURPLE,false)
      +'</g>';
    s+=H.cap(320,390,'By default, one row version wins entirely — a non-conflicting column can still be lost.',0,0.5,C.INK)
      +H.cap(320,390,'Column-level resolution timestamps each column separately, so both changes survive.',0.5,1,C.GREEN);
    return '<svg viewBox="0 0 640 420" role="img"><title>column-level conflict resolution</title>'+s+'</svg>';
  }

  /* ---- Stream Triggers (Conflict & Transform) ---- */
  function streamTriggers(){
    var H=M.makeH(16), s=paper(640,420);
    s+=H.tan(320,45,'Conflict Trigger — custom resolution',15,C.PURPLE,true,H.vis(0,0.5));
    s+=H.tan(320,45,'Transform Trigger — reshape incoming rows',15,C.PURPLE,true,H.vis(0.5,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(60,150,140,46,'Incoming','change',C.GRAY);
    s+=cyl(460,150,140,46,'Table',null,C.BLUE);
    s+='<rect x="250" y="140" width="160" height="60" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2.2"/>';
    s+=H.token('M200 173 L250 173',0.05,0.22,C.PURPLE)+H.token('M410 173 L460 173',0.3,0.47,C.PURPLE);
    s+='<g opacity="0">'+H.vis(0,0.5)
      +H.tst(330,175,'Conflict Trigger',14,C.PURPLE,true)
      +H.tan(320,230,'custom logic decides the winner —',14,C.PURPLE,false,H.vis(0.05,0.5))
      +H.tan(320,250,'e.g. "trusted source always wins"',14,C.PURPLE,false,H.vis(0.05,0.5))
      +'</g>';
    s+='<g opacity="0">'+H.vis(0.5,1)
      +H.tst(330,175,'Transform Trigger',14,C.AMBER,true)
      +H.tan(320,230,'reshapes a row to match the current schema',14,C.AMBER,false,H.vis(0.55,1))
      +H.tan(320,250,'bridges old and new schema during a rolling upgrade',14,C.AMBER,false,H.vis(0.55,1))
      +'</g>';
    s+=H.cap(320,390,'A Conflict Trigger swaps in custom logic, like always trusting one source.',0,0.5,C.PURPLE)
      +H.cap(320,390,'A Transform Trigger reshapes incoming rows, bridging schemas during a rolling upgrade.',0.5,1,C.AMBER);
    return '<svg viewBox="0 0 640 420" role="img"><title>stream triggers: conflict and transform</title>'+s+'</svg>';
  }

  /* ---- Upgrade Paths & Breaking Changes (v4 -> v6) ---- */
  function upgradePaths(){
    var H=M.makeH(20), s=paper(640,420);
    s+=H.tan(320,42,'v4 → v5: HARP removed',15,C.PURPLE,true,H.vis(0,0.34));
    s+=H.tan(320,42,'v5 → v6: Proxy → Connection Manager',15,C.PURPLE,true,H.vis(0.34,0.67));
    s+=H.tan(320,42,'The rules: one command, no downgrade',15,C.PURPLE,true,H.vis(0.67,1));
    s+=person(30,150,'DBA',null);
    s+=cyl(70,95,150,50,'v4',null,C.GRAY);
    s+=cyl(250,95,150,50,'v5',null,C.BLUE);
    s+=cyl(430,95,150,50,'v6',null,C.PURPLE);
    s+='<path d="M220 120 L250 120" fill="none" stroke="'+C.GRAY+'" stroke-width="2.4" marker-end="url(#ah)"/>';
    s+='<path d="M400 120 L430 120" fill="none" stroke="'+C.GRAY+'" stroke-width="2.4" marker-end="url(#ah)"/>';
    s+='<g opacity="0">'+H.vis(0,0.34)
      +'<path d="M220 120 L250 120" fill="none" stroke="'+C.GREEN+'" stroke-width="3.4" marker-end="url(#ah)"/>'
      +H.tan(320,180,'HARP removed — PGD Proxy becomes the built-in router',14,C.GREEN,true,H.vis(0.03,0.34))
      +'</g>';
    s+='<g opacity="0">'+H.vis(0.34,0.67)
      +'<path d="M400 120 L430 120" fill="none" stroke="'+C.GREEN+'" stroke-width="3.4" marker-end="url(#ah)"/>'
      +H.tan(320,180,'PGD Proxy → Connection Manager',14,C.GREEN,true,H.vis(0.37,0.67))
      +H.tan(320,202,'CAMO / sync / group commit fold into Commit Scopes',14,C.GREEN,false,H.vis(0.37,0.67))
      +'</g>';
    s+='<g opacity="0">'+H.vis(0.67,1)
      +'<rect x="140" y="230" width="360" height="40" rx="6" fill="#101418" stroke="'+C.INK+'" stroke-width="2"/>'
      +'<text x="320" y="255" text-anchor="middle" font-family="monospace" font-size="14" fill="#7CFC9A">pgd node upgrade</text>'
      +'<path d="M430 145 Q320 300 250 145" fill="none" stroke="'+C.RED+'" stroke-width="2.4" stroke-dasharray="6 5"/>'
      +H.tst(320,300,'✗ no downgrade',14,C.RED,true)
      +'</g>';
    s+=H.cap(320,390,'Upgrading v4 to v5 removes HARP entirely — routing becomes the built-in PGD Proxy.',0,0.34,C.INK)
      +H.cap(320,390,'v5 to v6 swaps PGD Proxy for the Connection Manager, and folds durability into commit scopes.',0.34,0.67,C.GREEN)
      +H.cap(320,390,'Since 5.7, pgd node upgrade handles Postgres and PGD together — there\'s no downgrade path.',0.67,1,C.RED);
    return '<svg viewBox="0 0 640 420" role="img"><title>upgrade paths and breaking changes, v4 to v6</title>'+s+'</svg>';
  }

  /* ---- Sequence Kinds Beyond Galloc ---- */
  function sequenceKinds(){
    var H=M.makeH(20), s=paper(640,420);
    s+=H.tan(320,42,'Timeshard',15,C.PURPLE,true,H.vis(0,0.25));
    s+=H.tan(320,42,'SnowflakeID',15,C.PURPLE,true,H.vis(0.25,0.5));
    s+=H.tan(320,42,'KSUUID',15,C.PURPLE,true,H.vis(0.5,0.75));
    s+=H.tan(320,42,'Offset / Local',15,C.PURPLE,true,H.vis(0.75,1));
    s+=person(30,150,'DBA',null);
    s+='<rect x="90" y="90" width="210" height="60" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>';
    s+='<rect x="340" y="90" width="210" height="60" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>';
    s+='<rect x="90" y="170" width="210" height="60" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>';
    s+='<rect x="340" y="170" width="210" height="60" rx="10" fill="#fff" stroke="'+C.INK+'" stroke-width="2"/>';
    s+=H.tst(195,115,'Timeshard',14,C.INK,true)+H.tst(445,115,'SnowflakeID',14,C.INK,true);
    s+=H.tst(195,195,'KSUUID',14,C.INK,true)+H.tst(445,195,'Offset / Local',14,C.INK,true);
    s+='<rect x="90" y="90" width="210" height="60" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="3.2" opacity="0">'+H.vis(0,0.25)+'</rect>';
    s+='<rect x="340" y="90" width="210" height="60" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="3.2" opacity="0">'+H.vis(0.25,0.5)+'</rect>';
    s+='<rect x="90" y="170" width="210" height="60" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="3.2" opacity="0">'+H.vis(0.5,0.75)+'</rect>';
    s+='<rect x="340" y="170" width="210" height="60" rx="10" fill="none" stroke="'+C.AMBER+'" stroke-width="3.2" opacity="0">'+H.vis(0.75,1)+'</rect>';
    s+=H.tan(195,138,'2024…-node2-00042',14,C.AMBER,false,H.vis(0.03,0.25));
    s+=H.tan(445,138,'6928…4102',14,C.AMBER,false,H.vis(0.28,0.5));
    s+=H.tan(195,218,'ks_01890c…a1b2',14,C.AMBER,false,H.vis(0.53,0.75));
    s+=H.tan(445,218,'node1:1,4,7… node2:2,5,8…',14,C.AMBER,false,H.vis(0.78,1));
    s+=H.cap(320,360,'Timeshard packs a timestamp and node id into the value — sortable and spread across nodes.',0,0.25,C.PURPLE)
      +H.cap(320,360,'SnowflakeID packs timestamp, node, and a counter into one integer, unique and time-ordered.',0.25,0.5,C.BLUE)
      +H.cap(320,360,'KSUUID is a UUID that sorts by creation time — useful wherever UUIDs are already expected.',0.5,0.75,C.GREEN)
      +H.cap(320,360,'Offset steps each node by its own gap; Local isn\'t distributed at all — single-node only.',0.75,1,C.GRAY);
    return '<svg viewBox="0 0 640 420" role="img"><title>sequence kinds beyond galloc</title>'+s+'</svg>';
  }

  /* ---- PGD on Kubernetes (PG4K / CloudNativePG Global Cluster) ---- */
  function pgdKubernetes(){
    var H=M.makeH(22), s=paper(640,440);
    s+=H.tan(80,20,'PGD4K',14,C.GRAY,true,H.vis(0,1));
    s+=H.tan(320,42,'PGD maps onto Kubernetes',15,C.PURPLE,true,H.vis(0,0.35));
    s+=H.tan(320,42,'Wrong: delete pod/PVC directly',15,C.PURPLE,true,H.vis(0.35,0.68));
    s+=H.tan(320,42,'Right: part the node first',15,C.PURPLE,true,H.vis(0.68,1));
    s+=person(30,150,'DBA','tablet');
    s+='<rect x="120" y="80" width="440" height="150" rx="12" fill="none" stroke="'+C.BLUE+'" stroke-width="2" stroke-dasharray="5 5"/>';
    s+=H.tst(340,98,'Kubernetes cluster',14,C.BLUE,true);
    s+=cyl(140,115,110,50,'Pod','pgd-node-1',C.GRAY)+cyl(280,115,110,50,'Pod','pgd-node-2',C.GRAY)+cyl(420,115,110,50,'Pod','pgd-node-3',C.GRAY);
    s+=H.tst(195,182,'PVC',14,C.GRAY,false)+H.tst(335,182,'PVC',14,C.GRAY,false)+H.tst(475,182,'PVC',14,C.GRAY,false);
    s+=H.tan(320,255,'Each pod + PVC = one PGD data node (CloudNativePG Global Cluster)',14,C.BLUE,false,H.vis(0.03,0.35));
    s+='<g opacity="0">'+H.vis(0.35,0.68)
      +'<rect x="410" y="105" width="130" height="70" rx="10" fill="none" stroke="'+C.RED+'" stroke-width="3"/>'
      +H.tst(475,255,'kubectl delete pod/pvc',14,C.RED,true)
      +H.tan(320,278,'Raft and the mesh still expect node 3',14,C.RED,true,H.vis(0.38,0.68))
      +'</g>';
    s+='<g opacity="0">'+H.vis(0.68,1)
      +'<rect x="180" y="240" width="360" height="40" rx="6" fill="#101418" stroke="'+C.INK+'" stroke-width="2"/>'
      +'<text x="360" y="265" text-anchor="middle" font-family="monospace" font-size="14" fill="#7CFC9A">pgd node part; pgd node drop</text>'
      +H.tan(320,300,'…then delete the Kubernetes pod and PVC',14,C.GREEN,true,H.vis(0.72,1))
      +'</g>';
    s+=H.tan(320,325,'More details on PGD4K coming soon',14,C.GRAY,false,H.vis(0,1));
    s+=H.cap(320,405,'Each PGD data node maps to one Kubernetes pod and PVC — CloudNativePG\'s Global Cluster.',0,0.35,C.BLUE)
      +H.cap(320,405,'Deleting the pod and PVC directly isn\'t enough — the mesh and Raft still expect that node.',0.35,0.68,C.RED)
      +H.cap(320,405,'Part and drop the node in PGD first, then delete its Kubernetes resources.',0.68,1,C.GREEN);
    return '<svg viewBox="0 0 640 440" role="img"><title>PGD on Kubernetes (PGD4K)</title>'+s+'</svg>';
  }

  window.PGD_STORY = window.PGD_STORY || {};
  var map={
    'PGD 4 Architecture':pgd4Architecture,
    'PGD 5 Architecture':pgd5Architecture,
    'PGD 6 Architecture':pgd6Architecture,
    'Replica Identity (RIF)':replicaIdentity,
    'Replication Slots & the PGD Group Slot':replicationSlots,
    'DDL Replication Mechanics & Table Rewrites':ddlMechanics,
    'Node Types: Physical Standby, Logical Standby & Subscriber-Only':nodeTypes,
    'Clock Skew & Cluster Sizing Limits':clockSkewSizing,
    'Local Locks & Blocking Replication':localLocksBlocking,
    'Global Lock Modes: DDL → DML → Leader Lock':globalLockModes,
    'Column-Level Conflict Resolution':columnConflict,
    'Stream Triggers (Conflict & Transform)':streamTriggers,
    'Upgrade Paths & Breaking Changes (v4 → v6)':upgradePaths,
    'Sequence Kinds Beyond Galloc':sequenceKinds,
    'PGD on Kubernetes (PGD4K)':pgdKubernetes,
    'Architecture Overview: v4 → v6':archOverview,
    'Course Map':courseMap,
    'PITR with Barman':pitrBarman,
    'Eager replication':eagerReplication,
    'Resynchronize a table':resyncTable,
    'Skip changes up to an LSN':skipChangesLSN,
    'Distributed sequences':distributedSequences,
    'AutoPartition':autoPartition,
    'Parallel apply':parallelApply,
    'Transaction streaming':transactionStreaming,
    'Single decoder worker':singleDecoderWorker,
    'Node lifecycle':nodeLifecycle,
    'Safe housekeeping':safeHousekeeping,
    'TDE encryption':tdeEncryption,
    'Automatic reconciliation':autoReconciliation,
    'Optimized mesh':optimizedMesh,
    'Lag history':lagHistory,
    'Tuning conflicts':tuningConflicts,
    'PGD-S vs PGD-X editions':pgdEditions,
    'Connection Manager':connectionManagerHttp,
    'Commit scopes':commitScopesWB,
    'Maintenance mode':maintenanceMode,
    'Replication lag control':lagControl,
    'Raft per group':raftPerGroup,
    'Raft repair tools':raftRepairTools,
    'Logical-join upgrades':logicalJoinUpgrade,
    'The BDR name':bdrNameV4,
    'HARP routing':harpRouting,
    'Metal-tier clusters':metalTiers,
    'Rename to PGD':renameToPGD,
    'PGD Proxy replaces HARP':pgdProxyCli,
    'Switchover & failover':switchoverFailover,
    'The Write Leader':writeLeader,
    'Witness nodes':witnessNodes,
    'Sharding':sharding,
    'Key-value store':keyValueStore,
    'Synchronous commit':syncCommit,
    'Group commit':groupCommit,
    'CRDTs':crdts,
    'Global locks':globalLocks,
    'Global advisory locks':globalAdvisoryLocks,
    'Replication lag':replicationLag,
    'Eventual consistency':eventualConsistency,
    'Row origin':rowOrigin,
    'Replication sets':replicationSets,
    'Row filters':rowFilters,
    'DDL filters':ddlFilters,
    'Apply delay':applyDelay,
    'v4 — BDR + HARP':v4harp,
    'v4.4 — stabilization line':v44,
    'v5 — HARP out, PGD Proxy in':v5proxy,
    'v5.6 → 5.9 — what changed':v56to59,
    'v6 — Connection Manager + editions':v6cm,
    'v6.1 → 6.4 — what changed':v61to64,
    'What is PGD?':whatIsPGD,
    'The mesh':theMesh,
    'Regional mesh & partition tolerance':regionalMesh,
    'Multi-master writes':multimaster,
    'The Core Mesh Protocol Under the Hood':meshinternals,
    'What is a conflict?':conflictCollision,
    'Conflict resolution':conflictResolution,
    'Raft consensus':consensus,
    'CAMO':camoSwimlanes,
    'Zero-downtime rolling upgrade':rollingMigration,
    'Galloc sequences':sequenceChunks,
    'Cluster Observability via Management Views':observability
  };
  var NR={
    'Replica Identity (RIF)':'With a primary key as replica identity, an update or delete names the exact row to change on every peer. Without one, a peer can\'t uniquely match the row, so updates and deletes get rejected. Version six changes the default for new tables.',
    'Replication Slots & the PGD Group Slot':'Every peer gets its own replication slot tracking exactly what it still needs. There is also a special Group Slot that always trails the slowest peer, so the origin node retains write-ahead log data until the whole group has caught up. That is safe by design, but if Raft itself stalls, the Group Slot can\'t advance either, and retained log data keeps growing until disk fills.',
    'DDL Replication Mechanics & Table Rewrites':'Most schema changes, like creating a table or adding a column, replicate automatically to every node. A few operations stay local only: lock, vacuum, analyze, and cluster never replicate. Operations that rewrite the table\'s underlying data file, like changing a column\'s type, take a cluster-wide lock, except create or drop index concurrently, which is built to avoid blocking.',
    'Node Types: Physical Standby, Logical Standby & Subscriber-Only':'Beyond regular data nodes, PGD supports three more node types. A Physical Standby is a plain Postgres streaming copy of one specific node; it doesn\'t vote, but can be promoted to replace that exact node, and is deprecated starting in version six. A Logical Standby receives logical changes and can be promoted to a full data node, though sibling standbys can\'t simply follow it afterward. A Subscriber-only node receives every change for read scaling, but never votes and never publishes changes back.',
    'PGD on Kubernetes (PGD4K)':'PGD4K, PGD on Kubernetes, maps each data node onto one Kubernetes pod and its persistent volume claim, what CloudNativePG calls a Global Cluster. Deleting the pod and volume claim directly isn\'t enough, because the mesh and Raft still expect that node to exist. The correct order is to part and drop the node in PGD first, and only then delete its Kubernetes resources. More details on PGD4K will be added soon.',
    'Upgrade Paths & Breaking Changes (v4 → v6)':'Upgrading version four to version five removes HARP entirely; routing becomes the built-in PGD Proxy. Upgrading version five to version six swaps PGD Proxy for the Connection Manager, and folds CAMO, synchronous commit, and group commit into commit scopes. Since version five point seven, the pgd node upgrade command handles both Postgres and the PGD extension together. There is no downgrade path, so plan upgrades carefully.',
    'Sequence Kinds Beyond Galloc':'Beyond galloc, PGD offers a few more sequence kinds. Timeshard packs a timestamp and node id into the value, so it is sortable and spread across nodes. SnowflakeID packs a timestamp, node, and counter into one integer, unique and roughly time-ordered. KSUUID is a UUID that sorts by creation time, useful wherever UUIDs are already expected. Offset and Local sequences are the simplest: offset just steps each node by its own gap, while local isn\'t distributed at all and only makes sense on a single node.',
    'Local Locks & Blocking Replication':'When nothing else holds a row, the apply worker replicates it immediately. But a long-running local transaction holding that same row blocks the apply worker until it ends, and replication lag on that node starts climbing. Running pg_blocking_pids on the stuck backend reveals exactly who is holding the lock, so you can resolve it.',
    'Global Lock Modes: DDL → DML → Leader Lock':'PGD\'s ddl_locking setting has evolved across versions. On, the version four and five default, blocks every write, on every table, cluster-wide, for the duration of a schema change. The dml mode narrows that to just the table being altered. Version six\'s leader lock mode has only the write leader coordinate, keeping the rest of the cluster available.',
    'Column-Level Conflict Resolution':'By default, a conflict resolves at the row level: one whole version wins, even if it means losing a non-conflicting change to a different column. Column-level conflict resolution tracks a timestamp for each column separately, using bdr.column_timestamps, so two concurrent edits to different columns on the same row can both survive.',
    'Stream Triggers (Conflict & Transform)':'Stream triggers run during apply. A Conflict Trigger swaps in your own custom logic in place of the default resolver, for example always trusting one source. A Transform Trigger reshapes an incoming row to match the table\'s current schema, which is useful for bridging old and new schemas during a rolling upgrade.',
    'Clock Skew & Cluster Sizing Limits':'PGD relies on synchronized clocks across every node, monitored against a maximum clock skew setting. A node whose clock drifts past that threshold makes timestamp-based conflict resolution unreliable. On sizing, typical clusters run three to sixteen nodes, and PGD has been tested well beyond that, into the hundreds of nodes.',
    'PGD 4 Architecture':'PGD 4 shipped four named Always-On tiers. Bronze is two data nodes and a witness in one location with a local backup. Silver is three data nodes in one location, plus a second location holding an offsite backup. Gold is two locations of two data nodes each, plus a third-location witness for Raft majority. Platinum is two locations of three data nodes each, with redundant hot-standby hardware.',
    'PGD 5 Architecture':'PGD 5 offers two building blocks. A single location runs the basic three-node group, each node running its own PGD Proxy. Multi-location repeats that across two locations, six nodes total, plus a witness-only third location so global Raft survives losing an entire site.',
    'PGD 6 Architecture':'PGD 6 replaces named tiers with deployment patterns. A single data group is three data nodes forming one Raft group, the foundational lowest-cost pattern. Two data groups puts one group per location, each with its own write leader, active-active across sites. Read scaling adds subscriber-only nodes that receive every change but never vote or write.',
    'Architecture Overview: v4 → v6':'In version four, an external HARP layer routes every connection to one lead master. In version five, HARP is removed and routing becomes the built-in PGD Proxy, driven by PGD’s own Raft. In version six, routing moves onto every data node itself as the Connection Manager, with an HTTP API for automation. It is the same core engine throughout — only how you connect keeps getting simpler.',
    'Course Map':'Welcome to the PGD explainer. This course covers architecture evolution, foundations, conflicts, coordination, durability, the version 4, 5, and 6 specifics, sequences, and operations — sixty-four topics in all.',
    'PITR with Barman':'Barman continuously backs up the cluster and archives write-ahead logs. For point-in-time recovery, you restore a Barman backup to a chosen moment onto a fresh node, then use that node as the seed for a new PGD cluster.',
    'Eager replication':'Eager replication is a group-commit commit scope where a transaction is applied on all nodes and conflicts are detected before the commit returns. It gives the strongest consistency. In version six it requires Parallel Apply to be turned off by setting writers per subscription to one.',
    'Resynchronize a table':'The function bdr dot resynchronize table from node re-copies a single table from a healthy peer. It repairs one table after a non-replicated truncate or delete, without rebuilding the whole node. It blocks until finished and returns how many rows were copied.',
    'Skip changes up to an LSN':'When a poison change blocks apply, the function bdr dot alter subscription skip changes up to tells a subscription to skip everything up to a given LSN so replication can resume. It is a blunt last-resort tool that can drop data, so verify and reconcile afterwards.',
    'Distributed sequences':'In multi-master, every node may generate IDs at the same time, so an ordinary serial would clash. PGD uses distributed sequences. Version six defaults the sequence kind to distributed, and you can also pick snowflakeid, galloc, or timeshard for a table.',
    'AutoPartition':'AutoPartition automatically creates time-based partitions on a schedule and retires old ones. The function bdr dot autopartition takes a partition increment, such as one day, and a data retention period, such as thirty days.',
    'Parallel apply':'Parallel apply lets a follower use several workers at once to keep up with a busy leader. It can be turned off when debugging an issue.',
    'Transaction streaming':'Transaction streaming sends a big transaction to copies while it is still being written, instead of waiting for it to finish. This is faster and reduces lag.',
    'Single decoder worker':'A single decoder worker reads the change log once and shares it with all peers, instead of decoding separately for each one. This saves CPU on busy clusters.',
    'Node lifecycle':'PGD manages a node’s whole life: joining and syncing a new node, promoting a standby to replace a failed one, and parting, which cleanly removes a dead node.',
    'Safe housekeeping':'Version 6 covers routine Postgres upkeep across all copies, such as building indexes without blocking writes, and reclaiming space, all done safely across the cluster.',
    'TDE encryption':'TDE, or Transparent Data Encryption, automatically scrambles data on disk so a stolen disk is useless. Version 6 also supports rotating or migrating the encryption key.',
    'Automatic reconciliation':'Automatic reconciliation detects small differences between copies and heals them on its own, keeping all copies identical without anyone fixing them by hand.',
    'Optimized mesh':'As clusters grow, connecting every node to every other gets expensive. Optimized mesh trims those connections intelligently while still moving data everywhere it is needed.',
    'Lag history':'Lag history keeps a timeline of replication health across nodes, so you can spot worrying trends before they turn into outages.',
    'Tuning conflicts':'Version 6 lets you log every conflict for later review and switch the conflict resolver strategy, including tricky cases involving multiple unique keys.',
    'PGD-S vs PGD-X editions':'Version 6 formalizes two editions. PGD Essential is a simple quick-start edition, capped at four data nodes, two groups, and a fixed set of commit scopes. PGD Expanded has full features with no limits: many data nodes across locations, plus witnesses and Barman backups.',
    'Connection Manager':'Version 6 replaces PGD Proxy with the Connection Manager, a smarter routing layer. It adds an HTTP API so tools and automation can query it over the web.',
    'Commit scopes':'Commit scopes are version six’s big idea. The durability concepts you already met, namely CAMO, synchronous commit, and group commit, are no longer separate mechanisms. They become options you choose from one place.',
    'Maintenance mode':'Maintenance mode safely takes one node offline for patching while the rest of the cluster keeps serving, then brings it back in.',
    'Replication lag control':'Replication lag control gently slows the leader when a follower drifts too far behind, keeping copies close so a later failover loses very little data.',
    'Raft per group':'Version 5 adds per-group Raft, so each location can run its own local vote. This improves resilience when regions cannot reach each other.',
    'Raft repair tools':'Version 5 adds tools to export, import, or reset Raft consensus, plus a way to inspect the key-value store. These help recover the cluster if voting ever gets stuck.',
    'Logical-join upgrades':'A logical-join upgrade lets new nodes join and sync live from the old cluster, then you switch over. This upgrades across major versions with very little downtime.',
    'The BDR name':'In version 4 the technology is called BDR, short for Bi-Directional Replication. Later versions rename it to PGD, but it is the same family of engine.',
    'HARP routing':'Version 4 uses HARP, a separate routing layer, to send your app to the right copy. HARP relies on a consensus store, a shared notepad, to track the leader.',
    'Metal-tier clusters':'Version 4 used informal metal-tier names like bronze and silver for cluster sizes. These later become the real PGD-S and PGD-X editions.',
    'Rename to PGD':'Version 5 renames the technology from BDR to PGD. The core idea is unchanged, but management becomes simpler and more unified.',
    'PGD Proxy replaces HARP':'HARP is removed. The built-in PGD Proxy now routes traffic using PGD’s own Raft. Version 5 also adds pgd C-L-I, a single tool to manage the whole cluster.',
    'Switchover & failover':'Failover happens automatically when a leader fails. Switchover is the same move done on purpose. Either way, your app keeps using the same address.',
    'The Write Leader':'The copy that wins the vote becomes the Write Leader. Cluster-wide decisions route through it for consistency, and Raft re-elects automatically if it fails.',
    'Witness nodes':'A witness node holds no real data. It only votes. With an even number of data nodes, a witness keeps the voter count odd so a clear majority is always possible.',
    'Sharding':'Sharding splits huge data into slices so no single copy holds all of it. It exists across versions; version 4 set it up by hand, while later versions made it simpler.',
    'Key-value store':'Raft also keeps a small key-value store: tiny shared facts that stay perfectly in sync across all nodes, used for coordination.',
    'Synchronous commit':'Synchronous commit only reports success after chosen copies confirm they have the write. It is stronger safety but slightly slower, and in version 6 you set it through a commit scope.',
    'Group commit':'Group commit waits for a quorum, meaning enough copies, rather than all of them. This balances safety with speed. It exists across versions, and version 6 expresses it as a commit-scope option.',
    'CRDTs':'CRDTs, or conflict-free replicated data types, are special values that merge instead of clashing. Both changes are counted, so no winner is needed.',
    'Global locks':'A global lock coordinates big changes, like altering a table, across all copies at once, so two structure changes cannot clash.',
    'Global advisory locks':'A global advisory lock is an app-chosen ticket that every copy respects. It lets cooperating apps coordinate work across the whole cluster.',
    'Replication lag':'Replication lag is how far behind a copy is. A small gap is healthy, but a large gap risks losing recent writes if that copy is promoted after a failure.',
    'Eventual consistency':'Copies update a tiny moment apart, then become identical. Not instant everywhere, but quickly the same — that is eventual consistency.',
    'Row origin':'Every change carries its origin, the node that first wrote it. Copies use this to avoid sending a change back to where it began, which prevents endless replication loops.',
    'Replication sets':'Replication sets group tables together. Copies subscribe to just the sets they need, so not every table has to go everywhere.',
    'Row filters':'A row filter only replicates rows that match a rule, such as region equals EU, so a copy can hold just the slice of data it needs.',
    'DDL filters':'A DDL filter controls which structure changes, like creating or altering tables, are allowed to replicate and to where.',
    'Apply delay':'Apply delay makes a copy wait on purpose before applying changes. It works like a time machine, giving you a chance to recover from a bad change before it lands.',
    'v4 — BDR + HARP':'In PGD version 4, apps reach the database through HARP. The HARP Proxy asks the HARP Manager, which holds the leader lease from a consensus store, and routes every write to the one lead master. The remaining nodes are shadow masters — technically writable, but discouraged.',
    'v4.4 — stabilization line':'The four point four minor line adds no new features. Four point four point zero is a prerequisite for upgrading to PGD six point one or later. Four point four point one is a prerequisite for six point two and preserves node identity when joining a mixed-version cluster. These are Extended Life Support, upgrade-path releases.',
    'v5 — HARP out, PGD Proxy in':'Version 5 removes HARP entirely. Routing becomes the built-in PGD Proxy, driven by PGD’s own Raft, which elects a single write leader. Version 5 also introduces pgd C-L-I, a single tool to manage the whole cluster.',
    'v5.6 → 5.9 — what changed':'Across the version five minors, five point six adds commit-scope degrade-on and origin-group, plus streaming through the decoding worker. Five point seven brings the redesigned noun-verb C-L-I. Five point eight improves C-L-I usability. Five point nine enables in-place upgrade to PGD six and back-ports the Connection Manager.',
    'v6 — Connection Manager + editions':'Version 6 replaces PGD Proxy with the built-in Connection Manager, exposing read-write, read-only, and HTTP API ports on every data node. It also formalizes two editions: PGD Essential, a simple capped quick-start edition, and PGD Expanded, with full features and no limits.',
    'v6.1 → 6.4 — what changed':'Version six minors: six point one adds the leader D-D-L lock and C-L-I GUC commands. Six point two adds T-D-E migration and LDAP authentication. Six point three runs the Connection Manager on subscriber-only nodes and improves leader election. Six point four, the latest, adds a configurable apply-error policy and more.',
    'What is PGD?':'PGD runs several full, live copies of your database at once. Your app talks to one address, while a write reaches every copy. Lose one copy, and the others keep serving — nothing is lost.',
    'The mesh':'Copies are linked in a full mesh — every copy talks to every other. A change on any database streams directly to every peer at once, with no hub and no bottleneck.',
    'Regional mesh & partition tolerance':'Every node in the mesh can accept writes and replicates directly to every other node. If a link between two regions drops, the origin node buffers the outgoing changes and flushes them once connectivity returns, so the partitioned region catches up automatically.',
    'Multi-master writes':'Any node can accept a write — there is no single master. Each write commits locally first, since replication is asynchronous, then flows both ways over the logical replication stream until every node converges on the same state.',
    'The Core Mesh Protocol Under the Hood':'Inside every node, WAL Storage durably records the write, the Logical Decoder reads the WAL and reconstructs row-level changes, and the BDR Worker packages and streams those changes outward — that outbound stream is what every peer subscribes to.',
    'What is a conflict?':'Two users write to the same row on different nodes at the same instant. Both updates race across the mesh toward every copy and collide — a conflict PGD must resolve.',
    'Conflict resolution':'PGD inspects the two conflicting commit timestamps. The later write wins under last-update-wins; the earlier one is struck out and archived to the conflict log, and every copy converges on the winning value.',
    'Raft consensus':'A majority of nodes must agree for the cluster to make progress. When one node becomes unreachable, the rest are checked against quorum — two of three still forms a majority, so the cluster keeps serving without interruption.',
    'CAMO':'The client sends COMMIT into the master node, which withholds its reply and validates with its CAMO partner first. Only after the partner mirrors the write and confirms does the master commit and tell the client it succeeded.',
    'Zero-downtime rolling upgrade':'One node is taken out of the replication path while it upgrades from PGD v4 to PGD v6; traffic quietly reroutes through the remaining nodes throughout. Once it rejoins, the cluster has moved to a new major version with zero downtime.',
    'Galloc sequences':'A global manager hands each node a non-overlapping ID range. Each node pulls IDs straight off its own block with zero network round-trips, so every ID stays unique cluster-wide without any coordination.',
    'Cluster Observability via Management Views':'PGD exposes cluster health through plain SQL views. Querying bdr.node_slots_summary surfaces exactly which peer is falling behind, so operators catch replication lag before it becomes an outage.'
  };
  Object.keys(map).forEach(function(t){ window.PGD_STORY[t]={ sc:map[t], phases:[{nr:NR[t]}] }; });
})();
