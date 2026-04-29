-- =============================================
-- Situación Límite — Supabase Schema
-- Run in the Supabase SQL editor
-- =============================================

-- Rooms: one per game session
create table if not exists sl_rooms (
  id                   uuid primary key default gen_random_uuid(),
  code                 text unique not null,
  host_session         text not null,
  status               text not null default 'lobby',   -- lobby | playing | finished
  steps_to_win         integer not null default 10,
  -- Turn management (shuffled once at game start)
  center_order         jsonb not null default '[]',     -- ordered array of session_ids
  used_cards           jsonb not null default '[]',     -- ordered array of used situations
  round_history        jsonb not null default '[]',     -- summary of finished rounds
  current_center_idx   integer not null default 0,
  round_num            integer not null default 0,
  -- Current round data
  situacion            text,
  opciones             jsonb,                           -- string[4]
  phase                text not null default 'waiting', -- waiting|picking|guessing|revealing|finished
  center_session       text,
  center_answer        integer,                         -- 0-3, hidden until revealing
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);

alter table if exists sl_rooms add column if not exists used_cards jsonb not null default '[]';
alter table if exists sl_rooms add column if not exists round_history jsonb not null default '[]';

-- Players: one row per player per room
create table if not exists sl_players (
  id          uuid primary key default gen_random_uuid(),
  room_code   text not null references sl_rooms(code) on delete cascade,
  session_id  text not null,
  name        text not null,
  color_idx   integer not null default 0,
  score       integer not null default 0,
  joined_at   timestamptz default now(),
  unique(room_code, session_id)
);

-- Votes: one row per player per round (inserted on confirm)
create table if not exists sl_votes (
  id             uuid primary key default gen_random_uuid(),
  room_code      text not null,
  round_num      integer not null,
  session_id     text not null,
  chosen_option  integer not null,  -- 0-3
  submitted_at   timestamptz default now(),
  unique(room_code, round_num, session_id)
);

-- Enable realtime
alter publication supabase_realtime add table sl_rooms;
alter publication supabase_realtime add table sl_players;
alter publication supabase_realtime add table sl_votes;
