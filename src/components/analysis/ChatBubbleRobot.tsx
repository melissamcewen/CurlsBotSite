import Image from 'next/image';
import React from 'react';

interface ChatBubbleRobotProps {
  children: React.ReactNode;
  status?: 'ok' | 'caution' | 'warning' | 'error';
  imageUrl?: string;
  altText?: string;
  align?: 'start' | 'end';
  className?: string;
}

export function ChatBubbleRobot({
  children,
  status = 'ok',
  imageUrl,
  altText = 'ChatBot',
  align = 'start',
  className = '',
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
    <div className={`chat chat-start lg:max-w-3xl lg:min-w-s ${className}`}>
      <div
        className={`chat-image avatar rounded-full border-2 ${borderClass} animate-none`}
        style={{ animation: 'none', transition: 'none' }}
      >
        <div className="w-10 h-10 mask mask-circle relative overflow-hidden">
          {/* Permanent background layer */}
          <div className="absolute inset-0 bg-white" />
          {/* Image container with blend mode */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={finalImageUrl}
              alt={altText}
              width={40}
              height={40}
              priority
              className="animate-none"
              style={{ animation: 'none', transition: 'none' }}
            />
          </div>
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
      className={`chat-bubble bg-base-100 border-t-2 p-6 text-base-content w-full ${bubbleClass} ${className}`}
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
