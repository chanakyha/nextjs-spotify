import useSpotify from "@/hooks/useSpotify";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyAPI = useSpotify();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists().then((playlists) => {
        setPlaylist(playlists);
        console.log(playlists);
      });
    }
  }, [session, spotifyAPI]);

  const router = useRouter();
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <button className="flex items-center gap-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center gap-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <RssIcon className="w-5 h-5" />
          <p>Your Episodes</p>
        </button>
        {!session ? (
          <button
            onClick={() => router.push("/login")}
            className="flex rounded-md text-green-500 font-medium bg-green-800/20 p-2 items-center active:scale-90 duration-100 ease-out transition-all gap-2 hover:text-green-900"
          >
            <ArrowCircleRightIcon className="w-5 h-5" />
            <p>Login</p>
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className="flex rounded-md text-red-500 font-medium bg-red-800/20 p-2 items-center active:scale-90 duration-100 ease-out transition-all gap-2 hover:text-red-900"
          >
            <ArrowCircleLeftIcon className="w-5 h-5" />
            <p>Logout</p>
          </button>
        )}

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
      </div>
    </div>
  );
}
