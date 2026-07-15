/* ============================================================
   Per-concept REFERENCE data, harvested from EDB v6 docs
   (anchored on /pgd/latest; only version DIFFERENCES are noted).
     PGD_MON     — monitoring SELECT queries + interpretation
     PGD_SET     — relevant GUC settings (name / default / purpose)
     PGD_CLIREF  — full CLI subcommand reference (v6 + v5/v4 deltas)
     PGD_TOPIC   — maps a scene title to the above (mon / set / cli)
   Sources: monitoring/sql, pgd-settings, cli/command_ref.
   ============================================================ */

window.PGD_MON = {
"node-join-removal":[{q:"SELECT node_name, interface_connstr, peer_state_name,\n    node_seq_id, node_local_dbname\nFROM bdr.node_summary;",note:"healthy = all participating nodes show peer_state_name = ACTIVE; JOINING/PARTING is transient. Use bdr.wait_for_join_completion() and bdr.node_catchup_info for catch-up state."}],
"replication-peers":[{q:"SELECT node_group_name, target_dbname, target_name, slot_name, active_pid,\n    catalog_xmin, client_addr, sent_lsn, replay_lsn, replay_lag,\n    replay_lag_bytes, replay_lag_size\nFROM bdr.node_slots;",note:"healthy = each peer slot has a non-null active_pid/client_addr and low replay_lag_bytes; run on all nodes since PGD is a mesh. Disconnected slots show active='f' and state='disconnected'."}],
"raft-consensus":[{q:"SELECT node_id, node_name, state, leader_id\nFROM bdr.group_raft_details;",note:"healthy = every node has a valid state (RAFT_LEADER or RAFT_FOLLOWER), exactly one RAFT_LEADER, and leader_id identical on all rows matching the leader's node_id. RAFT_CANDIDATE means an election may be in progress (wait bdr.raft_global_election_timeout)."}],
"replication-slots-lag":[{q:"SELECT slot_name, database, active, confirmed_flush_lsn\nFROM pg_replication_slots ORDER BY slot_name;",note:"healthy = every peer slot (bdr_<DB>_<GROUP>_<PEER>) is active='t'; the single group slot (bdr_<DB>_<GROUP>) is normally inactive. An inactive peer slot means the peer is down or replication is broken. Use bdr.monitor_local_replslots() for an OK/CRITICAL summary."}],
"replication-rates":[{q:"SELECT * FROM bdr.node_replication_rates;",note:"healthy = catchup_interval near zero for every peer; prefer catchup_interval / replay_lag_bytes over replay_lag (which resets to 0 on reconnect). apply_rate is bytes/sec the peer consumes."}],
"subscriptions":[{q:"SELECT node_group_name, origin_name, sub_enabled, sub_slot_name,\n    subscription_status\nFROM bdr.subscription_summary;",note:"healthy = every subscription has sub_enabled='t' and subscription_status='replicating'. Drill into bdr.stat_subscription, bdr.stat_receiver, bdr.stat_writer for detail."}],
"walsender":[{q:"SELECT * FROM bdr.wal_sender_stats();",note:"healthy (decoding worker on) = WAL senders show is_using_lcr='t' with a decoder_slot_name and lcr_file_name. is_using_lcr='f' is expected only when the decoding worker is off or the sender feeds a logical standby."}],
"decoding-worker":[{q:"SELECT * FROM bdr.get_decoding_worker_stat();",note:"healthy = decoded_upto_lsn keeps advancing; waiting='t' with a waiting_for_lsn means the decoder is briefly waiting for more WAL. Only relevant when bdr.enable_wal_decoder is on."}],
"connection-routing":[{q:"SELECT * FROM bdr.stat_routing_state;",note:"healthy = a stable write-lead/target with fast failure detection. Pair with bdr.stat_routing_candidate_state (populated only on the Raft leader) to see candidate nodes."}],
"transactions-locks":[{q:"SELECT lock_type, relation, pid FROM bdr.global_locks;",note:"healthy = no long-held global locks; GLOBAL_LOCK_DDL / GLOBAL_LOCK_DML rows appear transiently during replicated DDL. Persistent locks indicate a stuck DDL operation."}],
"conflicts":[{q:"SELECT count(*)\nFROM bdr.conflict_history_summary\nWHERE local_time > date_trunc('day', current_timestamp)\n  AND local_time < date_trunc('day', current_timestamp + '1 day');",note:"healthy = low/stable conflict counts; investigate rising counts. bdr.conflict_history_summary holds no user data (full detail in row-security-protected bdr.conflict_history)."}],
"raft-monitor-summary":[{q:"SELECT * FROM bdr.monitor_group_raft();",note:"healthy = status OK ('Raft Consensus is working correctly'). WARNING for in-progress elections/unreachable nodes; CRITICAL for split-brain or wrong leader."}]
};

