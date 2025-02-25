import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreeState } from '../../types/Tree';
import { fetchTree } from './treeThunks';
import { enableMapSet } from 'immer';

enableMapSet();

const initialState: TreeState = {
  data: null,
  status: 'loading',
  error: null,
  expandedNodes: new Set(),
  activeNode: null
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setActiveNode: (state, action: PayloadAction<number | null>) => {
      state.activeNode = action.payload;
    },
    setExpandedNodes: (state, action: PayloadAction<number>) => {
      const nodeId = action.payload;
      if (state.expandedNodes.has(nodeId)) {
        state.expandedNodes.delete(nodeId);
      } else {
        state.expandedNodes.add(nodeId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTree.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTree.rejected, (state) => {        
        state.status = 'failed';
        state.error = 'Failed to fetch tree';
      });
  },
});

export const { setActiveNode } = treeSlice.actions;
export const { setExpandedNodes } = treeSlice.actions;

export default treeSlice.reducer;