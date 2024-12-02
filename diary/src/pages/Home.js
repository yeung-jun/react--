import Button from "../component/Button";
import Header from "../component/Header"
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate} from"../uti";
import DiaryList from "../component/DiaryList";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivoDate, setPivoDate] =useState(new Date());
    const [filterData, setFilterData] = useState([]);
    const onIN = () => {
        setPivoDate(new Date(pivoDate.getFullYear(),pivoDate.getMonth() +1,));
    }
    const onDe = () => {
        setPivoDate(new Date(pivoDate.getFullYear(),pivoDate.getMonth() -1,));
    }
    const headerTitle = `${pivoDate.getFullYear()}년 ${pivoDate.getMonth()+1}월`
    useEffect(() => {
        if(Date.length >= 1) {
            const {beginTimeStamp,endTimeStamp} = getMonthRangeByDate(pivoDate);
            setFilterData(
                data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp)
            )
        } else {
            setFilterData([]);
        }
    },[data,pivoDate]);
    return (
    <div>
        <Header title={headerTitle} leftChild={<Button text={"<"} onClick={onDe} />} rightChild={<Button text={">"} onClick={onIN} />}/>
        <DiaryList data={filterData} />
    </div>
    )
}

export default Home;