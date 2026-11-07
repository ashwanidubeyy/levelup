export interface HslColor {
  h: number;
  s: number;
  l: number;
}

const channel = (value: number, max: number): number => Math.min(max, Math.max(0, value));

export const isHexColor = (value: string): boolean => /^#[0-9A-Fa-f]{6}$/.test(value ?? '');

const rgb = (hex: string): [number, number, number] => [
  Number.parseInt(hex.slice(1, 3), 16),
  Number.parseInt(hex.slice(3, 5), 16),
  Number.parseInt(hex.slice(5, 7), 16),
];

export const hexToRgba = (hex: string, alpha: number): string => {
  if (!isHexColor(hex)) {
    return `rgba(0, 210, 238, ${alpha})`;
  }
  const [red, green, blue] = rgb(hex);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const hexToHsl = (hex: string): HslColor => {
  if (!isHexColor(hex)) {
    return { h: 188, s: 100, l: 47 };
  }
  const [redByte, greenByte, blueByte] = rgb(hex);
  const red = redByte / 255;
  const green = greenByte / 255;
  const blue = blueByte / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const light = (max + min) / 2;
  if (max === min) {
    return { h: 0, s: 0, l: Math.round(light * 100) };
  }
  const delta = max - min;
  const saturation = light > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;
  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }
  return { h: Math.round(hue * 60), s: Math.round(saturation * 100), l: Math.round(light * 100) };
};

const hueToRgb = (p: number, q: number, t: number): number => {
  let cursor = t;
  if (cursor < 0) {
    cursor += 1;
  }
  if (cursor > 1) {
    cursor -= 1;
  }
  if (cursor < 1 / 6) {
    return p + (q - p) * 6 * cursor;
  }
  if (cursor < 1 / 2) {
    return q;
  }
  if (cursor < 2 / 3) {
    return p + (q - p) * (2 / 3 - cursor) * 6;
  }
  return p;
};

const toHexChannel = (value: number): string => Math.round(value).toString(16).padStart(2, '0');

export const hslToHex = (h: number, s: number, l: number): string => {
  const hue = ((h % 360) + 360) % 360;
  const saturation = channel(s, 100) / 100;
  const light = channel(l, 100) / 100;
  if (saturation === 0) {
    const gray = Math.round(light * 255);
    return `#${toHexChannel(gray)}${toHexChannel(gray)}${toHexChannel(gray)}`.toUpperCase();
  }
  const q = light < 0.5 ? light * (1 + saturation) : light + saturation - light * saturation;
  const p = 2 * light - q;
  const hk = hue / 360;
  const red = hueToRgb(p, q, hk + 1 / 3) * 255;
  const green = hueToRgb(p, q, hk) * 255;
  const blue = hueToRgb(p, q, hk - 1 / 3) * 255;
  return `#${toHexChannel(red)}${toHexChannel(green)}${toHexChannel(blue)}`.toUpperCase();
};
