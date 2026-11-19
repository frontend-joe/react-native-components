import Svg, { Circle, Path, Rect } from "react-native-svg";

// Brand logos (lucide doesn't ship these) and the two illustrations for Login1.

export const FacebookIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={12} fill="#1877F2" />
    <Path
      fill="#fff"
      d="M16.671 15.469L17.203 12H13.875V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.234-2.686-.234c-2.741 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z"
    />
  </Svg>
);

export const GoogleIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <Path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <Path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <Path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </Svg>
);

export const AppleIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
    />
  </Svg>
);

// Phone with a sign-up form, padlock and leaf — original artwork in the mockup's palette.
export const SignUpIllustration = ({ color, width = 240 }) => (
  <Svg width={width} height={width * 0.92} viewBox="0 0 240 220">
    {/* background browser windows */}
    <Rect x={18} y={56} width={120} height={84} rx={6} fill="#E6E4EA" />
    <Rect x={18} y={56} width={120} height={14} rx={6} fill="#DCDAE1" />
    <Rect x={124} y={30} width={98} height={70} rx={6} fill="#E6E4EA" />
    <Rect x={124} y={30} width={98} height={12} rx={6} fill="#DCDAE1" />
    <Rect x={150} y={120} width={70} height={60} rx={6} fill="#ECEAEF" />
    {/* leaf */}
    <Path d="M168 168c4-34 26-50 44-56-2 22-16 46-44 56z" fill={color} opacity={0.85} />
    <Path d="M168 168c10-16 22-28 40-50" stroke="#fff" strokeWidth={2} fill="none" />
    {/* phone */}
    <Rect x={78} y={20} width={86} height={170} rx={14} fill="#3D4352" />
    <Rect x={84} y={26} width={74} height={158} rx={9} fill="#fff" />
    <Rect x={108} y={26} width={26} height={6} rx={3} fill="#3D4352" />
    {/* avatar */}
    <Circle cx={121} cy={52} r={8} fill={color} opacity={0.25} />
    <Circle cx={121} cy={50} r={3} fill={color} />
    <Path d="M115 57a6 4 0 0 1 12 0z" fill={color} />
    {/* form fields */}
    <Rect x={94} y={72} width={54} height={4} rx={2} fill={color} />
    <Rect x={94} y={80} width={36} height={3} rx={1.5} fill="#D7D5DC" />
    <Rect x={94} y={94} width={54} height={4} rx={2} fill={color} />
    <Rect x={94} y={102} width={42} height={3} rx={1.5} fill="#D7D5DC" />
    <Rect x={94} y={116} width={54} height={4} rx={2} fill={color} />
    <Path d="M94 126h40" stroke={color} strokeWidth={3} strokeDasharray="2 3" strokeLinecap="round" />
    {/* button */}
    <Rect x={102} y={150} width={38} height={14} rx={3} fill={color} />
    <Rect x={110} y={156} width={22} height={2} rx={1} fill="#fff" />
    {/* padlock */}
    <Path d="M176 46v-10a12 12 0 0 1 24 0v10" stroke={color} strokeWidth={5} fill="none" />
    <Rect x={168} y={44} width={40} height={32} rx={7} fill={color} />
    <Circle cx={188} cy={58} r={4} fill="#fff" />
    <Rect x={186.5} y={60} width={3} height={8} rx={1.5} fill="#fff" />
    {/* ground */}
    <Path d="M40 200h160" stroke="#D7D5DC" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// Rolled receipt / invoice mark used on the sign-in screen.
export const ReceiptIllustration = ({ color, size = 84 }) => (
  <Svg width={size} height={size} viewBox="0 0 84 84">
    <Path d="M10 4h46a6 6 0 0 1 6 6v60H18a8 8 0 0 1-8-8z" fill={color} />
    <Path d="M18 70h60a8 8 0 0 1-8 8H24a8 8 0 0 1-6-8z" fill={color} />
    <Path d="M10 62a8 8 0 0 0 16 0v-4H10z" fill={color} opacity={0.75} />
    <Path
      d="M27 18c-2-2-8-2-8 2s8 3 8 7-6 4-8 2M23 14v20"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M34 20h18M34 28h18M20 40h32M20 47h32M20 54h32"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);
