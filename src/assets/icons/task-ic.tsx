const TaskIcon = ({ width, height, fillColor }: { width: number; height: number; fillColor?: string }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M4.11114 4.66626H24.1111C25.3334 4.66626 26.3334 5.66626 26.3334 6.88848V21.3329C26.3334 22.5551 25.3334 23.5551 24.1111 23.5551H4.11114C2.88892 23.5551 1.88892 22.5551 1.88892 21.3329V6.88848C1.88892 5.66626 2.88892 4.66626 4.11114 4.66626ZM4.11114 6.88848V21.3329H13V6.88848H4.11114ZM24.1111 21.3329H15.2222V6.88848H24.1111V21.3329ZM23 10.7774H16.3334V12.444H23V10.7774ZM16.3334 13.5551H23V15.2218H16.3334V13.5551ZM23 16.3329H16.3334V17.9996H23V16.3329Z"
            fill={fillColor} />
    </svg>
  );
};

export default TaskIcon;
