import React, { useState } from 'react';
import { WaxSealEnvelopeScene } from './components/WaxSealEnvelopeScene';
import { MainInvitationView } from './components/MainInvitationView';
import { INITIAL_EVENT_DETAILS } from './data/invitationData';
import { EventDetails } from './types/invitation';
import { resetBackgroundMusicForReplay } from './utils/audio';

export default function App() {
  const [isUnveiled, setIsUnveiled] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails>(INITIAL_EVENT_DETAILS);

  return (
    <div className="min-h-screen bg-[#F4EDE2] text-[#3B3127]">
      {!isUnveiled ? (
        <WaxSealEnvelopeScene
          isReplay={isReplay}
          onComplete={() => {
            setIsUnveiled(true);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      ) : (
        <MainInvitationView
          event={eventDetails}
          onUpdateEvent={(updated) => setEventDetails(updated)}
          onReplayEnvelope={() => {
            resetBackgroundMusicForReplay();
            setIsReplay(true);
            setIsUnveiled(false);
          }}
        />
      )}
    </div>
  );
}
