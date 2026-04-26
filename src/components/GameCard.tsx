import Link from 'next/link';
import { ReactNode } from 'react';

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  gradient: string;
}

export function GameCard({ title, description, icon, href, gradient }: GameCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block p-6 rounded-2xl bg-gradient-to-br ${gradient} transition-transform hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition-colors"></div>
      <div className="relative">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </Link>
  );
}