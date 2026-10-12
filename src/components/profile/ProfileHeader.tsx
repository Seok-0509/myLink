type ProfileHeaderProps = { name: string; bio: string; imageUrl?: string };

export function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-[#3182f6] text-3xl font-bold text-white">
        {imageUrl ? <Image src={imageUrl} alt={`${name} 프로필`} width={80} height={80} className="h-full w-full object-cover" /> : name.slice(0, 1)}
      </div>
      <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-[#6b7684]">{bio}</p>
    </header>
  );
}
import Image from "next/image";

