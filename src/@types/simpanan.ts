export type SimpananPokok = {
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

export type SimpananWajib = {
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

export type SimpananSukarela = {
  id: number;
  amount: number;
  user: {
    id: number;
    email: string;
    displayName: string;
  };
  orders: {
    id: number;
    total_cost: number;
    status: string;
  };
};
