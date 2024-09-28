import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.warning("Something went wrong, please try again.");
      console.log(err);
    },
    mutationKey: ["createChat"],
    mutationFn: async ({ url, content }: any) => {
      return await (
        await fetch("https://spaceywebapi-development.up.railway.app/chats", {
          method: "POST", // Set the method to POST
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            authorization:
              "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzZXJrYW5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI0MzYyZmU0OS1kYTZkLTRiZmMtODA3OC1iODUzZTYxZmY3OTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2Vya2FuQGdtYWlsLmNvbSIsImV4cCI6MTcyNzU2MDMzMywiaXNzIjoiaHR0cHM6Ly9zcGFjZXl3ZWJhcGktZGV2ZWxvcG1lbnQudXAucmFpbHdheS5hcHAiLCJhdWQiOiJodHRwczovL3NwYWNleXdlYmFwaS1kZXZlbG9wbWVudC51cC5yYWlsd2F5LmFwcCJ9.hEAPJ1JmX7Xv1JZqNF-HKZlfYn4bRYdSCQKVqHdQU0j6Od-2IykTADRK9rrP7R1VPSAgvrXl_tJUKTNq6UppKQ",
          },
          body: JSON.stringify({
            url: url,
            title: `${content.split(0, 10)}...`,
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

export function getChat(id: string) {
  return useQuery({
    queryKey: ["get-chat", id],
    queryFn: async () => {
      return await (
        await fetch(
          `https://spaceywebapi-development.up.railway.app/chats/${id}`,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              authorization:
                "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzZXJrYW5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI0MzYyZmU0OS1kYTZkLTRiZmMtODA3OC1iODUzZTYxZmY3OTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2Vya2FuQGdtYWlsLmNvbSIsImV4cCI6MTcyNzU2MDMzMywiaXNzIjoiaHR0cHM6Ly9zcGFjZXl3ZWJhcGktZGV2ZWxvcG1lbnQudXAucmFpbHdheS5hcHAiLCJhdWQiOiJodHRwczovL3NwYWNleXdlYmFwaS1kZXZlbG9wbWVudC51cC5yYWlsd2F5LmFwcCJ9.hEAPJ1JmX7Xv1JZqNF-HKZlfYn4bRYdSCQKVqHdQU0j6Od-2IykTADRK9rrP7R1VPSAgvrXl_tJUKTNq6UppKQ",
            },
          }
        )
      ).json();
    },
  });
}

export function getOldChats() {
  return useQuery({
    queryKey: ["get-old-chats"],
    queryFn: async () => {
      return await (
        await fetch(`https://spaceywebapi-development.up.railway.app/chats/`, {
          headers: {
            accept: "*/*",
            authorization:
              "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzZXJrYW5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI0MzYyZmU0OS1kYTZkLTRiZmMtODA3OC1iODUzZTYxZmY3OTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2Vya2FuQGdtYWlsLmNvbSIsImV4cCI6MTcyNzU2MDMzMywiaXNzIjoiaHR0cHM6Ly9zcGFjZXl3ZWJhcGktZGV2ZWxvcG1lbnQudXAucmFpbHdheS5hcHAiLCJhdWQiOiJodHRwczovL3NwYWNleXdlYmFwaS1kZXZlbG9wbWVudC51cC5yYWlsd2F5LmFwcCJ9.hEAPJ1JmX7Xv1JZqNF-HKZlfYn4bRYdSCQKVqHdQU0j6Od-2IykTADRK9rrP7R1VPSAgvrXl_tJUKTNq6UppKQ",
          },
        })
      ).json();
    },
  });
}
