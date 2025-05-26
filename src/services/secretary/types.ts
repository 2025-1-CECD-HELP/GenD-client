export type TPostChattingRequest = {
  secretaryQuestion: string;
};

export type TGetChattingResponse = {
  secretaryAnswer: string;
  secretaryQuestion: string;
  fileList: TFile[];
  workspaceId: number;
};

export type TFile = {
  fileName: string;
  fileUrl: string;
};
