import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

export default function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  const colors = [
    "from-red-500",
    "from-green-500",
    "from-blue-500",
    "from-yellow-500",
    "from-purple-500",
    "from-pink-500",
  ];

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center p-1 pr-2 rounded-full bg-black gap-3 opacity-90 hover:opacity-80 cursor-pointer">
          <Image
            className="rounded-full w-10 h-10"
            width={1080}
            height={1920}
            alt="profile-pic"
            src={session?.user?.image}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {/* <Image /> */}
      </section>
    </div>
  );
}
