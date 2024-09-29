import React from "react";

const StreamersHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
          Yayıncılarımız
        </h2>
        <p className="text-sm text-muted-foreground text-gray-800">
          Top picks for you. Updated daily.
        </p>
      </div>
    </div>
  );
};

export default StreamersHeader;
