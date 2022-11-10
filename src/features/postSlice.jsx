import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../api/axiosFetch';

const initialState = {
   loading: false,
   data: [],
   errors: '',
}

export const getPost = createAsyncThunk('getPosts/posts', async(id) => {
   return getPosts(`/timeline/${id}`)
            .then(res => res?.data.map(post => post))
            .catch(err => err)
}) 

const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers:{},
   extraReducers: (builder) => {
      builder.addCase(getPost.pending, (state) => {
         state.loading = true
      }),
      builder.addCase(getPost.fulfilled, (state, action) => {
         state.loading = false,
         state.data = action.payload
      }),
      builder.addCase(getPost.rejected, (state, action) => {
         state.loading = false,
         state.data = [],
         state.errors = action.payload
      })
   }
})

export const getAllPosts = state => state.post
export default postSlice.reducer