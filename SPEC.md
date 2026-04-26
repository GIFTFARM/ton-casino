# TON Casino - Mini Games Platform

## Overview
Web application for mini casino games with TON wallet authentication and real cryptocurrency stakes.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: TON Connect SDK
- **Deploy**: Vercel

## Features

### Authentication
- TON Connect wallet connection
- User identification via wallet address
- Session management with Supabase Auth

### Games

#### 1. Slot Machine
- 3x3 slot grid with fruits/coins theme
- Bet amounts: 1, 5, 10, 50 TON
- Win conditions: 3 matching symbols in a row
- Payout multiplier: 2x-10x based on rarity

#### 2. Roulette
- European roulette (0-36)
- Bet types: Single number, Red/Black, Odd/Even
- Payout: 2x-36x based on bet type

### Economy
- TON wallet balance display
- Game history tracking
- Win/Loss statistics
- Leaderboard

## Database Schema

### users
- id (uuid, PK)
- wallet_address (varchar, unique)
- created_at (timestamp)
- total_games (int)
- total_won (decimal)
- total_lost (decimal)

### game_history
- id (uuid, PK)
- user_id (uuid, FK)
- game_type (enum: slots, roulette)
- bet_amount (decimal)
- win_amount (decimal)
- is_win (boolean)
- created_at (timestamp)

## API Endpoints

### POST /api/games/slots
- body: { walletAddress, betAmount }
- response: { symbols[], totalWin, newBalance }

### POST /api/games/roulette
- body: { walletAddress, betAmount, betType, betValue }
- response: { result, winAmount, newBalance }

### GET /api/user/history
- query: { walletAddress, limit }
- response: { history[] }

### GET /api/leaderboard
- response: { topPlayers[] }

## UI Components

### Layout
- Header with logo, wallet connect button, balance display
- Main content area with game cards
- Footer with links

### Pages
- `/` - Home with game selection
- `/games/slots` - Slot machine game
- `/games/roulette` - Roulette game
- `/profile` - User stats and history
- `/leaderboard` - Top players

## Design

### Colors
- Primary: #5865F2 (Discord blurple)
- Secondary: #3BA55C (green for wins)
- Accent: #FEE75C (gold for highlights)
- Background: #1E1F22 (dark)
- Card BG: #2B2D31
- Text: #FEFEFE

### Typography
- Font: Inter
- Headings: Bold, gradient effects
- Body: Regular

## Security
- Server-side balance validation
- Rate limiting on game endpoints
- Fraud detection patterns