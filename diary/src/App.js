import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import React, { useReducer, useRef, useEffect, useState } from 'react';

const mockDate = [
  { id: 'mock1', date: new Date('2024/07/19').getTime(), content: '이젠 아카데미 상담', emotionId: 1 },
  { id: 'mock2', date: new Date('2024/10/19').getTime(), content: '가짜 결혼일', emotionId: 1 },
  { id: 'mock3', date: new Date('2024/12/07').getTime(), content: '백수 됐어요 하하', emotionId: 5 },
  { id: 'mock4', date: new Date('2024/12/02').getTime(), content: '이번주가 학원 마지막이에요', emotionId: 1 },
  { id: 'mock5', date: new Date('2024/12/04').getTime(), content: '민근이형이 밥사줬어요', emotionId: 2 },
  { id: 'mock6', date: new Date('2024/12/05').getTime(), content: '동휘가 말을 너무 안들어요 !', emotionId: 3 },
  { id: 'mock7', date: new Date('2024/12/06').getTime(), content: '오늘은 학원 마지막 날이에요', emotionId: 4 },
  { id: 'mock8', date: new Date('2024/11/11').getTime(), content: '난 빼빼로 같은거 안좋아해', emotionId: 3 },
]
function reducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newState = [action.data, ...state];
      localStorage.setItem('diary',JSON.stringify(newState));
      return newState;
    }
    case 'UPDATE': {
      const newState = state.map((it) => String(it.id) === String(action.data.id) ? { ...action.data } : it);
      localStorage.setItem('diary',JSON.stringify(newState));
      return newState;
    }
    case 'DELETE': {
      const newState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem('diary',JSON.stringify(newState));
      return newState;
    }
    default: return state;
  }

}
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    })
    idRef.current += 1;
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    })
  }
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  }
  useEffect(() => {
    const rawData = localStorage.getItem('diary');
    if(!rawData) {
      localStorage.setItem('diary',JSON.stringify(mockDate))
      dispatch({
        type: 'INIT',
        data: mockDate,
      })
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if(localData.length === 0) {
      return;
    }
    localData.sort((a,b)=>Number(b.id)-Number(a.id));
    idRef.current = localData[0].id+1;
    dispatch({
      type: 'INIT',
      data: localData,
    })
    setIsDataLoaded(true);
  }, []);

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/edit/:id' element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    )
  }

}

export default App;
