-- Создание таблиц для TON Casino

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(48) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_games INTEGER DEFAULT 0,
  total_won DECIMAL(18, 2) DEFAULT 0,
  total_lost DECIMAL(18, 2) DEFAULT 0
);

-- Таблица истории игр
CREATE TABLE IF NOT EXISTS game_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  game_type VARCHAR(20) NOT NULL CHECK (game_type IN ('slots', 'roulette')),
  bet_amount DECIMAL(18, 2) NOT NULL,
  win_amount DECIMAL(18, 2) DEFAULT 0,
  is_win BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_game_history_user_id ON game_history(user_id);
CREATE INDEX IF NOT EXISTS idx_game_history_created_at ON game_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);

-- Функция для обновления статистики пользователя
CREATE OR REPLACE FUNCTION update_user_stats(
  p_user_id UUID,
  p_is_win BOOLEAN,
  p_win_amount DECIMAL,
  p_bet_amount DECIMAL
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE users
  SET 
    total_games = total_games + 1,
    total_won = total_won + CASE WHEN p_is_win THEN p_win_amount ELSE 0 END,
    total_lost = total_lost + CASE WHEN NOT p_is_win THEN p_bet_amount ELSE 0 END
  WHERE id = p_user_id;
END;
$$;

-- Включить RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_history ENABLE ROW LEVEL SECURITY;

-- Политики доступа
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read users" ON users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert game history" ON game_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read game history" ON game_history FOR SELECT USING (true);