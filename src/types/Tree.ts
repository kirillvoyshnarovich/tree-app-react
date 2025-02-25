export interface TreeNode {
  id: number;
  name: string;
  children: TreeNode[];
}

export interface TreeState {
  data: TreeNode | null;
  status: 'loading' | 'failed' | 'succeeded';
  error: string | null;
  expandedNodes: Set<number>;
  activeNode: number | null
}

export interface TreeProps {
  node: {
    id: number;
    name: string;
    children: TreeProps['node'][];
  };
}