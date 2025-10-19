import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';
import DomeGallery from '../components/DomeGallery';
import TechButton from '../components/TechButton';

// Images from kpalime folder (AYSC 2025 Trophy Tour visit and coaching clinic in Kpalime, Togo)
export const kpalimeImages = [
  { src: '/kpalime/IMG-20251006-WA0082.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 1' },
  { src: '/kpalime/IMG-20251006-WA0083.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 2' },
  { src: '/kpalime/IMG-20251006-WA0084.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 3' },
  { src: '/kpalime/IMG-20251006-WA0085.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 4' },
  { src: '/kpalime/IMG-20251006-WA0086.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 5' },
  { src: '/kpalime/IMG-20251006-WA0087.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 6' },
  { src: '/kpalime/IMG-20251006-WA0088.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 7' },
  { src: '/kpalime/IMG-20251006-WA0089.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 8' },
  { src: '/kpalime/IMG-20251006-WA0090.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 9' },
  { src: '/kpalime/IMG-20251006-WA0091.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 10' },
  { src: '/kpalime/IMG-20251006-WA0092.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 11' },
  { src: '/kpalime/IMG-20251006-WA0093.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 12' },
  { src: '/kpalime/IMG-20251006-WA0094.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 13' },
  { src: '/kpalime/IMG-20251006-WA0095.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 14' },
  { src: '/kpalime/IMG-20251006-WA0096.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 15' },
  { src: '/kpalime/IMG-20251006-WA0097.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 16' },
  { src: '/kpalime/IMG-20251006-WA0098.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 17' },
  { src: '/kpalime/IMG-20251006-WA0099.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 18' },
  { src: '/kpalime/IMG-20251006-WA0100.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 19' },
  { src: '/kpalime/IMG-20251006-WA0101.jpg', alt: 'AYSC 2025 Trophy Tour - Kpalime 20' },
];

// Images from ug trophy tour folder (AYSC 2025 Trophy Tour in Uganda)
export const ugTrophyTourImages = [
  { src: '/ug trophy tour/IMG-20251006-WA0122.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 1' },
  { src: '/ug trophy tour/IMG-20251006-WA0123.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 2' },
  { src: '/ug trophy tour/IMG-20251006-WA0124.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 3' },
  { src: '/ug trophy tour/IMG-20251006-WA0125.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 4' },
  { src: '/ug trophy tour/IMG-20251006-WA0126.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 5' },
  { src: '/ug trophy tour/IMG-20251006-WA0127.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 6' },
  { src: '/ug trophy tour/IMG-20251006-WA0128.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 7' },
  { src: '/ug trophy tour/IMG-20251006-WA0129.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 8' },
  { src: '/ug trophy tour/IMG-20251006-WA0130.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 9' },
  { src: '/ug trophy tour/IMG-20251006-WA0131.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 10' },
  { src: '/ug trophy tour/IMG-20251006-WA0132.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 11' },
  { src: '/ug trophy tour/IMG-20251006-WA0133.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 12' },
  { src: '/ug trophy tour/IMG-20251006-WA0134.jpg', alt: 'AYSC 2025 Trophy Tour - Uganda 13' },
];

