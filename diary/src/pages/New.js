import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext, useEffect } from "react";
import {DiaryDispatchContext} from "../App";
import { setPageTitle } from"../uti";
const New = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const {onCreate} = useContext(DiaryDispatchContext);
    const onSubmit = (data) => {
        const{date, content, emotionId } = data;
        onCreate(date,content,emotionId);
        navigate('/',{replace:true}); 
    }
    useEffect(()=>{
        setPageTitle('Y-JUN 새 일기 쓰기')
    },[]);
    return (
        <div>
            <Header title={'무슨 일이 있었나요?'} leftChild={'< 뒤로가기'} onClick={goBack} />
            <Editor onSubmit={onSubmit} />
        </div>
    )
}
export default New;