import { Color } from './colorPalette';

export interface CurtainSample {
  name: string;
  type: "겉커튼" | "속커튼" | "블라인드";
  subType?: string;
  pleat: "민자" | "나비";
  isBlackout: boolean;
  imageBasePath: string;
  availableColors: string[]; // Color ID 배열
}

export const sampleCurtains: CurtainSample[] = [
  {
    name: "속커튼",
    type: "속커튼",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/curtain1",
    availableColors: [
      "white", "black", "gray", "pastel_blue", "pastel_pink", "pastel_green",
      "warm_beige", "warm_cream", "warm_ivory", "neutral_lightgray", "neutral_silver"
    ]
  },
  {
    name: "겉커튼",
    type: "겉커튼",
    pleat: "나비",
    isBlackout: true,
    imageBasePath: "/samples/curtain2",
    availableColors: [
      "black", "dark_charcoal", "dark_navy", "dark_burgundy", "dark_brown",
      "cool_navy", "cool_darkgray", "cool_charcoal", "neutral_taupe"
    ]
  },
  
  // 블라인드
  {
    name: "알루미늄 블라인드",
    type: "블라인드",
    subType: "알루미늄블라인드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/알루미늄블라인드",
    availableColors: [
      "white", "black", "gray", "silver", "pastel_silver", "neutral_lightgray",
      "cool_steel", "cool_slate", "bright_blue", "bright_green", "bright_red"
    ]
  },
  {
    name: "우드 블라인드",
    type: "블라인드",
    subType: "우드블라인드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/우드블라인드",
    availableColors: [
      "warm_brown", "warm_bronze", "warm_copper", "warm_gold", "warm_amber",
      "warm_terracotta", "warm_rust", "warm_sand", "warm_tan", "neutral_taupe"
    ]
  },
  {
    name: "콤비 블라인드",
    type: "블라인드",
    subType: "콤비블라인드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/콤비블라인드",
    availableColors: [
      "white", "black", "gray", "pastel_blue", "pastel_green", "pastel_pink",
      "warm_beige", "warm_cream", "cool_navy", "cool_teal", "neutral_lightgray"
    ]
  },
  {
    name: "롤 블라인드",
    type: "블라인드",
    subType: "롤블라인드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/롤블라인드",
    availableColors: [
      "white", "black", "gray", "pastel_blue", "pastel_green", "pastel_pink",
      "warm_beige", "warm_cream", "cool_navy", "cool_teal", "neutral_lightgray"
    ]
  },
  {
    name: "암막 롤 블라인드",
    type: "블라인드",
    subType: "암막롤블라인드",
    pleat: "민자",
    isBlackout: true,
    imageBasePath: "/samples/암막롤블라인드",
    availableColors: [
      "black", "dark_charcoal", "dark_navy", "dark_burgundy", "dark_brown",
      "cool_navy", "cool_darkgray", "cool_charcoal", "neutral_taupe"
    ]
  },
  {
    name: "3D 쉐이드",
    type: "블라인드",
    subType: "3d쉐이드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/3d쉐이드",
    availableColors: [
      "white", "pastel_blue", "pastel_green", "pastel_pink", "pastel_lavender",
      "warm_beige", "warm_cream", "cool_navy", "cool_teal", "neutral_lightgray"
    ]
  },
  {
    name: "루미넷 쉐이드",
    type: "블라인드",
    subType: "루미넷쉐이드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/루미넷쉐이드",
    availableColors: [
      "white", "pastel_blue", "pastel_green", "pastel_pink", "pastel_lavender",
      "warm_beige", "warm_cream", "cool_navy", "cool_teal", "neutral_lightgray"
    ]
  },
  {
    name: "허니콤 쉐이드",
    type: "블라인드",
    subType: "허니콤쉐이드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/허니콤쉐이드",
    availableColors: [
      "white", "pastel_blue", "pastel_green", "pastel_pink", "pastel_lavender",
      "warm_beige", "warm_cream", "cool_navy", "cool_teal", "neutral_lightgray"
    ]
  },
  {
    name: "베네시안 블라인드",
    type: "블라인드",
    subType: "베네시안블라인드",
    pleat: "민자",
    isBlackout: false,
    imageBasePath: "/samples/베네시안블라인드",
    availableColors: [
      "white", "black", "gray", "warm_brown", "warm_bronze", "warm_copper",
      "cool_navy", "cool_steel", "neutral_lightgray", "neutral_silver"
    ]
  }
];

export default sampleCurtains; 