// Images from President's Cup 2025
export const presidentsCupImages = [
  { src: "/president's cup 2025/IMG-20250817-WA0107.jpg", alt: 'President\'s Cup 2025 - 1' },
  { src: "/president's cup 2025/IMG-20250817-WA0108.jpg", alt: 'President\'s Cup 2025 - 2' },
  { src: "/president's cup 2025/IMG-20250817-WA0109.jpg", alt: 'President\'s Cup 2025 - 3' },
  { src: "/president's cup 2025/IMG-20251006-WA0207.jpg", alt: 'President\'s Cup 2025 - 4' },
  { src: "/president's cup 2025/IMG-20251006-WA0208.jpg", alt: 'President\'s Cup 2025 - 5' },
  { src: "/president's cup 2025/IMG-20251006-WA0209.jpg", alt: 'President\'s Cup 2025 - 6' },
  { src: "/president's cup 2025/IMG-20251006-WA0210.jpg", alt: 'President\'s Cup 2025 - 7' },
  { src: "/president's cup 2025/IMG-20251006-WA0211.jpg", alt: 'President\'s Cup 2025 - 8' },
  { src: "/president's cup 2025/IMG-20251006-WA0212.jpg", alt: 'President\'s Cup 2025 - 9' },
  { src: "/president's cup 2025/IMG-20251006-WA0213.jpg", alt: 'President\'s Cup 2025 - 10' },
  { src: "/president's cup 2025/IMG-20251006-WA0214.jpg", alt: 'President\'s Cup 2025 - 11' },
  { src: "/president's cup 2025/IMG-20251006-WA0215.jpg", alt: 'President\'s Cup 2025 - 12' },
  { src: "/president's cup 2025/IMG-20251006-WA0216.jpg", alt: 'President\'s Cup 2025 - 13' },
  { src: "/president's cup 2025/IMG-20251006-WA0217.jpg", alt: 'President\'s Cup 2025 - 14' },
  { src: "/president's cup 2025/IMG-20251006-WA0218.jpg", alt: 'President\'s Cup 2025 - 15' },
  { src: "/president's cup 2025/IMG-20251006-WA0219.jpg", alt: 'President\'s Cup 2025 - 16' },
  { src: "/president's cup 2025/IMG-20251006-WA0220.jpg", alt: 'President\'s Cup 2025 - 17' },
  { src: "/president's cup 2025/IMG-20251006-WA0221.jpg", alt: 'President\'s Cup 2025 - 18' },
  { src: "/president's cup 2025/IMG-20251006-WA0222.jpg", alt: 'President\'s Cup 2025 - 19' },
  { src: "/president's cup 2025/IMG-20251006-WA0223.jpg", alt: 'President\'s Cup 2025 - 20' },
  { src: "/president's cup 2025/IMG-20251006-WA0224.jpg", alt: 'President\'s Cup 2025 - 21' },
  { src: "/president's cup 2025/IMG-20251006-WA0225.jpg", alt: 'President\'s Cup 2025 - 22' },
  { src: "/president's cup 2025/IMG-20251006-WA0226.jpg", alt: 'President\'s Cup 2025 - 23' },
  { src: "/president's cup 2025/IMG-20251006-WA0227.jpg", alt: 'President\'s Cup 2025 - 24' },
  { src: "/president's cup 2025/IMG-20251006-WA0228.jpg", alt: 'President\'s Cup 2025 - 25' },
  { src: "/president's cup 2025/IMG-20251006-WA0229.jpg", alt: 'President\'s Cup 2025 - 26' },
  { src: "/president's cup 2025/IMG-20251006-WA0230.jpg", alt: 'President\'s Cup 2025 - 27' },
  { src: "/president's cup 2025/IMG-20251006-WA0231.jpg", alt: 'President\'s Cup 2025 - 28' },
  { src: "/president's cup 2025/IMG-20251006-WA0232.jpg", alt: 'President\'s Cup 2025 - 29' },
  { src: "/president's cup 2025/IMG-20251006-WA0233.jpg", alt: 'President\'s Cup 2025 - 30' },
  { src: "/president's cup 2025/IMG-20251006-WA0234.jpg", alt: 'President\'s Cup 2025 - 31' },
  { src: "/president's cup 2025/IMG-20251006-WA0235.jpg", alt: 'President\'s Cup 2025 - 32' },
  { src: "/president's cup 2025/IMG-20251006-WA0236.jpg", alt: 'President\'s Cup 2025 - 33' },
  { src: "/president's cup 2025/IMG-20251006-WA0237.jpg", alt: 'President\'s Cup 2025 - 34' },
  { src: "/president's cup 2025/IMG-20251006-WA0238.jpg", alt: 'President\'s Cup 2025 - 35' },
  { src: "/president's cup 2025/IMG-20251006-WA0239.jpg", alt: 'President\'s Cup 2025 - 36' },
  { src: "/president's cup 2025/IMG-20251006-WA0240.jpg", alt: 'President\'s Cup 2025 - 37' },
  { src: "/president's cup 2025/IMG-20251006-WA0241.jpg", alt: 'President\'s Cup 2025 - 38' },
  { src: "/president's cup 2025/IMG-20251006-WA0242.jpg", alt: 'President\'s Cup 2025 - 39' },
  { src: "/president's cup 2025/IMG-20251006-WA0243.jpg", alt: 'President\'s Cup 2025 - 40' },
  { src: "/president's cup 2025/IMG-20251006-WA0244.jpg", alt: 'President\'s Cup 2025 - 41' },
  { src: "/president's cup 2025/IMG-20251006-WA0245.jpg", alt: 'President\'s Cup 2025 - 42' },
  { src: "/president's cup 2025/IMG-20251006-WA0246.jpg", alt: 'President\'s Cup 2025 - 43' },
  { src: "/president's cup 2025/IMG-20251006-WA0247.jpg", alt: 'President\'s Cup 2025 - 44' },
  { src: "/president's cup 2025/IMG-20251006-WA0248.jpg", alt: 'President\'s Cup 2025 - 45' },
  { src: "/president's cup 2025/IMG-20251006-WA0249.jpg", alt: 'President\'s Cup 2025 - 46' },
  { src: "/president's cup 2025/IMG-20251006-WA0250.jpg", alt: 'President\'s Cup 2025 - 47' },
  { src: "/president's cup 2025/IMG-20251006-WA0251.jpg", alt: 'President\'s Cup 2025 - 48' },
  { src: "/president's cup 2025/IMG-20251006-WA0252.jpg", alt: 'President\'s Cup 2025 - 49' },
  { src: "/president's cup 2025/IMG-20251006-WA0253.jpg", alt: 'President\'s Cup 2025 - 50' },
  { src: "/president's cup 2025/IMG-20251006-WA0254.jpg", alt: 'President\'s Cup 2025 - 51' },
  { src: "/president's cup 2025/IMG-20251006-WA0255.jpg", alt: 'President\'s Cup 2025 - 52' },
  { src: "/president's cup 2025/IMG-20251006-WA0256.jpg", alt: 'President\'s Cup 2025 - 53' },
  { src: "/president's cup 2025/IMG-20251006-WA0257.jpg", alt: 'President\'s Cup 2025 - 54' },
  { src: "/president's cup 2025/IMG-20251006-WA0258.jpg", alt: 'President\'s Cup 2025 - 55' },
  { src: "/president's cup 2025/IMG-20251006-WA0259.jpg", alt: 'President\'s Cup 2025 - 56' },
  { src: "/president's cup 2025/IMG-20251006-WA0260.jpg", alt: 'President\'s Cup 2025 - 57' },
  { src: "/president's cup 2025/IMG-20251006-WA0261.jpg", alt: 'President\'s Cup 2025 - 58' },
  { src: "/president's cup 2025/IMG-20251006-WA0262.jpg", alt: 'President\'s Cup 2025 - 59' },
  { src: "/president's cup 2025/IMG-20251006-WA0263.jpg", alt: 'President\'s Cup 2025 - 60' },
  { src: "/president's cup 2025/IMG-20251006-WA0264.jpg", alt: 'President\'s Cup 2025 - 61' },
  { src: "/president's cup 2025/IMG-20251006-WA0265.jpg", alt: 'President\'s Cup 2025 - 62' },
  { src: "/president's cup 2025/IMG-20251006-WA0266.jpg", alt: 'President\'s Cup 2025 - 63' },
  { src: "/president's cup 2025/IMG-20251006-WA0267.jpg", alt: 'President\'s Cup 2025 - 64' },
  { src: "/president's cup 2025/IMG-20251006-WA0268.jpg", alt: 'President\'s Cup 2025 - 65' },
  { src: "/president's cup 2025/IMG-20251006-WA0269.jpg", alt: 'President\'s Cup 2025 - 66' },
  { src: "/president's cup 2025/IMG-20251006-WA0270.jpg", alt: 'President\'s Cup 2025 - 67' },
  { src: "/president's cup 2025/IMG-20251006-WA0271.jpg", alt: 'President\'s Cup 2025 - 68' },
  { src: "/president's cup 2025/IMG-20251006-WA0272.jpg", alt: 'President\'s Cup 2025 - 69' },
  { src: "/president's cup 2025/IMG-20251006-WA0273.jpg", alt: 'President\'s Cup 2025 - 70' },
  { src: "/president's cup 2025/IMG-20251006-WA0274.jpg", alt: 'President\'s Cup 2025 - 71' },
  { src: "/president's cup 2025/IMG-20251006-WA0275.jpg", alt: 'President\'s Cup 2025 - 72' },
  { src: "/president's cup 2025/IMG-20251006-WA0276.jpg", alt: 'President\'s Cup 2025 - 73' },
  { src: "/president's cup 2025/IMG-20251006-WA0277.jpg", alt: 'President\'s Cup 2025 - 74' },
  { src: "/president's cup 2025/IMG-20251006-WA0278.jpg", alt: 'President\'s Cup 2025 - 75' },
  { src: "/president's cup 2025/IMG-20251006-WA0279.jpg", alt: 'President\'s Cup 2025 - 76' },
  { src: "/president's cup 2025/IMG-20251006-WA0280.jpg", alt: 'President\'s Cup 2025 - 77' },
  { src: "/president's cup 2025/IMG-20251006-WA0281.jpg", alt: 'President\'s Cup 2025 - 78' },
  { src: "/president's cup 2025/IMG-20251006-WA0282.jpg", alt: 'President\'s Cup 2025 - 79' },
  { src: "/president's cup 2025/IMG-20251006-WA0283.jpg", alt: 'President\'s Cup 2025 - 80' },
  { src: "/president's cup 2025/IMG-20251006-WA0284.jpg", alt: 'President\'s Cup 2025 - 81' },
  { src: "/president's cup 2025/IMG-20251006-WA0285.jpg", alt: 'President\'s Cup 2025 - 82' },
  { src: "/president's cup 2025/IMG-20251006-WA0286.jpg", alt: 'President\'s Cup 2025 - 83' },
  { src: "/president's cup 2025/IMG-20251006-WA0287.jpg", alt: 'President\'s Cup 2025 - 84' },
  { src: "/president's cup 2025/IMG-20251006-WA0288.jpg", alt: 'President\'s Cup 2025 - 85' },
  { src: "/president's cup 2025/IMG-20251006-WA0289.jpg", alt: 'President\'s Cup 2025 - 86' },
  { src: "/president's cup 2025/IMG-20251006-WA0290.jpg", alt: 'President\'s Cup 2025 - 87' },
  { src: "/president's cup 2025/IMG-20251006-WA0291.jpg", alt: 'President\'s Cup 2025 - 88' },
  { src: "/president's cup 2025/IMG-20251006-WA0292.jpg", alt: 'President\'s Cup 2025 - 89' },
  { src: "/president's cup 2025/IMG-20251006-WA0293.jpg", alt: 'President\'s Cup 2025 - 90' },
  { src: "/president's cup 2025/IMG-20251006-WA0294.jpg", alt: 'President\'s Cup 2025 - 91' },
  { src: "/president's cup 2025/IMG-20251006-WA0295.jpg", alt: 'President\'s Cup 2025 - 92' },
  { src: "/president's cup 2025/IMG-20251006-WA0296.jpg", alt: 'President\'s Cup 2025 - 93' },
  { src: "/president's cup 2025/IMG-20251006-WA0298.jpg", alt: 'President\'s Cup 2025 - 94' },
];

