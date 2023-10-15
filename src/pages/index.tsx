/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const fetchAllUsers = api.example.getAllUsers.useQuery();
  const fetchOneUser = api.example.getOneUser.useQuery({id: userId});
  
  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        name: name,
        email: email,
      });
      setName("");
      setEmail("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
      });
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      fetchAllUsers.refetch;
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({
        id: userIdToDelete,
      });
      setUserIdToDelete("");
      fetchAllUsers.refetch;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto p-8">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => fetchAllUsers.refetch()}
      >
        Get All Users
      </button>

      <div className="text- mb-4 mt-4 grid grid-cols-3 gap-4 font-bold">
        <p>Id</p>
        <p>Name</p>
        <p>Email</p>
      </div>

      {fetchAllUsers.data?.map((user) => (
          <div
            key={user.id}
            className="my-4 grid grid-cols-3 gap-4 rounded border border-gray-300 bg-white p-4 shadow"
          >
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get One User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user id to get"
            value={userId || ""}
            onChange={(e) => setUserId(String(e.target.value))}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => fetchOneUser.refetch()}
          >
            Get One User
          </button>
        </div>
        {fetchOneUser.data && (
          <div>
            <p>Name: {fetchOneUser.data.name}</p>
            <p>Email: {fetchOneUser.data.email}</p>
          </div>
        )}
      </div>

      
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Create New User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={handleCreateUser}
        >
          Create User
        </button>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Update User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Name to update"
            value={nameToUpdate}
            onChange={(e) => setNameToUpdate(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email to update"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(e.target.value)}
          />
        </div>
        <input
          placeholder="Enter user id to update"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToUpdate}
          onChange={(e) => setUserIdToUpdate(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
        <input
          placeholder="Enter user id to delete"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToDelete}
          onChange={(e) => setUserIdToDelete(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleDeleteUser}
        >
          Delete User
        </button>
      </div>
    </div>
  );

  // original content from nextjs boilerpolat code
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // return (
  //   <>
  //     <Head>
  //       <title>Create T3 App</title>
  //       <meta name="description" content="Generated by create-t3-app" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
  //       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
  //         <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
  //           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
  //         </h1>
  //         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
  //           <Link
  //             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
  //             href="https://create.t3.gg/en/usage/first-steps"
  //             target="_blank"
  //           >
  //             <h3 className="text-2xl font-bold">First Steps →</h3>
  //             <div className="text-lg">
  //               Just the basics - Everything you need to know to set up your
  //               database and authentication.
  //             </div>
  //           </Link>
  //           <Link
  //             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
  //             href="https://create.t3.gg/en/introduction"
  //             target="_blank"
  //           >
  //             <h3 className="text-2xl font-bold">Documentation →</h3>
  //             <div className="text-lg">
  //               Learn more about Create T3 App, the libraries it uses, and how
  //               to deploy it.
  //             </div>
  //           </Link>
  //         </div>
  //         <div className="flex flex-col items-center gap-2">
  //           <p className="text-2xl text-white">
  //             {hello.data ? hello.data.greeting : "Loading tRPC query..."}
  //           </p>
  //           <AuthShowcase />
  //         </div>
  //       </div>
  //     </main>
  //   </>
  // );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
