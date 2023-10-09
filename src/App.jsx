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
