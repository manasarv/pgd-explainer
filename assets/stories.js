/* ============================================================
   STORY scenes — narration-synced, multi-beat animations.
   window.PGD_STORY is keyed by EXACT scene title and overrides
   that scene's drawing + supplies a `phases` script. Each phase:
     { nr:'spoken caption for this beat',
       show:[ids to reveal], flow:[arrow ids to animate],
       add:[[id,'class']], rm:[[id,'class']] }
   Elements are drawn hidden (fade/off) and revealed beat by beat,
   so the picture builds as the narration tells the story.
   Helpers node()/tx()/ln()/defs() come from scenes.js.
   To storyboard another scene: add an entry here — nothing else
   needs to change.
   ============================================================ */

/* 1 ── Raft election */
function s_story_raft(){return '<svg viewBox="0 0 560 470" role="img"><title>raft election</title>'+defs()+
  tx('banner',280,34,'⚖ Election called — no leader yet','lbl-w','middle','var(--amber-l)')+
  node('n1',205,86,150,58,'teal','Node 1','candidate')+
  node('n2',55,250,150,58,'teal','Node 2','candidate')+
  node('n3',350,250,150,58,'teal','Node 3','candidate')+
  ln('v21',130,250,225,148,'amber')+ln('v31',425,250,335,148,'amber')+
  tx('vk2',150,202,'vote ✓','lbl-s','middle','var(--amber-l)')+tx('vk3',410,202,'vote ✓','lbl-s','middle','var(--amber-l)')+
  tx('crown',280,76,'★ WRITE LEADER','lbl-w','middle','var(--amber-l)')+
  ln('a12',250,146,135,248,'teal')+ln('a13',330,146,420,248,'teal')+
  tx('fl2',130,324,'follower','lbl-s')+tx('fl3',425,324,'follower','lbl-s')+
  node('n',95,372,370,72,'amber','Raft consensus','a majority vote elects exactly one Write Leader — and re-runs automatically the moment it fails')+'</svg>';}

/* 2 ── conflict detection */
function s_story_conflict(){return '<svg viewBox="0 0 560 420" role="img"><title>conflict detected</title>'+defs()+
  node('a',40,50,170,60,'teal','Node 1','row #42 → price 10')+
  node('b',350,50,170,60,'teal','Node 2','row #42 → price 12')+
  tx('t10',125,128,'@ 10:00.100','lbl-s')+tx('t12',435,128,'@ 10:00.100','lbl-s')+
  ln('a2',150,110,255,188,'teal')+ln('b2',410,110,305,188,'coral')+
  tx('clash',280,205,'⚡ same row · same instant','lbl-w','middle','var(--coral-l)')+
  node('n',95,250,370,92,'coral','Conflict detected','two nodes changed the same row at the same moment — PGD must notice and pick a winner')+'</svg>';}

/* 3 ── conflict resolution */
function s_story_confres(){return '<svg viewBox="0 0 560 430" role="img"><title>conflict resolution</title>'+defs()+
  node('a',40,50,150,56,'teal','price = 10','written 10:00.100')+
  node('b',370,50,150,56,'teal','price = 12','written 10:00.200')+
  node('judge',200,150,160,64,'amber','Resolver','last update wins')+
  ln('ja',110,106,250,150,'teal')+ln('jb',450,106,310,150,'coral')+
  node('win',200,262,160,56,'green','price = 12','kept everywhere')+
  ln('wl',280,214,280,260,'green')+
  node('n',95,338,370,62,'amber','Conflict resolution','a chosen rule (default last-update-wins) settles every conflict automatically')+'</svg>';}

/* 4 ── write leader */
function s_story_leader(){return '<svg viewBox="0 0 560 410" role="img"><title>write leader</title>'+defs()+
  node('app',205,14,150,46,'gray','Apps','all writes')+
  node('lead',195,96,170,58,'teal','Node 1','elected leader')+
  tx('crown',280,90,'★','lbl-w','middle','var(--amber-l)')+
  node('f1',40,250,150,54,'teal','Node 2','follower')+node('f2',205,250,150,54,'teal','Node 3','follower')+node('f3',370,250,150,54,'teal','Node 4','follower')+
  ln('aw',280,60,280,94,'gray')+
  ln('d1',230,154,130,248,'teal')+ln('d2',280,154,280,248,'teal')+ln('d3',330,154,430,248,'teal')+
  node('n',95,322,370,72,'amber','Write Leader','one elected node takes all writes and streams them out, giving every change a single consistent order')+'</svg>';}