// Images from AYSC Trophy Tour Kenya
export const kenyaTrophyTourImages = [
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0297.jpg', alt: 'AYSC Trophy Tour - Kenya 1' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0299.jpg', alt: 'AYSC Trophy Tour - Kenya 2' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0300.jpg', alt: 'AYSC Trophy Tour - Kenya 3' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0301.jpg', alt: 'AYSC Trophy Tour - Kenya 4' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0302.jpg', alt: 'AYSC Trophy Tour - Kenya 5' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0303.jpg', alt: 'AYSC Trophy Tour - Kenya 6' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0304.jpg', alt: 'AYSC Trophy Tour - Kenya 7' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0305.jpg', alt: 'AYSC Trophy Tour - Kenya 8' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0306.jpg', alt: 'AYSC Trophy Tour - Kenya 9' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0307.jpg', alt: 'AYSC Trophy Tour - Kenya 10' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0308.jpg', alt: 'AYSC Trophy Tour - Kenya 11' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0309.jpg', alt: 'AYSC Trophy Tour - Kenya 12' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0310.jpg', alt: 'AYSC Trophy Tour - Kenya 13' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0311.jpg', alt: 'AYSC Trophy Tour - Kenya 14' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0312.jpg', alt: 'AYSC Trophy Tour - Kenya 15' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0313.jpg', alt: 'AYSC Trophy Tour - Kenya 16' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0314.jpg', alt: 'AYSC Trophy Tour - Kenya 17' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0315.jpg', alt: 'AYSC Trophy Tour - Kenya 18' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0316.jpg', alt: 'AYSC Trophy Tour - Kenya 19' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0317.jpg', alt: 'AYSC Trophy Tour - Kenya 20' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0318.jpg', alt: 'AYSC Trophy Tour - Kenya 21' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0319.jpg', alt: 'AYSC Trophy Tour - Kenya 22' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0320.jpg', alt: 'AYSC Trophy Tour - Kenya 23' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0321.jpg', alt: 'AYSC Trophy Tour - Kenya 24' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0322.jpg', alt: 'AYSC Trophy Tour - Kenya 25' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0323.jpg', alt: 'AYSC Trophy Tour - Kenya 26' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0324.jpg', alt: 'AYSC Trophy Tour - Kenya 27' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0325.jpg', alt: 'AYSC Trophy Tour - Kenya 28' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0326.jpg', alt: 'AYSC Trophy Tour - Kenya 29' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0327.jpg', alt: 'AYSC Trophy Tour - Kenya 30' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0328.jpg', alt: 'AYSC Trophy Tour - Kenya 31' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0329.jpg', alt: 'AYSC Trophy Tour - Kenya 32' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0330.jpg', alt: 'AYSC Trophy Tour - Kenya 33' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0331.jpg', alt: 'AYSC Trophy Tour - Kenya 34' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0332.jpg', alt: 'AYSC Trophy Tour - Kenya 35' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0333.jpg', alt: 'AYSC Trophy Tour - Kenya 36' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0334.jpg', alt: 'AYSC Trophy Tour - Kenya 37' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0335.jpg', alt: 'AYSC Trophy Tour - Kenya 38' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0336.jpg', alt: 'AYSC Trophy Tour - Kenya 39' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0337.jpg', alt: 'AYSC Trophy Tour - Kenya 40' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0338.jpg', alt: 'AYSC Trophy Tour - Kenya 41' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0339.jpg', alt: 'AYSC Trophy Tour - Kenya 42' },
  { src: '/AYSC Trophy Tour Kenya/IMG-20251006-WA0340.jpg', alt: 'AYSC Trophy Tour - Kenya 43' },
];

