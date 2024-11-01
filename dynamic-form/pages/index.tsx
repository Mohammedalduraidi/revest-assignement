import Head from "next/head";
import DynamicForm from "../components/DynamicForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <Head>
        <title>Dynamic Form </title>
        <meta name="description" content="Create your forms dynamically" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-lg p-10 bg-white rounded-lg shadow-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Create Your Custom Form (Sign up!)
        </h1>
        <DynamicForm />
      </main>
    </div>
  );
};

export default Home;
