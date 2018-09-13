export interface ApplyOption {
  type: string;
  payloadPath?: string;
}

export type ApplyOptions = ApplyOption | ApplyOption[];