// Images from AYSC Trophy Tour Liberia
export const liberiaTrophyTourImages = [
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0344.jpg', alt: 'AYSC Trophy Tour - Liberia 1' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0345.jpg', alt: 'AYSC Trophy Tour - Liberia 2' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0346.jpg', alt: 'AYSC Trophy Tour - Liberia 3' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0347.jpg', alt: 'AYSC Trophy Tour - Liberia 4' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0348.jpg', alt: 'AYSC Trophy Tour - Liberia 5' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0349.jpg', alt: 'AYSC Trophy Tour - Liberia 6' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0350.jpg', alt: 'AYSC Trophy Tour - Liberia 7' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0351.jpg', alt: 'AYSC Trophy Tour - Liberia 8' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0352.jpg', alt: 'AYSC Trophy Tour - Liberia 9' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0353.jpg', alt: 'AYSC Trophy Tour - Liberia 10' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0354.jpg', alt: 'AYSC Trophy Tour - Liberia 11' },
  { src: '/AYSC Trophy Tour Liberia/IMG-20251006-WA0355.jpg', alt: 'AYSC Trophy Tour - Liberia 12' },
];

// Images from AYSC Trophy Tour Press Conference Togo
export const pressConferenceTogoImages = [
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0356.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 1' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0357.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 2' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0358.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 3' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0359.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 4' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0360.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 5' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0361.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 6' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0362.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 7' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0363.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 8' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0364.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 9' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0365.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 10' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0366.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 11' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0367.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 12' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0368.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 13' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0369.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 14' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0370.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 15' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0371.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 16' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0372.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 17' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0373.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 18' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0374.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 19' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0375.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 20' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0376.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 21' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0377.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 22' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0378.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 23' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0379.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 24' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0380.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 25' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0381.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 26' },
  { src: '/AYSC Trophy Tour Press Conference Togo/IMG-20251006-WA0382.jpg', alt: 'AYSC Trophy Tour Press Conference - Togo 27' },
];

