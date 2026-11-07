import React, { useEffect, useRef, useState } from 'react';
import { PanResponder } from 'react-native';
import type { ColorFieldProps } from '../../types';
import { ColorFieldStyles } from './styles';
import { hexToHsl, hslToHex, isHexColor } from '../../utils/color';
import { clamp } from '../../utils/helpers';
import { moderateScale } from 'react-native-size-matters';

const HUE_COLORS = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FF0000'];
const THUMB = moderateScale(16, 0.9);

const ColorField = ({ label, value, onChange, swatches }: ColorFieldProps) => {
  const safe = isHexColor(value) ? value.toUpperCase() : '#00D2EE';
  const [hsl, setHsl] = useState(() => hexToHsl(safe));
  const [hex, setHex] = useState(safe);
  const [width, setWidth] = useState(1);
  const hslRef = useRef(hsl);
  hslRef.current = hsl;

  useEffect(() => {
    if (!isHexColor(value)) {
      return;
    }
    const next = value.toUpperCase();
    setHex(next);
    setHsl(hexToHsl(next));
  }, [value]);

  const commit = (nextH: number, nextS: number, nextL: number) => {
    const next = hslToHex(nextH, nextS, nextL);
    setHsl({ h: nextH, s: nextS, l: nextL });
    setHex(next);
    onChange(next);
  };

  const huePan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: event => {
        const ratio = clamp(event.nativeEvent.locationX / width, 0, 1);
        commit(Math.round(ratio * 360), hslRef.current.s, hslRef.current.l);
      },
    }),
  ).current;

  const handleHex = (text: string) => {
    const next = text.startsWith('#') ? text : `#${text}`;
    setHex(next.toUpperCase());
    if (isHexColor(next)) {
      const parsed = hexToHsl(next);
      setHsl(parsed);
      onChange(next.toUpperCase());
    }
  };

  const thumbLeft = clamp((hsl.h / 360) * width - THUMB / 2, 0, Math.max(width - THUMB, 0));

  return (
    <ColorFieldStyles.Block>
      <ColorFieldStyles.LabelRow>
        <ColorFieldStyles.Label>{label}</ColorFieldStyles.Label>
        <ColorFieldStyles.Swatch $color={isHexColor(hex) ? hex : safe} />
      </ColorFieldStyles.LabelRow>
      <ColorFieldStyles.Track
        onLayout={event => setWidth(event.nativeEvent.layout.width)}
        {...huePan.panHandlers}
      >
        <ColorFieldStyles.TrackFill colors={HUE_COLORS} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} />
        <ColorFieldStyles.Thumb $left={thumbLeft} />
      </ColorFieldStyles.Track>
      <ColorFieldStyles.Swatches>
        {swatches.map((swatch: string) => (
          <ColorFieldStyles.Chip
            key={swatch}
            $color={swatch}
            $active={hex === swatch.toUpperCase()}
            onPress={() => handleHex(swatch)}
            accessibilityRole="button"
            accessibilityLabel={swatch}
          />
        ))}
      </ColorFieldStyles.Swatches>
      <ColorFieldStyles.Hex
        value={hex}
        onChangeText={handleHex}
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={7}
        accessibilityLabel={label}
      />
    </ColorFieldStyles.Block>
  );
};

export default ColorField;
