import Feed from "./components/Feed";
import NewPost from "./components/NewPost";

export default function Home() {
  return (
    <div className="bg-gray-100  p-5 h-[calc(100vh-74.29px)] overflow-y-auto">
      <NewPost />
      <Feed />
    </div>
  );
}
