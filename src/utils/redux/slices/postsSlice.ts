import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Article} from '../../types/types';

interface PostsState {
  posts: Article[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Article[]>) {
      state.posts = action.payload;
    },
  },
});

export const {setPosts} = postsSlice.actions;

export default postsSlice.reducer;
