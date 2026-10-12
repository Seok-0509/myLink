type SocialLink = { name: string; url: string };

export function SocialBar({ links }: { links: SocialLink[] }) {
  return (
    <nav aria-label="소셜 링크" className="mb-6 flex justify-center gap-2">
      {links.map((link) => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#4e5968] shadow-sm transition hover:text-[#3182f6]">
          {link.name}
        </a>
      ))}
    </nav>
  );
}
