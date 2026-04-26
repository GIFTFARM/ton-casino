import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  wallet_address: string;
  created_at: string;
  total_games: number;
  total_won: number;
  total_lost: number;
}

export interface GameHistory {
  id: string;
  user_id: string;
  game_type: 'slots' | 'roulette';
  bet_amount: number;
  win_amount: number;
  is_win: boolean;
  created_at: string;
}

export async function getOrCreateUser(walletAddress: string): Promise<User | null> {
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (existingUser) return existingUser;

  const { data: newUser } = await supabase
    .from('users')
    .insert({ wallet_address: walletAddress })
    .select()
    .single();

  return newUser;
}

export async function recordGame(
  userId: string,
  gameType: 'slots' | 'roulette',
  betAmount: number,
  winAmount: number
): Promise<void> {
  const isWin = winAmount > 0;

  await supabase.from('game_history').insert({
    user_id: userId,
    game_type: gameType,
    bet_amount: betAmount,
    win_amount: winAmount,
    is_win: isWin,
  });

  await supabase.rpc('update_user_stats', {
    p_user_id: userId,
    p_is_win: isWin,
    p_win_amount: winAmount,
    p_bet_amount: betAmount,
  });
}

export async function getUserHistory(walletAddress: string, limit = 20): Promise<GameHistory[]> {
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('wallet_address', walletAddress)
    .single();

  if (!user) return [];

  const { data: history } = await supabase
    .from('game_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  return history || [];
}

export async function getLeaderboard(limit = 10): Promise<User[]> {
  const { data: leaders } = await supabase
    .from('users')
    .select('*')
    .order('total_won', { ascending: false })
    .limit(limit);

  return leaders || [];
}