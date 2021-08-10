import { MDEditor } from '../../../components/Blog/Editor/mdeditor';
import { useParams } from "react-router-dom";
import { useDocListener, updateDoc } from '../../../hooks/firestore';
import {Helmet} from "react-helmet";

export default function BlogPage(){
    let { postId } = useParams();

    const { loaded, body } = useDocListener(`blogs/${postId}`)
    
    return <div className="p-6">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Blog | Speer Education</title>
        </Helmet>
        {loaded && <MDEditor defaultValue={body} readOnly={true}/>}
    </div>
}