window.PGD_SET = {
"raft":[
{name:"bdr.raft_global_election_timeout",def:"6s",desc:"Election/request timeout for the global (top-level) group; raise to 30s on high-latency/geo networks (must match on all nodes)."},
{name:"bdr.raft_group_election_timeout",def:"3s",desc:"Election/request timeout when a request targets a sub-group."},
{name:"bdr.raft_response_timeout",def:"-1",desc:"Override for response timeout; must be less than either election timeout. -1 uses the election timeouts."},
{name:"bdr.raft_keep_min_entries",def:"1000",desc:"Minimum entries kept in the Raft log during compaction (≤PGD 5.3: 100); 0 disables compaction. Server-start only."},
{name:"bdr.raft_log_min_apply_duration",def:"3000ms",desc:"Logs INFO if appending an entry to the Raft log exceeds this."},
{name:"bdr.raft_log_min_message_duration",def:"5000ms",desc:"Logs INFO if a consensus request roundtrip exceeds this."},
{name:"bdr.raft_group_max_connections",def:"100",desc:"Max connections across all groups carrying consensus requests. Server-start only."}
],
"commit-scope-durability":[
{name:"bdr.commit_scope",def:"(empty)",desc:"Sets the current/default commit scope governing durability & consistency."},
{name:"bdr.camo_local_mode_delay",def:"5ms",desc:"Commit delay in CAMO async mode to emulate partner-confirm overhead; 0 disables."},
{name:"bdr.camo_enable_client_warnings",def:"on",desc:"Warns when CAMO properties can't be guaranteed."}
],
"lag-control":[
{name:"bdr.lag_control_max_commit_delay",def:"",desc:"Maximum tolerable post-commit delay (fractional ms)."},
{name:"bdr.lag_control_max_lag_size",def:"",desc:"Maximum tolerable lag size (KB)."},
{name:"bdr.lag_control_max_lag_time",def:"",desc:"Maximum tolerable lag time (ms)."},
{name:"bdr.lag_control_min_conforming_nodes",def:"",desc:"Min nodes required to stay below the acceptable lag measures."},
{name:"bdr.lag_control_commit_delay_start",def:"1.0%",desc:"Lag threshold (fraction of acceptable lag) at which commit-delay increments begin."}
],
"transaction-streaming":[
{name:"bdr.default_streaming_mode",def:"auto",desc:"Transaction streaming requested by the subscriber: off, writer, file, or auto."}
],
"parallel-apply-writers":[
{name:"bdr.writers_per_subscription",def:"2",desc:"Default writers per subscription (also per-group via bdr.alter_node_group_option)."},
{name:"bdr.max_writers_per_subscription",def:"8",desc:"Upper limit; reloadable at runtime since PGD 6.3.0 (applies on next writer-group start)."},
{name:"bdr.batch_inserts",def:"",desc:"Consecutive single-table inserts that trigger COPY-style batch apply (and node-join initial copy)."}
],
"decoding-worker":[
{name:"bdr.enable_wal_decoder",def:"false",desc:"Enables the decoding worker so WAL senders send LCRs; enable on all nodes and on the group."},
{name:"bdr.receive_lcr",def:"false",desc:"Lets a downstream node request LCRs; set true wherever enable_wal_decoder is true."},
{name:"bdr.lcr_cleanup_interval",def:"3 minutes",desc:"Interval between LCR file cleanups; 0 disables."}
],
"routing-connection-manager":[
{name:"bdr.global_connection_timeout",def:"15s",desc:"Max wait to establish a cross-node libpq connection; min 2s (SIGHUP)."},
{name:"bdr.global_keepalives",def:"1 (on)",desc:"Whether TCP keepalives are used on cross-node connections (SIGHUP)."},
{name:"bdr.global_tcp_user_timeout",def:"5000ms",desc:"ms transmitted data may stay unacknowledged before the connection is closed; 0 = system default."},
{name:"bdr.force_full_mesh",def:"on",desc:"Forces full-mesh topology; off allows optimized topology for subscriber-only groups when eligible."}
],
"sequences":[
{name:"bdr.default_sequence_kind",def:"distributed",desc:"Default sequence kind: distributed = snowflakeid for int8 (bigserial), galloc for int4/int2."}
],
"ddl-locking":[
{name:"bdr.ddl_locking",def:"auto",desc:"Global DDL locking mode: all, leader, auto, dml, or off. bdr_superuser/superuser only."},
{name:"bdr.truncate_locking",def:"on",desc:"When on, TRUNCATE obeys bdr.ddl_locking."},
{name:"bdr.lock_table_locking",def:"on",desc:"When on, LOCK TABLE also takes a global DML lock cluster-wide."},
{name:"bdr.global_lock_timeout",def:"1 minute",desc:"Max wait for a global lock; 0 disables."},
{name:"bdr.global_lock_statement_timeout",def:"60 minutes",desc:"Max duration of a statement holding a global lock; 0 disables."},
{name:"bdr.ddl_replication",def:"on",desc:"Automatically replicates DDL across nodes; superuser only."},
{name:"bdr.role_replication",def:"on",desc:"Automatically replicates ROLE commands; requires bdr.ddl_replication on."}
],
"conflicts":[
{name:"bdr.default_conflict_detection",def:"",desc:"Default conflict detection method for newly created tables."},
{name:"bdr.crdt_raw_value",def:"off",desc:"When on, CRDT types return their full multi-node representation, not just the base value."},
{name:"bdr.maximum_clock_skew",def:"-1",desc:"Max allowed future-skew between incoming commit timestamp and local time; -1 ignores skew."},
{name:"bdr.maximum_clock_skew_action",def:"",desc:"Action on excessive skew: WARN or WAIT."},
{name:"bdr.enable_auto_sync_reconcile",def:"on (from 6.0.1)",desc:"Auto-syncs from the furthest-ahead node when a node goes down and reconciles unresolved prepared transactions."}
]
};

