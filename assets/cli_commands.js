/* ============================================================
   PGD CLI command reference per concept  (window.PGD_CLI)
   ------------------------------------------------------------
   Keyed by scene title. Each entry is a list of { v, cmd, note }
   rows. `v` is the version/tool the command belongs to:
     harpctl (v4) · pgd-cli v5 · pgd v6 · SQL (any version)
   Commands are taken from the EDB docs CLI reference
   (pgd/4, /5.9, /6) and the PGD-POD runbooks.
   A scene shows this panel only if an entry exists for its title.
   Edit freely — add/remove rows without touching other files.
   ============================================================ */
window.PGD_CLI = {

/* ---------- Foundations ---------- */
"What is PGD?":[
  {v:"pgd v6",cmd:"pgd cluster show --health",note:"overall cluster health & node reachability"},
  {v:"pgd-cli v5",cmd:"pgd cluster show",note:"v5.7+ (was pgd show-nodes in 5.6)"},
  {v:"pgd v4",cmd:"pgd show-nodes",note:"v4 inspect-only CLI"}],
"The mesh":[
  {v:"pgd v6/v5",cmd:"pgd replication show",note:"slots & subscriptions between every peer"},
  {v:"SQL",cmd:"SELECT * FROM bdr.node_slots;",note:"outgoing slot per peer"}],
"Multi-master writes":[
  {v:"pgd v6",cmd:"pgd nodes list",note:"all nodes, kind & up/down state"},
  {v:"pgd-cli v5",cmd:"pgd nodes list",note:"v5.7+ (was pgd show-nodes)"}],
"Replication sets":[
  {v:"SQL",cmd:"SELECT * FROM bdr.replication_sets;",note:"defined repsets"},
  {v:"SQL",cmd:"SELECT bdr.alter_node_replication_sets('node1', ARRAY['set_a']);",note:"subscribe a node to sets"}],
"Apply delay":[
  {v:"SQL",cmd:"SELECT bdr.alter_node_group_config('grp', apply_delay := '5s');",note:"group-level delay"}],

/* ---------- Conflicts & data safety ---------- */
"What is a conflict?":[
  {v:"SQL",cmd:"SELECT * FROM bdr.conflict_history_summary ORDER BY local_time DESC;",note:"recent conflicts"},
  {v:"pgd v6",cmd:"pgd events show",note:"cluster events incl. apply errors"}],
"Conflict resolution":[
  {v:"SQL",cmd:"SELECT * FROM bdr.node_conflict_resolvers;",note:"current resolver per type"},
  {v:"SQL",cmd:"SELECT bdr.alter_node_set_conflict_resolver('insert_exists','update_if_newer');",note:"change resolver"}],
"Global locks":[
  {v:"SQL",cmd:"SELECT * FROM bdr.global_locks;",note:"active DDL/DML global locks"}],
"Replication lag":[
  {v:"pgd v6/v5",cmd:"pgd replication show --slots",note:"per-slot replay lag"},
  {v:"SQL",cmd:"SELECT target_name, replay_lag_size FROM bdr.node_replication_rates;",note:"lag bytes per peer"}],

/* ---------- Coordination (Raft) ---------- */
"Raft consensus":[
  {v:"pgd v6",cmd:"pgd raft show",note:"state, leader, term, commit index"},
  {v:"pgd-cli v5",cmd:"pgd raft show",note:"v5.7+ (was pgd show-raft)"},
  {v:"pgd v4",cmd:"pgd show-raft",note:""}],
"The Write Leader":[
  {v:"pgd v6",cmd:"pgd group <group> set-leader <node>",note:"manual switchover (--fast / --strict)"},
  {v:"SQL",cmd:"SELECT node_name, write_leader FROM bdr.node_summary;",note:"who leads now"}],
"Witness nodes":[
  {v:"pgd v6",cmd:"pgd nodes list",note:"node kind = witness"},
  {v:"SQL",cmd:"SELECT node_name, node_kind_name FROM bdr.node_summary;",note:""}],
"Sharding":[
  {v:"pgd v6",cmd:"pgd groups list",note:"shard/data groups"},
  {v:"SQL",cmd:"SELECT * FROM bdr.node_group_summary;",note:"group types"}],

/* ---------- Durability & safe writes ---------- */
"CAMO":[
  {v:"pgd v6/v5",cmd:"pgd commit-scope camo create \"ALL ORIGIN GROUP CAMO\" grp",note:"v6/v5.7+ defines CAMO as a commit scope"},
  {v:"SQL",cmd:"SHOW bdr.commit_scope;",note:""}],
"Synchronous commit":[
  {v:"pgd v6/v5",cmd:"pgd commit-scope sync create \"MAJORITY ORIGIN GROUP SYNCHRONOUS COMMIT\" grp",note:""},
  {v:"SQL",cmd:"SELECT * FROM bdr.commit_scopes;",note:""}],
"Group commit":[
  {v:"pgd v6/v5",cmd:"pgd commit-scope gc create \"MAJORITY ORIGIN GROUP GROUP COMMIT\" grp",note:""}],

/* ---------- Version 4 · BDR + HARP ---------- */
"HARP routing":[
  {v:"harpctl v4",cmd:"harpctl get leader dc1",note:"current lead master for a location"},
  {v:"harpctl v4",cmd:"harpctl promote <node-name>",note:"promote a node to lead master"},
  {v:"harpctl v4",cmd:"harpctl fence <node> / harpctl unfence <node>",note:"fence a failing node"},
  {v:"harpctl v4",cmd:"harpctl set proxy proxy1 max_client_conn=750",note:"tune a proxy"}],
"Metal-tier clusters":[
  {v:"pgd v4",cmd:"pgd show-nodes",note:"see Bronze/Silver/Gold/Platinum topology"}],

/* ---------- Version 5 · PGD + Proxy ---------- */
"PGD Proxy replaces HARP":[
  {v:"pgd-cli v5",cmd:"pgd show-proxies",note:"list proxies (v5.6)"},
  {v:"pgd-cli v5",cmd:"pgd create-proxy --proxy-name p1 --node-group grp",note:"register a proxy (v5.6)"}],
"Switchover & failover":[
  {v:"pgd v6",cmd:"pgd group <group> set-leader <node>",note:"planned switchover (v6 / v5.7+)"},
  {v:"pgd-cli v5",cmd:"pgd switchover --group-name grp --node-name node2",note:"v5.6 syntax"}],
"Maintenance mode":[
  {v:"SQL",cmd:"SELECT bdr.run_on_nodes('{node1}','VACUUM ANALYZE');",note:"dispatch maintenance to a node behind the proxy"}],
"Replication lag control":[
  {v:"pgd v6/v5",cmd:"pgd commit-scope lag create \"MAJORITY ORIGIN GROUP LAG CONTROL (max_lag_time=30s, max_commit_delay=10s)\" grp",note:""}],
"Raft repair tools":[
  {v:"SQL",cmd:"SELECT bdr.raft_leadership_transfer('node1', true);",note:"hand leadership over"},
  {v:"SQL",cmd:"SELECT bdr.consensus_snapshot_export();",note:"export Raft snapshot (runbook 29)"}],
"Logical-join upgrades":[
  {v:"pgd v6",cmd:"pgd node <node> upgrade --old-bindir … --new-bindir … --old-datadir … --new-datadir … --database bdrdb --username postgres",note:"in-place major upgrade (v5.7+/v6)"},
  {v:"pgd v6",cmd:"pgd node <node> setup -D <PGDATA>",note:"join a fresh node (v6)"}],

/* ---------- Version 6 · Editions & Commit scopes ---------- */
"PGD-S vs PGD-X editions":[
  {v:"pgd v6",cmd:"pgd cluster show",note:"Essential vs Expanded layout"},
  {v:"pgd v6",cmd:"pgd groups list",note:"Essential caps: ≤4 data nodes, ≤2 groups"}],
"Connection Manager":[
  {v:"pgd v6",cmd:"pgd cluster show --health",note:"routing health"},
  {v:"HTTP",cmd:"curl http://node:6434/node/is-read-write",note:"6432=RW · 6433=RO · 6434=HTTP API"},
  {v:"SQL",cmd:"SELECT * FROM bdr.stat_connection_manager;",note:"connection totals"}],
"Commit scopes":[
  {v:"pgd v6",cmd:"pgd commit-scope <name> create \"<rule>\" <group>",note:"create"},
  {v:"pgd v6",cmd:"pgd commit-scope <name> show",note:"inspect"},
  {v:"pgd v6",cmd:"pgd commit-scope <name> update \"<rule>\" <group>",note:""},
  {v:"pgd v6",cmd:"pgd commit-scope <name> drop <group>",note:""}],
"TDE encryption":[
  {v:"pgd v6",cmd:"pgd node <node> upgrade --key-unwrap-command … --copy-by-block",note:"TDE migration on upgrade (6.2+)"}],
"Automatic reconciliation":[
  {v:"SQL",cmd:"SELECT * FROM bdr.taskmgr_work_queue;",note:"reconciliation work items"}],
"Tuning conflicts":[
  {v:"SQL",cmd:"SELECT bdr.alter_node_set_conflict_resolver('update_origin_change','row_version_wins');",note:""},
  {v:"pgd v6",cmd:"pgd events show",note:"watch conflict/degrade events"}],
"Parallel apply":[
  {v:"SQL",cmd:"ALTER SYSTEM SET bdr.writers_per_subscription = 4;",note:"default 2, max 8"}],
"Transaction streaming":[
  {v:"SQL",cmd:"ALTER SYSTEM SET bdr.default_streaming_mode = 'auto';",note:"auto | off | writer | file"}],
"Single decoder worker":[
  {v:"SQL",cmd:"SELECT bdr.alter_node_group_config('grp', enable_wal_decoder := true);",note:"decode WAL once for all peers"}],
"Node lifecycle":[
  {v:"pgd v6",cmd:"pgd node <node> setup -D <PGDATA>",note:"join"},
  {v:"SQL",cmd:"SELECT bdr.part_node('node3');",note:"part (remove) a node"},
  {v:"pgd v6",cmd:"pgd nodes list",note:"watch join/part state"}],
"Safe housekeeping":[
  {v:"SQL",cmd:"CREATE INDEX CONCURRENTLY idx ON tbl(col);",note:"non-blocking build"},
  {v:"SQL",cmd:"SELECT bdr.run_on_nodes('{node1,node2}','VACUUM (FULL) tbl');",note:"per-node maintenance"}],

/* ---------- Sequences & partitioning ---------- */
"Distributed sequences":[
  {v:"SQL",cmd:"SHOW bdr.default_sequence_kind;",note:"distributed (v6 default)"},
  {v:"SQL",cmd:"SELECT * FROM bdr.sequences;",note:"kind per sequence"}],
"Galloc sequences":[
  {v:"SQL",cmd:"SET LOCAL bdr.default_sequence_kind = 'galloc';",note:"set before CREATE TABLE"},
  {v:"SQL",cmd:"SELECT bdr.galloc_chunk_info('seqname');",note:"chunk allocation (5.8+)"}],
"AutoPartition":[
  {v:"SQL",cmd:"SELECT bdr.autopartition('measurement', partition_increment := '1 day', data_retention_period := '30 days');",note:""},
  {v:"SQL",cmd:"SELECT * FROM bdr.taskmgr_work_queue;",note:"partition tasks"}],

/* ---------- Operations & recovery ---------- */
"PITR with Barman":[
  {v:"barman",cmd:"barman backup <server>",note:"take a base backup"},
  {v:"barman",cmd:"barman recover --target-time \"2026-01-01 10:00:00\" <server> <backup_id> <dir>",note:"point-in-time restore to a seed node"}],
"Eager replication":[
  {v:"SQL",cmd:"ALTER SYSTEM SET bdr.writers_per_subscription = 1;",note:"v6 needs parallel apply OFF for eager"},
  {v:"pgd v6",cmd:"pgd commit-scope eager create \"MAJORITY ORIGIN GROUP GROUP COMMIT (conflict_resolution = eager)\" grp",note:""}],
"Resynchronize a table":[
  {v:"SQL",cmd:"SELECT bdr.resynchronize_table_from_node('node2','public.tbl'::regclass);",note:"re-copy one table from a peer"}],
"Skip changes up to an LSN":[
  {v:"SQL",cmd:"SELECT bdr.alter_subscription_skip_changes_upto('sub_name','0/3000000');",note:"last-resort: skip a poison change"},
  {v:"SQL",cmd:"SELECT * FROM bdr.subscription_error_status;",note:"why apply stalled"}]
};
