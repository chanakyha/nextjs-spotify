import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { playListAtom, playlistIDState } from "@/atoms/playlistAtom";
import useImageColor from "use-image-color";
import useSpotify from "@/hooks/useSpotify";
import Songs from "./Songs";

export default function Center() {
  const { data: session } = useSession();
  const playlistID = useRecoilValue(playlistIDState);
  const spotidyAPI = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playListAtom);

  const { colors: imageColor } = useImageColor(playlist?.images?.[0]?.url, {
    cors: true,
    colors: 5,
  });

  const colors = imageColor?.[1];

  useEffect(() => {
    console.log("Colors");
  }, [colors]);

  useEffect(() => {
    if (spotidyAPI.getAccessToken()) {
      spotidyAPI
        .getPlaylist(playlistID)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [spotidyAPI, playlistID]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex text-white items-center p-1 pr-2 rounded-full bg-black gap-3 opacity-90 hover:opacity-80 cursor-pointer"
        >
          {session && (
            <Image
              className="rounded-full w-10 h-10"
              width={1080}
              height={1920}
              alt="profile-pic"
              src={session?.user?.image}
            />
          )}

          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        style={{
          backgroundImage: `linear-gradient(to bottom, ${colors}, #000)`,
        }}
        className={`flex items-end space-x-7  h-80 text-white p-8`}
      >
        {playlist?.images && (
          <img
            src={playlist?.images[0]?.url}
            alt="playlist image"
            className="h-44 w-44 shadow-2xl"
            height={1920}
            width={1080}
          />
        )}
        <div>
          <p className="uppercase">Playlist</p>
          <h1 className="text-2xl md:text-3xl ml:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}
