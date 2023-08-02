import Feed from "./components/Feed";
import NewPost from "./components/NewPost";

export default function Home() {
  return (
    <div className="bg-gray-100  p-5 min-h-[calc(100vh-88.78px)]">
      <NewPost />
      <Feed />
    </div>
  );
}
