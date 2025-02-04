export type Schema0 = 'after' | 'before' | 'none' | null

export interface Schema1 {
  overrides?: {
    [k: string]: 'after' | 'before' | 'none' | 'ignore'
  }
}

export type RuleOptions = [Schema0?, Schema1?]
