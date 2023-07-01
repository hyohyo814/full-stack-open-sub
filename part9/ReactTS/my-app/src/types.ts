interface Part {
  name: string;
  exerciseCount: number;
}

export interface Courseinfo {
  name?: string;
  parts?: CoursePart[];
}

interface PartDesc extends Part {
  description: string;
}

interface PartBasic extends PartDesc {
  kind: 'basic';
}

interface PartBackground extends PartDesc {
  backgroundMaterial: string;
  kind: 'background';
}

interface PartSpecial extends PartDesc {
  requirements: string[];
  kind: 'special';
}

interface PartGroup extends Part {
  groupProjectCount: number;
  kind: 'group';
}

export type CoursePart = PartBasic | PartGroup | PartBackground | PartSpecial;
