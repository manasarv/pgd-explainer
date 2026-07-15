/* ============================================================
   PGD catalog-view reference  (window.PGD_VIEWS)
   ------------------------------------------------------------
   IMPORTANT — sourcing rules:
   • `ddl` is the literal CREATE VIEW definition. The reference
     runbooks/guide (pgd_guide) contain NO CREATE VIEW DDL for any
     bdr.* catalog view, so `ddl` is null for every entry. The UI
     therefore reports "DDL not available" rather than inventing one.
   • `cols`, `desc` and `examples` are copied verbatim from the
     pgd_guide pages (views.html / views2.html) and runbooks. They
     are NOT assumptions.
   • Where a chip name is not a documented view in the guide, the
     entry carries `documented:false` and a factual `note` only.
   To extend: add documented columns/examples only if you can cite
   them from the source material.
   ============================================================ */
window.PGD_VIEWS = {

/* ---------- Topology / nodes (views.html) ---------- */
"bdr.node":{documented:true,src:"pgd_guide · views.html (Topology / nodes)",
  desc:"Lists every PGD node in the cluster (one row per node).",
  cols:"node_id, node_name, node_group_id, node_state (consistent state), target_state, seq_id, dbname, node_dsn, node_kind, node_join_finished, node_uuid",
  examples:["SELECT * FROM bdr.node;"]},
"bdr.node_summary":{documented:true,src:"pgd_guide · views.html (Topology / nodes)",
  desc:"Human-readable summary of all nodes known to the local node. Preferred over bdr.node for everyday inspection; first stop to confirm all nodes are present and in the expected state.",
  cols:"node_name, node_group_name, interface_connstr, peer_state_name, peer_target_state_name, node_seq_id, node_local_dbname, node_id, node_group_id, node_kind_name, node_uuid",
  examples:["SELECT node_name, peer_state_name, node_kind_name FROM bdr.node_summary;"]},
"bdr.local_node_summary":{documented:true,src:"pgd_guide · views.html (Topology / nodes)",
  desc:"Same information as bdr.node_summary but only for the local node, plus the publication/subscription repset lists.",
  cols:"same columns as bdr.node_summary, plus pub_repsets, sub_repsets",
  examples:["SELECT node_name, node_group_name FROM bdr.local_node_summary;"]},
"bdr.node_group":{documented:true,src:"pgd_guide · views.html (Topology / nodes)",
  desc:"Catalog of all PGD node groups.",
  cols:"node_group_id, node_group_name, node_group_parent_id (0 = root), node_group_default_repset, node_group_default_commit_scope, node_group_location, node_group_enable_routing, node_group_enable_raft, node_group_num_writers, node_group_streaming_mode",
  examples:["SELECT * FROM bdr.node_group;"]},
"bdr.node_group_summary":{documented:true,src:"pgd_guide · views.html (Topology / nodes)",
  desc:"Human-readable node-group details (group type, routing/Raft flags, lag thresholds).",
  cols:"node_group_name, parent_group_name, node_group_type (global/data/shard/subscriber-only), default_repset, default_commit_scope, location, enable_routing, enable_raft, route_writer_max_lag, route_reader_max_lag, server_pool_mode, num_writers, streaming_mode",
  examples:["SELECT node_group_name, node_group_type, enable_routing, enable_raft FROM bdr.node_group_summary;"]},

/* ---------- Replication lag & slots (views.html) ---------- */
"bdr.node_slots":{documented:true,src:"pgd_guide · views.html (Replication lag & slots)",
  desc:"Per-replication-slot info for slots PGD uses in the current database — the primary view for diagnosing outgoing replication and lag. Note: replay_lag resets to zero immediately after reconnect, so prefer replay_lag_bytes / replay_lag_size.",
  cols:"origin_name, target_name, slot_name, active, active_pid, state (catchup/streaming/disconnected), restart_lsn, confirmed_flush_lsn, sent_lsn, write_lsn, flush_lsn, replay_lsn, write_lag, flush_lag, replay_lag, sent_lag_bytes / write_lag_bytes / flush_lag_bytes / replay_lag_bytes (and _size forms)",
  examples:["SELECT * FROM bdr.node_slots;","SELECT * FROM pg_replication_slots;"]},
"bdr.node_replication_rates":{documented:true,src:"pgd_guide · views.html (Replication lag & slots)",
  desc:"Outgoing replication activity / catch-up estimates per peer. Use apply_rate and catchup_interval to judge whether a lagging node will recover.",
  cols:"peer_node_id, target_name, sent_lsn, replay_lsn, replay_lag, replay_lag_bytes, replay_lag_size, apply_rate, catchup_interval",
  examples:["SELECT target_name, replay_lag_size, apply_rate, catchup_interval FROM bdr.node_replication_rates;"]},
"bdr.node_peer_progress":{documented:true,src:"pgd_guide · views.html (Replication lag & slots)",
  desc:"Raw per-node progress broadcast (every bdr.replay_progress_frequency ms, default 60s). Expect N*(N-1) rows. Docs recommend bdr.node_slots for normal monitoring instead.",
  cols:"node_id, peer_node_id, last_update_sent_time, last_update_recv_time, last_update_node_lsn, peer_position, peer_replay_time, plus internal horizon columns",
  examples:["SELECT * FROM bdr.node_peer_progress;"]},

/* ---------- Subscriptions & apply (views.html) ---------- */
"bdr.subscription_summary":{documented:true,src:"pgd_guide · views.html (Subscriptions & apply)",
  desc:"Summary of all subscriptions the local node has to other nodes — key for confirming inbound replication health.",
  cols:"node_group_name, sub_name, origin_name, target_name, sub_enabled, sub_slot_name, subscription_status, sub_apply_delay, receive_lsn, receive_commit_lsn, last_xact_replay_lsn, last_xact_flush_lsn, last_xact_replay_timestamp",
  examples:["SELECT * FROM bdr.subscription_summary;"]},
"bdr.stat_subscription":{documented:true,src:"pgd_guide · views.html (Subscriptions & apply)",
  desc:"Apply statistics per subscription (only populated when bdr.track_subscription_apply is on) — a rich troubleshooting view. Reset via bdr.reset_subscription_stats().",
  cols:"sub_name, mean_apply_time, nconnect, ncommit, nabort, nerror, nskippedtx, ninsert/nupdate/ndelete/ntruncate, nddl, ndeadlocks, nretries, nstream_*, connect_time, last_disconnect_time, start_lsn, retries_at_same_lsn (stuck-at-LSN indicator), nprovisional_waits, ntuple_waits, ncommit_waits, neager_lock_conflicts, neager_conflicts, stats_reset",
  examples:["SELECT sub_name, nerror, nskippedtx, retries_at_same_lsn FROM bdr.stat_subscription;"]},
"bdr.subscription_error_status":{documented:true,src:"pgd_guide · views.html (Subscriptions & apply)",
  desc:"Error policy config and error-counter state per subscription. Check this when a subscription is disabled. (New in PGD 6.)",
  cols:"sub_name, sub_enabled, disable_reason, effective_error_policy, max_retries, current_retries, max_skips, total_skips, pending_changes",
  examples:["SELECT sub_name, sub_enabled, disable_reason, pending_changes FROM bdr.subscription_error_status;"]},
"bdr.stat_relation":{documented:true,src:"pgd_guide · views.html (Subscriptions & apply)",
  desc:"Per-relation apply statistics (needs bdr.track_relation_apply). Reset via bdr.reset_relation_stats().",
  cols:"nspname, relname, relid, total_time, ninsert/nupdate/ndelete/ntruncate, shared-block counters, blk_read_time/blk_write_time, lock_acquire_time (needs bdr.track_apply_lock_timing), stats_reset",
  examples:["SELECT * FROM bdr.stat_relation;"]},

/* ---------- Workers & errors (views.html) ---------- */
"bdr.workers":{documented:true,src:"pgd_guide · views.html (Workers & errors)",
  desc:"Running PGD worker processes. Join to bdr.stat_activity on pid.",
  cols:"worker_pid, worker_role, worker_role_name, worker_subid",
  examples:["SELECT * FROM bdr.workers;"]},
"bdr.stat_worker":{documented:true,src:"pgd_guide · views.html (Workers & errors)",
  desc:"Summary + per-worker stats for PGD manager workers. Use to see what a worker is waiting on / who is blocking it.",
  cols:"worker_role, worker_pid, sub_name, worker_start, worker_xact_start, worker_xid, worker_xmin, worker_backend_state, wait_event_type, wait_event, blocked_by_pids, query, worker_query_start",
  examples:["SELECT worker_role, worker_pid, wait_event, blocked_by_pids FROM bdr.stat_worker;"]},
"bdr.writers":{documented:true,src:"pgd_guide · views.html (Workers & errors)",
  desc:"Per-writer-process detail.",
  cols:"sub_name, writer_nr, pid, syncing_rel, is_streaming, remote_xid, remote_commit_lsn, commit_queue_position, nxacts, ncommits, naborts, xact_nchanges, xact_origin_node_id, xact_origin_lsn, xact_origin_ts, xact_apply_source (replay/file/stream), xact_apply_progress, remote_change_lsn",
  examples:["SELECT sub_name, pid, is_streaming, xact_apply_source FROM bdr.writers;"]},
"bdr.worker_tasks":{documented:true,src:"pgd_guide · views.html (Workers & errors)",
  desc:"Worker launch rate-limiting state and background-worker launch/registration stats (covers all PGD nodes on the instance).",
  cols:"task_key_worker_role_name, datname, sub_name, task_pid, task_registered, since_registered",
  examples:["SELECT * FROM bdr.worker_tasks;"]},
"bdr.event_summary":{documented:true,src:"pgd_guide · views.html + views2.html",
  desc:"Internal (since PGD 5). Human-readable view of bdr.event_history — the unified cluster-event log that replaced the old bdr.worker_errors and bdr.state_journal_details views. Includes Raft role changes for the local node.",
  cols:"event_time; full set see EDB docs",
  examples:["SELECT * FROM bdr.event_summary ORDER BY event_time DESC LIMIT 5;"]},

/* ---------- Conflicts (views2.html) ---------- */
"bdr.conflict_history":{documented:true,src:"pgd_guide · views2.html (Conflicts)",
  desc:"Default table where conflicts are logged (RANGE-partitioned on local_time, 30-day retention by Autopartition; RLS-restricted to table owners).",
  cols:"sub_id, origin_node_id, local_xid, local_lsn, local_time, remote_xid, remote_commit_lsn, remote_commit_time, conflict_type, conflict_resolution, conflict_index, reloid, nspname, relname, and the JSON tuples key_tuple, remote_tuple, local_tuple, apply_tuple",
  examples:["SELECT * FROM bdr.conflict_history ORDER BY local_time DESC LIMIT 20;"]},
"bdr.conflict_history_summary":{documented:true,src:"pgd_guide · views2.html (Conflicts)",
  desc:"User-readable view over conflict history (no JSON tuples) — quick conflict triage.",
  cols:"nspname, relname, origin_node_id, remote_commit_lsn, local_time, local_tuple_commit_time, remote_commit_time, conflict_type, conflict_resolution",
  examples:["SELECT * FROM bdr.conflict_history_summary ORDER BY local_time DESC;"]},
"bdr.node_conflict_resolvers":{documented:true,src:"pgd_guide · views2.html (Conflicts)",
  desc:"Currently configured conflict resolution per conflict type.",
  cols:"conflict_type, conflict_resolver",
  examples:["SELECT * FROM bdr.node_conflict_resolvers;"]},

/* ---------- Global locks (views2.html) ---------- */
"bdr.global_locks":{documented:true,src:"pgd_guide · views2.html (Global locks)",
  desc:"Active global locks on this node (shared-memory lock state). Use when DDL appears to hang cluster-wide. If origin_node_* match the local node, this node is the initiator.",
  cols:"origin_node_id, origin_node_name, lock_type (DDL/DML), relation, pid, acquire_stage, waiters, global_lock_request_time, local_lock_request_time, last_state_change_time",
  examples:["SELECT origin_node_name, lock_type, relation, acquire_stage, waiters FROM bdr.global_locks;"]},

/* ---------- Raft & routing (views2.html) ---------- */
"bdr.group_raft_details":{documented:true,src:"pgd_guide · views2.html (Raft & routing)",
  desc:"Cluster-wide Raft status (runs bdr.run_on_all_nodes) — first view to check Raft health and who the leader is.",
  cols:"node_id, node_name, node_group_name, state, leader_id, current_term, commit_index, nodes, voting_nodes, protocol_version",
  examples:["SELECT * FROM bdr.group_raft_details ORDER BY 4, 3;"]},
"bdr.stat_raft_state":{documented:true,src:"pgd_guide · views2.html (Raft & routing)",
  desc:"Local-node Raft state. (New in PGD 5.)",
  cols:"group_name, raft_stat (LEADER/CANDIDATE/FOLLOWER/STOPPED), leader_name, voted_for_name, is_voting, heartbeat_timeout_ms, heartbeat_elapsed_ms, current_term, commit_index, apply_index, log indexes, snapshot info, nnodes, nvoting_nodes",
  examples:["SELECT group_name, raft_stat, leader_name, current_term FROM bdr.stat_raft_state;"]},
"bdr.stat_raft_followers_state":{documented:true,src:"pgd_guide · views2.html (Raft & routing)",
  desc:"On the Raft leader only: per-follower state (includes a clock-skew check). (New in PGD 5.)",
  cols:"group_name, node_name, sent_commit_index, match_index, last_message_time, last_heartbeat_send_time, last_heartbeat_response_time, approx_clock_drift_ms",
  examples:["SELECT node_name, match_index, approx_clock_drift_ms FROM bdr.stat_raft_followers_state;"]},
"bdr.stat_routing_state":{documented:true,src:"pgd_guide · views2.html (Raft & routing)",
  desc:"Connection-routing state used by Connection Manager — shows the current write leader and read targets. (New in PGD 5.)",
  cols:"node_group_name, write_lead_name, previous_write_lead_name, read_names[], write_candidate_names[], read_candidate_names[]",
  examples:["SELECT node_group_name, write_lead_name, read_names FROM bdr.stat_routing_state;"]},
"bdr.stat_routing_candidate_state":{documented:true,src:"pgd_guide · views2.html (Raft & routing)",
  desc:"On Raft leader only: candidate-node routing state.",
  cols:"node_group_name, node_name, node_route_fence, node_route_reads, node_route_writes, last_message_time",
  examples:["SELECT * FROM bdr.stat_routing_candidate_state;"]},
"bdr.node_config_summary":{documented:true,src:"pgd_guide · views2.html (Raft & routing)",
  desc:"Internal. Per-node routing configuration in readable form.",
  cols:"node_name, node_id, node_route_priority, node_route_fence, node_route_writes, node_route_reads, node_route_dsn",
  examples:["SELECT node_name, node_route_priority, node_route_writes, node_route_reads FROM bdr.node_config_summary;"]},

/* ---------- Connection Manager (views2.html, PGD 6) ---------- */
"bdr.stat_connection_manager":{documented:true,src:"pgd_guide · views2.html (Connection Manager)",
  desc:"Connection totals across read-write and read-only. (New in PGD 6.)",
  cols:"ntotal_rw_conns, ntotal_ro_conns, nactive_rw_conns, nactive_ro_conns",
  examples:["SELECT * FROM bdr.stat_connection_manager;"]},
"bdr.stat_connection_manager_connections":{documented:true,src:"pgd_guide · views2.html (Connection Manager)",
  desc:"Per-connection details.",
  cols:"connection_manager_client_addr/_port, connection_manager_addr/_port, session_read_only, client_uses_tls",
  examples:["SELECT * FROM bdr.stat_connection_manager_connections;"]},
"bdr.stat_connection_manager_node_stats":{documented:true,src:"pgd_guide · views2.html (Connection Manager)",
  desc:"Per-node routing & connection counts.",
  cols:"node_name, route_rw_connections, route_ro_connections, totals/active",
  examples:["SELECT * FROM bdr.stat_connection_manager_node_stats;"]},

/* ---------- Sequences & repsets (views2.html) ---------- */
"bdr.sequences":{documented:true,src:"pgd_guide · views2.html (Sequences) + v6 runbook 77",
  desc:"PGD-managed sequences and their kind.",
  cols:"nspname, relname, seqkind (local/timeshard/galloc/distributed)",
  examples:["SELECT * FROM bdr.sequences;","SHOW bdr.default_sequence_kind;"]},
"bdr.replication_sets":{documented:true,src:"pgd_guide · views2.html (Sequences)",
  desc:"Replication sets defined in the group. (bdr.replication_set is the underlying table.)",
  cols:"set_name, replicate_insert/update/delete/truncate, set_autoadd_tables, set_autoadd_seqs",
  examples:["SELECT * FROM bdr.replication_sets;"]},
"bdr.node_group_replication_sets":{documented:true,src:"pgd_guide · views2.html (Sequences)",
  desc:"Default replication sets per group.",
  cols:"see EDB docs",
  examples:["SELECT * FROM bdr.node_group_replication_sets;"]},

/* ---------- Stats (views2.html) ---------- */
"bdr.stat_activity":{documented:true,src:"pgd_guide · views2.html (Stats)",
  desc:"PGD-aware variant of pg_stat_activity. In PGD 6 it reports real client addr/port, a read-only flag, and better wait events.",
  cols:"see EDB docs (PGD-aware pg_stat_activity columns)",
  examples:["SELECT * FROM bdr.stat_activity;"]},

/* ---------- Commit scopes (catalog; example output in runbook 93) ---------- */
"bdr.commit_scopes":{documented:true,src:"pgd_guide · v6 runbook 93 (example output); listed as a catalog from PGD 4",
  desc:"Catalog of defined commit scopes. (The commit_scopes catalog exists from PGD 4; per-scope stat views bdr.stat_commit_scope / bdr.stat_commit_scope_state were added in PGD 5.)",
  cols:"commit_scope_id, commit_scope_name, commit_scope_origin_node_group, commit_scope_rule",
  examples:["SELECT * FROM bdr.commit_scopes;"]},

/* ============================================================
   Chip names below are NOT documented as catalog views in the
   v4–6 reference pages of pgd_guide. No columns/DDL are shown
   (nothing assumed); a factual pointer is given where the guide
   names a documented equivalent.
   ============================================================ */
"bdr.commit_scope_stats":{documented:false,
  note:"Not a documented view name in this guide. The PGD 5+ per-scope statistic view is documented as bdr.stat_commit_scope (with bdr.stat_commit_scope_state). Verify the exact name against the EDB PGD reference for your version."},
"bdr.commit_scope_status":{documented:false,
  note:"Not documented as a catalog view in the v4–6 pages of this guide. Commit-scope state is exposed via the PGD 5+ stat views (bdr.stat_commit_scope / bdr.stat_commit_scope_state). Verify against EDB docs."},
"bdr.connection_manager_stats":{documented:false,
  note:"Not the documented name. PGD 6 Connection Manager statistics are documented as bdr.stat_connection_manager (plus _connections, _node_stats, _hba_file_rules)."},
"bdr.conflict_resolution":{documented:false,
  note:"Not a documented view name here. Configured resolvers per conflict type are documented as bdr.node_conflict_resolvers; logged conflicts are in bdr.conflict_history / bdr.conflict_history_summary."},
"bdr.conflict_log_config":{documented:false,
  note:"Not documented as a catalog view in this guide. Conflict logging is configured via functions/settings; recorded conflicts appear in bdr.conflict_history. Verify against EDB docs."},
"bdr.raft_instances":{documented:false,
  note:"Not a documented view name in this guide. Raft state is documented as bdr.group_raft_details (cluster-wide), bdr.stat_raft_state (local) and bdr.stat_raft_followers_state (leader)."},
"bdr.lag_control":{documented:false,
  note:"Not documented as a catalog view in this guide. Replication-lag control is a commit-scope / GUC feature; observe lag via bdr.node_replication_rates and bdr.node_slots."},
"bdr.lag_history":{documented:false,
  note:"Not documented as a catalog view in the v4–6 pages of this guide. Observe current lag via bdr.node_replication_rates / bdr.node_slots. Verify any lag-history view name against EDB docs for your version."},
"bdr.node_config":{documented:false,
  note:"Not documented here. Per-node routing configuration is documented as bdr.node_config_summary."},
"bdr.node_catchup_info":{documented:false,
  note:"Not documented as a catalog view in this guide. Track join/catch-up via bdr.node_summary (node states) and bdr.node_slots / bdr.node_replication_rates. Verify against EDB docs."},
"bdr.state_journal_details":{documented:false,
  note:"Legacy internal view. The version matrix in this guide marks state_journal* as present in 3.7/4 but REMOVED from PGD 5/6 — replaced by the unified bdr.event_summary / bdr.event_history."},
"bdr.taskmgr_work_queue":{documented:false,
  note:"Referenced by the guide as part of the task manager: the old autopartition_* views were RENAMED to taskmgr_* (e.g. taskmgr_work_queue) in PGD 5/6. Full column set not enumerated in this guide — verify against EDB docs."},
"bdr.taskmgr_local_work_queue":{documented:false,
  note:"Part of the PGD 5/6 task manager (renamed from autopartition_*). Full column set not enumerated in this guide — verify against EDB docs."},
"bdr.camo_partners":{documented:false,
  note:"Not documented under this exact name. The guide notes bdr.camo_pairs existed only in PGD 4; from PGD 5/6 CAMO configuration moved into commit scopes (see bdr.commit_scopes)."},
"bdr.monitor_camo_on_all_nodes":{documented:false,
  note:"Not documented as a catalog view in this guide (appears to be a monitoring helper). CAMO in PGD 6 is configured via commit scopes; verify the exact monitoring name against EDB docs."},
"bdr.crdt_sequence":{documented:false,
  note:"Not documented as a catalog view in this guide. CRDT-backed sequences appear in bdr.sequences (seqkind). Verify any CRDT-specific view against EDB docs."},
"bdr.ddl_replication":{documented:false,
  note:"This is a session/GUC setting (e.g. SET bdr.ddl_replication = off), not a catalog view. Replicated DDL history is not exposed as a documented view in this guide."},
"bdr.schema_changes":{documented:false,
  note:"Not documented as a catalog view in the v4–6 pages of this guide. Verify the exact name against the EDB PGD reference for your version."},
"bdr.replication_origin_status":{documented:false,
  note:"Not documented as a bdr.* view in this guide (PostgreSQL exposes pg_replication_origin_status). Verify against EDB / PostgreSQL docs."},
"bdr.tables":{documented:false,
  note:"Catalog of tables PGD manages and their replication-set membership/row-filters. Full column set is not enumerated in the catalog-view pages of this guide — verify against the EDB PGD reference."},
"bdr.sequence_kind":{documented:false,
  note:"Appears in v6 runbook 77 alongside bdr.sequences. Full column set is not enumerated in this guide — use bdr.sequences (seqkind) for the documented mapping."},
"bdr.version":{documented:false,
  note:"Reports the installed extension version (typically SELECT bdr.version();) — it is a function, not a documented catalog view, in this guide."}
};
