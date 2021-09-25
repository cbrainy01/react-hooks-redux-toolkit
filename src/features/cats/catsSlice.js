import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action Creators

// async actions
// export function fetchCats() {
//   return function (dispatch) {
//     dispatch({ type: "cats/fetchCats/pending" });
//     fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch({
//           type: "cats/fetchCats/fulfilled",
//           payload: data.images,
//         });
//       });
//   };
// }

export const fetchCats = createAsyncThunk("cats/fetchCats", () => {

  return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
  .then( (response) => response.json() )
  .then( (rData) => rData.images )
})

// Reducer
const initialState = {
  entities: [], // array of cats
  status: "idle", // loading state
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    catAdded(state, action) {
      state.entities.push(action.payload)
    },
    catUpdated(state, action) {
      const cat = state.entities.find( (cat) => action.payload.id )
      cat.url = action.payload.url;
    },
  },
   // handle async actions: pending, fulfilled, rejected (for errors)
  extraReducers: {
    [fetchCats.pending](state) {state.status = "loading"},
    [fetchCats.fulfilled](state, action) {
      state.status = "idle",
      state.entities = action.payload;
    },
  }

})
// sync actions added for demo purposes
// export function catAdded(newCat) {
//   return {
//     type: "cats/catAdded",
//     payload: newCat,
//   };
// }

// export function catUpdated(updatedCat) {
//   return {
//     type: "cats/catUpdated",
//     payload: updatedCat,
//   };
// }



// function catsReducer(state = initialState, action) {
//   switch (action.type) {
//     // sync actions
//     case "cats/catAdded":
//       return {
//         ...state,
//         entities: [...state.entities, action.payload],
//       };
//     case "cats/catUpdated":
//       return {
//         ...state,
//         entities: state.entities.map((cat) =>
//           cat.id === action.payload.id ? action.payload : cat
//         ),
//       };

//     // async actions
//     case "cats/fetchCats/pending":
//       return {
//         ...state,
//         status: "loading",
//       };
//     case "cats/fetchCats/fulfilled":
//       return {
//         ...state,
//         entities: action.payload,
//         status: "idle",
//       };

//     default:
//       return state;
//   }
// }
export const { catAdded, catUpdated } = catsSlice.actions
export default catsSlice.reducer;
