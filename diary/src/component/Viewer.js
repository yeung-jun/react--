import "./Viewer.css";
import { emotionList } from "../uti";

const Viewer = ({content, emotionId}) => {
    const emotionItem = emotionList.find((it) => it.id === emotionId);
    console.log(emotionId);
    return (
        <div className="Viewer">
            <section>
                <h4>오늘의 감정</h4>
                <div className={['emotion_img_wrapper',`emotion_img_wrapper_${emotionId}`].join(" ")}>
                    <img alt={emotionId} src={emotionItem.img} />
                    <div className="emotion_descript">{emotionItem.name}</div>
                </div>
            </section>
        </div>
    )
}
export default Viewer;