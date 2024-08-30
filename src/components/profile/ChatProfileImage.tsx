// Libs
import Image from "next/image";

// Hooks
import { useAppSelector } from "@/redux/store";

// Interface
interface ChatProfileImageProps {
  participants: {
    id: string;
    name: string;
    photo: string;
  }[];
}


export default function ChatProfileImage({ participants }: ChatProfileImageProps) {
  // States
  const userState = useAppSelector((state) => state.user.value);

  // Handlers
  const getParticipantPhoto = (index: number) => 
    participants.filter((participant) => participant.id !== userState.id)[index]?.photo || 
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

    
  return (
    <div className="w-[54px] h-[38px] relative flex justify-center">
      {participants.length >= 2 && (
        <>
          <Image
            src={getParticipantPhoto(0)}
            alt="Participant"
            width={37}
            height={37}
            className={`rounded-full top-0 left-0 z-10 ${participants.length > 2 ? 'absolute ml-4' : 'flex'}`}
          />
          {participants.length > 2 && (
            <Image
              src={getParticipantPhoto(1)}
              alt="Participant"
              width={37}
              height={37}
              className="rounded-full absolute top-0 left-0"
            />
          )}
        </>
      )}
      {participants.length < 2 && (
        <Image
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="Participant"
          width={37}
          height={37}
          className="rounded-full"
        />
      )}
    </div>
  );
}
