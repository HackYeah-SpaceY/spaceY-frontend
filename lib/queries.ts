import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveSession } from "./actions";

export function signUp() {
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
    // TODO: Fix this any
    mutationFn: async ({ email, password, confirmPassword }: any) => {
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

export function signIn() {
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
    mutationFn: async ({ email, password }: any) => {
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

export function createChat() {
  return useMutation({
    onError: (err) => {
      toast.warning("Something went wrong, please try again.");
      console.log(err);
    },
    mutationKey: ["createChat"],
    mutationFn: async ({ url, content }: any) => {
      return await fetch(
        "https://spaceywebapi-development.up.railway.app/chats",
        {
          method: "POST", // Set the method to POST
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            authorization:
              "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzZXJrYTJAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIzZjlmZTI0NS04NjhkLTQ4ODYtYjFlYS05NDZlNjcxMzA1MGEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2Vya2EyQGdtYWlsLmNvbSIsImV4cCI6MTcyNzU1MDg1OCwiaXNzIjoiaHR0cHM6Ly9zcGFjZXl3ZWJhcGktZGV2ZWxvcG1lbnQudXAucmFpbHdheS5hcHAiLCJhdWQiOiJodHRwczovL3NwYWNleXdlYmFwaS1kZXZlbG9wbWVudC51cC5yYWlsd2F5LmFwcCJ9.TxYo7HBmvDkt74vKhFlQRuftPU0v5sGBu-C9s5PslI75Bk2iX45iwpu9HG07dj2KJlk9_fhktdgUSibHWbc_uA",
          },
          body: JSON.stringify({
            url: url,
            message: {
              content: content,
              isFromUser: true,
            },
          }), // Stringify the body
        }
      );
    },
  });
}
