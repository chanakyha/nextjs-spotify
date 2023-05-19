import { playListAtom } from "@/atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

export default function Songs() {
  const playlist = useRecoilValue(playListAtom);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist.tracks?.items.map((item, index) => (
        <Song
          track={item}
          key={item.track.id}
          id={item.track.id}
          order={index}
        />
      ))}
    </div>
  );
}
