import { useEffect, useState } from "react";
import { PostModel } from "../../src/models/api/postModel"
import { Link } from "react-router-dom";
import { Page } from "../../src/models/api/page"
import "./Posts.scss"


export function Posts() {
    const [myData, setMyData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:3001/posts/?page=${currentPage}&pageSize=10`)
            .then(response => response.json())
            .then(data => setMyData(data.results))
    }, [currentPage]);

    return (
        <div>
            <h2>All Posts</h2>
            <div className="posts-wrapper">
                {myData.map((post: PostModel) => {
                    return (
                        <div >
                            <ul className="posts" >
                                <li key={post.id} className="posts-item">
                        
                                        <img src={post.imageUrl}
                                            alt="This is a post image"
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = "https://cdn-multicoat-com.sfo2.digitaloceanspaces.com/wp-content/uploads/2018/08/02232112/placeholder.jpg";
                                            }} />
                                        <div>{post.createdAt.toLocaleString()}</div>
                                        <div>{post.message}</div>
                                  
                                </li>
                            </ul>

                        </div>
                    )

                })}</div>

            {/* interesting bug: if not currentPage +1, the first time we click next, the url will -1 */}
            <Link to={`/posts/?page=${currentPage + 1}&pageSize=10`}
                onClick={() => (setCurrentPage(currentPage + 1))}>
                Next
            </Link>
            {/* add a condition to check for currentPage value before clicking previous */}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={`/posts/?page=${currentPage - 1}&pageSize=10`}
                onClick={() => (currentPage > 1 ? setCurrentPage(currentPage - 1) : currentPage)}>
                Previous
            </Link>
        </div>
    )

}

