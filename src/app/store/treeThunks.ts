import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerError } from '../../types/Error';

import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API;

const treeName: string = import.meta.env.VITE_ROOT_TREE_ID;

export const fetchTree = createAsyncThunk(
    'tree/fetchTree',
    async (_, {rejectWithValue}) => {
      try {
        const response = await axios.post(`/api.user.tree.get`, null, {
          params: {
            treeName
          }
        });
        return response.data;
      } catch(error: unknown) {
        const err = error as ServerError
        return rejectWithValue(err.response.data.data.message || null)
      }
    }
);
  
export const addNode = createAsyncThunk(
  'tree/addNode',
  async ({ parentNodeId, nodeName, treeName }: { parentNodeId: number; nodeName: string; treeName: string }, {rejectWithValue}) => {
    try {
      await axios.post('/api.user.tree.node.create', null, {
        params: {
          parentNodeId,
          nodeName,
          treeName
        }
      });
      return treeName;
    } catch(error: unknown) {
      const err = error as ServerError
      return rejectWithValue(err.response.data.data.message || null)
    }
  }
);

export const deleteNode = createAsyncThunk(
    'tree/deleteNode',
    async ({ nodeId, treeName }: { nodeId: number; treeName: string }, {rejectWithValue}) => {
      try {
        await axios.post('/api.user.tree.node.delete', null, {
          params: {
            nodeId,
            treeName 
          }
        });
        return treeName;
      } catch(error: unknown) {
        const err = error as ServerError
        return rejectWithValue(err.response.data.data.message || null)
      }
    }
);

export const renameNode = createAsyncThunk(
    'tree/renameNode',
    async ({ nodeId, newNodeName, treeName }: { nodeId: number; newNodeName: string; treeName: string }, {rejectWithValue}) => {
      try {
        await axios.post('/api.user.tree.node.rename', null, {
          params: {
            nodeId,
            newNodeName,
            treeName,
          }
        });
        return treeName;
      } catch(error: unknown) {
        const err = error as ServerError
        return rejectWithValue(err.response.data || null)
      }
    }
);