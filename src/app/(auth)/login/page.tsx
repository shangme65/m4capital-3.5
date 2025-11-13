import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";

export const metadata = {
  title: "Login | m4capital",
};

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  async function handleLogin(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    });
  }

  return (
    <div className="flex items-center justify-center py-24 px-4">
      <form
        className="w-full max-w-md p-8 rounded-2xl border border-cyan-700/40 bg-slate-900/60 backdrop-blur shadow-lg space-y-6 animate-floatIn"
        action={handleLogin}
      >
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded bg-slate-800 border border-cyan-600/30 px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded bg-slate-800 border border-cyan-600/30 px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-md font-semibold bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 text-white animate-borderFlow"
        >
          Sign In
        </button>
        <p className="text-[10px] text-center text-slate-500">
          Use seeded admin credentials if configured.
        </p>
      </form>
    </div>
  );
}
