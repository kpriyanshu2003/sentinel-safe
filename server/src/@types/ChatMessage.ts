export interface ChatMessage {
  text: string;
  userDetails: {
    displayName: string;
    email: string;
    photoURL?: string;
  };
}
