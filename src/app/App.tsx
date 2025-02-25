import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTree } from './store/treeThunks';
import { RootState, AppDispatch } from './store/store';
import Tree from '../components/Tree/tree';
import './App.css';

export default function App() {
  const tree = useSelector((state: RootState) => state.tree.data);
  const status = useSelector((state: RootState) => state.tree.status);
  const error = useSelector((state: RootState) => state.tree.error);

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchTree());
  }, [dispatch]);

  if (!tree) {
    return <div>No tree data</div>;
  }

  return (
    <>
      {status === 'failed' && error ? <div className='error'>Error: {error}</div> : ''}
      <div className="tree-wrapper">
        <Tree node={tree} />
      </div>
    </>
  );
}