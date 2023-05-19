import { playlistIDState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Sidebar() {
  const { data: session } = useSession();
  const spotifyAPI = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistID, setPlaylistId] = useRecoilState(playlistIDState);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists().then((playlistItems) => {
        setPlaylists(playlistItems.body.items);
        setPlaylistId(playlistItems.body.items[0].id);
      });
    }
  }, [session, spotifyAPI]);

  const router = useRouter();
  return (
    <div className="text-gray-500 pb-36 p-5 lg:text-sm text-xs sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
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

        <hr className="border-t-[0.1px] border-gray-900" />
        <p className="font-bold text-slate-500 uppercase">Playlists</p>
        {/* Playlists */}

        {playlists.map((playlist, index) => (
          <p
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
            key={index}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}
