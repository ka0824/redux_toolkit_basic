import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./slice/infoSlice";

// configureStore 함수 사용
// devTools 따로 설치하지 않고 설정만 해도 사용 가능
const store = configureStore({
  // 생성한 reducer 등록
  reducer: {
    info: infoReducer,
  },
  // 개발자 도구 사용 설정 ON
  devTools: true,
});

export default store;