// Images from African Games Accra 2024
export const africanGames2024Images = [
  { src: '/africangames2024/IMG-20251017-WA0001.jpg', alt: 'African Games Accra 2024 - 1' },
  { src: '/africangames2024/IMG-20251017-WA0002.jpg', alt: 'African Games Accra 2024 - 2' },
  { src: '/africangames2024/IMG-20251017-WA0003.jpg', alt: 'African Games Accra 2024 - 3' },
  { src: '/africangames2024/IMG-20251017-WA0004.jpg', alt: 'African Games Accra 2024 - 4' },
  { src: '/africangames2024/IMG-20251017-WA0005.jpg', alt: 'African Games Accra 2024 - 5' },
  { src: '/africangames2024/IMG-20251017-WA0006.jpg', alt: 'African Games Accra 2024 - 6' },
  { src: '/africangames2024/IMG-20251017-WA0007.jpg', alt: 'African Games Accra 2024 - 7' },
  { src: '/africangames2024/IMG-20251017-WA0008.jpg', alt: 'African Games Accra 2024 - 8' },
  { src: '/africangames2024/IMG-20251017-WA0009.jpg', alt: 'African Games Accra 2024 - 9' },
  { src: '/africangames2024/IMG-20251017-WA0010.jpg', alt: 'African Games Accra 2024 - 10' },
  { src: '/africangames2024/IMG-20251017-WA0011.jpg', alt: 'African Games Accra 2024 - 11' },
  { src: '/africangames2024/IMG-20251017-WA0012.jpg', alt: 'African Games Accra 2024 - 12' },
  { src: '/africangames2024/IMG-20251017-WA0013.jpg', alt: 'African Games Accra 2024 - 13' },
  { src: '/africangames2024/IMG-20251017-WA0014.jpg', alt: 'African Games Accra 2024 - 14' },
  { src: '/africangames2024/IMG-20251017-WA0015.jpg', alt: 'African Games Accra 2024 - 15' },
];

