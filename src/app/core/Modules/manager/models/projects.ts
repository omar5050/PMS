export interface table {
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecordes: number;
  date: IProject[];
}

export interface IProject {
  id: number;
  manager: any[];
  title: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
}

export interface IProjectById {
  title: string,
  description: string,
}
