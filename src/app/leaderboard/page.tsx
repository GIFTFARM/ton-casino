import Link from 'next/link';

export default function LeaderboardPage() {
  const mockLeaders = [
    { rank: 1, address: 'EQAX...3fK2', won: 1250, games: 89 },
    { rank: 2, address: 'EQB...K9m1', won: 980, games: 67 },
    { rank: 3, address: 'EQC...L2p4', won: 750, games: 45 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
        </div>

        <div className="space-y-3">
          {mockLeaders.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center justify-between p-4 rounded-xl bg-[#2B2D31] ${
                player.rank <= 3 ? 'border-2 border-yellow-500/30' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}
                </span>
                <div>
                  <p className="font-semibold">{player.address}</p>
                  <p className="text-sm text-gray-400">{player.games} games</p>
                </div>
              </div>
              <p className="text-xl font-bold text-yellow-400">{player.won} TON</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}