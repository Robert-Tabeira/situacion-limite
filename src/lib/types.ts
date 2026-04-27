export type Phase = 'waiting' | 'picking' | 'guessing' | 'revealing' | 'finished'
export type RoomStatus = 'lobby' | 'playing' | 'finished'

export interface Player {
  session_id: string
  name:       string
  color_idx:  number
  score:      number
}

export interface Vote {
  session_id:    string
  chosen_option: number
}

/** What the API returns — center_answer is null unless phase === 'revealing' */
export interface RoomView {
  code:           string
  status:         RoomStatus
  host_session:   string
  steps_to_win:   number
  round_num:      number
  phase:          Phase
  center_session: string | null
  situacion:      string | null
  opciones:       string[] | null
  center_answer:  number | null   // revealed only during 'revealing'
  players:        Player[]
  votes:          Vote[]           // confirmed votes from non-center players
  my_session:     string
}

export const PLAYER_COLORS = [
  { hex: '#EF4444', light: '#FEF2F2', tw: 'bg-red-500'    },
  { hex: '#10B981', light: '#ECFDF5', tw: 'bg-emerald-500'},
  { hex: '#3B82F6', light: '#EFF6FF', tw: 'bg-blue-500'   },
  { hex: '#F59E0B', light: '#FFFBEB', tw: 'bg-amber-500'  },
  { hex: '#EC4899', light: '#FDF2F8', tw: 'bg-pink-500'   },
  { hex: '#8B5CF6', light: '#F5F3FF', tw: 'bg-violet-500' },
]

export const LETTERS = ['A', 'B', 'C', 'D']
