export type SimpananPokokType = {
  id: number;
  status: string;
  amount: number;
  user: {
    id: number;
  };
  order: {
    id: string;
    total_cost: number;
    status: string;
  };
};

export type SimpananWajibType = {
  id: number;
  status: string;
  amount: number;
  period: Date;
  user: {
    id: number;
  };
  order: {
    id: string;
    total_cost: number;
    status: string;
  };
};
