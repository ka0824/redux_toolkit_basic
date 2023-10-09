## redux toolkit으로 전역 상태 관리하기

<br />

>  **목차**
> 
> [1\. redux toolkit이란?](#a1)
> 
> [2\. toolkit을 사용하면 뭐가 달라지나요?](#a2)
> 
> [3\. 구현 코드](#a3)

<br />
<hr />
<br />

### **1\. redux toolkit이란?**

-   redux를 더 쉽게 사용하고 관리할 수 있게 도와주는 **공식 라이브러리**
-   즉, redux를 좀 더 쉽게 사용하기 위한 라이브러리

<br />
<hr />
<br />

### **2\. toolkit을 사용하면 뭐가 달라지나요?**

-   코드 간소화
    -   기존 redux는 boilertemplate(기본 코드)가 너무 길다는 단점이 있었음
    -   toolkit을 통해 코드를 간략화 할 수 있음

-   불변성 관리
    -   기존 redux에서는 상태 관리 로직에서 불변성 관리가 되지 않아, 기존 값을 따로 복사해야 했음
    -   ex) { ...state, name: 홍길동 }
    -   toolkit을 사용할 시 불변성 유지가 되기 때문에, 변경하고 싶은 값만 변경하면 됨
    -   ex) state.name = "홍길동"

-   개발자 도구 적용 간편
    -   toolkit은 redux-devtools를 따로 설치하지 않고, 설정만 해도 적용

<br />
<hr />
<br />

### **3\. 구현 코드**

-   slice 생성
    -   slice는 reducer와 action을 동시에 관리함
    -   초기 상태 값 설정
    -   slice 내부에 action 생성 (state의 변경 시키고 싶은 값만 수정)
    -   slice를 통해 생성된 action 내보내기

```
// store/slice/infoSlice.js

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
```

-   store 생성
    -   configure 함수 사용
    -   reducer 등록
    -   개발자 도구 사용 설정

```
// store/store.js

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
```

-   가장 상위 컴포넌트에 store 등록

```
// main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 작성한 store 적용 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

-   redux 사용하기
    -   state 불러오기
    -   dispatch 사용하기
    -   dispatch를 통해 action을 store로 전달

```
// App.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAge, changeName } from "./store/slice/infoSlice";

function App() {
  // store의 state 불러오기
  const info = useSelector((state) => state.info);
  // dispatch 사용하기
  const dispatch = useDispatch();

  const [name, setName] = useState("홍길동");
  const [age, setAge] = useState(20);

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputAge = (e) => {
    setAge(e.target.value);
  };

  // dispatch를 통해 action을 store로 전달
  const submitName = () => {
    dispatch(changeName(name));
  };

  const submitAge = () => {
    dispatch(changeAge(age));
  };

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <div>{`현재 이름은 ${info.name} 입니다.`}</div>
      <div>{`현재 나이는 ${info.age}세 입니다.`}</div>
      <div>
        <label>
          이름
          <input onChange={handleInputName}></input>
          <button onClick={submitName}>이름 변경</button>
        </label>
      </div>
      <div>
        <label>
          나이
          <input type="number" onChange={handleInputAge}></input>
          <button onClick={submitAge}>나이 변경</button>
        </label>
      </div>
    </div>
  );
}

export default App;
```