/* 5 ── switchover & failover */
function s_story_failover(){return '<svg viewBox="0 0 560 440" role="img"><title>failover</title>'+defs()+
  node('proxy',195,14,170,50,'coral','Connection Manager','routes to the leader')+
  node('old',40,170,150,62,'teal','Node 1','leader')+
  node('new',360,170,150,62,'teal','Node 2','standby')+
  node('f3',205,300,150,54,'teal','Node 3','follower')+
  tx('xx',115,162,'✗ fails','lbl-w','middle','var(--coral-l)')+
  tx('crown',435,162,'★','lbl-w','middle','var(--amber-l)')+
  ln('toold',230,64,140,168,'coral')+ln('tonew',330,64,430,168,'amber')+ln('rep',420,232,300,300,'amber')+
  node('n',95,368,370,60,'amber','Failover & switchover','a new leader is elected automatically (or on demand); your app keeps the same address')+'</svg>';}

/* 6 ── the mesh */
function s_story_mesh(){return '<svg viewBox="0 0 560 430" role="img"><title>mesh</title>'+defs()+
  node('n1',60,150,130,62,'teal','Database 1','full copy')+node('n2',215,150,130,62,'teal','Database 2','full copy')+node('n3',370,150,130,62,'teal','Database 3','full copy')+
  ln('l12',190,181,213,181,'teal')+ln('l23',345,181,368,181,'teal')+ln('l13',125,212,'','','teal','M125 212 Q280 300 435 212')+
  tx('w',125,138,'write here','lbl-s','middle','var(--teal-l)')+
  tx('ml',280,300,'every copy talks to every other','lbl-s')+
  node('n',95,348,370,62,'teal','The mesh','a change made on any node streams directly to all the others — true multi-master')+'</svg>';}

/* 7 ── eventual consistency */
function s_story_eventual(){return '<svg viewBox="0 0 560 400" role="img"><title>eventual consistency</title>'+defs()+
  tx('diff',280,58,'a tiny moment apart…','lbl-s','middle','var(--coral-l)')+
  node('e1',40,72,150,60,'teal','Node 1','wrote at 10:00.000')+
  node('e2',370,72,150,60,'teal','Node 2','receives it')+
  ln('ef',192,102,368,102,'teal')+
  tx('match',280,168,'… now identical ✓','lbl-w','middle','var(--green-l)')+
  node('en',120,206,320,84,'blue','Eventual consistency','not instant on every node, but all copies converge within moments')+'</svg>';}

/* 8 ── CAMO */
function s_story_camo(){return '<svg viewBox="0 0 560 420" role="img"><title>camo</title>'+defs()+
  node('app',30,40,150,60,'gray','App','sends a payment')+
  node('n1',210,40,150,60,'teal','Node 1','partner A')+
  node('n2',210,180,150,60,'teal','Node 2','partner B')+
  tx('chk',300,135,'both agree ✓','lbl-w','middle','var(--teal-l)')+
  ln('send',182,70,208,70,'gray')+ln('pair',285,100,285,178,'teal')+ln('ack',208,92,184,92,'amber')+
  node('n',95,290,370,86,'pink','CAMO — Commit At Most Once','the partner pair confirm the write is safely stored before the app is told “done” — never lost, never doubled')+'</svg>';}

/* 9 ── commit scopes */
function s_story_commit(){return '<svg viewBox="0 0 560 420" role="img"><title>commit scopes</title>'+defs()+
  node('hub',195,20,170,58,'purple','Commit scope','one rule book')+
  node('camo',20,180,160,62,'pink','CAMO','no double-charge')+
  node('sync',200,180,160,62,'teal','Sync commit','wait for copies')+
  node('group',380,180,160,62,'amber','Group commit','wait for a quorum')+
  ln('c',250,78,110,178,'purple')+ln('s',280,78,280,178,'purple')+ln('g',310,78,450,178,'purple')+
  node('n',95,290,370,82,'purple','Commit scopes','one place to set durability — CAMO, synchronous and group commit become options you choose')+'</svg>';}