window.PGD_CLIREF = {
"cluster":{v6:[{cmd:"pgd cluster show",note:"cluster-level info; --summary | --health | --clock-drift"},{cmd:"pgd cluster verify",note:"verify config; --settings (GUCs), --arch (architecture), -v"}],v5:[],v4:[{cmd:"pgd check-health",note:"v4 v1 inspect-only health check"}]},
"group":{v6:[{cmd:"pgd group <GROUP> show",note:"group info; --summary | --options | --nodes"},{cmd:"pgd group <GROUP> set-option <OPT> <VAL>",note:"set group option (default_commit_scope, enable_routing, num_writers)"},{cmd:"pgd group <GROUP> get-option <OPT>",note:"get option; omit to list all"},{cmd:"pgd group <GROUP> set-leader <NODE>",note:"set write leader (switchover); --strict+--timeout 30s, or --fast"}],v5:[],v4:[]},
"groups":{v6:[{cmd:"pgd groups list",note:"list all groups"}],v5:[],v4:[]},
"node":{v6:[{cmd:"pgd node setup",note:"NEW v6: init/join a data node (physical or logical join); supports TDE --data-encryption"},{cmd:"pgd node <NODE> show",note:"node-level info"},{cmd:"pgd node <NODE> part",note:"NEW v6: remove (part) a node from the cluster"},{cmd:"pgd node <NODE> set-option / get-option <OPT>",note:"node options: route_priority, route_fence, route_writes, route_reads"},{cmd:"pgd node <NODE> set-config / get-config <GUC>",note:"NEW v6: get/set a node Postgres GUC (needs superuser DSN)"},{cmd:"pgd node <NODE> upgrade --old-bindir … --new-bindir … --old-datadir … --new-datadir … --database … --username …",note:"major-version in-place upgrade; -k/--link, --check, -j"}],v5:[{cmd:"pgd node <NODE> show|set-option|get-option|upgrade",note:"v5.9: no setup/part/set-config/get-config"}],v4:[]},
"nodes":{v6:[{cmd:"pgd nodes list",note:"list all nodes (kind, join state, up/down)"}],v5:[],v4:[{cmd:"pgd show-nodes",note:"v4 v1 inspect-only"}]},
"events":{v6:[{cmd:"pgd events show",note:"recent events; --node, --group, -n/--limit"}],v5:[],v4:[{cmd:"pgd show-events",note:"v4 v1 inspect-only"}]},
"replication":{v6:[{cmd:"pgd replication show",note:"replication status; --nodes, --slots, --subscriptions, --analytics, -v"}],v5:[],v4:[{cmd:"pgd show-replslots",note:"v4: slots"},{cmd:"pgd show-subscriptions",note:"v4: subscriptions"}]},
"raft":{v6:[{cmd:"pgd raft show",note:"Raft status; --state | --followers | --journal"},{cmd:"pgd raft enable",note:"NEW v6: enable Raft worker; --node | --group | --all"},{cmd:"pgd raft disable",note:"NEW v6: disable Raft worker until re-enabled/restart"},{cmd:"pgd raft set-leader <NODE>",note:"NEW v6: transfer Raft leadership; --group, --wait-for-completion"},{cmd:"pgd raft sync-snapshot",note:"NEW v6: export from leader, import on all followers; --group, --check"}],v5:[{cmd:"pgd raft show",note:"v5.9: only 'show' exists"}],v4:[{cmd:"pgd show-raft",note:"v4 v1 inspect-only"}]},
"commit-scope":{v6:[{cmd:"pgd commit-scope <NAME> show",note:"show scope details"},{cmd:"pgd commit-scope <NAME> create <RULE> [GROUP]",note:"create from rule; GROUP defaults to top-level"},{cmd:"pgd commit-scope <NAME> update <RULE> [GROUP]",note:"update the rule"},{cmd:"pgd commit-scope <NAME> drop [GROUP]",note:"drop (GROUP must match creation)"},{cmd:"pgd commit-scopes list [GROUP]",note:"NEW v6: list scopes (note plural)"}],v5:[{cmd:"pgd commit-scope show|create|update|drop",note:"v5.9: no 'list'"}],v4:[]},
"assess":{v6:[{cmd:"pgd assess",note:"assess a plain Postgres server for PGD suitability; needs --dsn"}],v5:[],v4:[]},
"_v4_harpctl":{v6:[],v5:[],v4:[{cmd:"harpctl get leader <loc> / get nodes / get proxies",note:"v4 HARP: who is lead, list nodes/proxies"},{cmd:"harpctl promote <node>",note:"v4 HARP: promote a node to lead its location"},{cmd:"harpctl fence <node> / unfence <node>",note:"v4 HARP: fence/unfence a node"},{cmd:"harpctl set proxy <p> <opt>=<val>",note:"v4 HARP: tune a proxy"},{cmd:"harpctl apply <file>",note:"v4 HARP: apply config from YAML"}]},
"_flat_pre57":{v6:[],v5:[{cmd:"pgd show-nodes / show-raft / show-replslots",note:"v5.0–5.6 flat inspect commands (→ nodes list / raft show / replication show in 5.7+)"},{cmd:"pgd switchover",note:"5.6 flat (→ group set-leader)"},{cmd:"pgd verify-cluster / verify-settings",note:"5.6 flat (→ cluster verify --arch / --settings)"},{cmd:"pgd create-proxy / delete-proxy / show-proxies",note:"5.6 PGD-Proxy mgmt (removed in v6 — built-in Connection Manager)"}],v4:[]}
};

