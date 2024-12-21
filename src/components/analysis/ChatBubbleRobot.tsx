import Image from 'next/image';
import React from 'react';

interface ChatBubbleRobotProps {
  children: React.ReactNode;
  status?: 'ok' | 'caution' | 'warning' | 'error';
  imageUrl?: string;
  altText?: string;
  align?: 'start' | 'end';
}

export function ChatBubbleRobot({
  children,
  status = 'ok',
  imageUrl,
  altText = 'ChatBot',
  align = 'start',
}: ChatBubbleRobotProps) {
  const statusImages: Record<string, string> = {
    ok: '/normal.svg',
    caution: '/surprised.svg',
    warning: '/exclaim.svg',
    error: '/surprised.svg',
  };

  const statusClasses: Record<string, string> = {
    ok: 'border-info',
    caution: 'border-warning',
    warning: 'border-error',
    error: 'border-error',
  };

  const finalImageUrl = imageUrl || statusImages[status];
  const borderClass = statusClasses[status] || 'border-primary';

  return (
    <div className="chat chat-start lg:max-w-3xl">
      <div className={`chat-image avatar rounded-full border-2 ${borderClass}`}>
        <div className="w-10 h-10 mask mask-circle bg-white">
          <Image
            src={finalImageUrl}
            alt={altText}
            width={40}
            height={40}
            priority
            className="transform-gpu"
          />
        </div>
      </div>
      {children}
    </div>
  );
}

interface ChatHeaderProps {
  children: React.ReactNode;
  time?: string;
  className?: string;
}

export function ChatHeader({
  children,
  time,
  className = '',
}: ChatHeaderProps) {
  return (
    <div className={`chat-header ${className}`}>
      {children}
      {time && <time className="text-xs opacity-50 ml-2">{time}</time>}
    </div>
  );
}

interface ChatBubbleProps {
  children: React.ReactNode;
  status?: 'ok' | 'caution' | 'warning' | 'error';
  className?: string;
}

export function ChatBubble({
  children,
  status = 'ok',
  className = '',
}: ChatBubbleProps) {
  const statusClasses: Record<string, string> = {
    ok: 'border-info',
    caution: 'border-warning',
    warning: 'border-error',
    error: 'border-error',
  };

  const bubbleClass = statusClasses[status] || 'border-primary';

  return (
    <div
      className={`chat-bubble bg-base-300 border-t-2 p-6 text-base-content ${bubbleClass} ${className}`}
      style={{
        contain: 'content',
        contentVisibility: 'auto'
      }}
    >
      {children}
    </div>
  );
}

interface ChatFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ChatFooter({ children, className = '' }: ChatFooterProps) {
  return (
    <div className={`chat-footer text-xs opacity-50 ${className}`}>
      {children}
    </div>
  );
}
