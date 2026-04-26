import { GameCard } from '@/components/GameCard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Choose Your Game
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Connect your TON wallet and start playing
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <GameCard
          title="Slot Machine"
          description="Spin the reels and match symbols to win big"
          icon={<span>🎰</span>}
          href="/games/slots"
          gradient="from-purple-600 to-pink-600"
        />
        <GameCard
          title="Roulette"
          description="Predict the outcome and multiply your bets"
          icon={<span>🎡</span>}
          href="/games/roulette"
          gradient="from-green-600 to-emerald-600"
        />
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block p-6 rounded-2xl glass">
          <h2 className="text-xl font-semibold mb-2">How it works</h2>
          <ol className="text-gray-400 text-sm space-y-2 text-left">
            <li>1. Connect your TON wallet</li>
            <li>2. Choose a game and place your bet</li>
            <li>3. Win and withdraw your rewards</li>
          </ol>
        </div>
      </div>
    </div>
  );
}