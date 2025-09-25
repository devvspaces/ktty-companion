export type Reward = {
  id: string;
  name: string;
  image: string;
  family: string;
  breed: string;
  identity: string;
  expression: string;
  borderColor?: string; // 🔹 card glow
  book?: string; // 🔹 source book for badge
  items: { name: string; image: string }[];
};
