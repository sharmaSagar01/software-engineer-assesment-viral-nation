export interface IQuery {
  limit: number;
  offset: number;
  contains?: string;
  releaseDate?: {
    lte?: Date;
    gte?: Date;
  };
  orderBy: string;
  sortOrder: string;
}
