"use client";

import { memo } from "react";

interface GlowingEffectProps {
  className?: string;
  disabled?: boolean;
}

const GlowingEffect = memo(
  ({
    className,
    disabled = false,
  }: GlowingEffectProps) => {
    if (disabled) {
      return null;
    }

    return (
      <div className={`absolute inset-0 rounded-[inherit] ${className || ""}`}>
        <div className="absolute inset-0 rounded-[inherit]">
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 opacity-70 blur-md glow-pulse"></div>
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-50 blur-lg glow-ping"></div>
        </div>
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };