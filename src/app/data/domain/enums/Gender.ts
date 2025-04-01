export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export function toDomain<T extends object>(enumType: T, value?: string): T[keyof T] | undefined {
  if (!value) return undefined;
  return (Object.values(enumType) as string[]).includes(value) ? (value as T[keyof T]) : undefined;
}


