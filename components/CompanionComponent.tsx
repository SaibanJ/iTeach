'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json';
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = ({
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
  companionId,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages(prev => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    };
  }, [companionId]);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ['transcript'],
      serverMessages: [],
    };
    //@ts-expect-error ddd
    await vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const isActive = callStatus === CallStatus.ACTIVE;
  const isConnecting = callStatus === CallStatus.CONNECTING;
  const color = getSubjectColor(subject);

  return (
    <section className="flex flex-col h-[70vh] gap-4">
      <section className="flex gap-4 max-sm:flex-col">
        {/* Companion side */}
        <div className={cn('companion-section transition-all duration-500', isActive && 'active')}>
          <div
            className="companion-avatar"
            style={{ backgroundColor: color + '15', border: `1px solid ${color}30` }}
          >
            <div
              className={cn(
                'absolute transition-opacity duration-700',
                isActive ? 'opacity-0' : 'opacity-100',
                isConnecting && 'animate-pulse'
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={120}
                height={120}
                className="max-sm:w-16"
              />
            </div>
            <div
              className={cn(
                'absolute transition-opacity duration-700',
                isActive ? 'opacity-100' : 'opacity-0'
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 pb-2">
            <p className="font-bold text-lg" style={{ color: 'var(--text)' }}>
              {name}
            </p>
            <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>
              {subject} tutor
            </p>
          </div>
          {isActive && (
            <div className="flex items-center gap-1.5 pb-4">
              <span
                className="size-2 rounded-full animate-pulse"
                style={{ background: '#22c55e' }}
              />
              <span className="text-xs" style={{ color: '#22c55e' }}>
                Live session
              </span>
            </div>
          )}
        </div>

        {/* User side */}
        <div className="user-section">
          <div className="user-avatar">
            <Image src={userImage} alt={userName} width={80} height={80} className="rounded-xl" />
            <p className="font-semibold text-base" style={{ color: 'var(--text)' }}>
              {userName}
            </p>
          </div>

          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
              alt="mic"
              width={24}
              height={24}
            />
            <p className="text-xs max-sm:hidden" style={{ color: 'var(--text-secondary)' }}>
              {isMuted ? 'Unmute' : 'Mute'}
            </p>
          </button>

          <button
            className={cn(
              'rounded-xl py-3 cursor-pointer transition-all w-full text-white text-sm font-semibold',
              isActive ? 'bg-red-600 hover:bg-red-700' : 'btn-primary justify-center',
              isConnecting && 'animate-pulse opacity-80 cursor-wait'
            )}
            style={
              !isActive
                ? {
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.3)',
                  }
                : undefined
            }
            onClick={isActive ? handleDisconnect : handleCall}
          >
            {isActive ? 'End Session' : isConnecting ? 'Connecting…' : 'Start Session'}
          </button>
        </div>
      </section>

      {/* Transcript */}
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === 'assistant') {
              return (
                <p key={index} className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                  <span className="font-semibold" style={{ color: 'var(--primary)' }}>
                    {name.split(' ')[0]}:
                  </span>{' '}
                  {message.content}
                </p>
              );
            } else {
              return (
                <p
                  key={index}
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="font-semibold" style={{ color: 'var(--accent)' }}>
                    {userName}:
                  </span>{' '}
                  {message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
