import { FC } from "react";
import Zoom from '@mui/material/Zoom';
import BlogShowcase from "../../../components/Dashboard/BlogShowcase";

const Blogs: FC = () => {
    return <Zoom in>
        <div className="px-2 space-y-2">
            <p className="font-semibold text-lg pl-3 pt-3">Our Blogs</p>
            <BlogShowcase/>
        </div>
    </Zoom>
}

export default Blogs;