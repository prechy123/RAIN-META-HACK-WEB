export interface EventState {
  inEvent: boolean;
  eventId: string;
  eventName: string;
  description: string;
  creatorId: string;
  eventCode: string;
  setEvent: React.Dispatch<React.SetStateAction<EventState>>;
}
