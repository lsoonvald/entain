import { mockOffice } from 'office/helpers/office';
import { mockTags } from 'tag/helpers/tag';
import { UserEntity } from 'user/user.entity';

export const mockUser: UserEntity = {
    id: 1,
    email: 'test@test.com',
    psw: 'test1234',
    office: mockOffice,
    tags: mockTags,
    admin: true
};