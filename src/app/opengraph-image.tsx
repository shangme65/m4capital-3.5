import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg,#031B2F,#140423,#061A32)',
          fontFamily: 'Arial',
          color: '#E2E8F0',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h1 style={{ fontSize: 90, background: 'linear-gradient(90deg,#00E0FF,#AE57FF)', WebkitBackgroundClip: 'text', color: 'transparent', margin: 0 }}>
          m4capital
        </h1>
        <p style={{ fontSize: 32, letterSpacing: 2, marginTop: 20 }}>FUTURISTIC MODULAR TRADING</p>
      </div>
    ),
    size
  );
}