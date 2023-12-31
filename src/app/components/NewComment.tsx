"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";
import * as yup from "yup";

interface newCommentProps {
  postId: string;
}
type FormProps = {
  content: string;
};

const schema = yup
  .object({
    content: yup.string().required("Digite alguma coisa"),
  })
  .required();

const NewComment = ({ postId }: newCommentProps) => {
  const { data, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormProps) => {
    await toast.promise(
      fetch("/api/comment/create", {
        method: "POST",
        body: Buffer.from(
          JSON.stringify({
            email: data?.user?.email,
            content: formData.content,
            postId,
          })
        ),
      }),
      {
        pending: "Publicando...",
        error: "Erro ao publicar comentário",
        success: "Comentário publicado com sucesso",
      }
    );
    setValue("content", "");
  };

  if (status !== "authenticated") return null;

  return (
    <div className="flex gap-2 items-center">
      <Image
        src={data.user?.image!}
        alt={data.user?.name!}
        width={32}
        height={32}
        className="rounded-md"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full gap-1 relative"
      >
        <textarea
          className="w-full outline-none border rounded-md pl-1 text-xs resize-none pt-1 h-8"
          placeholder="Comente alguma coisa..."
          {...register("content")}
        />
        <p className="text-xs text-red-500 w-max absolute top-8 left-1">
          {errors.content?.message}
        </p>
        <button type="submit" className="absolute right-1 top-1">
          <IoIosSend size={24} color="#3b82f6" />
        </button>
      </form>
    </div>
  );
};

export default NewComment;