/* scene-title → reference mapping (mon topic · setting areas · cli group) */
window.PGD_TOPIC = {
"v4 — BDR + HARP":{mon:"connection-routing",set:["routing-connection-manager"],cli:"_v4_harpctl"},
"v5 — HARP out, PGD Proxy in":{mon:"connection-routing",set:["routing-connection-manager"],cli:"_flat_pre57"},
"v6 — Connection Manager + editions":{mon:"connection-routing",set:["routing-connection-manager"],cli:"cluster"},
"What is PGD?":{mon:"node-join-removal",cli:"cluster"},
"The mesh":{mon:"replication-peers"},
"Multi-master writes":{mon:"replication-peers",cli:"nodes"},
"Eventual consistency":{mon:"replication-rates"},
"Replication sets":{},
"DDL filters":{set:["ddl-locking"]},
"What is a conflict?":{mon:"conflicts",set:["conflicts"]},
"Conflict resolution":{mon:"conflicts",set:["conflicts"]},
"CRDTs":{set:["conflicts"]},
"Global locks":{mon:"transactions-locks",set:["ddl-locking"]},
"Global advisory locks":{mon:"transactions-locks"},
"Replication lag":{mon:"replication-slots-lag",set:["lag-control"]},
"Raft consensus":{mon:"raft-consensus",set:["raft"],cli:"raft"},
"The Write Leader":{mon:"connection-routing",set:["routing-connection-manager"],cli:"group"},
"Key-value store":{mon:"raft-consensus",set:["raft"]},
"Witness nodes":{mon:"node-join-removal",cli:"nodes"},
"Sharding":{cli:"groups"},
"CAMO":{set:["commit-scope-durability"],cli:"commit-scope"},
"Synchronous commit":{set:["commit-scope-durability"],cli:"commit-scope"},
"Group commit":{set:["commit-scope-durability"],cli:"commit-scope"},
"HARP routing":{mon:"connection-routing",cli:"_v4_harpctl"},
"Metal-tier clusters":{cli:"nodes"},
"PGD Proxy replaces HARP":{mon:"connection-routing",set:["routing-connection-manager"],cli:"_flat_pre57"},
"Switchover & failover":{mon:"connection-routing",cli:"group"},
"Maintenance mode":{cli:"node"},
"Replication lag control":{set:["lag-control"]},
"Raft per group":{mon:"raft-consensus",set:["raft"],cli:"raft"},
"Raft repair tools":{mon:"raft-consensus",set:["raft"],cli:"raft"},
"Logical-join upgrades":{cli:"node"},
"PGD-S vs PGD-X editions":{cli:"cluster"},
"Connection Manager":{mon:"connection-routing",set:["routing-connection-manager"],cli:"cluster"},
"Commit scopes":{set:["commit-scope-durability"],cli:"commit-scope"},
"Automatic reconciliation":{set:["conflicts"]},
"Optimized mesh":{set:["routing-connection-manager"]},
"Lag history":{mon:"replication-rates",set:["lag-control"]},
"Tuning conflicts":{mon:"conflicts",set:["conflicts"]},
"Parallel apply":{set:["parallel-apply-writers"]},
"Transaction streaming":{set:["transaction-streaming"]},
"Single decoder worker":{mon:"decoding-worker",set:["decoding-worker"]},
"Node lifecycle":{mon:"node-join-removal",cli:"node"},
"Safe housekeeping":{set:["ddl-locking"]},
"Distributed sequences":{set:["sequences"]},
"Galloc sequences":{set:["sequences"]},
"Eager replication":{set:["commit-scope-durability"],cli:"commit-scope"},
"Resynchronize a table":{mon:"replication-peers"},
"Skip changes up to an LSN":{mon:"subscriptions"}
};
