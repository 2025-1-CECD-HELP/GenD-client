export type MemberRole = 'eAdmin' | 'eMember';

export type Member = {
  memberId: number;
  memberRole: MemberRole;
  memberName: string;
  memberImage: string;
};
