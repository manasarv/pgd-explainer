/* Section: coordination — edit this file to change ONLY this section. */
window.PGD_GROUPS = window.PGD_GROUPS || [];
window.PGD_GROUPS.push(
{ label:'Coordination (Raft)', badge:'Foundations', steps:[
    {t:'Raft consensus', tag:'core', chap:'Coordination', sc:s_raft, rv:['ring','r1','r2','r3','v1','v2','rn'], fl:['rv2','rv3'],
      an:'When the group needs one decision-maker, they vote. Majority wins. If that person leaves, they vote again.',
      re:'<b>Raft</b> is the voting system the copies use to agree. A majority must agree, which prevents two copies acting as boss at once.',
      nr:'Raft is the voting system the copies use to agree on decisions. A majority must agree, which prevents two copies from acting as the boss at once.',
      bv:[['bdr.group_raft_details','raft instance per node group'],['bdr.event_summary','full node state transition history']]},
    {t:'The Write Leader', tag:'core', chap:'Coordination', sc:s_leader, rv:['lead','f1','f2','f3','n'], fl:['d1','d2','d3'],
      an:'The voted-in friend becomes the decider for anything everyone must agree on.',
      re:'The vote winner is the <b>Write Leader</b>. Cluster-wide decisions route through it for consistency, and Raft re-elects automatically if it fails.',
      nr:'The copy that wins the vote becomes the Write Leader. Cluster-wide decisions route through it for consistency, and Raft re-elects automatically if it fails.',
      bv:[['bdr.node_summary','write_leader column identifies the current leader'],['bdr.group_raft_details','current leader per raft instance']]},
    {t:'Key-value store', tag:'core', chap:'Coordination', sc:s_kv, rv:['store','n1','n2','n3','n'], fl:['k1','k2','k3'],
      an:'The group keeps a small shared sticky-note board that everyone reads the same way.',
      re:'Raft maintains a small <b>key-value store</b> — shared facts kept perfectly in sync across all nodes for coordination.',
      nr:'Raft also keeps a small key-value store: tiny shared facts that stay perfectly in sync across all nodes, used for coordination.',
      bv:[['bdr.group_raft_details','inspect Raft KV state per node group']]},
    {t:'Witness nodes', tag:'core', chap:'Coordination', sc:s_witness, rv:['d1','d2','wit','n'], fl:['w1','w2'],
      an:'A referee who does not play but helps vote, so there is never a tie.',
      re:'A <b>witness</b> holds no real data — it only votes. With an even number of data nodes, a witness keeps voter count odd so a majority is always possible.',
      nr:'A witness node holds no real data. It only votes. With an even number of data nodes, a witness keeps the voter count odd so a clear majority is always possible.',
      bv:[['bdr.node_summary','node_kind column shows "witness" for witness nodes'],['bdr.node','node_type per cluster member']]},
    {t:'Sharding', tag:'core', chap:'Coordination', sc:s_shard, rv:['all','a','b','c','n'], fl:['la','lb','lc'],
      an:'One fat notebook split into A–H, I–P and Q–Z so no single notebook carries everything.',
      re:'<b>Sharding</b> splits huge data into slices so no copy holds it all. Present across versions; v4 set it up by hand, later versions made it simpler.',
      nr:'Sharding splits huge data into slices so no single copy holds all of it. It exists across versions; version 4 set it up by hand, while later versions made it simpler.',
      bv:[['bdr.tables','shows table-to-replication-set mapping used to shard data'],['bdr.node_group','node group assignments per shard group']]},
  ]}
);
