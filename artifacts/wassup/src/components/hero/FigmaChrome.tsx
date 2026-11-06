import figmaChatScreen from '../../assets/airavata/Messages_-_Full_view_1791144042420.svg';

const figmaCanvasScale = 252 / 393;

export function FigmaSvgCrop({
  x,
  y,
  width,
  height,
  className,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <span
      className={`demo-figma-crop ${className ?? ''}`}
      style={{ width: width * figmaCanvasScale, height: height * figmaCanvasScale }}
      aria-hidden="true"
    >
      <img
        src={figmaChatScreen}
        alt=""
        draggable={false}
        style={{
          width: 252,
          left: -x * figmaCanvasScale,
          top: -y * figmaCanvasScale,
        }}
      />
    </span>
  );
}

export function FigmaReadReceipt({ ariaLabel }: { ariaLabel?: string }) {
  return (
    <svg
      width="10"
      height="7"
      viewBox="352.5 392 15 10"
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      focusable="false"
    >
      <path
        d="M366.724 393.242C366.971 392.934 366.921 392.484 366.613 392.237C366.305 391.989 365.854 392.039 365.607 392.347L359.922 399.428L359.487 398.993C359.207 398.714 358.754 398.714 358.474 398.994C358.195 399.273 358.195 399.727 358.475 400.007L359.475 401.006C359.619 401.15 359.817 401.225 360.02 401.214C360.223 401.203 360.411 401.106 360.539 400.947L366.724 393.242ZM362.638 393.243C362.885 392.934 362.835 392.484 362.527 392.236C362.219 391.989 361.768 392.039 361.521 392.347L355.836 399.429L353.9 397.494C353.621 397.214 353.168 397.214 352.888 397.494C352.609 397.773 352.609 398.227 352.889 398.506L355.389 401.006C355.533 401.15 355.731 401.225 355.934 401.214C356.137 401.203 356.326 401.106 356.453 400.948L362.638 393.243Z"
        fill="#007BFC"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
