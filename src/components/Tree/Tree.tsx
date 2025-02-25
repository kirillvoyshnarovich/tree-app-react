import { useState, memo, useCallback } from 'react';
import AddNodeDialog from '../AddNodeDialog';
import RenameNodeDialog from '../RenameNodeDialog';
import DeleteNodeDialog from '../DeleteNodeDialog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { TreeProps } from '../../types/Tree';
import { fetchTree, addNode, deleteNode, renameNode } from '../../app/store/treeThunks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store/store';
import { setExpandedNodes, setActiveNode } from '../../app/store/treeSlice';
import './Tree.css';

const treeName: string = import.meta.env.VITE_ROOT_TREE_ID;

const Tree = ({ node }: TreeProps) => {
  const expandedNodes = useSelector((state: RootState) => state.tree.expandedNodes);
  const activeNodeId = useSelector((state: RootState) => state.tree.activeNode);

  const [showButtons, setShowButtons] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isExpanded = expandedNodes.has(node.id);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = useCallback(async (nodeName: string) => {
    await dispatch(addNode({ parentNodeId: node.id, nodeName, treeName })).unwrap();
    await dispatch(fetchTree()).unwrap();
    setIsAddDialogOpen(true);
  }, [dispatch, node.id]);

  const handleDelete = useCallback(async () => {
    await dispatch(deleteNode({ nodeId: node.id, treeName })).unwrap();
    await dispatch(fetchTree()).unwrap();
    setIsDeleteDialogOpen(true);
  }, [dispatch, node.id]);

  const handleRename = useCallback(async (newNodeName: string) => {
    await dispatch(renameNode({ nodeId: node.id, newNodeName, treeName })).unwrap();
    await dispatch(fetchTree()).unwrap();
    setIsRenameDialogOpen(true);
  }, [dispatch, node.id]);

  const handleToggle = () => {
    setShowButtons(!showButtons);
    dispatch(setExpandedNodes(node.id));
    dispatch(setActiveNode(node.id));
  };

  const isActive = activeNodeId === node.id;

  return (
    <div className="tree-wrapper">
      <div
        className="tree-item"
        style={{
          backgroundColor: isActive ? '#e3f2fd' : 'transparent',
        }}
        onClick={() => handleToggle()}
      >
        <span className="tree-item__expand-control">
          {<ArrowForwardIosIcon sx={{ fontSize: 15 }} style={isExpanded ? {transform: 'rotate(90deg)'} : {}} />}
        </span>

        <span className="tree-item__name">
          {node.name}
        </span>
        {showButtons && (
          <>
            <IconButton onClick={() => setIsAddDialogOpen(true)}><AddCircleOutlineIcon sx={{ fontSize: 18, color: '#3f51b5' }}/></IconButton>
            <IconButton onClick={() => setIsRenameDialogOpen(true)}><EditIcon sx={{ fontSize: 18, color: '#3f51b5' }}/></IconButton>
            <IconButton onClick={() => setIsDeleteDialogOpen(true)}><DeleteForeverIcon sx={{ fontSize: 18, color: '#f50057' }}/></IconButton>
          </>
        )}
      </div>

      {isExpanded && node.children.map((child) => (
        <Tree
          key={child.id}
          node={child}
        />
      ))}

      <AddNodeDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAdd}
      />

      <RenameNodeDialog
        open={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        onSave={handleRename}
        currentName={node.name}
      />

      <DeleteNodeDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        name={node.name}
      />
    </div>
  );
}

export default memo(Tree)