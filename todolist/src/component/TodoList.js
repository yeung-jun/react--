import { useMemo, useState, useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoStateContext } from "../App";
import "./TodoList.css";

const TodoList = ({dTodo = []}) => {
    const todo = useContext(TodoStateContext) || aTodo;
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === "" ? todo : todo.filter((it) => (it.content.toLowerCase().includes(search.toLowerCase())))
    };
    const anTodo = useMemo(() => {
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo])
    const { totalCount, doneCount, notDoneCount } = anTodo;
    return (
        <div className="TodoList">
            <h4>Todo List ⚽</h4>
            <div>
                <div>총 개수 : {totalCount}</div>
                <div>완료한 일 개수 : {doneCount}</div>
                <div>아직 완료하지 못한 할일 개수 : {notDoneCount}</div>
            </div>
            <input className="searchbar" placeholder="검색어를 입력하세요" value={search} onChange={onChangeSearch} />
            <div className="list_wraper">
                {getSearchResult().map((it) => (<TodoItem {...it} key={it.id} />))}
            </div>
        </div>
    );
};

export default TodoList;