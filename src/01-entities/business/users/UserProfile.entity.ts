// src/01-entities/users/UserProfile.entity.ts

export interface UserProfileProps {
  displayName?: string
  photoURL?: string
  phoneNumbers?: string[]
  branchIds?: string[]
}

export interface UserProfileJSON {
  displayName: string
  photoURL: string
  phoneNumbers: string[]
  branchIds: string[]
}

export class UserProfile {
  readonly displayName: string
  readonly photoURL: string
  readonly phoneNumbers: string[]
  readonly branchIds: string[]

  constructor(data: UserProfileProps = {}) {
    this.displayName = (data.displayName ?? '').trim()
    this.photoURL = data.photoURL ?? '/assets/images/default-avatar.png'
    this.phoneNumbers = (data.phoneNumbers ?? [])
      .map(p => p.trim())
      .filter(Boolean)
    this.branchIds = (data.branchIds ?? []).filter(Boolean)
  }

  updateProfile(data: Partial<UserProfileProps>): UserProfile {
    return new UserProfile({ ...this.toJSON(), ...data })
  }

  addPhoneNumber(phone: string): UserProfile {
    const p = phone.trim()
    if (!p || this.phoneNumbers.includes(p)) return this
    return new UserProfile({
      ...this.toJSON(),
      phoneNumbers: [...this.phoneNumbers, p],
    })
  }

  addBranch(branchId: string): UserProfile {
    if (!branchId || this.branchIds.includes(branchId)) return this
    return new UserProfile({
      ...this.toJSON(),
      branchIds: [...this.branchIds, branchId],
    })
  }

  isInBranch(branchId: string): boolean {
    return this.branchIds.includes(branchId)
  }

  toJSON(): UserProfileJSON {
    return {
      displayName: this.displayName,
      photoURL: this.photoURL,
      phoneNumbers: [...this.phoneNumbers],
      branchIds: [...this.branchIds],
    }
  }

  validate(): string[] {
    const errors: string[] = []
    if (!this.displayName) errors.push('Display name is required')
    return errors
  }
}
