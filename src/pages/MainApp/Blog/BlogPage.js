import { MDEditor } from '../../../components/Blog/Editor/mdeditor';
import { useParams } from "react-router-dom";
import { useDocListener, updateDoc } from '../../../hooks/firestore';

export default function BlogPage(){
    let { postId } = useParams();

    const { loaded, body } = useDocListener(`blogs/${postId}`)
    
    return <div className="p-6">
        {loaded && <MDEditor defaultValue={body} readOnly={true}/>}
    </div>
}