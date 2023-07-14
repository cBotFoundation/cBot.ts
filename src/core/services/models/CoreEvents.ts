
export type CoreEventsType =
'message' |
'ready' |
'server-join' |
'server-kicked' |
'interaction-create' |
'on-member-joined' |
'on-member-leave' |
'on-member-available' |
'on-member-banned' |
'on-member-ban-removed' |
'warn' |
'error'

// TODO: TF IS THIS WHYYY (SUGGEST A BETTER OPTION TO ITERATE OVER THE TYPE UNION)
export const CoreEventsArray: CoreEventsType[] = [
  'message',
  'ready',
  'server-join',
  'server-kicked',
  'interaction-create',
  'on-member-joined',
  'on-member-leave',
  'on-member-available',
  'on-member-banned',
  'on-member-ban-removed',
  'warn',
  'error'
]
