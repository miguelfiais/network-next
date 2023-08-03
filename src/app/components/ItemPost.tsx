import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import NewComment from "./NewComment";

interface ItemPostProps {
  data: {
    User: {
      name: string | null;
      image: string | null;
    };
    id: string;
    content: string;
    created_at: Date;
  };
}

const ItemPost = ({ data }: ItemPostProps) => {
  return (
    <div className="p-5 bg-white shadow-md rounded-lg mt-5">
      <div className="flex items-center gap-3">
        <Image
          src={data.User.image!}
          alt={data.User.name!}
          width={36}
          height={36}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium">{data.User.name}</p>
          <p className="text-xs text-gray-400 capitalize">
            {format(data.created_at, "dd MMMM HH:mm", { locale: ptBR })}
          </p>
        </div>
      </div>
      <div className="div">
        <p className="mt-3">{data.content}</p>
      </div>
      <div className="border-b my-3"></div>
      <NewComment postId={data.id} />
    </div>
  );
};

export default ItemPost;
