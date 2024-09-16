// NOTE: Business logic
interface Persistence {
  add(a: number, b: number): number;
}

const business = (persistence: Persistence) => (a: number, b: number) => {
  return persistence.add(a, b);
};

// ====================
// NOTE: Implementation
const p: Persistence = {
  add(a: number, b: number): number {
    return a + b;
  },
};

// ====================
// NOTE: Dependency injection
const b = business(p);

// ====================
// NOTE: Usage
b(1, 2);
