/* Section: v4 — edit this file to change ONLY this section. */
window.PGD_GROUPS = window.PGD_GROUPS || [];
window.PGD_GROUPS.push(
{ label:'Version 4 · BDR + HARP', badge:'PGD 4', steps:[
    {t:'PGD 4 Architecture', tag:'new', chap:'Version 4', sc:s_pgd4arch, rv:['bronze','silver','gold','platinum','n'], fl:[],
      an:'Four floor plans for the same clubhouse network: a cozy single room, a room plus an off-site vault, two rooms with a referee down the hall, and two fully-staffed rooms with spares on standby.',
      re:'PGD 4 shipped four named Always-On tiers, each a specific node/location layout: <b>Bronze</b> (2 data + 1 witness, 1 location, local backup), <b>Silver</b> (3 data, 1 location, + a 2nd location for offsite backup), <b>Gold</b> (2 data nodes each in 2 locations, + a 3rd-location witness for Raft majority), and <b>Platinum</b> (3 data nodes each in 2 locations, with redundant hot-standby hardware).',
      nr:'PGD 4 shipped four named Always-On tiers. Bronze is two data nodes and a witness in one location with a local backup. Silver is three data nodes in one location, plus a second location holding an offsite backup. Gold is two locations of two data nodes each, plus a third-location witness for Raft majority. Platinum is two locations of three data nodes each, with redundant hot-standby hardware.',
      hb:'v4 docs · Always On Bronze / Silver / Gold / Platinum architectures',
      bv:[['bdr.node_group_summary','node group layout per tier'],['bdr.node_summary','node_kind_name distinguishes data vs witness nodes per tier']]},
    {t:'The BDR name', tag:'new', chap:'Version 4', sc:s_bdr, rv:['old','arr','new','n'], fl:['x'],
      an:'Same magic notebooks — just an older name printed on the cover.',
      re:'In v4 the extension is called <b>BDR</b> (Bi-Directional Replication). Later versions rename it to <b>PGD</b>; the engine is the same family.',
      nr:'In version 4 the technology is called BDR, short for Bi-Directional Replication. Later versions rename it to PGD, but it is the same family of engine.',
      bv:[['bdr.node','core node catalog — same in BDR/PGD'],['bdr.node_summary','extension version string']]},
    {t:'HARP routing', tag:'new', chap:'Version 4', sc:s_harp, rv:['app','harp','dcs','l1','l2','l3'], fl:['a','d','w','r12','r13'],
      an:'A receptionist (HARP) keeps a notepad of who is in charge and sends visitors to the right room.',
      re:'v4 uses <b>HARP</b>, a separate routing layer, to send your app to the right copy. It relies on a <b>consensus store</b> (a shared notepad) to track the leader.',
      nr:'Version 4 uses HARP, a separate routing layer, to send your app to the right copy. HARP relies on a consensus store, a shared notepad, to track the leader.',
      bv:[['bdr.node_summary','write_leader column shows HARP-elected leader'],['bdr.group_raft_details','underlying Raft state used by HARP']]},
    {t:'Metal-tier clusters', tag:'new', chap:'Version 4', sc:s_metal, rv:['b','s','g','n'], fl:[],
      an:'Practice clusters were nicknamed by metal: bronze for small, silver for medium.',
      re:'v4 training used informal <b>bronze / silver</b> tier names for cluster sizes. These later become the real <b>PGD-S / PGD-X</b> editions.',
      nr:'Version 4 used informal metal-tier names like bronze and silver for cluster sizes. These later become the real PGD-S and PGD-X editions.',
      bv:[['bdr.node_group','node groups define cluster topology for any tier'],['bdr.node_summary','number of data/witness nodes in each group']]},
  ]}
);