/* 10 ── witness nodes */
function s_story_witness(){return '<svg viewBox="0 0 560 420" role="img"><title>witness</title>'+defs()+
  node('d1',60,40,150,56,'teal','Data node','votes + data')+
  node('d2',360,40,150,56,'teal','Data node','votes + data')+
  tx('tie',280,80,'2 voters → ties possible','lbl-s','middle','var(--coral-l)')+
  node('wit',205,180,150,64,'amber','Witness','votes only · no data')+
  ln('w1',150,96,250,178,'amber')+ln('w2',410,96,310,178,'amber')+
  tx('odd',280,262,'3 voters → clear majority ✓','lbl-w','middle','var(--green-l)')+
  node('n',95,300,370,84,'amber','Witness node','holds no data — it only votes, keeping the voter count odd so a majority always exists')+'</svg>';}

/* 11 ── sharding */
function s_story_shard(){return '<svg viewBox="0 0 560 380" role="img"><title>sharding</title>'+defs()+
  node('all',180,16,200,50,'gray','All the data','too big for one node')+
  node('a',30,160,150,70,'blue','Shard A','customers A–H')+node('b',205,160,150,70,'blue','Shard B','customers I–P')+node('c',380,160,150,70,'blue','Shard C','customers Q–Z')+
  ln('la',230,66,110,158,'gray')+ln('lb',280,66,280,158,'gray')+ln('lc',330,66,450,158,'gray')+
  node('n',110,272,340,66,'blue','Sharding','split huge data into slices so no single node has to hold it all')+'</svg>';}

/* 12 ── node lifecycle */
function s_story_lifecycle(){return '<svg viewBox="0 0 560 400" role="img"><title>node lifecycle</title>'+defs()+
  node('join',30,60,150,64,'green','Join','add & sync live')+
  node('promote',205,60,150,64,'amber','Promote','standby → full node')+
  node('part',380,60,150,64,'coral','Part','remove cleanly')+
  ln('ar1',182,92,203,92,'gray')+ln('ar2',357,92,378,92,'gray')+
  node('n',80,190,400,90,'blue','Node lifecycle','a node joins and catches up, a standby is promoted to replace a failure, and a dead node is parted — all without downtime')+'</svg>';}

