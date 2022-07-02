import { useEffect } from "react";

export default function NotFoundPage() {

useEffect(() => {
    document.title = "404 NOT FOUND";
})


    return <div>404 Not Found</div>;
}