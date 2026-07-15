/* Section: sequences & partitioning — edit this file to change ONLY this section. */
window.PGD_GROUPS = window.PGD_GROUPS || [];
window.PGD_GROUPS.push(
  { label:'Sequences & partitioning', badge:'Foundations', steps:[
    {t:'Distributed sequences', tag:'core', chap:'Sequences & partitioning', sc:s_seqkinds, rv:['hub','dist','snow','gal','n'], fl:['la','lb','lc'],
      an:'Three friends each hand out raffle tickets, but their tickets can never collide — each draws from a different range or stamps their own name on every number.',
      re:'In multi-master, every node may generate IDs at once, so a plain <b>SERIAL</b> would clash. PGD uses <b>distributed sequences</b>. v6 defaults the sequence kind to <b>distributed</b>; you can also choose <b>snowflakeid</b>, <b>galloc</b> or <b>timeshard</b> per table.',
      nr:'In multi-master, every node may generate IDs at the same time, so an ordinary serial would clash. PGD uses distributed sequences. Version six defaults the sequence kind to distributed, and you can also pick snowflakeid, galloc, or timeshard for a table.',
      hb:'v6 runbook 77 (distributed), 76 (snowflakeid), 75 (galloc), 74 (timeshard)',
      bv:[['bdr.sequences','PGD-managed sequences and their kind (local/timeshard/galloc/distributed)'],['bdr.sequences','sequence-kind mapping per sequence (seen in runbook 77)']]},
    {t:'Galloc sequences', tag:'core', chap:'Sequences & partitioning', sc:s_galloc, rv:['pool','n1','n2','n3','n'], fl:['a','b','c'],
      an:'A big book of tickets is divided up: you get tickets 1–1000, I get 1001–2000. We each hand out our own block, then ask for the next block when we run low.',
      re:'<b>Galloc</b> (global allocation) pre-assigns each node a <b>block of values</b>. Nodes allocate from their block locally — fast and clash-free — and request a new block when it runs low. IDs are unique but not strictly ordered across nodes.',
      nr:'Galloc, short for global allocation, pre-assigns each node a block of values. Each node hands out numbers from its own block, which is fast and clash-free, and requests a new block when it runs low. The IDs are unique but not strictly ordered across nodes.',
      hb:'v6 runbook 75 — set with SET LOCAL bdr.default_sequence_kind = \'galloc\'',
      bv:[['bdr.sequences','seqkind column shows galloc for galloc-managed sequences']]},
    {t:'AutoPartition', tag:'core', chap:'Sequences & partitioning', sc:s_autopartition, rv:['tbl','d1','d2','d3','old','n'], fl:['la','lb','lc','ld'],
      an:'A filing cabinet that adds a fresh drawer each day and shreds drawers older than a month — without you lifting a finger.',
      re:'<b>AutoPartition</b> automatically creates time-based partitions on a schedule and retires old ones. <code>bdr.autopartition()</code> takes a <code>partition_increment</code> (e.g. 1 day) and a <code>data_retention_period</code> (e.g. 30 days).',
      nr:'AutoPartition automatically creates time-based partitions on a schedule and retires old ones. The function bdr dot autopartition takes a partition increment, such as one day, and a data retention period, such as thirty days.',
      hb:'v6 runbook 32 — autopartition on a PARTITION BY RANGE table',
      bv:[['bdr.taskmgr_work_queue','AutoPartition tasks run via the task manager (autopartition_* views were renamed to taskmgr_* in v5/6)'],['bdr.tables','table-to-replication-set membership for partitioned tables']]},
    {t:'Sequence Kinds Beyond Galloc', tag:'new', chap:'Sequences & partitioning', sc:s_seqkindsbeyond, rv:['timeshard','snowflake','ksuuid','n'], fl:[],
      an:'Different ticket books for different needs: one stamps the time and booth number on every ticket, another mints one long unmistakable number, a third looks just like a normal ticket but still reads in time order.',
      re:'Beyond galloc: <b>Timeshard</b> packs a timestamp and node id into the value — sortable and spread across nodes. <b>SnowflakeID</b> packs timestamp, node, and a counter into one integer, unique and time-ordered. <b>KSUUID</b> is a UUID that sorts by creation time. <b>Offset</b> and <b>Local</b> are the simplest — a per-node step, or not distributed at all.',
      nr:'Beyond galloc, PGD offers a few more sequence kinds. Timeshard packs a timestamp and node id into the value, so it is sortable and spread across nodes. SnowflakeID packs a timestamp, node, and counter into one integer, unique and roughly time-ordered. KSUUID is a UUID that sorts by creation time, useful wherever UUIDs are already expected. Offset and Local sequences are the simplest: offset just steps each node by its own gap, while local isn\'t distributed at all and only makes sense on a single node.',
      hb:'v6 runbooks 74–77 — timeshard, snowflakeid, galloc, distributed sequence kinds',
      bv:[['bdr.sequences','seqkind column shows the sequence kind in use per sequence']]},
  ]}
);
