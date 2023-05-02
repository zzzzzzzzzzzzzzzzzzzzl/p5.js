// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


let sampleData = {stats:false,mutate:false,enviroment:false,}

export const navSlice = createSlice({
  name: 'nav',
  initialState: sampleData,

  reducers: {
    changeDisplay: (state, action) => {
        let newObj={stats:false,mutate:false,enviroment:false}
        console.log(action.payload)
        newObj[action.payload]=true
      return newObj
    },
   
  },
})



export const navSelector = (state: RootState) => state.nav

export const {
  changeDisplay,
} = navSlice.actions
export default navSlice.reducer
