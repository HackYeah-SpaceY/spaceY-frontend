import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

        localStorage.setItem("accessToken", response.accessToken);

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
