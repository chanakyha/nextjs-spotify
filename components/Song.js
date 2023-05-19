import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import { timeConvert } from "@/lib/time";
import { useRecoilState } from "recoil";

export default function Song({ track, id, order }) {
  const spotifyAPI = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);

    spotifyAPI.play({
      uris: [track.track.uri],
    });
  };
  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <p>{order + 1}</p>
        <img
          src={track.track.album.images[0].url}
          className="h-10 w-10"
          alt=""
        />

        <div>
          <p className="w-36 lg:w-64 text-white truncate">
            {track?.track.name}
          </p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{timeConvert(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}
