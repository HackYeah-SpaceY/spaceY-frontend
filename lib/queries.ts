import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveSession } from "./actions";
import { useCookies } from "next-client-cookies";

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    onSuccess: (data) => {
      if (data.status === 200) {
        router.replace("/signin");
        toast.success("Account created.");
      } else {
        toast.warning("Something went wrong, please try again.");
      }
    },
    onError: (err) => {
      toast.warning("Something went wrong, please try again.");
      console.log(err);
    },
    mutationKey: ["signup"],
    mutationFn: async ({
      email,
      password,
      confirmPassword,
    }: {
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      return await fetch(
        "https://spaceywebapi-development.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      );
    },
  });
}

export function useSignIn() {
  const router = useRouter();

  return useMutation({
    onSuccess: async (data) => {
      if (data.status === 200) {
        const response = await data.json();

        await saveSession(response.accessToken);

        router.replace("/main");
      } else {
        toast.warning("Something went wrong, please try again.");
      }
    },
    onError: (err) => {
      toast.warning("Something went wrong, please try again.");
      console.log(err);
    },
    mutationKey: ["signin"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await fetch(
        "https://spaceywebapi-development.up.railway.app/auth/login",
        {
          method: "POST", // Set the method to POST
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }), // Stringify the body
        }
      );
    },
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();
  const cookies = useCookies();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.warning("Something went wrong, please try again.");
      console.log(err);
    },
    mutationKey: ["createChat"],
    mutationFn: async ({ url, content }: { url: string; content: string }) => {
      const token = cookies.get("accessToken");

      return await (
        await fetch("https://spaceywebapi-development.up.railway.app/chats", {
          method: "POST", // Set the method to POST
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            url: url,
            title: `${content.slice(0, 10)}...`,
            message: {
              content: content,
              isFromUser: true,
            },
          }), // Stringify the body
        })
      ).json();
    },
  });
}

export function useGetChat(id: string) {
  const cookies = useCookies();

  return useQuery({
    queryKey: ["get-chat", id],
    queryFn: async () => {
      const token = cookies.get("accessToken");

      return await (
        await fetch(
          `https://spaceywebapi-development.up.railway.app/chats/${id}`,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        )
      ).json();
    },
  });
}

export function useGetOldChats() {
  const cookies = useCookies();

  return useQuery({
    queryKey: ["get-old-chats"],
    queryFn: async () => {
      const token = cookies.get("accessToken");

      return await (
        await fetch(`https://spaceywebapi-development.up.railway.app/chats/`, {
          headers: {
            accept: "*/*",
            authorization: `Bearer ${token}`,
          },
        })
      ).json();
    },
  });
}
