import {useReducer} from 'react';
function reducer(state,action){
    switch (action.type){
        case 'In': return state + action.data;
        case 'De': return state - action.data;
        case 'INIT': return 0;
        default: return state;
    }
}
function Testcomp(){
    const [count,dispatch] = useReducer(reducer,0);
    return(
        <div>
            <h4>테스트 컴포넌트</h4>
            <div>
                <b>{count}</b>
            </div>
            <div>
                <button onClick={()=>dispatch({type: 'In',data: 1})}>+</button>
                <button onClick={()=>dispatch({type: 'De',data: 1})}>-</button>
                <button onClick={()=>dispatch({type: 'INIT'})}>0으로 초기화</button>
            </div>
        </div>
    );
}

export default Testcomp;