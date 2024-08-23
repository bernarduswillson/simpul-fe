const InboxIcon = ({ width, height, fillColor }: { width: number; height: number; fillColor?: string }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M21.0371 2.92615H4.66673C3.97414 2.92615 3.40747 3.49281 3.40747 4.18541V21.815L8.44451 16.778H21.0371C21.7297 16.778 22.2964 16.2113 22.2964 15.5187V4.18541C22.2964 3.49281 21.7297 2.92615 21.0371 2.92615ZM19.7779 5.44458V14.2594H7.39933L6.65637 15.0024L5.926 15.7327V5.44458H19.7779ZM24.8149 7.96321H27.3334C28.026 7.96321 28.5927 8.52987 28.5927 9.22247V28.1114L23.5556 23.0743H9.70376C9.01117 23.0743 8.4445 22.5077 8.4445 21.8151V19.2965H24.8149V7.96321Z"
            fill={fillColor} />
    </svg>
  );
};

export default InboxIcon;
