import deepclone from "@/shared/helpers/deepclone"

describe('deepclone', () => {
  it('creates a deep clone of an object', () => {
    const original = { a: 1, b: { c: 2, d: { e: 3 } } }
    const cloned = deepclone(original)

    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned.b).not.toBe(original.b)
    expect(cloned.b.d).not.toBe(original.b.d)
  })

  it('handles arrays correctly', () => {
    const original = [{ a: 1 }, { b: 2 }]
    const cloned = deepclone(original)

    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned[0]).not.toBe(original[0])
    expect(cloned[1]).not.toBe(original[1])

    original[1].b = 100
    expect(original[1].b).toEqual(100)
    expect(cloned[1].b).toEqual(2)
  })

  it('handles nested objects and arrays', () => {
    const original = { a: [{ b: { c: 1 } }] }
    const cloned = deepclone(original)

    expect(cloned).toEqual(original)
    expect(cloned.a).not.toBe(original.a)
    expect(cloned.a[0]).not.toBe(original.a[0])
    expect(cloned.a[0].b).not.toBe(original.a[0].b)

    original.a[0].b.c = 100
    expect(original.a[0].b.c).toEqual(100)
    expect(cloned.a[0].b.c).toEqual(1)
  })
})
