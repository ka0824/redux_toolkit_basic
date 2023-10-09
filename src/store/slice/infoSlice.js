import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 값 설정
const initialState = { name: "홍길동", age: 20 };

// slice를 통해 action 생성
const infoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // 액션 생성
    // state의 변경 시키고 싶은 값만 수정
    changeName: (state, action) => {
      state.name = action.payload;
    },

    changeAge: (state, action) => {
      state.age = action.payload;
    },
  },
});

// reducer에 생성한 action export
export const { changeName, changeAge } = infoSlice.actions;
export default infoSlice.reducer;
