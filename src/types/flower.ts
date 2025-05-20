export type FlowerSelectOption = {
  width: number;
  height: number;
  gap: number;
  fontSize?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  data: {
    label: string;
    value: string | number;
  }[];
};