// Images from Africa Scrabble Championship - Kigali 2024
export const asc2024Images = [
  { src: '/asc2024/IMG-20251017-WA0081.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 1' },
  { src: '/asc2024/IMG-20251017-WA0082.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 2' },
  { src: '/asc2024/IMG-20251017-WA0083.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 3' },
  { src: '/asc2024/IMG-20251017-WA0084.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 4' },
  { src: '/asc2024/IMG-20251017-WA0085.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 5' },
  { src: '/asc2024/IMG-20251017-WA0086.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 6' },
  { src: '/asc2024/IMG-20251017-WA0087.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 7' },
  { src: '/asc2024/IMG-20251017-WA0088.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 8' },
  { src: '/asc2024/IMG-20251017-WA0089.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 9' },
  { src: '/asc2024/IMG-20251017-WA0090.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 10' },
  { src: '/asc2024/IMG-20251017-WA0091.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 11' },
  { src: '/asc2024/IMG-20251017-WA0092.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 12' },
  { src: '/asc2024/IMG-20251017-WA0093.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 13' },
  { src: '/asc2024/IMG-20251017-WA0094.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 14' },
  { src: '/asc2024/IMG-20251017-WA0095.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 15' },
  { src: '/asc2024/IMG-20251017-WA0096.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 16' },
  { src: '/asc2024/IMG-20251017-WA0097.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 17' },
  { src: '/asc2024/IMG-20251017-WA0098.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 18' },
  { src: '/asc2024/IMG-20251017-WA0099.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 19' },
  { src: '/asc2024/IMG-20251017-WA0100.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 20' },
  { src: '/asc2024/IMG-20251017-WA0101.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 21' },
  { src: '/asc2024/IMG-20251017-WA0102.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 22' },
  { src: '/asc2024/IMG-20251017-WA0103.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 23' },
  { src: '/asc2024/IMG-20251017-WA0104.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 24' },
  { src: '/asc2024/IMG-20251017-WA0105.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 25' },
  { src: '/asc2024/IMG-20251017-WA0106.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 26' },
  { src: '/asc2024/IMG-20251017-WA0107.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 27' },
  { src: '/asc2024/IMG-20251017-WA0108.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 28' },
  { src: '/asc2024/IMG-20251017-WA0109.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 29' },
  { src: '/asc2024/IMG-20251017-WA0110.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 30' },
  { src: '/asc2024/IMG-20251017-WA0111.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 31' },
  { src: '/asc2024/IMG-20251017-WA0112.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 32' },
  { src: '/asc2024/IMG-20251017-WA0113.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 33' },
  { src: '/asc2024/IMG-20251017-WA0114.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 34' },
  { src: '/asc2024/IMG-20251017-WA0115.jpg', alt: 'Africa Scrabble Championship - Kigali 2024 - 35' },
];

// Images from President's Cup and AYSC 2023
export const presidentsCupAYSC2023Images = [
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0002.jpg', alt: 'President\'s Cup and AYSC 2023 - 1' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0003.jpg', alt: 'President\'s Cup and AYSC 2023 - 2' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0004.jpg', alt: 'President\'s Cup and AYSC 2023 - 3' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0005.jpg', alt: 'President\'s Cup and AYSC 2023 - 4' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0006.jpg', alt: 'President\'s Cup and AYSC 2023 - 5' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0007.jpg', alt: 'President\'s Cup and AYSC 2023 - 6' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0008.jpg', alt: 'President\'s Cup and AYSC 2023 - 7' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0009.jpg', alt: 'President\'s Cup and AYSC 2023 - 8' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0010.jpg', alt: 'President\'s Cup and AYSC 2023 - 9' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0011.jpg', alt: 'President\'s Cup and AYSC 2023 - 10' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0012.jpg', alt: 'President\'s Cup and AYSC 2023 - 11' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0013.jpg', alt: 'President\'s Cup and AYSC 2023 - 12' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0014.jpg', alt: 'President\'s Cup and AYSC 2023 - 13' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0015.jpg', alt: 'President\'s Cup and AYSC 2023 - 14' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0021.jpg', alt: 'President\'s Cup and AYSC 2023 - 15' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0022.jpg', alt: 'President\'s Cup and AYSC 2023 - 16' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0023.jpg', alt: 'President\'s Cup and AYSC 2023 - 17' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0024.jpg', alt: 'President\'s Cup and AYSC 2023 - 18' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0025.jpg', alt: 'President\'s Cup and AYSC 2023 - 19' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0026.jpg', alt: 'President\'s Cup and AYSC 2023 - 20' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0027.jpg', alt: 'President\'s Cup and AYSC 2023 - 21' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0028.jpg', alt: 'President\'s Cup and AYSC 2023 - 22' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0029.jpg', alt: 'President\'s Cup and AYSC 2023 - 23' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0030.jpg', alt: 'President\'s Cup and AYSC 2023 - 24' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0031.jpg', alt: 'President\'s Cup and AYSC 2023 - 25' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0032.jpg', alt: 'President\'s Cup and AYSC 2023 - 26' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0033.jpg', alt: 'President\'s Cup and AYSC 2023 - 27' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0034.jpg', alt: 'President\'s Cup and AYSC 2023 - 28' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0035.jpg', alt: 'President\'s Cup and AYSC 2023 - 29' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0036.jpg', alt: 'President\'s Cup and AYSC 2023 - 30' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0037.jpg', alt: 'President\'s Cup and AYSC 2023 - 31' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0038.jpg', alt: 'President\'s Cup and AYSC 2023 - 32' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0039.jpg', alt: 'President\'s Cup and AYSC 2023 - 33' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0040.jpg', alt: 'President\'s Cup and AYSC 2023 - 34' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0041.jpg', alt: 'President\'s Cup and AYSC 2023 - 35' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0042.jpg', alt: 'President\'s Cup and AYSC 2023 - 36' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0043.jpg', alt: 'President\'s Cup and AYSC 2023 - 37' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0044.jpg', alt: 'President\'s Cup and AYSC 2023 - 38' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0045.jpg', alt: 'President\'s Cup and AYSC 2023 - 39' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0046.jpg', alt: 'President\'s Cup and AYSC 2023 - 40' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0047.jpg', alt: 'President\'s Cup and AYSC 2023 - 41' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0048.jpg', alt: 'President\'s Cup and AYSC 2023 - 42' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0049.jpg', alt: 'President\'s Cup and AYSC 2023 - 43' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0050.jpg', alt: 'President\'s Cup and AYSC 2023 - 44' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0051.jpg', alt: 'President\'s Cup and AYSC 2023 - 45' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0052.jpg', alt: 'President\'s Cup and AYSC 2023 - 46' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0053.jpg', alt: 'President\'s Cup and AYSC 2023 - 47' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0054.jpg', alt: 'President\'s Cup and AYSC 2023 - 48' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0055.jpg', alt: 'President\'s Cup and AYSC 2023 - 49' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0056.jpg', alt: 'President\'s Cup and AYSC 2023 - 50' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0057.jpg', alt: 'President\'s Cup and AYSC 2023 - 51' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0058.jpg', alt: 'President\'s Cup and AYSC 2023 - 52' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0059.jpg', alt: 'President\'s Cup and AYSC 2023 - 53' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0060.jpg', alt: 'President\'s Cup and AYSC 2023 - 54' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0061.jpg', alt: 'President\'s Cup and AYSC 2023 - 55' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0062.jpg', alt: 'President\'s Cup and AYSC 2023 - 56' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0063.jpg', alt: 'President\'s Cup and AYSC 2023 - 57' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0064.jpg', alt: 'President\'s Cup and AYSC 2023 - 58' },
  { src: '/PresidentCup-AYSC2023/IMG-20251017-WA0065.jpg', alt: 'President\'s Cup and AYSC 2023 - 59' },
];

