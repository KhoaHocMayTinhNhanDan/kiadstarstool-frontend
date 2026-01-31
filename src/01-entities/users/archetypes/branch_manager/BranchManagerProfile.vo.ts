// Value Object: UserProfile

export interface UserProfileProps {
  displayName: string
  photoURL?: string
  phoneNumbers?: string[]
  branchIds?: string[]
}

export class UserProfile {
  public readonly displayName: string
  public readonly photoURL: string
  public readonly phoneNumbers: readonly string[]
  public readonly branchIds: readonly string[]

  private constructor(props: {
    displayName: string
    photoURL: string
    phoneNumbers: string[]
    branchIds: string[]
  }) {
    this.displayName = props.displayName
    this.photoURL = props.photoURL
    this.phoneNumbers = Object.freeze(props.phoneNumbers)
    this.branchIds = Object.freeze(props.branchIds)
  }

  // Factory method (chuẩn production)
  static create(data: UserProfileProps): UserProfile {
    const displayName = data.displayName?.trim()
    if (!displayName) {
      throw new Error('UserProfile.displayName is required')
    }

    const phoneNumbers =
      data.phoneNumbers
        ?.map(p => p.trim())
        .filter(Boolean) ?? []

    const branchIds =
      data.branchIds
        ?.map(b => b.trim())
        .filter(Boolean) ?? []

    return new UserProfile({
      displayName,
      photoURL: data.photoURL ?? '/assets/images/default-avatar.png',
      phoneNumbers,
      branchIds,
    })
  }

  // ===== Domain behaviors =====

  withDisplayName(name: string): UserProfile {
    return UserProfile.create({
      ...this.toObject(),
      displayName: name,
    })
  }

  addPhoneNumber(phone: string): UserProfile {
    const p = phone.trim()
    if (!p || this.phoneNumbers.includes(p)) return this

    return UserProfile.create({
      ...this.toObject(),
      phoneNumbers: [...this.phoneNumbers, p],
    })
  }

  addBranch(branchId: string): UserProfile {
    const id = branchId.trim()
    if (!id || this.branchIds.includes(id)) return this

    return UserProfile.create({
      ...this.toObject(),
      branchIds: [...this.branchIds, id],
    })
  }

  isInBranch(branchId: string): boolean {
    return this.branchIds.includes(branchId)
  }

  // ===== Equality (chuẩn VO) =====

  equals(other: UserProfile): boolean {
    if (!other) return false

    return (
      this.displayName === other.displayName &&
      this.photoURL === other.photoURL &&
      this.arrayEquals(this.phoneNumbers, other.phoneNumbers) &&
      this.arrayEquals(this.branchIds, other.branchIds)
    )
  }

  // ===== Serialization =====

  toObject(): UserProfileProps {
    return {
      displayName: this.displayName,
      photoURL: this.photoURL,
      phoneNumbers: [...this.phoneNumbers],
      branchIds: [...this.branchIds],
    }
  }

  // ===== Utils =====

  private arrayEquals(a: readonly string[], b: readonly string[]): boolean {
    if (a.length !== b.length) return false
    return a.every((v, i) => v === b[i])
  }
}