window.PGD_STORY = {
"Raft consensus":{sc:s_story_raft,phases:[
  {nr:"Three data nodes start out equal — any one of them could lead.",show:['n1','n2','n3']},
  {nr:"When there is no leader, Raft calls an election.",show:['banner']},
  {nr:"The other nodes cast their votes for a candidate.",flow:['v21','v31'],show:['vk2','vk3']},
  {nr:"The candidate that wins a majority of votes is promoted to Write Leader.",show:['crown'],add:[['n1','pop'],['n1','win']]},
  {nr:"The remaining nodes become followers and replicate from the leader.",flow:['a12','a13'],show:['fl2','fl3']},
  {nr:"That majority vote is Raft consensus: it guarantees exactly one leader at a time, and elects a new one the instant the leader fails.",show:['n']}
]},
"What is a conflict?":{sc:s_story_conflict,phases:[
  {nr:"Node 1 updates row forty-two, setting the price to ten.",show:['a','t10']},
  {nr:"At almost the same instant, Node 2 sets the same row to twelve.",show:['b','t12']},
  {nr:"Both changes travel toward each other across the mesh.",flow:['a2','b2']},
  {nr:"They collide: the same row, changed at the same moment, with different values. That is a conflict.",show:['clash'],add:[['a','flash'],['b','flash']]},
  {nr:"Because any node can write, PGD must detect this clash and decide which value wins.",show:['n']}
]},
"Conflict resolution":{sc:s_story_confres,phases:[
  {nr:"Here are the two conflicting values: ten, written first, and twelve, written a fraction later.",show:['a','b']},
  {nr:"The resolver applies a rule. By default it is last-update-wins.",show:['judge'],flow:['ja','jb']},
  {nr:"The later write, twelve, is chosen as the winner.",show:['win','wl'],add:[['b','win'],['a','dim'],['win','pop']]},
  {nr:"That value is kept on every node, so all copies agree again — with no human stepping in.",show:['n']}
]},
"The Write Leader":{sc:s_story_leader,phases:[
  {nr:"In a healthy group, Raft has elected one node as the Write Leader.",show:['lead','crown'],add:[['lead','pop']]},
  {nr:"Applications send all of their writes to that single leader.",show:['app'],flow:['aw']},
  {nr:"The leader applies them and streams the changes out to every follower.",show:['f1','f2','f3'],flow:['d1','d2','d3']},
  {nr:"Routing all writes through one leader gives every change a single consistent order, which keeps conflicts rare.",show:['n']}
]},
"Switchover & failover":{sc:s_story_failover,phases:[
  {nr:"The Connection Manager constantly routes clients to the current leader, Node 1.",show:['proxy','old','new','f3'],flow:['toold'],add:[['old','pop']]},
  {nr:"Then Node 1 fails.",show:['xx'],add:[['old','removed-node'],['old','dim']]},
  {nr:"Raft immediately elects Node 2 as the new leader. Automatic is failover; on purpose is switchover.",show:['crown'],add:[['new','pop'],['new','win']]},
  {nr:"The Connection Manager redirects traffic to the new leader — your application keeps the very same address.",flow:['tonew','rep'],rm:[['old','removed-node']]},
  {nr:"No connection-string changes and minimal downtime: the cluster heals itself.",show:['n']}
]},
"The mesh":{sc:s_story_mesh,phases:[
  {nr:"Start with three databases, each holding a full copy of the data.",show:['n1','n2','n3']},
  {nr:"Every node is linked directly to every other node — a full mesh.",flow:['l12','l23','l13'],show:['ml']},
  {nr:"So a write made on any one node flows straight out to all the others.",show:['w'],flow:['l12','l13']},
  {nr:"That direct any-to-any connection is what makes PGD a true multi-master mesh.",show:['n']}
]},
"Eventual consistency":{sc:s_story_eventual,phases:[
  {nr:"Node 1 commits a write at ten o’clock exactly.",show:['e1']},
  {nr:"A heartbeat later, that change reaches Node 2.",show:['e2','diff'],flow:['ef']},
  {nr:"For that split second the two copies differ — then they match.",show:['match'],add:[['e2','win']]},
  {nr:"This is eventual consistency: not instant on every node, but quickly identical across all of them.",show:['en']}
]},
"CAMO":{sc:s_story_camo,phases:[
  {nr:"An application sends a payment to its node, partner A.",show:['app','n1'],flow:['send']},
  {nr:"Before confirming, partner A checks with its CAMO partner, partner B, that the change is safely stored.",show:['n2','chk'],flow:['pair']},
  {nr:"Only once both partners agree does the app receive its commit confirmation.",flow:['ack'],add:[['n1','win']]},
  {nr:"So the transaction is committed at most once: never lost on a dropped connection, never applied twice.",show:['n']}
]},
"Commit scopes":{sc:s_story_commit,phases:[
  {nr:"Before version 6, durability features were three separate mechanisms.",show:['camo','sync','group']},
  {nr:"Version 6 introduces commit scopes: a single rule book for durability.",show:['hub'],add:[['hub','pop']]},
  {nr:"Now CAMO, synchronous commit and group commit are simply options you select from that one place.",flow:['c','s','g']},
  {nr:"You attach a commit scope to a group or a transaction, and PGD enforces exactly the durability you asked for.",show:['n']}
]},
"Witness nodes":{sc:s_story_witness,phases:[
  {nr:"Imagine just two data nodes. If they disagree, the vote can tie.",show:['d1','d2','tie']},
  {nr:"Add a witness — a node that stores no data and only votes.",show:['wit'],flow:['w1','w2'],add:[['wit','pop']]},
  {nr:"Now there are three voters, so a clear majority is always possible.",show:['odd']},
  {nr:"That is the witness’s job: keep the voter count odd and break ties, without the cost of storing data.",show:['n']}
]},
"Sharding":{sc:s_story_shard,phases:[
  {nr:"Sometimes the whole dataset is simply too large for any single node.",show:['all']},
  {nr:"Sharding splits it into slices — here, by customer range.",show:['a','b','c'],flow:['la','lb','lc']},
  {nr:"Each shard holds only its slice, so no single node carries everything and the cluster scales out.",show:['n'],add:[['a','pop'],['b','pop'],['c','pop']]}
]},
"Node lifecycle":{sc:s_story_lifecycle,phases:[
  {nr:"A new node joins the cluster and syncs its data live from the existing peers.",show:['join'],add:[['join','pop']]},
  {nr:"A standby can be promoted to a full node — for example, to replace one that failed.",show:['promote'],flow:['ar1'],add:[['promote','pop']]},
  {nr:"And a dead or unwanted node is parted — cleanly removed — so the cluster stays tidy.",show:['part'],flow:['ar2'],add:[['part','pop']]},
  {nr:"Join, promote and part: that lifecycle is how a PGD cluster grows, heals and shrinks without downtime.",show:['n']}
]}
};
