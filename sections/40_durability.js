/* Section: durability — edit this file to change ONLY this section. */
window.PGD_GROUPS = window.PGD_GROUPS || [];
window.PGD_GROUPS.push(
{ label:'Durability & safe writes', badge:'Foundations', steps:[
    {t:'CAMO', tag:'core', chap:'Durability & safe writes', sc:s_camo, rv:['app','n1','n2','chk','n'], fl:['send','pair','ack'],
      an:'Two cashiers confirm with each other before printing the receipt, so you are never charged twice.',
      re:'<b>CAMO</b> = Commit At Most Once. A pair of copies confirm a write is safely saved <b>before</b> the app is told it succeeded. Present in all versions (v4, v5, v6); v6 configures it through commit scopes.',
      nr:'CAMO stands for Commit At Most Once. A pair of copies confirm a write is safely saved before the app is told it worked, so transactions are never lost or applied twice. It exists in all versions, and version 6 configures it through commit scopes.',
      bv:[['bdr.commit_scopes','configured CAMO partner pairs'],['bdr.commit_scopes','CAMO health across every node']]},
    {t:'Synchronous commit', tag:'core', chap:'Durability & safe writes', sc:s_sync, rv:['app','lead','copy','n'], fl:['a','b','back'],
      an:'You do not get your receipt until a second person confirms they wrote it down too.',
      re:'<b>Synchronous commit</b> only reports success after chosen copies confirm they have the write — stronger safety, slightly slower. In v6 it is set via a commit scope.',
      nr:'Synchronous commit only reports success after chosen copies confirm they have the write. It is stronger safety but slightly slower, and in version 6 you set it through a commit scope.',
      bv:[['bdr.commit_scopes','defined commit scope rules (v6)'],['bdr.stat_commit_scope','per-scope commit statistics (v6)']]},
    {t:'Group commit', tag:'core', chap:'Durability & safe writes', sc:s_groupcommit, rv:['lead','c1','c2','c3','n'], fl:['l1','l2','l3'],
      an:'You only need "enough" friends to confirm — not every single one — before you carry on.',
      re:'<b>Group commit</b> waits for a <b>quorum</b> (enough copies) rather than all of them, balancing safety with speed. Present across versions; v6 expresses it as a commit-scope option.',
      nr:'Group commit waits for a quorum, meaning enough copies, rather than all of them. This balances safety with speed. It exists across versions, and version 6 expresses it as a commit-scope option.',
      bv:[['bdr.commit_scopes','group commit rules defined here in v6'],['bdr.stat_commit_scope','success/failure counts per scope']]},
  ]}
);
