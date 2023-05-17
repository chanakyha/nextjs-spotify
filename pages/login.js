import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export default function Login({ providers }) {
  return (
    <div className="flex flex-col bg-black w-full min-h-screen justify-center items-center">
      <Image
        className="w-52 mb-5"
        src="https://bit.ly/42C9Axf"
        width={1920}
        height={1080}
        alt=""
      />

      {Object.values(providers).map((provider, index) => (
        <div key={index}>
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
            className="bg-[#18D860] font-medium p-5 rounded-lg text-white"
          >
            Login with {provider?.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