const GalleryPage: React.FC = () => {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const [activeCollection, setActiveCollection] = useState<'all' | 'kpalime' | 'uganda' | 'presidentsCup' | 'kenya' | 'liberia' | 'pressConference' | 'africanGames2024' | 'presidentsCupAYSC2023' | 'asc2024'>('all');
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive values based on screen size
  const getResponsiveValues = () => {
    if (screenSize.width < 480) {
      return { minRadius: 150, segments: 35, height: 'h-[200px]' };
    } else if (screenSize.width < 768) {
      return { minRadius: 250, segments: 40, height: 'h-[300px]' };
    } else if (screenSize.width < 1024) {
      return { minRadius: 300, segments: 50, height: 'h-[400px]' };
    } else {
      return { minRadius: 350, segments: 60, height: 'h-[500px]' };
    }
  };

  const { minRadius, segments, height } = getResponsiveValues();

  // Update filtered images when activeCollection changes
  useEffect(() => {
    const getFilteredImages = () => {
      if (activeCollection === 'all') {
        // Combine all images for "all" view
        return [...kpalimeImages, ...ugTrophyTourImages, ...presidentsCupImages, ...kenyaTrophyTourImages, ...liberiaTrophyTourImages, ...pressConferenceTogoImages, ...africanGames2024Images, ...presidentsCupAYSC2023Images, ...asc2024Images]
          .filter(img => img.src && img.src.trim() !== ''); // Filter out empty src values
      }
      if (activeCollection === 'kpalime') {
        return kpalimeImages.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'uganda') {
        return ugTrophyTourImages.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'presidentsCup') {
        return presidentsCupImages.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'kenya') {
        return kenyaTrophyTourImages.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'liberia') {
        return liberiaTrophyTourImages.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'pressConference') {
        return pressConferenceTogoImages.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'africanGames2024') {
        return africanGames2024Images.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'presidentsCupAYSC2023') {
        return presidentsCupAYSC2023Images.filter(img => img.src && img.src.trim() !== '');
      }
      if (activeCollection === 'asc2024') {
        return asc2024Images.filter(img => img.src && img.src.trim() !== '');
      }
      return [];
    };

    setFilteredImages(getFilteredImages());
  }, [activeCollection]);

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 section-header">
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 section-title">
            {t('gallery.title')}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto font-medium section-subtitle">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Collection Filter Buttons - Using standardized TechButton component */}
        <div className="flex justify-center mb-6 sm:mb-8 gap-2 sm:gap-4 flex-wrap relative" style={{ zIndex: 30 }}>
          <TechButton
            variant={activeCollection === 'all' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('All Collections clicked');
              setActiveCollection('all');
            }}
          >
            All Collections
          </TechButton>
          <TechButton
            variant={activeCollection === 'kpalime' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('Kpalime Event clicked');
              setActiveCollection('kpalime');
            }}
          >
            AYSC 2025 Trophy Tour - Kpalime, Togo
          </TechButton>
          <TechButton
            variant={activeCollection === 'uganda' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('Uganda Trophy Tour clicked');
              setActiveCollection('uganda');
            }}
          >
            AYSC 2025 Trophy Tour - Uganda
          </TechButton>
          <TechButton
            variant={activeCollection === 'presidentsCup' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('President\'s Cup clicked');
              setActiveCollection('presidentsCup');
            }}
          >
            President's Cup - Triumvirate Showdown
          </TechButton>
          <TechButton
            variant={activeCollection === 'kenya' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('Kenya Trophy Tour clicked');
              setActiveCollection('kenya');
            }}
          >
            AYSC 2025 Trophy Tour - Kenya
          </TechButton>
          <TechButton
            variant={activeCollection === 'liberia' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('Liberia Trophy Tour clicked');
              setActiveCollection('liberia');
            }}
          >
            AYSC 2025 Trophy Tour - Liberia
          </TechButton>
          <TechButton
            variant={activeCollection === 'pressConference' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('Press Conference Togo clicked');
              setActiveCollection('pressConference');
            }}
          >
            AYSC 2025 Trophy Tour - Press Conference
          </TechButton>
          <TechButton
            variant={activeCollection === 'africanGames2024' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('African Games 2024 clicked');
              setActiveCollection('africanGames2024');
            }}
          >
            African Games (Accra 2024)
          </TechButton>
          <TechButton
            variant={activeCollection === 'presidentsCupAYSC2023' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('President\'s Cup and AYSC 2023 clicked');
              setActiveCollection('presidentsCupAYSC2023');
            }}
          >
            President's Cup and AYSC 2023
          </TechButton>
          <TechButton
            variant={activeCollection === 'asc2024' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {
              console.log('Africa Scrabble Championship - Kigali 2024 clicked');
              setActiveCollection('asc2024');
            }}
          >
            Africa Scrabble Championship - Kigali 2024
          </TechButton>
        </div>

        {/* Dome Gallery Component */}
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-8 max-w-6xl mx-auto border border-cyan-400/30 shadow-2xl mb-8 sm:mb-12 relative tech-card" style={{ zIndex: 10 }}>
          <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full">
            <DomeGallery 
              key={activeCollection} // Add key to force re-render when collection changes
              images={filteredImages}
              fit={0.7}
              minRadius={minRadius}
              imageBorderRadius="10px"
              openedImageBorderRadius="15px"
              grayscale={false}
              segments={segments} // Adjust segments based on screen size
              padFactor={0.15}
              dragSensitivity={screenSize.width < 768 ? 10 : 20} // More sensitive on mobile
              dragDampening={screenSize.width < 768 ? 1.5 : 2} // Adjust dampening for mobile
            />
          </div>
        </div>

        {/* Gallery Collections Section */}
        <div className="mt-8 sm:mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/tg.png" 
                alt="Togo Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">AYSC 2025 Trophy Tour - Kpalime</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Visit and coaching clinic in Kpalime, Togo as part of the AYSC 2025 Trophy Tour.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/kpalime')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/ug.png" 
                alt="Uganda Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4 group-hover:text-purple-400 transition-colors">AYSC 2025 Trophy Tour - Uganda</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Trophy presentation tour across Uganda as part of the AYSC 2025 Trophy Tour.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/uganda')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/ke.png" 
                alt="Kenya Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4 group-hover:text-orange-400 transition-colors">President's Cup 2025 - Triumvirate Showdown</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Biennial President's Cup championship event held at the Trademark Hotel, Nairobi, Kenya, featuring top players from across Africa in the Triumvirate Showdown.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/presidentsCup')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/ke.png" 
                alt="Kenya Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-red-400 mb-3 sm:mb-4 group-hover:text-pink-400 transition-colors">AYSC Trophy Tour - Kenya</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Trophy presentation tour across Kenya celebrating Scrabble champions and promoting the game.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/kenya')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/lr.png" 
                alt="Liberia Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-blue-400 mb-3 sm:mb-4 group-hover:text-indigo-400 transition-colors">AYSC Trophy Tour - Liberia</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Trophy presentation tour in Liberia as part of the AYSC 2025 Trophy Tour series.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/liberia')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-indigo-400/30 hover:border-indigo-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/tg.png" 
                alt="Togo Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-indigo-400 mb-3 sm:mb-4 group-hover:text-purple-400 transition-colors">Press Conference - Togo</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Press conference at the American Corner, University of Lome, Togo as part of the AYSC 2025 Trophy Tour.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/pressConference')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/gh.png" 
                alt="Ghana Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-purple-400 mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">African Games (Accra 2024)</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Scrabble events and competitions at the African Games in Accra, Ghana 2024.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/africanGames2024')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/ng.png" 
                alt="Nigeria Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-orange-400 mb-3 sm:mb-4 group-hover:text-yellow-400 transition-colors">President's Cup and AYSC 2023</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">President's Cup and African Youth Scrabble Championship events from 2023.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/presidentsCupAYSC2023')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/rw.png" 
                alt="Rwanda Flag" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-green-500 mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">Africa Scrabble Championship - Kigali 2024</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4">Africa Scrabble Championship held in Kigali, Rwanda in 2024.</p>
            <TechButton
              variant="secondary"
              size="md"
              onClick={() => navigate('/gallery/asc2024')}
              className="mt-2"
            >
              View Collection
            </TechButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;