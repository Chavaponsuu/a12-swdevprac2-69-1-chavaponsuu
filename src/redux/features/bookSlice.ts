import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const existingIndex = state.bookItems.findIndex(
        (booking) =>
          booking.venue === action.payload.venue &&
          booking.bookDate === action.payload.bookDate,
      );

      if (existingIndex === -1) {
        state.bookItems.push(action.payload);
      } else {
        state.bookItems[existingIndex] = action.payload;
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(
        (booking) =>
          !(
            booking.nameLastname === action.payload.nameLastname &&
            booking.tel === action.payload.tel &&
            booking.venue === action.payload.venue &&
            booking.bookDate === action.payload.bookDate
          ),
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
