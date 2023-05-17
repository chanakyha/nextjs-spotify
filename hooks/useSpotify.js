import spotifyAPI from "@/lib/spotify";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyAPI.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyAPI;
}
