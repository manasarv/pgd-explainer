/* ============================================================
   story_pilot.js — Pilot cinematic scenes for 3 Foundations scenes.
   Each scene has two acts:
     Act I  (analogy beats): metaphor visualised with frosted-glass
             nodes bearing familiar labels (notebooks, friends…)
     Act II (technical beats): architecture builds component by
             component as the narration introduces each piece.
   Loaded after story_motion.js; overrides PGD_STORY for these titles.
   Helpers node() / ln() / tx() / defs() come from scenes.js.
   ============================================================ */

/* ------------------------------------------------------------------
   SCENE 1 — "What is PGD?"
   Analogy: three notebooks → one is lost, others survive
   Technical: Your app → three DB copies → write propagates
------------------------------------------------------------------ */
function s_pilot_whatis(){
  return '<svg viewBox="0 0 560 500" role="img"><title>What is PGD?</title>'+defs()+

    /* --- ANALOGY LAYER: three amber notebook nodes --- */
    node('nb1', 60,  60, 130, 58, 'amber', '📓 Notebook A', 'identical copy')+
    node('nb2', 215, 60, 130, 58, 'amber', '📓 Notebook B', 'identical copy')+
    node('nb3', 370, 60, 130, 58, 'amber', '📓 Notebook C', 'identical copy')+

    /* sync arrows between notebooks (initially hidden) */
    ln('nf_ab', 192, 89, 213, 89, 'amber')+
    ln('nf_ac', 125, 120, '', '', 'amber', 'M125 120 Q280 180 435 120')+

    /* "✗ lost" label that appears when notebook A dims */
    tx('nb_lost', 125, 56, '✗ lost', 'lbl-w', 'middle', 'var(--coral-l)')+

    /* --- TECHNICAL LAYER: app + three DB nodes --- */
    node('app',  195, 60, 170, 50, 'gray', 'Your app', 'one address')+

    node('db1',  60,  190, 130, 58, 'teal', 'Database 1', 'full copy')+
    node('db2',  215, 190, 130, 58, 'teal', 'Database 2', 'full copy')+
    node('db3',  370, 190, 130, 58, 'teal', 'Database 3', 'full copy')+

    /* app → DB1 connection */
    ln('a_app', 230, 110, 125, 188, 'gray')+

    /* DB replication arrows */
    ln('f_12', 192, 219, 213, 219, 'teal')+
    ln('f_13', 125, 250, '', '', 'teal', 'M125 250 Q280 310 435 250')+
    ln('f_21', 213, 234, 192, 234, 'teal')+

    /* summary note */
    node('note', 95, 390, 370, 66, 'blue', 'Many copies · one system',
      'lose one copy, the others keep serving your app without interruption')+

  '</svg>';
}

window.PGD_STORY = window.PGD_STORY || {};
window.PGD_STORY['What is PGD?'] = {
  sc: s_pilot_whatis,
  phases: [
    /* --- Act I: Analogy --- */
    { nr: 'Imagine three friends, each keeping an identical notebook — the same content in all three.',
      show: ['nb1','nb2','nb3'] },

    { nr: 'Write something in Notebook A and the change flows to Notebook B and C automatically.',
      show: [], flow: ['nf_ab','nf_ac'] },

    { nr: 'Lose one notebook? The other two still have everything. Nothing is gone.',
      show: ['nb_lost'],
      add: [['nb1','dim']] },

    /* --- Act II: Technical --- */
    { nr: 'PGD does the same with databases. Your application connects to a single address.',
      show: ['app'],
      add: [['nb1','fade'],['nb2','fade'],['nb3','fade'],['nb_lost','fade']],
      rm: [['nf_ab','off'],['nf_ac','off']] },

    { nr: 'Behind that address sits Database 1 — a full, live copy of all your data.',
      show: ['db1'], flow: ['a_app'] },

    { nr: 'PGD runs two more complete copies alongside it, always kept in sync.',
      show: ['db2','db3'] },

    { nr: 'A write to any copy propagates to the others bidirectionally — no single point of failure.',
      show: [], flow: ['f_12','f_13','f_21'],
      add: [['db1','pop']] },

    { nr: 'PGD — several complete copies of your database running at the same time, for safety and speed.',
      show: ['note'] }
  ]
};


