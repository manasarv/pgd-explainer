/* Section: PGD4K (PGD on Kubernetes) — edit this file to change ONLY this section.
   Kept as its own standalone chapter (not folded into Troubleshooting) since
   Kubernetes deployment is a distinct enough topic to grow on its own. */
window.PGD_GROUPS = window.PGD_GROUPS || [];
window.PGD_GROUPS.push(
  { label:'PGD4K — PGD on Kubernetes', badge:'PGD4K', steps:[
    {t:'PGD on Kubernetes (PGD4K)', tag:'new', chap:'PGD4K — PGD on Kubernetes', sc:s_pgdkubernetes, rv:['map','wrong','right','n'], fl:[],
      an:'Each room in the clubhouse network happens to live inside its own shipping container. Ripping out a container doesn\'t un-invite that room from the meeting — you have to tell the group first.',
      re:'<b>PGD4K</b> is PGD on Kubernetes. Each PGD data node maps to one Kubernetes <b>pod</b> and its <b>PVC</b> — what CloudNativePG calls a <b>Global Cluster</b>. Deleting the pod/PVC directly <b>isn\'t enough</b>: the mesh and Raft still expect that node. The right order is <code>pgd node part</code>, then <code>pgd node drop</code>, and only then delete the Kubernetes resources. <i>More details on PGD4K will be added soon.</i>',
      nr:'PGD4K is PGD on Kubernetes. Each PGD data node maps to one Kubernetes pod and its persistent volume claim, what CloudNativePG calls a Global Cluster. Deleting the pod and volume claim directly isn\'t enough, because the mesh and Raft still expect that node to exist. The correct order is to part and drop the node in PGD first, and only then delete its Kubernetes resources. More details on PGD4K will be added soon.',
      hb:'CloudNativePG PGD Global Cluster docs · pgd node part / drop reference · more to come',
      bv:[['bdr.node_summary','node_state should show "parted" before its pod is deleted'],['bdr.node_group_summary','confirms the node no longer counts toward group topology after drop']]},
  ]}
);
