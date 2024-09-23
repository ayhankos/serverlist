"use client";

import React from "react";

interface DiscordWidgetProps {
  inviteLink: string;
  serverId: string;
}

const DiscordWidget: React.FC<DiscordWidgetProps> = ({
  inviteLink,
  serverId,
}) => {
  return (
    <div className="discord-widget active">
      <a href={inviteLink} target="blank" title="Join us on Discord">
        <img
          src={`https://discordapp.com/api/guilds/${serverId}/widget.png?style=banner1`}
          alt="Discord Server"
        />
      </a>
      <style jsx>{`
        .discord-widget.active {
          left: 8px;
        }
        .discord-widget {
          width: 265px;
          transition-property: left;
          transition-duration: 2s;
          position: fixed;
          bottom: 5px;
          left: 10px;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default DiscordWidget;