/* ------------------------------------------------------------------
   SCENE 2 — "The mesh"
   Analogy: notebooks share directly with every other notebook
   Technical: database mesh topology, write propagates to all nodes
------------------------------------------------------------------ */
function s_pilot_mesh(){
  return '<svg viewBox="0 0 560 490" role="img"><title>The mesh</title>'+defs()+

    /* --- ANALOGY LAYER: three amber notebooks in triangle --- */
    node('nb1', 60,  140, 130, 58, 'amber', '📓 Notebook A', 'identical copy')+
    node('nb2', 215, 140, 130, 58, 'amber', '📓 Notebook B', 'identical copy')+
    node('nb3', 370, 140, 130, 58, 'amber', '📓 Notebook C', 'identical copy')+

    ln('nf_12', 192, 169, 213, 169, 'amber')+
    ln('nf_23', 347, 169, 368, 169, 'amber')+
    ln('nf_13', 125, 200, '', '', 'amber', 'M125 200 Q280 280 435 200')+

    /* --- TECHNICAL LAYER: three DB nodes at same positions --- */
    node('db1', 60,  140, 130, 58, 'teal', 'Database 1', 'full copy')+
    node('db2', 215, 140, 130, 58, 'teal', 'Database 2', 'full copy')+
    node('db3', 370, 140, 130, 58, 'teal', 'Database 3', 'full copy')+

    ln('l12', 192, 169, 213, 169, 'teal')+
    ln('l23', 347, 169, 368, 169, 'teal')+
    ln('l13', 125, 200, '', '', 'teal', 'M125 200 Q280 280 435 200')+
    ln('l21', 213, 184, 192, 184, 'teal')+
    ln('l31', 435, 200, '', '', 'teal', 'M435 200 Q280 280 125 200')+

    /* "write here" label */
    tx('wlabel', 125, 136, 'write here', 'lbl-s', 'middle', 'var(--amber-l)')+

    /* caption label */
    tx('ml', 280, 310, 'every copy talks to every other', 'lbl-s')+

    node('note', 95, 380, 370, 66, 'teal', 'The mesh',
      'a change anywhere spreads everywhere — no hub, no bottleneck')+

  '</svg>';
}

window.PGD_STORY['The mesh'] = {
  sc: s_pilot_mesh,
  phases: [
    /* --- Act I: Analogy --- */
    { nr: 'Three friends, each with their own notebook — right now they are separate, isolated.',
      show: ['nb1','nb2','nb3'] },

    { nr: 'They constantly share directly with each other — a link between every pair. Nobody ever falls behind.',
      show: [], flow: ['nf_12','nf_23','nf_13'] },

    /* --- Act II: Technical --- */
    { nr: 'PGD connects every database copy directly to every other — this is the mesh topology.',
      show: ['ml'],
      add: [['nb1','fade'],['nb2','fade'],['nb3','fade']],
      rm: [['nf_12','off'],['nf_23','off'],['nf_13','off']] },

    { nr: 'Database 1 and Database 2 are linked directly — changes flow both ways.',
      show: ['db1','db2'], flow: ['l12','l21'] },

    { nr: 'Database 3 joins, with a direct link to both others — and the longer cross-path completes the mesh.',
      show: ['db3'], flow: ['l23','l13'] },

    { nr: 'A write on Database 1 streams straight to every other copy simultaneously.',
      show: ['wlabel'],
      flow: ['l12','l13'],
      add: [['db1','pop']] },

    { nr: 'Any node can originate the next write. A change anywhere spreads everywhere — that is the mesh.',
      flow: ['l21','l31'], show: ['note'] }
  ]
};


/* ------------------------------------------------------------------
   SCENE 3 — "Multi-master writes"
   Analogy: any friend can write, not just one boss
   Technical: writes arrive at any DB node, replicate bidirectionally
------------------------------------------------------------------ */
function s_pilot_multimaster(){
  return '<svg viewBox="0 0 560 510" role="img"><title>Multi-master writes</title>'+defs()+

    /* --- ANALOGY LAYER: three friend nodes --- */
    node('fr1', 60,  60, 130, 58, 'amber', 'Friend A', '✏ can write')+
    node('fr2', 215, 60, 130, 58, 'amber', 'Friend B', '✏ can write')+
    node('fr3', 370, 60, 130, 58, 'amber', 'Friend C', '✏ can write')+

    ln('fw_ab', 192, 89, 213, 89, 'amber')+
    ln('fw_ac', 125, 120, '', '', 'amber', 'M125 120 Q280 180 435 120')+
    ln('fw_ca', 435, 120, '', '', 'amber', 'M435 120 Q280 180 125 120')+
    ln('fw_cb', 347, 89, 213, 89, 'amber')+

    tx('bosslabel', 280, 56, 'no single boss — any friend can write', 'lbl-s', 'middle', 'var(--amber-l)')+

    /* --- TECHNICAL LAYER --- */
    node('db1', 60,  200, 130, 58, 'teal', 'Database 1', 'accepts writes')+
    node('db2', 215, 200, 130, 58, 'teal', 'Database 2', 'accepts writes')+
    node('db3', 370, 200, 130, 58, 'teal', 'Database 3', 'accepts writes')+

    /* inbound write markers */
    tx('w1',  125, 196, '▼ write', 'lbl-s', 'middle', 'var(--teal-l)')+
    tx('w3',  435, 196, '▼ write', 'lbl-s', 'middle', 'var(--teal-l)')+

    /* bidirectional replication arrows */
    ln('m12', 192, 229, 213, 229, 'teal')+
    ln('m21', 213, 244, 192, 244, 'teal')+
    ln('m13', 125, 260, '', '', 'teal', 'M125 260 Q280 320 435 260')+
    ln('m31', 435, 260, '', '', 'teal', 'M435 260 Q280 320 125 260')+
    ln('m23', 347, 229, 368, 229, 'teal')+
    ln('m32', 368, 244, 347, 244, 'teal')+

    tx('mm', 280, 340, 'any node · both directions · no single master', 'lbl-s')+

    node('note', 80, 400, 400, 66, 'amber', 'Multi-master writes',
      'spread the write load across all nodes — survive any single failure')+

  '</svg>';
}

window.PGD_STORY['Multi-master writes'] = {
  sc: s_pilot_multimaster,
  phases: [
    /* --- Act I: Analogy --- */
    { nr: 'Three friends — any one of them can write in their own notebook.',
      show: ['fr1','fr2','fr3'] },

    { nr: 'Friend A writes, and the update flows out to B and C automatically.',
      show: [], flow: ['fw_ab','fw_ac'] },

    { nr: 'Friend C can write at exactly the same time — there is no boss. All three are equal.',
      show: ['bosslabel'], flow: ['fw_ca','fw_cb'],
      add: [['fr3','pop']] },

    /* --- Act II: Technical --- */
    { nr: 'PGD is multi-master — every database copy accepts writes, not just one.',
      show: ['db1','db2','db3'],
      add: [['fr1','fade'],['fr2','fade'],['fr3','fade'],['bosslabel','fade']],
      rm: [['fw_ab','off'],['fw_ac','off'],['fw_ca','off'],['fw_cb','off']] },

    { nr: 'A write arrives at Database 1.',
      show: ['w1'],
      add: [['db1','pop']] },

    { nr: 'Database 1 replicates that change bidirectionally — to Database 2 and Database 3.',
      show: [], flow: ['m12','m21','m13'] },

    { nr: 'At the same time, a separate write arrives at Database 3.',
      show: ['w3'],
      add: [['db3','pop']] },

    { nr: 'Database 3 also replicates outward to all others. Any node, any direction — true multi-master.',
      show: ['mm'], flow: ['m31','m23','m32'] },

    { nr: 'Multi-master: spread the load, survive any failure.',
      show: ['note'] }
  ]
};
