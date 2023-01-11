export interface IRoute {
  url: string;
  method: string;
  name: string;
}

export interface IRouteArgument {
  assertion: AssertionEnum;
  name: string;
  value: string | undefined;
}

export enum AssertionEnum {
  HaveClass = 'have.class',
  Contains = 'contain',
  HaveAttribute = 'have.attr',
  NotHaveAttribute = 'not.have.attr',
  DontIncludes = 'not.include',
  Includes = 'include'
}
