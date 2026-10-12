import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type LinkCardProps = { title: string; description: string; url: string; tags: string[] };

export function LinkCard({ title, description, url, tags }: LinkCardProps) {
  return (
    <Card className="group transition hover:-translate-y-0.5 hover:shadow-md">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold group-hover:text-[#3182f6]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4e5968]">{description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{tags.map((tag) => <Badge key={tag}>#{tag}</Badge>)}</div>
          </div>
          <span aria-hidden="true" className="text-xl text-[#8b95a1] group-hover:text-[#3182f6]">↗</span>
        </div>
      </a>
    </Card>
  );
}
